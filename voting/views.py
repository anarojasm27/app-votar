from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from django.utils import timezone
from django.db import transaction
from django.db.models import Count

from .models import User, Election, Candidate, VoteRegistry, Vote
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    ElectionSerializer, CandidateSerializer, VoteSerializer,
    CastVoteSerializer
)

# ============================================
# VISTA: REGISTRO DE USUARIOS
# ============================================

class RegisterView(APIView):
    """
    POST /api/register/
    Registra un nuevo usuario y retorna tokens JWT.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generar tokens JWT
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'Usuario registrado exitosamente',
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ============================================
# VISTA: LOGIN
# ============================================

class LoginView(APIView):
    """
    POST /api/login/
    Autentica usuario y retorna tokens JWT.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'Credenciales inválidas'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Verificar password
        if not check_password(password, user.password):
            return Response(
                {'error': 'Credenciales inválidas'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Verificar que usuario esté activo
        if not user.is_active:
            return Response(
                {'error': 'Usuario inactivo'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            'message': 'Login exitoso',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_200_OK)


# ============================================
# VISTA: PERFIL DE USUARIO
# ============================================

class ProfileView(APIView):
    """
    GET /api/profile/
    Retorna información del usuario autenticado.
    Requiere token JWT en header Authorization.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ============================================
# VIEWSET: ELECTIONS
# ============================================

class ElectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para consultar elecciones.

    Endpoints generados:
    - GET /api/elections/ - Lista todas las elecciones
    - GET /api/elections/{id}/ - Detalle de una elección
    """

    queryset = Election.objects.all()
    serializer_class = ElectionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Opcionalmente filtrar por status.
        Ej: /api/elections/?status=active
        """
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status', None)

        if status_filter:
            queryset = queryset.filter(status=status_filter)

        return queryset


# ============================================
# VIEWSET: CANDIDATES
# ============================================

class CandidateViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para consultar candidatos.

    Endpoints generados:
    - GET /api/candidates/ - Lista todos los candidatos
    - GET /api/candidates/{id}/ - Detalle de un candidato
    """

    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Opcionalmente filtrar por election_id.
        Ej: /api/candidates/?election=uuid-de-eleccion
        """
        queryset = super().get_queryset()
        election_id = self.request.query_params.get('election', None)

        if election_id:
            queryset = queryset.filter(election_id=election_id)

        return queryset


# ============================================
# VISTA: EMITIR VOTO
# ============================================

class VoteView(APIView):
    """
    POST /api/vote/
    Emite un voto con validaciones completas.

    Validaciones:
    1. Usuario autenticado
    2. Elección existe
    3. Elección está activa
    4. Elección está dentro del periodo de votación
    5. Candidato existe y pertenece a la elección
    6. Usuario NO ha votado antes en esta elección

    Operación atómica:
    - Crea registro en Vote (anónimo)
    - Actualiza/crea registro en VoteRegistry
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CastVoteSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        election = serializer.validated_data['election']
        candidate = serializer.validated_data['candidate']
        user = request.user

        # ========== VALIDACIONES ==========

        # 1. Verificar que elección esté activa
        if election.status != 'active':
            return Response(
                {'error': f'La elección está en estado "{election.status}". Solo se puede votar en elecciones activas.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 2. Verificar que elección esté dentro del periodo
        now = timezone.now()
        if now < election.start_date:
            return Response(
                {'error': 'La votación aún no ha iniciado'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if now > election.end_date:
            return Response(
                {'error': 'La votación ya finalizó'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3. Verificar que usuario NO haya votado
        try:
            vote_registry = VoteRegistry.objects.get(user=user, election=election)
            if vote_registry.has_voted:
                return Response(
                    {'error': 'Ya has votado en esta elección'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except VoteRegistry.DoesNotExist:
            vote_registry = None

        # ========== EMITIR VOTO (Operación Atómica) ==========

        try:
            with transaction.atomic():
                # Crear voto anónimo
                Vote.objects.create(
                    election=election,
                    candidate=candidate
                    # NO incluir user (anonimato)
                )

                # Actualizar o crear registro de control
                if vote_registry:
                    vote_registry.has_voted = True
                    vote_registry.voted_at = timezone.now()
                    vote_registry.save()
                else:
                    VoteRegistry.objects.create(
                        user=user,
                        election=election,
                        has_voted=True,
                        voted_at=timezone.now()
                    )

                return Response({
                    'message': 'Voto registrado exitosamente',
                    'election': election.title,
                    'candidate': candidate.name
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {'error': f'Error al registrar voto: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ============================================
# VISTA: VERIFICAR SI YA VOTÓ
# ============================================

class HasVotedView(APIView):
    """
    GET /api/has-voted/{election_id}/
    Verifica si el usuario autenticado ya votó en una elección.

    Retorna:
    {
        "has_voted": true/false,
        "election_id": "uuid",
        "election_title": "Título",
        "voted_at": "timestamp" (si votó)
    }
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, election_id):
        user = request.user

        # Verificar que elección existe
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response(
                {'error': 'Elección no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Buscar registro de votación
        try:
            vote_registry = VoteRegistry.objects.get(user=user, election=election)
            return Response({
                'has_voted': vote_registry.has_voted,
                'election_id': str(election.id),
                'election_title': election.title,
                'voted_at': vote_registry.voted_at
            }, status=status.HTTP_200_OK)
        except VoteRegistry.DoesNotExist:
            return Response({
                'has_voted': False,
                'election_id': str(election.id),
                'election_title': election.title,
                'voted_at': None
            }, status=status.HTTP_200_OK)


# ============================================
# VISTA: RESULTADOS DE ELECCIÓN
# ============================================

class ResultsView(APIView):
    """
    GET /api/results/{election_id}/
    Retorna resultados de una elección con conteo de votos.

    Retorna:
    {
        "election": {...},
        "total_votes": 100,
        "results": [
            {
                "candidate_id": "uuid",
                "candidate_name": "Nombre",
                "votes": 45,
                "percentage": 45.0
            },
            ...
        ]
    }
    """

    permission_classes = [AllowAny]

    def get(self, request, election_id):
        # Verificar que elección existe
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response(
                {'error': 'Elección no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Obtener candidatos de la elección
        candidates = Candidate.objects.filter(election=election)

        # Contar votos por candidato
        vote_counts = Vote.objects.filter(election=election).values('candidate').annotate(
            count=Count('id')
        )

        # Crear diccionario de conteos
        votes_dict = {item['candidate']: item['count'] for item in vote_counts}

        # Calcular total de votos
        total_votes = sum(votes_dict.values())

        # Construir resultados
        results = []
        for candidate in candidates:
            votes = votes_dict.get(candidate.id, 0)
            percentage = (votes / total_votes * 100) if total_votes > 0 else 0

            results.append({
                'candidate_id': str(candidate.id),
                'candidate_name': candidate.name,
                'candidate_photo': candidate.photo_url,
                'party_group': candidate.party_group,
                'votes': votes,
                'percentage': round(percentage, 2)
            })

        # Ordenar por votos descendente
        results.sort(key=lambda x: x['votes'], reverse=True)

        return Response({
            'election': ElectionSerializer(election).data,
            'total_votes': total_votes,
            'results': results
        }, status=status.HTTP_200_OK)


# ============================================
# VISTA: HISTORIAL DE ELECCIONES CERRADAS
# ============================================

class HistoryView(APIView):
    """
    GET /api/history/
    Retorna lista de elecciones cerradas con sus resultados finales.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener elecciones cerradas
        closed_elections = Election.objects.filter(status='closed').order_by('-end_date')

        history = []

        for election in closed_elections:
            # Calcular resultados
            candidates = Candidate.objects.filter(election=election)
            vote_counts = Vote.objects.filter(election=election).values('candidate').annotate(
                count=Count('id')
            )
            votes_dict = {item['candidate']: item['count'] for item in vote_counts}
            total_votes = sum(votes_dict.values())

            results = []
            winner = None
            max_votes = 0

            for candidate in candidates:
                votes = votes_dict.get(candidate.id, 0)
                percentage = (votes / total_votes * 100) if total_votes > 0 else 0

                result = {
                    'candidate_name': candidate.name,
                    'votes': votes,
                    'percentage': round(percentage, 2)
                }
                results.append(result)

                if votes > max_votes:
                    max_votes = votes
                    winner = candidate.name

            results.sort(key=lambda x: x['votes'], reverse=True)

            history.append({
                'election': ElectionSerializer(election).data,
                'total_votes': total_votes,
                'winner': winner,
                'results': results
            })

        return Response(history, status=status.HTTP_200_OK)

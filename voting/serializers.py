from rest_framework import serializers
from .models import User, Election, Candidate, VoteRegistry, Vote
from django.contrib.auth.hashers import make_password

# ============================================
# SERIALIZER: USER
# ============================================

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para modelo User.
    Excluye password por seguridad.
    """

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']


# ============================================
# SERIALIZER: USER REGISTRATION
# ============================================

class RegisterSerializer(serializers.Serializer):
    """
    Serializer para registro de nuevos usuarios.
    Valida email único, passwords coincidentes, y hashea password.
    """

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=6, required=True)
    password_confirm = serializers.CharField(write_only=True, min_length=6, required=True)
    full_name = serializers.CharField(required=True, max_length=255)

    def validate_email(self, value):
        """Validar que email no exista"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado")
        return value.lower()

    def validate(self, data):
        """Validar que passwords coincidan"""
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden"})
        return data

    def create(self, validated_data):
        """Crear usuario con password hasheado"""
        validated_data.pop('password_confirm')
        user = User.objects.create(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=make_password(validated_data['password']),
            role='voter',  # Por defecto es votante
            is_active=True
        )
        return user


# ============================================
# SERIALIZER: LOGIN
# ============================================

class LoginSerializer(serializers.Serializer):
    """
    Serializer para login de usuarios.
    """

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)


# ============================================
# SERIALIZER: ELECTION
# ============================================

class ElectionSerializer(serializers.ModelSerializer):
    """
    Serializer para modelo Election.
    """

    is_active = serializers.ReadOnlyField()  # Property del modelo

    class Meta:
        model = Election
        fields = [
            'id', 'title', 'description', 'start_date', 'end_date',
            'status', 'results_public', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


# ============================================
# SERIALIZER: CANDIDATE
# ============================================

class CandidateSerializer(serializers.ModelSerializer):
    """
    Serializer para modelo Candidate.
    """

    election_title = serializers.CharField(source='election.title', read_only=True)

    class Meta:
        model = Candidate
        fields = [
            'id', 'election', 'election_title', 'name', 'description',
            'photo_url', 'party_group', 'display_order', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


# ============================================
# SERIALIZER: VOTE REGISTRY
# ============================================

class VoteRegistrySerializer(serializers.ModelSerializer):
    """
    Serializer para modelo VoteRegistry.
    """

    class Meta:
        model = VoteRegistry
        fields = ['id', 'user', 'election', 'has_voted', 'voted_at']
        read_only_fields = ['id', 'voted_at']


# ============================================
# SERIALIZER: VOTE
# ============================================

class VoteSerializer(serializers.ModelSerializer):
    """
    Serializer para modelo Vote.
    NOTA: NO incluye user_id (anonimato).
    """

    class Meta:
        model = Vote
        fields = ['id', 'election', 'candidate', 'cast_at']
        read_only_fields = ['id', 'cast_at']


# ============================================
# SERIALIZER: CAST VOTE (Para emitir voto)
# ============================================

class CastVoteSerializer(serializers.Serializer):
    """
    Serializer para emitir un voto.
    Valida election_id y candidate_id.
    """

    election_id = serializers.UUIDField(required=True)
    candidate_id = serializers.UUIDField(required=True)

    def validate(self, data):
        """Validar que elección y candidato existan"""
        try:
            election = Election.objects.get(id=data['election_id'])
        except Election.DoesNotExist:
            raise serializers.ValidationError({"election_id": "Elección no encontrada"})

        try:
            candidate = Candidate.objects.get(id=data['candidate_id'])
        except Candidate.DoesNotExist:
            raise serializers.ValidationError({"candidate_id": "Candidato no encontrado"})

        # Validar que candidato pertenezca a la elección
        if candidate.election != election:
            raise serializers.ValidationError({"candidate_id": "El candidato no pertenece a esta elección"})

        data['election'] = election
        data['candidate'] = candidate
        return data

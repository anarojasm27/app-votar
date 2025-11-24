from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
import uuid

from .models import User, Election, Candidate, VoteRegistry, Vote

# ============================================
# TESTS: AUTENTICACIÓN
# ============================================

class AuthenticationTests(APITestCase):
    """Tests para registro, login y perfil"""

    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/register/'
        self.login_url = '/api/login/'
        self.profile_url = '/api/profile/'

    def test_user_can_register(self):
        """Test: Usuario puede registrarse"""
        data = {
            'email': 'newuser@test.com',
            'password': 'password123',
            'password_confirm': 'password123',
            'full_name': 'New User'
        }
        response = self.client.post(self.register_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertEqual(response.data['user']['email'], 'newuser@test.com')

    def test_cannot_register_with_existing_email(self):
        """Test: No se puede registrar con email existente"""
        # Crear usuario
        User.objects.create(
            email='existing@test.com',
            password='hashed',
            full_name='Existing'
        )

        # Intentar registrar con mismo email
        data = {
            'email': 'existing@test.com',
            'password': 'password123',
            'password_confirm': 'password123',
            'full_name': 'Another User'
        }
        response = self.client.post(self.register_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_can_login(self):
        """Test: Usuario puede hacer login"""
        # Crear usuario con password hasheado
        from django.contrib.auth.hashers import make_password
        user = User.objects.create(
            email='testuser@test.com',
            password=make_password('testpass123'),
            full_name='Test User'
        )

        # Login
        data = {
            'email': 'testuser@test.com',
            'password': 'testpass123'
        }
        response = self.client.post(self.login_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('tokens', response.data)

    def test_profile_requires_authentication(self):
        """Test: Perfil requiere autenticación"""
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


# ============================================
# TESTS: VOTACIÓN
# ============================================

class VotingTests(APITestCase):
    """Tests para lógica de votación"""

    def setUp(self):
        self.client = APIClient()

        # Crear usuario de prueba
        from django.contrib.auth.hashers import make_password
        self.user = User.objects.create(
            email='voter@test.com',
            password=make_password('pass123'),
            full_name='Voter Test'
        )

        # Crear elección activa
        self.election = Election.objects.create(
            title='Test Election',
            description='Testing',
            start_date=timezone.now() - timedelta(days=1),
            end_date=timezone.now() + timedelta(days=7),
            status='active'
        )

        # Crear candidatos
        self.candidate1 = Candidate.objects.create(
            election=self.election,
            name='Candidate 1',
            display_order=1
        )
        self.candidate2 = Candidate.objects.create(
            election=self.election,
            name='Candidate 2',
            display_order=2
        )

        # Autenticar usuario
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_user_can_vote(self):
        """Test: Usuario puede votar"""
        data = {
            'election_id': str(self.election.id),
            'candidate_id': str(self.candidate1.id)
        }
        response = self.client.post('/api/vote/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verificar que voto se registró
        self.assertEqual(Vote.objects.filter(election=self.election).count(), 1)

        # Verificar que registro de control se creó
        registry = VoteRegistry.objects.get(user=self.user, election=self.election)
        self.assertTrue(registry.has_voted)

    def test_cannot_vote_twice(self):
        """Test: Usuario no puede votar dos veces"""
        # Primer voto
        data = {
            'election_id': str(self.election.id),
            'candidate_id': str(self.candidate1.id)
        }
        self.client.post('/api/vote/', data, format='json')

        # Segundo voto (debe fallar)
        data2 = {
            'election_id': str(self.election.id),
            'candidate_id': str(self.candidate2.id)
        }
        response = self.client.post('/api/vote/', data2, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Ya has votado', str(response.data))

    def test_results_count_is_correct(self):
        """Test: Conteo de resultados es correcto"""
        # Crear varios votos
        Vote.objects.create(election=self.election, candidate=self.candidate1)
        Vote.objects.create(election=self.election, candidate=self.candidate1)
        Vote.objects.create(election=self.election, candidate=self.candidate2)

        # Obtener resultados
        response = self.client.get(f'/api/results/{self.election.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_votes'], 3)

        # Verificar conteo por candidato
        results = {r['candidate_name']: r['votes'] for r in response.data['results']}
        self.assertEqual(results['Candidate 1'], 2)
        self.assertEqual(results['Candidate 2'], 1)


# ============================================
# TESTS: MODELOS
# ============================================

class ModelTests(TestCase):
    """Tests para modelos"""

    def test_election_is_active_property(self):
        """Test: Propiedad is_active de Election"""
        election = Election.objects.create(
            title='Test',
            start_date=timezone.now() - timedelta(days=1),
            end_date=timezone.now() + timedelta(days=1),
            status='active'
        )
        self.assertTrue(election.is_active)

        # Cambiar a closed
        election.status = 'closed'
        self.assertFalse(election.is_active)

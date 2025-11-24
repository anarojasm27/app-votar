import uuid
from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# ============================================
# MODELO: USER
# Mapea tabla 'users' de Supabase
# ============================================

class User(models.Model):
    """
    Modelo de usuario del sistema.
    Mapea tabla 'users' existente en Supabase.

    Roles:
    - 'voter': Usuario votante (default)
    - 'admin': Administrador del sistema
    """

    ROLE_CHOICES = [
        ('voter', 'Votante'),
        ('admin', 'Administrador'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='voter')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False  # Django NO gestiona esta tabla
        db_table = 'users'  # Nombre exacto de tabla en Supabase
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email} ({self.role})"

    def set_password(self, raw_password):
        """Hashea y guarda password"""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """Verifica password"""
        return check_password(raw_password, self.password)

    @property
    def is_admin(self):
        """Verifica si usuario es administrador"""
        return self.role == 'admin'


# ============================================
# MODELO: ELECTION
# Mapea tabla 'elections' de Supabase
# ============================================

class Election(models.Model):
    """
    Modelo de elección/votación.

    Estados:
    - 'draft': En preparación, no se puede votar
    - 'active': Votación abierta
    - 'closed': Finalizada
    """

    STATUS_CHOICES = [
        ('draft', 'Borrador'),
        ('active', 'Activa'),
        ('closed', 'Cerrada'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    results_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'elections'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.status})"

    @property
    def is_active(self):
        """Verifica si elección está activa y dentro del periodo"""
        from django.utils import timezone
        now = timezone.now()
        return (
            self.status == 'active' and
            self.start_date <= now <= self.end_date
        )


# ============================================
# MODELO: CANDIDATE
# Mapea tabla 'candidates' de Supabase
# ============================================

class Candidate(models.Model):
    """
    Modelo de candidato.
    Cada candidato pertenece a una elección específica.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    election = models.ForeignKey(
        Election,
        on_delete=models.CASCADE,
        related_name='candidates',
        db_column='election_id'
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    photo_url = models.URLField(max_length=500, blank=True, null=True)
    party_group = models.CharField(max_length=255, blank=True, null=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'candidates'
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} - {self.election.title}"


# ============================================
# MODELO: VOTE REGISTRY
# Mapea tabla 'vote_registry' de Supabase
# Control de votación (quién ya votó)
# ============================================

class VoteRegistry(models.Model):
    """
    Registro de control de votación.
    Registra QUÉ usuario votó en QUÉ elección.
    NO registra por quién votó (anonimato).
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='vote_registries',
        db_column='user_id'
    )
    election = models.ForeignKey(
        Election,
        on_delete=models.CASCADE,
        related_name='vote_registries',
        db_column='election_id'
    )
    has_voted = models.BooleanField(default=False)
    voted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vote_registry'
        unique_together = [['user', 'election']]  # Constraint único
        ordering = ['-voted_at']

    def __str__(self):
        return f"{self.user.email} - {self.election.title} - Voted: {self.has_voted}"


# ============================================
# MODELO: VOTE (ANÓNIMO)
# Mapea tabla 'votes' de Supabase
# Votos emitidos SIN identificación de usuario
# ============================================

class Vote(models.Model):
    """
    Modelo de voto emitido.

    CRÍTICO: NO contiene referencia a usuario (anonimato).
    Solo registra que se votó por un candidato en una elección.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    election = models.ForeignKey(
        Election,
        on_delete=models.CASCADE,
        related_name='votes',
        db_column='election_id'
    )
    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name='votes',
        db_column='candidate_id'
    )
    cast_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'votes'
        ordering = ['-cast_at']

    def __str__(self):
        return f"Voto para {self.candidate.name} en {self.election.title}"

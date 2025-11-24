from django.contrib import admin
from .models import User, Election, Candidate, VoteRegistry, Vote

# ============================================
# ADMIN: USER
# ============================================

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'full_name', 'role', 'is_active', 'created_at']
    list_filter = ['role', 'is_active', 'created_at']
    search_fields = ['email', 'full_name']
    ordering = ['-created_at']
    readonly_fields = ['id', 'created_at']

    fieldsets = (
        ('Información Personal', {
            'fields': ('id', 'email', 'full_name', 'password')
        }),
        ('Permisos', {
            'fields': ('role', 'is_active')
        }),
        ('Fechas', {
            'fields': ('created_at',)
        }),
    )


# ============================================
# ADMIN: ELECTION
# ============================================

def activate_elections(modeladmin, request, queryset):
    """Acción: Activar elecciones seleccionadas"""
    for election in queryset:
        # Validar que tenga candidatos
        if election.candidates.count() == 0:
            modeladmin.message_user(
                request,
                f'❌ No se puede activar "{election.title}" porque no tiene candidatos.',
                level='ERROR'
            )
            continue

        election.status = 'active'
        election.save()
        modeladmin.message_user(
            request,
            f'✅ Elección "{election.title}" activada exitosamente.'
        )

activate_elections.short_description = "✅ Activar elecciones seleccionadas"

def close_elections(modeladmin, request, queryset):
    """Acción: Cerrar elecciones seleccionadas"""
    updated = queryset.update(status='closed')
    modeladmin.message_user(
        request,
        f'✅ {updated} elección(es) cerrada(s) exitosamente.'
    )

close_elections.short_description = "🔒 Cerrar elecciones seleccionadas"

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'start_date', 'end_date', 'results_public', 'created_at']
    list_filter = ['status', 'results_public', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['-created_at']
    readonly_fields = ['id', 'created_at']
    actions = [activate_elections, close_elections]

    fieldsets = (
        ('Información General', {
            'fields': ('id', 'title', 'description', 'status')
        }),
        ('Periodo de Votación', {
            'fields': ('start_date', 'end_date')
        }),
        ('Configuración', {
            'fields': ('results_public',)
        }),
        ('Fechas', {
            'fields': ('created_at',)
        }),
    )


# ============================================
# ADMIN: CANDIDATE
# ============================================

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ['name', 'election', 'party_group', 'display_order', 'created_at']
    list_filter = ['election', 'created_at']
    search_fields = ['name', 'description', 'party_group']
    ordering = ['election', 'display_order', 'name']
    readonly_fields = ['id', 'created_at']

    fieldsets = (
        ('Información del Candidato', {
            'fields': ('id', 'election', 'name', 'description')
        }),
        ('Detalles', {
            'fields': ('photo_url', 'party_group', 'display_order')
        }),
        ('Fechas', {
            'fields': ('created_at',)
        }),
    )


# ============================================
# ADMIN: VOTE REGISTRY
# ============================================

@admin.register(VoteRegistry)
class VoteRegistryAdmin(admin.ModelAdmin):
    list_display = ['user', 'election', 'has_voted', 'voted_at']
    list_filter = ['has_voted', 'election', 'voted_at']
    search_fields = ['user__email', 'election__title']
    ordering = ['-voted_at']
    readonly_fields = ['id', 'voted_at']


# ============================================
# ADMIN: VOTE
# ============================================

@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ['election', 'candidate', 'cast_at']
    list_filter = ['election', 'candidate', 'cast_at']
    ordering = ['-cast_at']
    readonly_fields = ['id', 'cast_at']

    # IMPORTANTE: No permitir editar votos (integridad)
    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

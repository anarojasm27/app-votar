from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView, LoginView, ProfileView,
    ElectionViewSet, CandidateViewSet,
    VoteView, HasVotedView, ResultsView, HistoryView
)

# Router para viewsets
router = DefaultRouter()
router.register(r'elections', ElectionViewSet, basename='election')
router.register(r'candidates', CandidateViewSet, basename='candidate')

urlpatterns = [
    # Autenticación
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Votación
    path('vote/', VoteView.as_view(), name='vote'),
    path('has-voted/<uuid:election_id>/', HasVotedView.as_view(), name='has-voted'),
    path('results/<uuid:election_id>/', ResultsView.as_view(), name='results'),
    path('history/', HistoryView.as_view(), name='history'),

    # Router
    path('', include(router.urls)),
]

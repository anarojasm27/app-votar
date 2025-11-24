'use client';
import { Container, Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { HowToVote, Speed, Security, VerifiedUser } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: '#1e3c72' }}>
            Sistema de Votaciones en Línea
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Realiza votaciones de forma <strong>segura, rápida y transparente</strong>
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/elections"
                sx={{ px: 5, py: 1.5, fontSize: '1.1rem', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
              >
                Ver Elecciones Activas
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/login"
                  sx={{ px: 5, py: 1.5, fontSize: '1.1rem', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/register"
                  sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderWidth: 2, borderColor: '#1e3c72', color: '#1e3c72', '&:hover': { borderWidth: 2 } }}
                >
                  Registrarse Ahora
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: 'all 0.3s' } }}>
              <CardContent sx={{ py: 4 }}>
                <Security sx={{ fontSize: 70, color: '#1e3c72', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  100% Seguro
                </Typography>
                <Typography color="text.secondary">
                  Autenticación JWT y anonimato garantizado en cada voto
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: 'all 0.3s' } }}>
              <CardContent sx={{ py: 4 }}>
                <Speed sx={{ fontSize: 70, color: '#2a5298', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Tiempo Real
                </Typography>
                <Typography color="text.secondary">
                  Resultados actualizados al instante con gráficas interactivas
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: 'all 0.3s' } }}>
              <CardContent sx={{ py: 4 }}>
                <HowToVote sx={{ fontSize: 70, color: '#1e3c72', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Fácil de Usar
                </Typography>
                <Typography color="text.secondary">
                  Interfaz intuitiva desde cualquier dispositivo móvil o desktop
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', textAlign: 'center', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: 'all 0.3s' } }}>
              <CardContent sx={{ py: 4 }}>
                <VerifiedUser sx={{ fontSize: 70, color: '#2a5298', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Confiable
                </Typography>
                <Typography color="text.secondary">
                  Prevención de fraude con control de doble votación
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* CTA Section */}
        {!user && (
          <Box sx={{ bgcolor: '#1e3c72', color: 'white', borderRadius: 3, p: 6, textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              ¿Listo para participar?
            </Typography>
            <Typography variant="h6" paragraph>
              Regístrate ahora y accede a todas las elecciones activas
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/register"
              sx={{ mt: 2, px: 5, py: 1.5, bgcolor: 'white', color: '#1e3c72', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
            >
              Crear mi Cuenta Gratis
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

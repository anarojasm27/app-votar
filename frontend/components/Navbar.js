'use client';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { HowToVote } from '@mui/icons-material';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
            <Toolbar>
                <HowToVote sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Sistema de Votaciones
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button color="inherit" component={Link} href="/" sx={{ fontWeight: 500 }}>
                        Inicio
                    </Button>

                    {user ? (
                        <>
                            <Button color="inherit" component={Link} href="/elections" sx={{ fontWeight: 500 }}>
                                Elecciones
                            </Button>
                            <Button color="inherit" component={Link} href="/history" sx={{ fontWeight: 500 }}>
                                Historial
                            </Button>
                            <Typography sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mx: 2, px: 2, py: 0.5, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                                👤 {user.full_name}
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={logout}
                                variant="outlined"
                                sx={{ borderColor: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                            >
                                Salir
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} href="/login" variant="outlined" sx={{ borderColor: 'white' }}>
                                Iniciar Sesión
                            </Button>
                            <Button color="inherit" component={Link} href="/register" variant="contained" sx={{ bgcolor: 'white', color: '#1e3c72', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
                                Registrarse
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

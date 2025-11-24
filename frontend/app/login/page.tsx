'use client';
import { useState } from 'react';
import { Container, Card, CardContent, TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LoginOutlined } from '@mui/icons-material';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error?.error || 'Error al iniciar sesión. Verifica tus credenciales.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <Container maxWidth="sm">
                <Card sx={{ boxShadow: 6, borderRadius: 3 }}>
                    <CardContent sx={{ p: 5 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <LoginOutlined sx={{ fontSize: 60, color: '#1e3c72', mb: 2 }} />
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1e3c72' }}>
                                Iniciar Sesión
                            </Typography>
                            <Typography color="text.secondary">
                                Accede a tu cuenta para votar
                            </Typography>
                        </Box>

                        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                label="Correo Electrónico"
                                type="email"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Contraseña"
                                type="password"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{ mt: 3, py: 1.5, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', fontSize: '1.1rem' }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
                            </Button>
                        </Box>

                        <Typography textAlign="center" sx={{ mt: 3 }}>
                            ¿No tienes cuenta? {' '}
                            <Link href="/register" style={{ color: '#1e3c72', fontWeight: 600, textDecoration: 'none' }}>
                                Regístrate aquí
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

'use client';
import { useState } from 'react';
import { Container, Card, CardContent, TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PersonAddOutlined } from '@mui/icons-material';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        password_confirm: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.password_confirm) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        const result = await register(formData);

        if (!result.success) {
            setError(result.error?.email?.[0] || 'Error al registrarse. Intenta nuevamente.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
            <Container maxWidth="sm">
                <Card sx={{ boxShadow: 6, borderRadius: 3 }}>
                    <CardContent sx={{ p: 5 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <PersonAddOutlined sx={{ fontSize: 60, color: '#1e3c72', mb: 2 }} />
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1e3c72' }}>
                                Crear Cuenta
                            </Typography>
                            <Typography color="text.secondary">
                                Regístrate para acceder al sistema de votaciones
                            </Typography>
                        </Box>

                        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                label="Nombre Completo"
                                fullWidth
                                required
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Correo Electrónico"
                                type="email"
                                fullWidth
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Contraseña"
                                type="password"
                                fullWidth
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                margin="normal"
                                variant="outlined"
                                helperText="Mínimo 6 caracteres"
                            />
                            <TextField
                                label="Confirmar Contraseña"
                                type="password"
                                fullWidth
                                required
                                value={formData.password_confirm}
                                onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
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
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
                            </Button>
                        </Box>

                        <Typography textAlign="center" sx={{ mt: 3 }}>
                            ¿Ya tienes cuenta? {' '}
                            <Link href="/login" style={{ color: '#1e3c72', fontWeight: 600, textDecoration: 'none' }}>
                                Inicia sesión aquí
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

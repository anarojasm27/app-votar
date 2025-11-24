'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box, Chip } from '@mui/material';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getElections } from '@/services/electionService';
import { HowToVoteOutlined, CalendarTodayOutlined } from '@mui/icons-material';

export default function ElectionsPage() {
    const [elections, setElections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const data = await getElections('active');
                setElections(data);
            } catch (error) {
                console.error('Error fetching elections:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchElections();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <ProtectedRoute>
            <Box sx={{ minHeight: '90vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#1e3c72', mb: 1 }}>
                        Elecciones Activas
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Selecciona una elección para votar o ver resultados
                    </Typography>

                    {elections.length === 0 ? (
                        <Card sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" color="text.secondary">
                                No hay elecciones activas en este momento
                            </Typography>
                        </Card>
                    ) : (
                        <Grid container spacing={4}>
                            {elections.map((election) => (
                                <Grid item xs={12} md={6} key={election.id}>
                                    <Card sx={{ height: '100%', boxShadow: 4, borderRadius: 3, '&:hover': { boxShadow: 8, transform: 'translateY(-5px)', transition: 'all 0.3s' } }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1e3c72' }}>
                                                    {election.title}
                                                </Typography>
                                                {election.is_active && (
                                                    <Chip label="ACTIVA" color="success" sx={{ fontWeight: 600 }} />
                                                )}
                                            </Box>

                                            <Typography color="text.secondary" paragraph sx={{ minHeight: 60 }}>
                                                {election.description || 'Proceso de votación en curso'}
                                            </Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
                                                <CalendarTodayOutlined fontSize="small" />
                                                <Typography variant="body2">
                                                    {new Date(election.start_date).toLocaleDateString()} - {new Date(election.end_date).toLocaleDateString()}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    component={Link}
                                                    href={`/elections/${election.id}/vote`}
                                                    startIcon={<HowToVoteOutlined />}
                                                    sx={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', py: 1.2 }}
                                                >
                                                    Votar Ahora
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    component={Link}
                                                    href={`/elections/${election.id}/results`}
                                                    sx={{ borderWidth: 2, borderColor: '#1e3c72', color: '#1e3c72', '&:hover': { borderWidth: 2 }, py: 1.2 }}
                                                >
                                                    Ver Resultados
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>
        </ProtectedRoute>
    );
}

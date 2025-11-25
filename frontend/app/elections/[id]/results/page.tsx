'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, Button } from '@mui/material';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getResults } from '@/services/resultService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { EmojiEventsOutlined, RefreshOutlined } from '@mui/icons-material';

const COLORS = ['#1e3c72', '#2a5298', '#3b5998', '#4c6798', '#5d7598'];

export default function ResultsPage() {
    const params = useParams();
    const electionId = params.id as string;

    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

    const fetchResults = async () => {
        try {
            const data = await getResults(electionId);
            setResults(data);
            setLastUpdate(new Date());
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();

        // Polling cada 10 segundos
        const interval = setInterval(fetchResults, 10000);

        return () => clearInterval(interval);
    }, [electionId]);

    if (loading) return <LoadingSpinner />;

    const chartData = results?.results.map((r: any) => ({
        name: r.candidate_name.split(' ').slice(0, 2).join(' '), // Nombre corto
        Votos: r.votes,
        Porcentaje: r.percentage
    })) || [];

    const pieData = results?.results.map((r: any) => ({
        name: r.candidate_name,
        value: r.votes
    })) || [];

    return (
        <ProtectedRoute>
            <Box sx={{ minHeight: '90vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 6 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                        <Box>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#1e3c72' }}>
                                Resultados - {results?.election?.title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Total de votos: <strong>{results?.total_votes}</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Última actualización: {lastUpdate.toLocaleTimeString()}
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshOutlined />}
                            onClick={fetchResults}
                            sx={{ borderColor: '#1e3c72', color: '#1e3c72' }}
                        >
                            Actualizar
                        </Button>
                    </Box>

                    {/* Gráficas */}
                    <Box sx={{ mb: 6 }}>
                        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                Distribución de Votos (Barras)
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Votos" fill="#1e3c72" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>

                        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                Distribución de Votos (Torta)
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry) => `${entry.name?.split(' ')[0] || 'N/A'}: ${entry.value}`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Box>

                    {/* Tabla de Resultados */}
                    <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 4 }}>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ bgcolor: '#1e3c72' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Posición</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Candidato</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Partido/Grupo</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>Votos</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>Porcentaje</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {results?.results.map((candidate: any, index: number) => (
                                        <TableRow key={candidate.candidate_id} sx={{ '&:hover': { bgcolor: 'rgba(30, 60, 114, 0.05)' } }}>
                                            <TableCell>
                                                {index === 0 && <EmojiEventsOutlined sx={{ color: '#FFD700', fontSize: 28 }} />}
                                                {index === 1 && <EmojiEventsOutlined sx={{ color: '#C0C0C0', fontSize: 24 }} />}
                                                {index === 2 && <EmojiEventsOutlined sx={{ color: '#CD7F32', fontSize: 20 }} />}
                                                {index > 2 && <Typography sx={{ ml: 1 }}>#{index + 1}</Typography>}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar src={candidate.candidate_photo} alt={candidate.candidate_name} />
                                                    <Typography sx={{ fontWeight: 500 }}>{candidate.candidate_name}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{candidate.party_group || '-'}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                                                {candidate.votes}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={`${candidate.percentage}%`}
                                                    color={index === 0 ? 'success' : 'default'}
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            href="/elections"
                            sx={{ px: 5, py: 1.5, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
                        >
                            Volver a Elecciones
                        </Button>
                    </Box>
                </Container>
            </Box>
        </ProtectedRoute>
    );
}

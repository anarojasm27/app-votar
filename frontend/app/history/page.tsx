'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getHistory } from '@/services/resultService';
import { ExpandMoreOutlined, EmojiEventsOutlined } from '@mui/icons-material';

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <ProtectedRoute>
            <Box sx={{ minHeight: '90vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#1e3c72', mb: 1 }}>
                        Historial de Elecciones
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Revisa los resultados de elecciones pasadas
                    </Typography>

                    {history.length === 0 ? (
                        <Paper sx={{ p: 6, textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary">
                                No hay elecciones finalizadas todavía
                            </Typography>
                        </Paper>
                    ) : (
                        history.map((item: any, idx: number) => (
                            <Accordion key={idx} sx={{ mb: 2, boxShadow: 3, borderRadius: 2, '&:before': { display: 'none' } }}>
                                <AccordionSummary expandIcon={<ExpandMoreOutlined />} sx={{ bgcolor: 'rgba(30, 60, 114, 0.05)' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                                            {item.election.title}
                                        </Typography>
                                        <Chip label={`${item.total_votes} votos`} color="primary" />
                                        <Chip label="CERRADA" color="default" />
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {item.election.description}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
                                            <EmojiEventsOutlined sx={{ color: '#FFD700', mr: 1, verticalAlign: 'middle' }} />
                                            Ganador: {item.winner}
                                        </Typography>
                                        <Box>
                                            {item.results.map((result: any, i: number) => (
                                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: i < item.results.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                                                    <Typography>{result.candidate_name}</Typography>
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        <Typography sx={{ fontWeight: 600 }}>{result.votes} votos</Typography>
                                                        <Chip label={`${result.percentage}%`} size="small" color={i === 0 ? 'success' : 'default'} />
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}
                </Container>
            </Box>
        </ProtectedRoute>
    );
}

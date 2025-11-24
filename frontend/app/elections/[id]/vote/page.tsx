'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography, Grid, Card, CardContent, Button, Box, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getCandidates, getElectionDetail } from '@/services/electionService';
import { hasVoted, castVote } from '@/services/voteService';
import { CheckCircleOutline } from '@mui/icons-material';

export default function VotePage() {
    const params = useParams();
    const router = useRouter();
    const electionId = params.id as string;

    const [election, setElection] = useState<any>(null);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [voting, setVoting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [electionData, candidatesData, votedData] = await Promise.all([
                    getElectionDetail(electionId),
                    getCandidates(electionId),
                    hasVoted(electionId)
                ]);

                setElection(electionData);
                setCandidates(candidatesData);
                setAlreadyVoted(votedData.has_voted);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error al cargar la información');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [electionId]);

    const handleVoteClick = (candidate: any) => {
        setSelectedCandidate(candidate);
        setOpenConfirm(true);
    };

    const handleConfirmVote = async () => {
        setVoting(true);
        setError('');

        try {
            await castVote(electionId, selectedCandidate.id);
            setSuccess(true);
            setAlreadyVoted(true);
            setOpenConfirm(false);

            setTimeout(() => {
                router.push(`/elections/${electionId}/results`);
            }, 2000);
        } catch (error: any) {
            setError(error.response?.data?.error || 'Error al registrar el voto');
            setVoting(false);
            setOpenConfirm(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <ProtectedRoute>
            <Box sx={{ minHeight: '90vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#1e3c72' }}>
                        {election?.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        {election?.description || 'Selecciona tu candidato preferido'}
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>¡Voto registrado exitosamente! Redirigiendo a resultados...</Alert>}
                    {alreadyVoted && !success && <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>Ya has votado en esta elección. Puedes ver los resultados.</Alert>}

                    <Grid container spacing={4}>
                        {candidates.map((candidate) => (
                            <Grid item xs={12} md={6} lg={4} key={candidate.id}>
                                <Card sx={{ height: '100%', boxShadow: 4, borderRadius: 3, '&:hover': { boxShadow: 8 } }}>
                                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                        <Avatar
                                            src={candidate.photo_url || '/default-avatar.png'}
                                            alt={candidate.name}
                                            sx={{ width: 120, height: 120, mx: 'auto', mb: 3, border: '4px solid #1e3c72' }}
                                        />
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1e3c72' }}>
                                            {candidate.name}
                                        </Typography>
                                        {candidate.party_group && (
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {candidate.party_group}
                                            </Typography>
                                        )}
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: 60, mt: 2 }}>
                                            {candidate.description || 'Candidato en esta elección'}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            disabled={alreadyVoted || success}
                                            onClick={() => handleVoteClick(candidate)}
                                            sx={{ mt: 2, py: 1.5, background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
                                        >
                                            {alreadyVoted ? 'Ya Votaste' : 'Votar por este candidato'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => router.push(`/elections/${electionId}/results`)}
                            sx={{ px: 5, py: 1.5, borderWidth: 2, borderColor: '#1e3c72', color: '#1e3c72' }}
                        >
                            Ver Resultados
                        </Button>
                    </Box>

                    {/* Confirmation Dialog */}
                    <Dialog open={openConfirm} onClose={() => !voting && setOpenConfirm(false)} maxWidth="sm" fullWidth>
                        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
                            <CheckCircleOutline sx={{ fontSize: 80, color: '#1e3c72', mb: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                Confirmar Voto
                            </Typography>
                        </DialogTitle>
                        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
                            <Typography variant="body1" paragraph>
                                ¿Estás seguro que deseas votar por:
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3c72', mb: 2 }}>
                                {selectedCandidate?.name}
                            </Typography>
                            <Alert severity="warning" sx={{ mt: 2, textAlign: 'left' }}>
                                <strong>Importante:</strong> Esta acción no se puede deshacer. Solo puedes votar una vez.
                            </Alert>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center', pb: 4, gap: 2 }}>
                            <Button onClick={() => setOpenConfirm(false)} disabled={voting} variant="outlined" size="large">
                                Cancelar
                            </Button>
                            <Button onClick={handleConfirmVote} disabled={voting} variant="contained" size="large" sx={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', px: 4 }}>
                                {voting ? 'Registrando...' : 'Confirmar Voto'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </ProtectedRoute>
    );
}

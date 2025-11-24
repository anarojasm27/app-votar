import api from '@/lib/axios';

export const hasVoted = async (electionId) => {
    const response = await api.get(`/has-voted/${electionId}/`);
    return response.data;
};

export const castVote = async (electionId, candidateId) => {
    const response = await api.post('/vote/', {
        election_id: electionId,
        candidate_id: candidateId
    });
    return response.data;
};

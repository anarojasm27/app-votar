import api from '@/lib/axios';

export const getResults = async (electionId) => {
    const response = await api.get(`/api/results/${electionId}/`);
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('/api/history/');
    return response.data;
};

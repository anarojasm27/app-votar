import api from '@/lib/axios';

export const getResults = async (electionId) => {
    const response = await api.get(`/results/${electionId}/`);
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('/history/');
    return response.data;
};

import api from '@/lib/axios';

export const register = async (data) => {
    const response = await api.post('/api/register/', data);
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post('/api/login/', { email, password });
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/api/profile/');
    return response.data;
};

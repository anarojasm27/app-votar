import api from '@/lib/axios';

export const register = async (data) => {
    const response = await api.post('/register/', data);
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post('/login/', { email, password });
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/profile/');
    return response.data;
};

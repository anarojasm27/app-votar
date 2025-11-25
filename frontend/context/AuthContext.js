'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { register as registerAPI, login as loginAPI, getProfile } from '@/services/authService';

const AuthContext = createContext({
    user: null,
    loading: true,
    register: async () => ({ success: false }),
    login: async () => ({ success: false }),
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Verificar token al montar
    useEffect(() => {
        const checkAuth = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
            if (token) {
                try {
                    const userData = await getProfile();
                    setUser(userData);
                } catch (error) {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                    }
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const register = async (data) => {
        try {
            const response = await registerAPI(data);
            if (typeof window !== 'undefined') {
                localStorage.setItem('access_token', response.tokens.access);
                localStorage.setItem('refresh_token', response.tokens.refresh);
            }
            setUser(response.user);
            router.push('/elections');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await loginAPI(email, password);
            if (typeof window !== 'undefined') {
                localStorage.setItem('access_token', response.tokens.access);
                localStorage.setItem('refresh_token', response.tokens.refresh);
            }
            setUser(response.user);
            router.push('/elections');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data };
        }
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

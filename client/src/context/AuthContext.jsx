import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Configure Axios defaults
    axios.defaults.baseURL = 'http://localhost:5000/api';
    axios.defaults.withCredentials = true; // Required for httpOnly cookies

    // Interceptor for 401 errors (Token expired)
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const res = await axios.post('/auth/refresh');
                        if (res.data.success) {
                            const { token } = res.data;
                            localStorage.setItem('token', token);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            return axios(originalRequest);
                        }
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    // Check for token on load
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const res = await axios.post('/auth/login', { email, password });
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false, error: err.response?.data?.message };
        }
    };

    const register = async (formData) => {
        setError(null);
        try {
            const res = await axios.post('/auth/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return { success: false, error: err.response?.data?.message };
        }
    };

    const logout = async () => {
        try {
            await axios.get('/auth/logout');
        } catch (err) {
            console.error('Logout error:', err);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        window.location.href = '/login';
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

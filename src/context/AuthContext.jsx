import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginAPI, registerAPI, getMeAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const data = await getMeAPI(token);
                    setUser(data);
                    setIsAuthenticated(true);
                    setIsAdmin(data.role === 'admin');
                } catch (error) {
                    console.error("Token invalid or expired");
                    logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const data = await loginAPI(email, password);
        localStorage.setItem('token', data.token);
        setUser(data);
        setIsAuthenticated(true);
        setIsAdmin(data.role === 'admin');
        return data;
    };

    const register = async (userData) => {
        const data = await registerAPI(userData);
        localStorage.setItem('token', data.token);
        setUser(data);
        setIsAuthenticated(true);
        setIsAdmin(data.role === 'admin');
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

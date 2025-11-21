import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        async function checkLogin() {
            try {
                const res = await axios.get(`${API_URL}/auth/profile`); 
                if (res.status === 200) {
                    setUser(res.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    const login = async (userData) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, userData);
            setUser(res.data);
            setIsAuthenticated(true);
            return res.data;
        } catch (error) {
            console.error("Error en el login:", error.response?.data?.message || error.message);
            throw error; 
        }
    };
    
    const logout = async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`);
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error en el logout:", error);
        }
    };
    

    const contextValue = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
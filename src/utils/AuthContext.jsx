import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt'; // Import a JWT decoding library if you need to decode tokens

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for token in localStorage or cookies and fetch user data
        const token = localStorage.getItem('token'); // Or use cookies
        if (token) {
            const decodedToken = decodeToken(token); // Decode the token if needed
            if (decodedToken) {
                setUser({
                    userId: decodedToken.userId,
                    role: decodedToken.role,
                });
            }
        }
    }, []);

    const login = (userData) => {
        // Store token in localStorage or cookies

        setUser(userData);
        if (userData.role === 'ADMIN') {
            navigate('/admin/dashboard');
        } else if (userData.role === 'VOTER') {
            navigate('/voter/dashboard');
        }
    };

    const logout = () => {
        // Remove token from localStorage or cookies
        localStorage.removeItem('token'); // Or use cookies

        setUser(null);
        navigate('/user/login'); // Redirect to login page or any other route
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

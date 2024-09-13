import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user ? <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/voter/dashboard'} /> : children;
};

export default PublicRoute;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);

    console.log("PrivateRoute User:", user); // Debugging log

    if (!user) {
        return <Navigate to="/user/login" />;
    }

    if (role && user.role !== role) {
        return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/voter/dashboard'} />;
    }

    return children;
};

export default PrivateRoute;

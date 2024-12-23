import { jwtDecode } from 'jwt-decode';
import React from 'react';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

const isAuthenticated = () => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) return false;

    try {
        const decoded = jwtDecode(access_token);
        return decoded?.payload?.isAdmin ?? false;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <NotFoundPage />
};

export default PrivateRoute;

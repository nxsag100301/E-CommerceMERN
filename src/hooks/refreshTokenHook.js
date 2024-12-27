import { useEffect } from 'react';
import { refreshToken } from '../utils/userApi';
import { useSelector } from 'react-redux';

const useAutoRefreshToken = () => {
    const user = useSelector((state) => state.user);
    const isLoggedIn = user.isLoggedIn
    useEffect(() => {
        if (!isLoggedIn) return;
        const refreshTokenInterval = setInterval(async () => {
            try {
                const token = localStorage.getItem('refresh_token')
                const res = await refreshToken({ token })
                if (res.errCode === 0) {
                    localStorage.setItem('access_token', res?.access_token)
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        }, 27000);

        return () => clearInterval(refreshTokenInterval);
    }, [isLoggedIn]);
};

export default useAutoRefreshToken;

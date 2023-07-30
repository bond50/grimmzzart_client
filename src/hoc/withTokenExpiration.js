import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/auth';

export const withTokenExpiration = (Component) => (props) => {
    const {auth} = useSelector((state) => state);
    const token = auth.isLoggedIn && auth.user.token && auth.user.token;
    const dispatch = useDispatch();
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const checkExpiration = () => {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                let currentDate = new Date();
                setIsExpired(decodedToken.exp * 1000 < currentDate.getTime());
            } catch (error) {
                setIsExpired(true);
            }
        };

        checkExpiration();
        const interval = setInterval(checkExpiration, 5000);

        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {
        if (isExpired) {
            console.log('Token expired')
            // dispatch(logout());
        }
    }, [isExpired, dispatch]);

    return <Component {...props} />;
};

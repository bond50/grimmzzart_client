import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Navigate} from "react-router-dom";

import {currentUser, currentAdmin} from "../services/auth.service";
import AccessDenied from "../components/routes/AccessDenied";
import {withTokenExpiration} from "./withTokenExpiration";
import {logout} from "../redux/slices/auth";

const withAuthCheck = (checkAuthFunc, allowedRoleCodes = []) => (Component) => (
    props
) => {
    const {user} = useSelector((state) => state.auth);
    const [error, setError] = useState(null);

    const [isSessionActive, setIsSessionActive] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (user && user.token) {
            const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
            const currentDate = new Date();
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                setIsSessionActive(false);
                dispatch(logout())
            }
            if (user.role && allowedRoleCodes.includes(user.role.code)) {
                checkAuthFunc(user.token, user)
                    .then((r) => {
                        setIsSessionActive(true);
                    })
                    .catch((e) => {
                        setError(e.response.data.message);
                        setIsSessionActive(false);
                    });
            }
        } else {
            navigate("/");
        }
    }, [dispatch, navigate, user]);


    if (error && !isSessionActive) {
        return <AccessDenied
            message={error}/>;
    }
    if (isSessionActive) {
        return <Component {...props} />;
    }
};

export const UserRoute = withAuthCheck(currentUser, [1000, 2000])(
    (props) => <>{props.children}</>
);


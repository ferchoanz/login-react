import React, { useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = (localStorage.getItem('user'));
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [])

    return <Outlet />
}
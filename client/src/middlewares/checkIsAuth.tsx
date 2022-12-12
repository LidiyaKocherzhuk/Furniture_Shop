import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const CheckIsAuth:FC<{children:ReactElement<any, any> | null}> = ({ children }) => {
    const isAuth = localStorage.getItem('isAuth');

    if (!isAuth) {
        return <Navigate to={'/login'}/>;
    }

    return children;
};

export { CheckIsAuth };

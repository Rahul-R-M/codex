import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router'

const RequiredAuth = ({children}) => {
    const {isAuth} = useSelector(state => state.Auth);
    const location = useLocation();
    if(!isAuth){
        return <Navigate to="/" state={{ from: location }} replace />;
    }
  return children;
};

export default RequiredAuth
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return ( 
    props.loggedIn 
    ?
    <Component {...props} /> 
    :
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;

/* import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/signin' />
  }

  return children;
}

export default ProtectedRoute; */
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteLoggedIn = ({ component: Component, ...props }) => {
  return (
    props.loggedIn 
    ?
      <Navigate to={localStorage.getItem("history")} replace />
    :
    <Component {...props} />
  );
};

export default ProtectedRouteLoggedIn;
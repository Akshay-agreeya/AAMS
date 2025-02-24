// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
 
  const token = sessionStorage.getItem("token");
  if (!token) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the component
  return <Component {...rest} />;
};

export default PrivateRoute;

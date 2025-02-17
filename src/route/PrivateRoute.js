// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../common/auth/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Retrieve the authentication status

  if (isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the component
  return <Component {...rest} />;
};

export default PrivateRoute;

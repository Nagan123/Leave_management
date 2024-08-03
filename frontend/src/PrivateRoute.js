import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { authState } = useAuth();

  return authState ? Component : <Navigate to="/" replace />;
};

export default PrivateRoute;

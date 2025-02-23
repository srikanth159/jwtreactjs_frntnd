import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// This is a simple ProtectedRoute component
const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/" />} // Redirect to Login if not authenticated
    />
  );
};

export default ProtectedRoute;

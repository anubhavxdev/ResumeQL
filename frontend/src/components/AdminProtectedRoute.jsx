import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PageSpinner from './common/PageSpinner';

/**
 * Admin Protected Route
 * Verifies the 'admin' role from the global AuthContext.
 * Redirects others to the login or dashboard.
 */
const AdminProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <PageSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const MemoizedProtectedRoute = React.memo(ProtectedRoute);
export default MemoizedProtectedRoute;


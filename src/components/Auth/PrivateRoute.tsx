import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'business' | 'user';
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRole
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading indicator while checking authentication
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate route or show access denied message
    if (requiredRole === 'business' && user.role === 'user') {
      return <Navigate to="/chat" replace />;
    } else if (requiredRole === 'user' && user.role === 'business') {
      return <Navigate to="/dashboard" replace />;
    } else if (user.role !== 'admin') {
      // Show access denied for non-admin users trying to access admin routes
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      );
    }
  }

  // Render children if authenticated and has the required role
  return <>{children}</>;
}; 
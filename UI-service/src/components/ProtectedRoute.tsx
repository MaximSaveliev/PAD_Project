import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = false, 
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContext not found');
  }

  const { isAuthenticated, isAdmin, isLoading } = auth;

  if (isLoading) {
    // You can replace this with a loading spinner component
    return <div>Loading...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
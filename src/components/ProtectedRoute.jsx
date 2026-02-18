import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = getCurrentUser();

  // Agar user login qilmagan bo'lsa login sahifasiga yo'naltir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user role mos kelmasa, o'z role sahifasiga yo'naltir
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protects admin routes — replaces PHP admin session check
const AdminPrivateRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user && user.user_role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;

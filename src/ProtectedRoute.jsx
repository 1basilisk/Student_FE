import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  try {
    const user = jwtDecode(token);
    if (allowedRole && user.role !== allowedRole) return <Navigate to="/login" />;
    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute; 
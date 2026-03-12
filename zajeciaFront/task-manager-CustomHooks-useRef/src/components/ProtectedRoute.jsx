import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Jeśli nie ma usera, przekieruj na /login
    // replace: true - żeby nie można było wrócić przyciskiem "Wstecz"
    // state: from - żeby po zalogowaniu wrócić tam, gdzie chcieliśmy iść
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
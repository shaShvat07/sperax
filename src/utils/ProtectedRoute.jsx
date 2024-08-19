import { Navigate } from 'react-router-dom'
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
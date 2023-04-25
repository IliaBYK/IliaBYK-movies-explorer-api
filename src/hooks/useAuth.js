import { useContext } from 'react';
import { AuthContext } from '../components/ProtectedRoute/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}
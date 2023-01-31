import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user.uid) {
    router.push('/login');
  }

  return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;

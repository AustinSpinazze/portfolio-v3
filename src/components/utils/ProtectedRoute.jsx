import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import supabase from '@/lib/supabaseClient';
import { Loader } from '@/components';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [validUser, setValidUser] = useState(false);

  useEffect(() => {
    async function validateUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) {
        setValidUser(false);
        router.push('/login');
      }

      setValidUser(true);
    }

    validateUser();
  }, []);

  return <div>{validUser ? children : <Loader />}</div>;
};

export default ProtectedRoute;

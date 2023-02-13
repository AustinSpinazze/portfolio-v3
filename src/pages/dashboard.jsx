import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, ProtectedRoute } from '@/components';
import supabase from '@/lib/supabaseClient';

export default function Dashboard() {
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push('./login');
  }

  return (
    <ProtectedRoute>
      <div className="">
        <div className="mx-auto mt-24 overflow-y-hidden px-12 py-24 text-gray-600">
          <h2 className="text-2xl font-semibold">You are logged in!</h2>
        </div>
        <div className="flex w-full justify-center">
          <Button className="w-10/12 px-6 py-4 md:w-5/6" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

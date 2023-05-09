import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@/components';
import supabase from '@/lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorState('There was a problem with the username or password');
      return;
    }

    setErrorState(null);

    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-11/12 rounded-2xl border border-zinc-100 p-6 py-8 px-4 dark:border-zinc-700/40 sm:px-10 md:w-full">
          <form className="space-y-6" onSubmit={(event) => handleSubmit(event)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-sm shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-sm shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {errorState && (
              <div className="flex w-full justify-center text-red-500">
                <span>{errorState}</span>
              </div>
            )}
            <div className="flex w-full justify-center">
              <Button type="submit" className="w-10/12 px-6 py-4 md:w-5/6">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

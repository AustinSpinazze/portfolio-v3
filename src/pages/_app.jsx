import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { Header, Footer } from '@/components';
import '@/styles/tailwind.css';
import 'focus-visible';

function usePrevious(value) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({ Component, pageProps, router }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  let previousPathname = usePrevious(router.pathname);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
          <Analytics />
        </main>
        <Footer />
      </div>
    </SessionContextProvider>
  );
}

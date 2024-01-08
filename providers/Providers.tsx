'use client';

import { ReactNode, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({
  session,
  children,
  ...props
}: {
  session: SessionProviderProps['session'];
  children: ReactNode;
} & ThemeProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;

'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

const Providers = ({
  session,
  children,
  ...props
}: {
  session: SessionProviderProps['session'];
  children: ReactNode;
} & ThemeProviderProps) => {
  return (
    <SessionProvider session={session}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    </SessionProvider>
  );
};

export default Providers;

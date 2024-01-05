import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/providers/Providers';
import { auth } from '@/auth';

import Navbar from '@/app/_components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Covelo',
  description: 'Better way of cycling.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={cn(
          'relative h-full font-sans overflow-x-hidden',
          inter.className
        )}
      >
        <Providers
          session={session}
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <main className="flex flex-col min-h-screen relative">
            <Navbar />
            <Toaster />
            <div className="flex-grow flex-1">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

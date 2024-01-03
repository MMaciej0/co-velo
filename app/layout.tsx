import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Covelo',
  description: 'Better way of cycling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative h-full font-sans overflow-x-hidden',
          inter.className
        )}
      >
        <main className="flex flex-col min-h-screen relative">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}

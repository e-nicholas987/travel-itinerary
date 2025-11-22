import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: { template: '%s | Go Paddie', default: 'Go Paddie' },
  description:
    'Plan and manage your trips in one place – search flights, hotels, and activities and build a detailed travel itinerary.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

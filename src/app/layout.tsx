import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import './globals.css';
import Header from '@/components/Header';
import { ToastContainer } from '@/components/Toast';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'MrAs - Master Your GCE Journey',
    template: '%s | MrAs',
  },
  description:
    'Excel in O-Level and A-Level exams with comprehensive online platform',
  keywords: ['education', 'GCE', 'O-Level', 'A-Level', 'exams'],
  authors: [{ name: 'MrAs Team' }],
  creator: 'MrAs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mras.com',
    title: 'MrAs - Master Your GCE Journey',
    description:
      'Excel in O-Level and A-Level exams with comprehensive online platform',
    siteName: 'MrAs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MrAs - Master Your GCE Journey',
    description:
      'Excel in O-Level and A-Level exams with comprehensive online platform',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

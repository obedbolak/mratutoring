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
    default: 'MrAs - Master Your Education Journey Online',
    template: '%s | MrAs',
  },
  description:
    'Excel in O-Level and A-Level exams with comprehensive online platform',
  keywords: ['education', 'GCE', 'O-Level', 'A-Level', 'exams'],
  authors: [{ name: 'MrAs Team' }],
  creator: 'MrAs Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mratutoring.com',
    title: 'MrAs - Master Your Education Journey Online',
    description:
      'Excel in O-Level and A-Level exams with comprehensive online platform',
    siteName: 'MrAtutoring',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MrAtutoring - Master Your Education Journey Online',
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

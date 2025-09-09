'use client';

import './globals.css';
import { Playfair_Display, Lato, Cormorant_Garamond, Cinzel } from 'next/font/google';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This state will be true on first load and on every refresh.
  // It will persist as `false` across client-side navigations.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${playfairDisplay.variable} ${lato.variable} ${cormorantGaramond.variable} ${cinzel.variable} font-sans bg-brand-white`}>
        {loading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </motion.div>
        )}
      </body>
    </html>
  );
}
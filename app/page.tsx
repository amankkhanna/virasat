'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import FAQSection from '@/components/FAQSection';
import PartnersSection from '@/components/PartnersSection';
import HighlightsSection from '@/components/HighlightsSection';
import ParallaxArtistSection from '@/components/ParallaxArtistSection';
import EventsSection from '@/components/EventsSection';

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="text-brand-black">
      <HeroSection />

      {/* About Reach Preview */}
      <section className="py-20 px-6 container mx-auto bg-brand-white">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif text-brand-brown mb-4">About Virasat by Reach</h2>
          <p className="text-lg font-sans text-brand-earthen mb-8">
            Reach is the organization behind Virasat, an event that is not just a festival, but a movement to preserve and celebrate our rich cultural heritage. We aim to connect the past with the present, creating a legacy for the future.
          </p>
          <Link href="/about" className="text-brand-red font-semibold hover:underline">
            Learn More &rarr;
          </Link>
        </motion.div>
      </section>

      <ParallaxArtistSection />

      <PartnersSection />
      <HighlightsSection />
      <EventsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';

const FAQSection = dynamic(() => import('@/components/FAQSection'), { loading: () => <p>Loading...</p> });
const PartnersSection = dynamic(() => import('@/components/PartnersSection'), { loading: () => <p>Loading...</p> });
const HighlightsSection = dynamic(() => import('@/components/HighlightsSection'), { loading: () => <p>Loading...</p> });
const ParallaxArtistSection = dynamic(() => import('@/components/ParallaxArtistSection'), { loading: () => <p>Loading...</p> });
const EventsSection = dynamic(() => import('@/components/EventsSection'), { loading: () => <p>Loading...</p> });
const GalleryPreview = dynamic(() => import('@/components/GalleryPreview'), { loading: () => <p>Loading...</p> });

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="text-brand-black">
      {/* 1. Hero Section - Main landing area */}
      <HeroSection />

      {/* 2. Cultural Heritage Festival - Ticket Booking (HIGHEST PRIORITY) */}
      <EventsSection />

      {/* 3. Highlights/Key Features - Build trust and excitement */}
      <HighlightsSection />

      {/* 4. Featured Artists/Performers - Build credibility and star power */}
      <ParallaxArtistSection />

      {/* 5. About Virasat by REACH - Provide context and build trust */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-16 pb-20 px-6 container mx-auto relative"
        style={{ 
          backgroundColor: '#FFF7F5F4',
          contain: 'layout style paint',
          isolation: 'isolate'
        }}
      >
        {/* Decorative Rangoli Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 0.6, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image
              src="/images/rangoli-about.png"
              alt="Decorative Rangoli"
              width={224}
              height={224}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.8 }}
            />
          </motion.div>
          
          {/* Top Right Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image
              src="/images/rangoli-about2.png"
              alt="Decorative Rangoli"
              width={224}
              height={224}
              className="w-full h-full object-contain filter drop-shadow-lg scale-x-[-1]"
              style={{ opacity: 0.4 }}
            />
          </motion.div>
          
          {/* Bottom Center Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 0.4, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64"
          >
            <Image
              src="/images/rangoli-about.png"
              alt="Decorative Rangoli"
              width={256}
              height={256}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.95 }}
            />
          </motion.div>
          
          {/* Side decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0"
          >
            {/* Left side decorative pattern */}
            <motion.div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src="/images/rangoli-about3.png"
                alt="Decorative Rangoli"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                style={{ opacity: 0.2 }}
              />
            </motion.div>
            
            {/* Right side decorative pattern */}
            <motion.div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src="/images/rangoli.svg"
                alt="Decorative Rangoli"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                style={{ opacity: 0.2 }}
              />
            </motion.div>
            
            {/* Floating decorative dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-brand-red rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="text-center max-w-6xl mx-auto relative z-10 bg-white/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <div className="mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-serif text-brand-brown mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About Virasat by REACH
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-brand-red to-brand-brown mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
          
          <motion.div 
            className="text-xl font-sans text-brand-earthen mb-8 space-y-6 leading-relaxed text-justify"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>
              Born in 1995 in Dehradun, <span className="font-semibold text-brand-brown">REACH (Rural Entrepreneurship for Art & Cultural Heritage)</span> emerged to safeguard India's fading traditions at a time when modernization threatened to overshadow them. Its mission has been clear: preserve heritage, empower rural artists, and create sustainable cultural entrepreneurship.
            </p>
            
            <p>
              From this vision came <span className="font-semibold text-brand-red">Virāsat</span>, a festival that began as a small campus initiative and has grown into <span className="font-semibold text-brand-brown">Afro-Asia's largest celebration of art and culture</span>. Spanning fifteen days, it transforms Dehradun into a living museum where classical ragas blend with folk dances, handmade crafts find new admirers, and theatre, literature, and traditional cuisines bring communities together.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-brand-red font-semibold hover:underline group transition-all duration-300 hover:scale-105"
            >
              Learn More 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                &rarr;
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 6. Gallery Preview - Showcase festival memories */}
      <GalleryPreview />

      {/* 7. Partners/Sponsors - Social proof and credibility */}
      <PartnersSection />

      {/* 8. FAQ Section - Address concerns and remove barriers */}
      <FAQSection />
    </div>
  );
};

export default HomePage;

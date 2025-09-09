'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import dynamic from 'next/dynamic';
import 'yet-another-react-lightbox/styles.css';
import { Button } from '@/components/ui/button';

import Video from "yet-another-react-lightbox/plugins/video";

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  loading: () => <p>Loading lightbox...</p>,
});
import SmallLoader from '@/components/SmallLoader';
import { useLoading } from '@/hooks/useLoading';

const allItems = [
  { src: '/images/first.png', type: 'photo', year: 2023, title: 'Vibrant Performance' },
  { src: '/images/secon.mp4', type: 'video', year: 2022, title: 'Cultural Dance' },
  { src: '/images/into-image.jpeg', type: 'photo', year: 2024, title: 'Artisan at Work' },
  { src: '/images/artists/birju_maharaj.png', type: 'photo', year: 2021, title: 'Birju Maharaj' },
  { src: '/images/artists/lata_mangeshkar.jpg', type: 'photo', year: 2022, title: 'Lata Mangeshkar' },
  { src: '/images/artists/naseeruddin_shah.jpg', type: 'photo', year: 2023, title: 'Naseeruddin Shah' },
  { src: '/images/artists/shubha_mudgal.jpg', type: 'photo', year: 2024, title: 'Shubha Mudgal' },
  { src: '/images/artists/zakir_hussain.jpg', type: 'photo', year: 2021, title: 'Zakir Hussain' },
  { src: '/images/third.mp4', type: 'video', year: 2023, title: 'Musical Evening' },
  { src: '/images/forth.mp4', type: 'video', year: 2024, title: 'Folk Traditions' },
];

const GalleryPage = () => {
  const { isLoading, withLoading } = useLoading(true);
  const [filter, setFilter] = useState({ year: 'all', type: 'all' });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Simulate data loading
  useEffect(() => {
    const loadGalleryData = async () => {
      await withLoading(async () => {
        // Simulate API call to fetch gallery items
        await new Promise(resolve => setTimeout(resolve, 2000));
      });
    };
    
    loadGalleryData();
  }, [withLoading]);

  const filteredItems = allItems.filter(item => {
    const yearMatch = filter.year === 'all' || item.year.toString() === filter.year;
    const typeMatch = filter.type === 'all' || item.type === filter.type;
    return yearMatch && typeMatch;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    640: 2,
    480: 1,
  };

  return (
    <>
      <SmallLoader isLoading={isLoading} />
      {!isLoading && (
        <div className="text-brand-black pt-20" style={{backgroundColor: '#FFF6F4'}}>
      {/* Hero Banner */}
      <section className="relative h-40 sm:h-48 flex items-center justify-center text-brand-brown overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0" style={{backgroundColor: '#FFF6F4'}}>
          {/* Floating Cultural Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Rangoli Patterns */}
            <motion.div
              className="absolute top-8 left-8 w-16 h-16 text-brand-gold opacity-10"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="10" fill="currentColor"/>
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute top-12 right-12 w-12 h-12 text-brand-red opacity-15"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 10 L90 50 L50 90 L10 50 Z"/>
                <path d="M50 20 L80 50 L50 80 L20 50 Z"/>
                <path d="M50 30 L70 50 L50 70 L30 50 Z"/>
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute bottom-12 left-16 w-14 h-14 text-brand-brown opacity-20"
              animate={{ 
                x: [0, 10, 0],
                rotate: [0, -90, 0]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 5 L95 50 L50 95 L5 50 Z"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute bottom-8 right-8 w-10 h-10 text-brand-gold opacity-25"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 45, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"/>
              </svg>
            </motion.div>
          </div>
          
          {/* Particle Effects */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-gold rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
        >
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4 bg-gradient-to-r from-brand-brown via-brand-red to-brand-brown bg-clip-text text-transparent leading-loose drop-shadow-lg pb-2 sm:pb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Celebrating Culture<br className="sm:hidden" />
              <span className="sm:hidden">Across the Years</span>
              <span className="hidden sm:inline">Across the Years</span>
            </motion.h1>
            <motion.p 
              className="text-xs sm:text-sm md:text-base font-sans text-brand-brown opacity-90 drop-shadow-md mt-2 sm:mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A visual archive of Virasat Festival&apos;s most cherished moments.
            </motion.p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 rounded-2xl shadow-lg" style={{backgroundColor: 'rgba(255, 246, 244, 0.8)'}}>
        <motion.div 
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Year Filter */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 rounded-full bg-white/10 backdrop-blur-lg p-1 sm:p-2 shadow-xl border border-white/20 w-fit max-w-sm mx-auto sm:mx-0 sm:w-auto sm:max-w-none">
            {['all', 2024, 2023, 2022, 2021].map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Button 
                  onClick={() => setFilter(f => ({ ...f, year: year as any }))} 
                  variant="ghost" 
                  size="sm"
                  className={`rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 transform whitespace-nowrap ${
                    filter.year === year 
                      ? 'bg-white/40 backdrop-blur-md text-brand-brown shadow-lg border border-white/60 hover:bg-white/40 hover:text-brand-brown' 
                      : 'text-brand-brown hover:bg-white/30 hover:backdrop-blur-md border border-transparent hover:border-white/40 hover:text-brand-brown hover:scale-105'
                  }`}
                >
                  {year === 'all' ? 'All Years' : year}
                </Button>
              </motion.div>
            ))}
          </div>
          {/* Type Filter */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 rounded-full bg-white/10 backdrop-blur-lg p-1 sm:p-2 shadow-xl border border-white/20 w-fit max-w-xs mx-auto sm:mx-0 sm:max-w-xs">
            {['all', 'photo', 'video'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Button 
                  onClick={() => setFilter(f => ({ ...f, type: type as any }))} 
                  variant="ghost" 
                  size="sm"
                  className={`capitalize rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 transform whitespace-nowrap ${
                    filter.type === type 
                      ? 'bg-white/40 backdrop-blur-md text-brand-brown shadow-lg border border-white/60 hover:bg-white/40 hover:text-brand-brown' 
                      : 'text-brand-brown hover:bg-white/30 hover:backdrop-blur-md border border-transparent hover:border-white/40 hover:text-brand-brown hover:scale-105'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type + 's'}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex -ml-6"
          columnClassName="my-masonry-grid_column pl-6 bg-clip-padding"
        >
          {filteredItems.map((item, index) => {
            // Create varying sizes for dynamic layout
            const sizeClasses = [
              'col-span-1', // Standard size
              'col-span-2', // Wide
              'col-span-1', // Standard
              'col-span-1', // Standard
              'col-span-2', // Wide
              'col-span-1', // Standard
              'col-span-1', // Standard
              'col-span-1', // Standard
              'col-span-2', // Wide
              'col-span-1', // Standard
            ];
            
            const heightClasses = [
              'h-64', // Standard height
              'h-80', // Tall
              'h-48', // Short
              'h-72', // Medium-tall
              'h-64', // Standard
              'h-56', // Medium
              'h-80', // Tall
              'h-48', // Short
              'h-72', // Medium-tall
              'h-64', // Standard
            ];
            
            const currentSizeClass = sizeClasses[index % sizeClasses.length];
            const currentHeightClass = heightClasses[index % heightClasses.length];
            
            return (
              <motion.div
                key={item.src}
                className={`group relative mb-6 overflow-hidden rounded-2xl border-2 border-brand-earthen-light shadow-2xl cursor-pointer hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] transition-shadow duration-300 ease-out ${currentSizeClass} ${currentHeightClass}`}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                onClick={() => openLightbox(index)}
              >
                
                {item.type === 'photo' ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      width={500} 
                      height={500} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    <video 
                      src={item.src} 
                      className="w-full h-full object-cover" 
                      loop 
                      muted 
                      playsInline
                      preload="metadata"
                      poster=""
                      onLoadedData={(e) => {
                        // Set the video to show the first frame
                        const video = e.target as HTMLVideoElement;
                        video.currentTime = 0.1;
                      }}
                    />
                    {/* Enhanced Video Overlay with Better Play Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="relative bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30 shadow-md"
                        >
                          {/* Play Button Icon */}
                          <svg className="w-5 h-5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                )}
                
                {/* Enhanced Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white">
                  <motion.h3 
                    className="font-serif text-xl mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm opacity-80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {item.year}
                  </motion.p>
                </div>
                
                {/* Enhanced Type Badge */}
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                    item.type === 'video' 
                      ? 'bg-gradient-to-r from-brand-red to-brand-red-dark text-white border border-red-300' 
                      : 'bg-gradient-to-r from-white to-gray-100 text-brand-brown border border-gray-300'
                  }`}>
                    {item.type === 'video' ? 'Video' : 'Photo'}
                  </span>
                </motion.div>
                
                {/* Hover Indicator */}
                <motion.div 
                  className="absolute top-4 left-4 w-2 h-2 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            );
          })}
        </Masonry>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          plugins={[Video]}
          slides={filteredItems.map(item => {
            if (item.type === 'video') {
              return {
                type: 'video',
                width: 1280,
                height: 720,
                sources: [
                  {
                    src: item.src,
                    type: 'video/mp4',
                  },
                ],
              };
            }
            return {
              type: 'image',
              src: item.src,
              width: 1200,
              height: 800,
            };
          })}
          index={lightboxIndex}
          styles={{
            container: { 
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(10px)"
            },
            slide: {
                border: 'none',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                padding: '0'
            }
          }}
        />
      </div>

      {/* CTA */}
      <motion.div 
        className="text-center py-6 sm:py-10 relative overflow-hidden px-4 sm:px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0" style={{backgroundColor: '#FFF6F4'}} />
        
        <div className="relative z-10">
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl font-serif text-brand-brown mb-2 sm:mb-3 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the Magic Live
          </motion.h2>
          <motion.p 
            className="text-xs sm:text-sm text-brand-brown opacity-90 mb-3 sm:mb-4 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Don&apos;t just view our memories - create new ones at the next Virasat Festival
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/events">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white hover:from-brand-red-dark hover:to-brand-red text-sm sm:text-xl font-bold py-4 sm:py-6 px-6 sm:px-12 rounded-full shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-brand-gold relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                    Book Your Tickets Now
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 to-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
       <style jsx global>{`
        .my-masonry-grid {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          margin-left: -12px; /* gutter size offset for mobile */
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 12px; /* gutter size for mobile */
          background-clip: padding-box;
        }
        .my-masonry-grid_column > div { /* change div to reference your elements */
          margin-bottom: 12px; /* smaller margin for mobile */
        }
        
        /* Tablet spacing */
        @media (min-width: 640px) {
          .my-masonry-grid {
            margin-left: -16px;
          }
          .my-masonry-grid_column {
            padding-left: 16px;
          }
          .my-masonry-grid_column > div {
            margin-bottom: 16px;
          }
        }
        
        /* Desktop spacing */
        @media (min-width: 768px) {
          .my-masonry-grid {
            margin-left: -24px;
          }
          .my-masonry-grid_column {
            padding-left: 24px;
          }
          .my-masonry-grid_column > div {
            margin-bottom: 24px;
          }
        }
        
        /* Custom responsive behavior for dynamic sizing */
        @media (max-width: 1200px) {
          .col-span-2 {
            grid-column: span 1;
          }
        }
        
        @media (max-width: 768px) {
          .col-span-2 {
            grid-column: span 1;
          }
        }
      `}</style>
        </div>
      )}
    </>
  );
};

export default GalleryPage;

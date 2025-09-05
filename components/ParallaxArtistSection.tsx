"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const artists = [
  {
    name: "Lata Mangeshkar",
    title: "The Nightingale of India",
    description:
      "Legendary playback singer who recorded songs in over 36 Indian languages and is considered one of the greatest voices in the history of Indian music.",
    image: "/images/artists/lata_mangeshkar.jpg",
    specialty: "Classical & Playback Singing",
    years: "1942-2022",
  },
  {
    name: "Naseeruddin Shah",
    title: "Master of Theatre & Cinema",
    description:
      "Acclaimed actor known for his versatility in parallel cinema and theatre, bringing depth and authenticity to every role he portrays.",
    image: "/images/artists/naseeruddin_shah.jpg",
    specialty: "Acting & Theatre",
    years: "1975-Present",
  },
  {
    name: "Zakir Hussain",
    title: "Tabla Virtuoso",
    description:
      "World-renowned tabla player who has elevated Indian percussion to global recognition through his innovative collaborations and masterful performances.",
    image: "/images/artists/zakir_hussain.jpg",
    specialty: "Tabla & Percussion",
    years: "1970-Present",
  },
  {
    name: "Shubha Mudgal",
    title: "Voice of Tradition & Innovation",
    description:
      "Versatile vocalist who seamlessly blends classical Indian music with contemporary styles, creating a unique musical language.",
    image: "/images/artists/shubha_mudgal.jpg",
    specialty: "Classical & Fusion Vocals",
    years: "1980-Present",
  },
  {
    name: "Birju Maharaj",
    title: "Kathak Legend",
    description:
      "Master of Kathak dance who preserved and elevated this classical art form through his graceful performances and dedicated teaching.",
    image: "/images/artists/birju_maharaj.png",
    specialty: "Kathak Dance",
    years: "1952-2022",
  },
];

const ParallaxArtistSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const artistRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showAllArtists, setShowAllArtists] = useState(false);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);

  // Show only first 3 artists initially
  const visibleArtists = showAllArtists ? artists : artists.slice(0, 3);
  const hasMoreArtists = artists.length > 3;

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const artistElements = artistRefs.current.slice(0, visibleArtists.length).filter(
      Boolean
    ) as HTMLDivElement[];

    if (!container || !scrollContainer || artistElements.length === 0) return;

    // Set up the horizontal scroll only if showing all artists
    if (showAllArtists) {
      const totalWidth = artistElements.length * window.innerWidth;

      // Set the width of the scroll container
      gsap.set(scrollContainer, { width: totalWidth });

      // Create the main scroll trigger for pinning and horizontal scroll
      const horizontalTween = gsap.to(scrollContainer, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        animation: horizontalTween,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onEnter: () => {
          window.dispatchEvent(new CustomEvent("hideHeader"));
        },
        onLeave: () => {
          window.dispatchEvent(new CustomEvent("showHeader"));
        },
        onEnterBack: () => {
          window.dispatchEvent(new CustomEvent("hideHeader"));
        },
        onLeaveBack: () => {
          window.dispatchEvent(new CustomEvent("showHeader"));
        },
      });

      // Create parallax effects for each artist
      artistElements.forEach((artist, index) => {
        const image = artist.querySelector(".artist-image");
        const content = artist.querySelector(".artist-content");
        const title = artist.querySelector(".artist-title");
        const subtitle = artist.querySelector(".artist-subtitle");
        const description = artist.querySelector(".artist-description");
        const specialty = artist.querySelector(".artist-specialty");

        if (!image || !content) return;

        // Set initial states - make first artist visible immediately
        if (index === 0) {
          gsap.set([title, subtitle, description, specialty], {
            y: 0,
            opacity: 1,
          });
          if (image instanceof HTMLElement) {
            image.style.opacity = "1";
            image.style.visibility = "visible";
            image.style.transform = "scale(1)";
          }
        } else {
          gsap.set([title, subtitle, description, specialty], {
            y: 100,
            opacity: 0,
          });
          gsap.set(image, {
            scale: 1.2,
            opacity: 0,
          });
        }

        // Create reveal animation for each artist (skip first one)
        if (index > 0) {
          const revealTl = gsap.timeline({
            scrollTrigger: {
              trigger: artist,
              start: "left 80%",
              end: "left 20%",
              horizontal: true,
              containerAnimation: horizontalTween,
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          });

          revealTl
            .to(image, {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            })
            .to(
              title,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.6"
            )
            .to(
              subtitle,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.6"
            )
            .to(
              description,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.4"
            )
            .to(
              specialty,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.6"
            );
        }

        // Add floating animation for the image (skip for first artist to avoid conflicts)
        if (index > 0) {
          gsap.to(image, {
            y: -20,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5,
          });
        }
      });

      // Refresh ScrollTrigger on resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        scrollTrigger.kill();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
        window.removeEventListener("resize", handleResize);
      };
    } else {
      // Static layout for first 3 artists
      gsap.set(scrollContainer, { width: "100%" });
      
      // Simple fade-in animation for static artists
      artistElements.forEach((artist, index) => {
        const image = artist.querySelector(".artist-image");
        const content = artist.querySelector(".artist-content");
        const title = artist.querySelector(".artist-title");
        const subtitle = artist.querySelector(".artist-subtitle");
        const description = artist.querySelector(".artist-description");
        const specialty = artist.querySelector(".artist-specialty");

        if (!image || !content) return;

        gsap.set([title, subtitle, description, specialty], {
          y: 0,
          opacity: 1,
        });
        if (image instanceof HTMLElement) {
          image.style.opacity = "1";
          image.style.visibility = "visible";
          image.style.transform = "scale(1)";
        }
      });
    }
  }, [showAllArtists, visibleArtists.length]);

  const handleShowMore = () => {
    setShowAllArtists(true);
  };

  const navigateToArtist = (direction: 'prev' | 'next') => {
    if (!showAllArtists) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(currentArtistIndex + 1, artists.length - 1)
      : Math.max(currentArtistIndex - 1, 0);
    
    setCurrentArtistIndex(newIndex);
    
    // Scroll to the specific artist
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      gsap.to(scrollContainer, {
        x: -newIndex * window.innerWidth,
        duration: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden will-change-transform"
      style={{ height: showAllArtists ? "100vh" : "auto", minHeight: showAllArtists ? "100vh" : "80vh" }}
    >
      {/* Creative Multi-Layer Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base Gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 30%, #710016 0%, transparent 50%), radial-gradient(circle at 80% 70%, #B8967F 0%, transparent 50%), linear-gradient(45deg, #161616 0%, #710016 25%, #B8967F 50%, #F2F1ED 75%, #161616 100%)'
          }}
        ></div>
        
        {/* Geometric Shapes */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div 
            className="absolute top-10 left-10 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(45deg, #710016, #B8967F)' }}
          ></div>
          <div 
            className="absolute top-1/3 right-20 w-24 h-24 transform rotate-45 pointer-events-none"
            style={{ background: '#F2F1ED' }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, #B8967F 30%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute bottom-1/3 right-10 w-16 h-16 transform rotate-12 pointer-events-none"
            style={{ background: '#710016' }}
          ></div>
        </div>
        
        {/* Flowing Lines */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,20 Q25,10 50,20 T100,15 L100,25 Q75,35 50,25 T0,30 Z" 
              fill="url(#crimsonGradient)"
            />
            <path 
              d="M0,60 Q25,50 50,60 T100,55 L100,65 Q75,75 50,65 T0,70 Z" 
              fill="url(#sandGradient)"
            />
            <defs>
              <linearGradient id="crimsonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#710016" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#B8967F" stopOpacity="0.3"/>
              </linearGradient>
              <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8967F" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#F2F1ED" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #710016 2px, #710016 4px)'
          }}
        ></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 will-change-transform">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/images/background-pattern.svg")',
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Section Title - Fixed */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif text-brand-white mb-2 leading-tight">
          Our Esteemed Artists
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-brand-earthen-light max-w-xs md:max-w-md">
          Masters who have shaped the cultural landscape through their
          extraordinary talent and dedication.
        </p>
      </div>

      {/* Navigation Controls */}
      {showAllArtists && (
        <div className="absolute top-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none">
          <button
            onClick={() => navigateToArtist('prev')}
            disabled={currentArtistIndex === 0}
            className="pointer-events-auto bg-brand-black/80 hover:bg-brand-red text-brand-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => navigateToArtist('next')}
            disabled={currentArtistIndex === artists.length - 1}
            className="pointer-events-auto bg-brand-black/80 hover:bg-brand-red text-brand-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Scroll Hint or Show More Button */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-brand-white opacity-70">
        {!showAllArtists && hasMoreArtists ? (
          <button
            onClick={handleShowMore}
            className="bg-brand-red hover:bg-brand-red-dark text-brand-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Show More Artists ({artists.length - 3} more)
          </button>
        ) : showAllArtists ? (
        <div className="flex items-center space-x-2">
          <span className="text-xs md:text-sm">Scroll to explore</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-brand-red rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-brand-red rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
        ) : null}
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className={`${showAllArtists ? 'flex' : 'grid grid-cols-1 md:grid-cols-3 gap-8 px-8'} h-full will-change-transform`}
        style={{ width: "fit-content" }}
      >
        {visibleArtists.map((artist, index) => (
          <div
            key={artist.name}
            ref={(el) => (artistRefs.current[index] = el)}
            className={`${showAllArtists ? 'flex-shrink-0' : ''} flex items-center justify-center relative will-change-transform`}
            style={{ 
              width: showAllArtists ? "100vw" : "100%", 
              height: showAllArtists ? "100vh" : "auto",
              minHeight: showAllArtists ? "100vh" : "60vh"
            }}
          >
            <div className="container mx-auto px-4 md:px-8 h-full max-w-7xl">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full">
                {/* Artist Image */}
                <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                  <div
                    className={`artist-image relative will-change-transform ${
                      index === 0 ? "opacity-100 visible" : ""
                    }`}
                    style={
                      index === 0 ? { opacity: 1, visibility: "visible" } : {}
                    }
                  >
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                      {/* Artist Photo */}
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                      {index === 0 ? (
                        // Use regular img for first artist to avoid Next.js Image issues
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                          onLoad={() =>
                            console.log(`Image loaded: ${artist.name}`)
                          }
                          onError={(e) =>
                            console.error(
                              `Image failed to load: ${artist.name}`,
                              e
                            )
                          }
                        />
                      ) : (
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                          priority={index === 0}
                          unoptimized={index === 0}
                          onLoad={() =>
                            console.log(`Image loaded: ${artist.name}`)
                          }
                          onError={(e) =>
                            console.error(
                              `Image failed to load: ${artist.name}`,
                              e
                            )
                          }
                        />
                      )}
                      </div>
                      {/* Ring Frame Overlay */}
                      <div 
                        className="absolute pointer-events-none"
                        style={{
                          top: '-16%',
                          left: '-16%',
                          width: '132%',
                          height: '132%',
                          backgroundImage: 'url("/images/artists/ring.png")',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 bg-brand-red rounded-full opacity-60"></div>
                    <div className="absolute -bottom-6 -left-6 w-8 h-8 md:w-12 md:h-12 border-2 border-brand-earthen rounded-full"></div>
                  </div>
                </div>

                {/* Artist Content */}
                <div className="w-full md:w-1/2 md:pl-8 lg:pl-12 artist-content text-center md:text-left">
                  <div className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto md:mx-0 px-2 md:px-0 relative">
                    {/* Text Background Overlay */}
                    <div 
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(22, 22, 22, 0.8) 0%, rgba(113, 0, 22, 0.6) 50%, rgba(22, 22, 22, 0.8) 100%)',
                        backdropFilter: 'blur(2px)'
                      }}
                    ></div>
                    <div className="relative z-10 p-4 md:p-6">
                    <h3 className="artist-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-brand-white mb-2 leading-tight">
                      {artist.name}
                    </h3>
                    <h4 className="artist-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-brand-red font-semibold mb-3 md:mb-4">
                      {artist.title}
                    </h4>
                    <p className="artist-description text-xs sm:text-sm md:text-base lg:text-lg text-brand-earthen-light leading-relaxed mb-4 md:mb-6">
                      {artist.description}
                    </p>
                    <div className="artist-specialty space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 md:space-x-4">
                        <span className="text-brand-white font-semibold">
                          Specialty:
                        </span>
                        <span className="text-brand-earthen-light">
                          {artist.specialty}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 md:space-x-4">
                        <span className="text-brand-white font-semibold">
                          Active:
                        </span>
                        <span className="text-brand-earthen-light">
                          {artist.years}
                        </span>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            {showAllArtists && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {artists.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentArtistIndex
                        ? "bg-brand-red scale-125"
                        : "bg-brand-earthen-light opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxArtistSection;

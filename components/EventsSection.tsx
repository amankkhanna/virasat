'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

gsap.registerPlugin(ScrollTrigger);

const eventDays = [
  {
    id: 1,
    day: "Day 1",
    title: "Opening Ceremony",
    date: "March 15, 2024",
    time: "7:00 PM - 10:00 PM",
    venue: "Grand Auditorium",
    artist: "Lata Mangeshkar Tribute",
    artistImage: "/images/artists/lata_mangeshkar.jpg",
    description: "Experience the magic of India's nightingale through a spectacular tribute performance featuring renowned classical vocalists.",
    highlights: ["Classical Vocal Performance", "Orchestra Ensemble", "Traditional Dance"],
    ticketPrice: "₹2,500",
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff9ff3 100%)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
  },
  {
    id: 2,
    day: "Day 2", 
    title: "Theatre Masterclass",
    date: "March 16, 2024",
    time: "6:00 PM - 9:00 PM",
    venue: "Heritage Theatre",
    artist: "Naseeruddin Shah",
    artistImage: "/images/artists/naseeruddin_shah.jpg",
    description: "Dive deep into the world of theatre with master actor Naseeruddin Shah in an intimate evening of storytelling and performance.",
    highlights: ["Interactive Workshop", "Live Performance", "Q&A Session"],
    ticketPrice: "₹3,000",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    pattern: "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
  },
  {
    id: 3,
    day: "Day 3",
    title: "Rhythmic Fusion",
    date: "March 17, 2024", 
    time: "7:30 PM - 10:30 PM",
    venue: "Cultural Center",
    artist: "Zakir Hussain",
    artistImage: "/images/artists/zakir_hussain.jpg",
    description: "Witness the tabla maestro create magic with percussion instruments from around the world in this fusion extravaganza.",
    highlights: ["World Percussion", "Fusion Music", "Collaborative Performance"],
    ticketPrice: "₹3,500",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
    pattern: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
  },
  {
    id: 4,
    day: "Day 4",
    title: "Vocal Harmony",
    date: "March 18, 2024",
    time: "6:30 PM - 9:30 PM", 
    venue: "Music Hall",
    artist: "Shubha Mudgal",
    artistImage: "/images/artists/shubha_mudgal.jpg",
    description: "Experience the versatility of Indian classical and contemporary music through the mesmerizing voice of Shubha Mudgal.",
    highlights: ["Classical Ragas", "Contemporary Fusion", "Audience Interaction"],
    ticketPrice: "₹2,800",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)",
    pattern: "radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 50%)",
  },
  {
    id: 5,
    day: "Day 5",
    title: "Dance Celebration",
    date: "March 19, 2024",
    time: "7:00 PM - 10:00 PM",
    venue: "Grand Auditorium",
    artist: "Birju Maharaj Legacy",
    artistImage: "/images/artists/birju_maharaj.png",
    description: "Celebrate the legacy of Kathak legend Birju Maharaj through performances by his disciples and contemporary dance artists.",
    highlights: ["Kathak Performance", "Contemporary Dance", "Cultural Storytelling"],
    ticketPrice: "₹3,200",
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 50%, #fa709a 100%)",
    pattern: "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
  },
];

const EventsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section entrance
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-20 px-6 bg-gradient-to-br from-brand-black via-brand-brown to-brand-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/images/background-pattern.svg")',
            backgroundSize: "150px 150px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-red/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-earthen/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-brand-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-white mb-4">
            Event Schedule
          </h2>
          <p className="text-lg md:text-xl text-brand-earthen-light max-w-3xl mx-auto">
            Five extraordinary days of cultural celebration, featuring master artists and immersive experiences
          </p>
        </motion.div>

        {/* Events Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.events-swiper-button-next',
              prevEl: '.events-swiper-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            className="events-swiper pb-16"
          >
            {eventDays.map((event, index) => (
              <SwiperSlide key={event.id}>
                <motion.div
                  className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    background: event.background,
                  }}
                  onMouseEnter={() => setHoveredCard(event.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: event.pattern,
                    }}
                  />

                  {/* Artist Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={event.artistImage}
                      alt={event.artist}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    {/* Top Content */}
                    <div>
                      <div className="inline-block bg-brand-red/90 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        {event.day}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif mb-2 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-brand-earthen-light text-lg font-medium">
                        {event.artist}
                      </p>
                    </div>

                    {/* Bottom Content - Always Visible */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin size={16} />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    {/* Hover Content */}
                    <motion.div
                      className="absolute inset-0 bg-black/90 p-6 flex flex-col justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredCard === event.id ? 1 : 0,
                        y: hoveredCard === event.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        pointerEvents: hoveredCard === event.id ? 'auto' : 'none',
                      }}
                    >
                      <div className="text-center space-y-4">
                        <h4 className="text-2xl font-serif text-brand-white">
                          {event.title}
                        </h4>
                        <p className="text-brand-earthen-light leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="space-y-2">
                          <h5 className="text-lg font-semibold text-brand-white">Highlights:</h5>
                          <ul className="text-sm text-brand-earthen-light space-y-1">
                            {event.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-center justify-center space-x-2">
                                <span className="w-1 h-1 bg-brand-red rounded-full" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <div className="text-2xl font-bold text-brand-red mb-4">
                            {event.ticketPrice}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg"
                          >
                            Buy Ticket
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="events-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-brand-black/80 hover:bg-brand-red text-white p-3 rounded-full cursor-pointer transition-all duration-300 group">
            <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="events-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-brand-black/80 hover:bg-brand-red text-white p-3 rounded-full cursor-pointer transition-all duration-300 group">
            <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-brand-earthen-light text-lg mb-6">
            All events include complimentary refreshments and cultural souvenirs
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            View Full Schedule
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .events-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .events-swiper .swiper-pagination-bullet {
          background: rgba(192, 57, 43, 0.5) !important;
          opacity: 1 !important;
        }
        
        .events-swiper .swiper-pagination-bullet-active {
          background: #c0392b !important;
          transform: scale(1.2);
        }
        
        .events-swiper .swiper-slide {
          transition: all 0.3s ease;
        }
        
        .events-swiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.7;
          transform: scale(0.95);
        }
        
        .events-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </motion.section>
  );
};

export default EventsSection;
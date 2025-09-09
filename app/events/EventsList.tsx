"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Users, Star, ArrowRight, Timer, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SmallLoader from '@/components/SmallLoader'
import { useLoading } from '@/hooks/useLoading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { getEventsByDay, getCategories, getDays, type Event, type EventsFilters } from '@/lib/events'
import { preloadNextPageEvents, preloadEventData } from '@/lib/event-preloader'

interface EventsListProps {
  initialEventsByDay: Record<string, Event[]>;
  initialTotalPages: number;
  initialHasMore: boolean;
  initialTotalCount: number;
}

export default function EventsList({ initialEventsByDay, initialTotalPages, initialHasMore, initialTotalCount }: EventsListProps) {
  const { isLoading, withLoading } = useLoading(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedDay, setSelectedDay] = useState<string>("All")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Pagination and data loading states
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsByDay, setEventsByDay] = useState<Record<string, Event[]>>(initialEventsByDay)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loadingMore, setLoadingMore] = useState(false)
  const [totalCount, setTotalCount] = useState(initialTotalCount)

  // Refs for scroll containers and scroll states
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean, canScrollRight: boolean } }>({})
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const categories = getCategories()
  const days = getDays()

  // Get unique days that have events after filtering
  const availableDays = Object.keys(eventsByDay).sort((a, b) => {
    const dayOrder = {
      "Day 1": 1, "Day 2": 2, "Day 3": 3, "Day 4": 4, "Day 5": 5, "Day 6": 6, "Day 7": 7,
      "Day 8": 8, "Day 9": 9, "Day 10": 10, "Day 11": 11, "Day 12": 12, "Day 13": 13,
      "Day 14": 14, "Concluding Day": 15
    }
    return (dayOrder[a as keyof typeof dayOrder] || 999) - (dayOrder[b as keyof typeof dayOrder] || 999)
  })

  const filteredEvents = Object.values(eventsByDay).flat()

  // Load events data with pagination
  const loadEvents = useCallback(async (page: number = 1, reset: boolean = true) => {
    if (loadingMore && !reset) return;

    if (reset) {
      setLoadingMore(true)
    }

    try {
      const filters: EventsFilters = {
        category: selectedCategory === "All" ? undefined : selectedCategory,
        day: selectedDay === "All" ? undefined : selectedDay,
      }

      const response = await getEventsByDay(page, 2, filters) // Load 2 days at a time

      if (reset) {
        setEventsByDay(response.eventsByDay)
        setCurrentPage(1)
      } else {
        setEventsByDay(prev => ({ ...prev, ...response.eventsByDay }))
      }

      setTotalPages(response.totalPages)
      setHasMore(response.hasMore)
      setTotalCount(response.totalCount)
      setCurrentPage(page)

      // Preload next page events for better performance
      if (response.hasMore) {
        preloadNextPageEvents(page, 2)
      }
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setLoadingMore(false)
    }
  }, [selectedCategory, selectedDay, loadingMore])

  // Load more events (infinite scroll)
  const loadMoreEvents = useCallback(() => {
    if (hasMore && !loadingMore) {
      loadEvents(currentPage + 1, false)
    }
  }, [hasMore, loadingMore, currentPage, loadEvents])

  // Load events data on filter changes
  useEffect(() => {
    // Skip initial load if initialEventsByDay is present
    if (Object.keys(initialEventsByDay).length > 0 && currentPage === 1 && selectedCategory === 'All' && selectedDay === 'All') {
      return;
    }

    const loadFilteredData = async () => {
      await withLoading(async () => {
        await loadEvents(1, true)
      });
    };

    loadFilteredData();
  }, [withLoading, selectedCategory, selectedDay]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreEvents()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loadingMore, loadMoreEvents])

  // Check scroll state for a specific day
  const checkScrollState = (day: string) => {
    const container = scrollRefs.current[day]
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const canScrollLeft = scrollLeft > 0
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1 // -1 for rounding errors

      setScrollStates(prev => ({
        ...prev,
        [day]: { canScrollLeft, canScrollRight }
      }))
    }
  }

  // Scroll functions
  const scrollLeft = (day: string) => {
    const container = scrollRefs.current[day]
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' })
      // Check scroll state after a short delay to allow for smooth scrolling
      setTimeout(() => checkScrollState(day), 100)
    }
  }

  const scrollRight = (day: string) => {
    const container = scrollRefs.current[day]
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' })
      // Check scroll state after a short delay to allow for smooth scrolling
      setTimeout(() => checkScrollState(day), 100)
    }
  }

  // Countdown timer for featured events
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const eventDate = new Date()
      eventDate.setDate(eventDate.getDate() + 3) // 3 days from now
      const distance = eventDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
    const tracker = trackBookingClick(eventId, 'events-page')
    
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
    // Brief loading state for better UX
    }, 1000)

      tracker.complete(true) // Mark as cache hit since we preloaded
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {isLoading && <SmallLoader isLoading={isLoading} />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen"
          style={{ backgroundColor: '#FFF7F5F4' }}
        >
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-brand-earthen/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-brand-brown/15 rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-6 pt-24 pb-8 relative z-10">

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6">
              <span className="text-brand-black">All Cultural </span>
              <span className="text-brand-brown font-bold">Events</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-earthen max-w-3xl mx-auto leading-relaxed">
              Discover our complete lineup of cultural heritage events across fifteen days of authentic Indian experiences.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            {/* Filters - Dropdowns for all screen sizes */}
            <div className="flex flex-row gap-4 max-w-2xl mx-auto">
              {/* Day Filter Dropdown */}
              <div className="flex-1">
                <label className="block text-brand-earthen font-medium mb-2">Day</label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="w-full bg-white border-brand-earthen/30 focus:border-brand-red">
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter Dropdown */}
              <div className="flex-1">
                <label className="block text-brand-earthen font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-white border-brand-earthen/30 focus:border-brand-red">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Events Count and Pagination Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-4"
          >
            <p className="text-brand-earthen">
              Showing {filteredEvents.length} of {totalCount} events
              {totalPages > 1 && (
                <span className="ml-2 text-sm">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Events by Day Sections */}
      <div className="container mx-auto max-w-7xl px-6 pb-20">
        {availableDays.length > 0 ? (
          <div className="space-y-8">
            {availableDays.map((day, dayIndex) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Day Section Header */}
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl md:text-3xl font-serif text-brand-brown font-bold">
                    {day}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-brand-brown/30 to-transparent"></div>
                  <span className="text-sm text-brand-earthen bg-brand-earthen-light/20 px-3 py-1 rounded-full">
                    {eventsByDay[day].length} events
                  </span>
                </div>

                {/* Horizontal Scrolling Events with External Navigation */}
                <div className="flex items-center gap-4">
                  {/* Left Navigation Button - Desktop Only */}
                  <div className="hidden lg:block">
                    {scrollStates[day]?.canScrollLeft && (
                      <motion.button
                        onClick={() => scrollLeft(day)}
                        className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group/btn flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                      </motion.button>
                    )}
                    {/* Spacer when button is not shown */}
                    {!scrollStates[day]?.canScrollLeft && <div className="w-14 h-14 flex-shrink-0" />}
                  </div>

                  {/* Events Container */}
                  <div
                    ref={(el) => {
                      scrollRefs.current[day] = el
                      if (el) {
                        // Initial scroll state check
                        setTimeout(() => checkScrollState(day), 100)
                      }
                    }}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 flex-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onScroll={() => checkScrollState(day)}
                  >
                    {eventsByDay[day].map((event, eventIndex) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: eventIndex * 0.1 }}
                        className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl transition-all duration-300 ease-out overflow-hidden flex flex-col min-w-[280px] max-w-[320px] flex-shrink-0"
                        onMouseEnter={() => {
                          setHoveredCard(event.id)
                          // Preload event data on hover for faster booking page load
                          preloadEventData(event.id)
                        }}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {/* Inner white card container */}
                        <div className="bg-white rounded-2xl m-1 flex flex-col flex-1 overflow-hidden">
                          {/* Event Image */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={event.image}
                              alt={event.title}
                              width={320}
                              height={192}
                              className="w-full h-full object-cover"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Featured Badge */}
                            {event.featured && (
                              <div className="absolute top-3 right-3 flex flex-col gap-1">
                                <span className="bg-brand-red text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  Featured
                                </span>
                                {/* Countdown Timer */}
                                <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                                  <div className="flex items-center gap-1">
                                    <Timer className="w-3 h-3" />
                                    <span>{timeLeft.days}d {timeLeft.hours}h</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Event Content */}
                          <div className="p-4 flex flex-col flex-grow">
                            {/* Fixed Height Title Section */}
                            <div className="h-16 mb-3 flex items-start">
                              <h3 className="text-lg font-bold text-brand-black font-serif group-hover:text-brand-red transition-colors duration-300 line-clamp-2 leading-tight">
                                {event.title}
                              </h3>
                            </div>

                            {/* Fixed Height Description Section */}
                            <div className="h-12 mb-4 flex items-start">
                              <p className="text-brand-earthen text-sm leading-relaxed line-clamp-2">
                                {event.description}
                              </p>
                            </div>

                            {/* Fixed Height Separator Section */}
                            <div className="h-6 mb-4 flex items-center">
                              <div className="w-16 h-1 bg-brand-red rounded-full" />
                            </div>

                            {/* Event Details */}
                            <div className="space-y-2 mb-5 flex-grow">
                              <div className="flex items-center gap-2 text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                                <Clock className="w-4 h-4 text-brand-red flex-shrink-0" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                                <Users className="w-4 h-4 text-brand-red flex-shrink-0" />
                                <span>{event.seats}</span>
                              </div>
                            </div>

                            {/* Price and Buy Button */}
                            <div className="flex items-center justify-between gap-3 mt-auto px-1">
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl sm:text-2xl font-bold text-brand-black leading-none">{event.price}</span>
                                <span className="text-xs text-brand-earthen-light leading-tight whitespace-nowrap">per person</span>
                              </div>

                              <Link href={`/events/${event.id}/booking`}>
                                <motion.button
                                  className="bg-brand-red hover:bg-brand-red-dark text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 group/btn flex-shrink-0 h-8 sm:h-9 shadow-lg hover:shadow-xl"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    console.log('Book Now clicked for event:', event.id, event.title);
                                    console.log('Booking URL:', `/events/${event.id}/booking`);
                                  }}
                                >
                                  <span className="text-sm whitespace-nowrap">Book Now</span>
                                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </motion.button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right Navigation Button - Desktop Only */}
                  <div className="hidden lg:block">
                    {scrollStates[day]?.canScrollRight && (
                      <motion.button
                        onClick={() => scrollRight(day)}
                        className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group/btn flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </motion.button>
                    )}
                    {/* Spacer when button is not shown */}
                    {!scrollStates[day]?.canScrollRight && <div className="w-14 h-14 flex-shrink-0" />}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Load More Section */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loadingMore ? (
                  <div className="flex items-center gap-2 text-brand-earthen">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more events...</span>
                  </div>
                ) : (
                  <Button
                    onClick={loadMoreEvents}
                    variant="outline"
                    className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                  >
                    Load More Events
                  </Button>
                )}
              </div>
            )}

            {/* End of Events Message */}
            {!hasMore && availableDays.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-brand-earthen">
                  You've reached the end of all events. Thank you for exploring our cultural heritage!
                </p>
              </motion.div>
            )}
          </div>
        ) : (
          /* No Events Message */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-brand-earthen text-lg">No events found for the selected filters.</p>
          </motion.div>
        )}
      </div>
        </motion.div>
    </>
  )
}

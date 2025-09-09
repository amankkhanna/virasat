"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  CheckCircle, 
  Info, 
  Crown,
  Sofa,
  Shield,
  Coffee,
  Wifi,
  Car,
  Gift,
  ArrowRight,
  X
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import SmallLoader from '@/components/SmallLoader'
import { useLoading } from '@/hooks/useLoading'
import { seatingAreas } from './eventData'
import { preloadEventData } from '@/lib/event-preloader'

const bookingSteps = [
  { id: 1, title: "Select Seating", description: "Choose your preferred seating area" },
  { id: 2, title: "Review & Confirm", description: "Review your selection and details" },
  { id: 3, title: "Payment", description: "Complete your booking payment" },
  { id: 4, title: "Confirmation", description: "Receive booking confirmation" }
]

interface EventData {
  id: number
  day: string
  title: string
  description: string
  image: string
  time: string
  location: string
  seats: string
  price: string
  featured: boolean
  category: string
  date: string
  duration?: string
  ageRestriction?: string
}

interface EventBookingClientProps {
  eventData: EventData
}

export default function EventBookingClient({ eventData }: EventBookingClientProps) {
  const { isLoading, withLoading } = useLoading(false)
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSeating, setSelectedSeating] = useState<string | null>(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [showInstructions, setShowInstructions] = useState(false)
  const [bookingInProgress, setBookingInProgress] = useState(false)

  // Preload related events for better navigation performance
  useEffect(() => {
    const preloadRelatedEvents = async () => {
      // Preload next and previous events
      const currentId = eventData.id
      const relatedIds = [currentId - 1, currentId + 1].filter(id => id > 0 && id <= 56)
      
      // Preload in background without blocking UI
      setTimeout(() => {
        relatedIds.forEach(id => preloadEventData(id))
      }, 100)
    }
    
    preloadRelatedEvents()
  }, [eventData.id])

  const handleSeatingSelect = (seatingId: string) => {
    setSelectedSeating(seatingId)
    setCurrentStep(2)
  }

  const handleQuantityChange = (quantity: number) => {
    if (quantity >= 1 && quantity <= 10) {
      setSelectedQuantity(quantity)
    }
  }

  const getSelectedSeatingData = () => {
    return seatingAreas.find(area => area.id === selectedSeating)
  }

  const calculateTotal = () => {
    const seating = getSelectedSeatingData()
    return seating ? seating.price * selectedQuantity : 0
  }

  const handleBookNow = useCallback(async () => {
    setBookingInProgress(true)
    
    try {
      // Simulate booking process with progress updates
      setCurrentStep(3)
      
      // Simulate payment processing (reduced from 2000ms to 600ms)
      await new Promise(resolve => setTimeout(resolve, 600))
      
      setCurrentStep(4)
    } catch (error) {
      console.error('Booking failed:', error)
      // Handle error state
    } finally {
      setBookingInProgress(false)
    }
  }, [])

  // Enhanced loading state management
  useEffect(() => {
    if (bookingInProgress) {
      // Prevent navigation during booking
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ''
      }
      
      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [bookingInProgress])

  // Optimized icon component getter with memoization
  const getIconComponent = useCallback((iconName: string) => {
    switch (iconName) {
      case 'Crown': return Crown
      case 'Star': return Star
      case 'Users': return Users
      case 'Sofa': return Sofa
      default: return Users
    }
  }, [])

  // Memoized seating data getter
  const getSelectedSeatingData = useCallback(() => {
    return seatingAreas.find(area => area.id === selectedSeating)
  }, [selectedSeating])

  // Optimized quantity change handler
  const handleQuantityChange = useCallback((quantity: number) => {
    if (quantity >= 1 && quantity <= 10) {
      setSelectedQuantity(quantity)
    }
  }, [])

  // Optimized total calculation
  const calculateTotal = useCallback(() => {
    const seating = getSelectedSeatingData()
    return seating ? seating.price * selectedQuantity : 0
  }, [getSelectedSeatingData, selectedQuantity])
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return Crown
      case 'Star': return Star
      case 'Users': return Users
      case 'Sofa': return Sofa
      default: return Users
    }
  }

  return (
    <>
      <SmallLoader isLoading={isLoading} />
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen"
          style={{ backgroundColor: '#FFF7F5F4' }}
        >
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6 pt-16 pb-4 relative z-10">
              {/* Back Button - Top Left Corner */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 mt-6"
              >
                {currentStep === 1 ? (
                  <Link href="/events" className="inline-block">
                    <button
                      className="bg-white text-center w-36 rounded-xl h-10 relative text-brand-black text-sm font-semibold group shadow-md hover:shadow-lg transition-all duration-300"
                      type="button"
                    >
                      <div className="bg-brand-red rounded-lg h-8 w-8 flex items-center justify-center absolute left-1 top-1 group-hover:w-[136px] z-10 duration-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          height="16px"
                          width="16px"
                          fill="white"
                        >
                          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                          <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                        </svg>
                      </div>
                      <p className="translate-x-4 text-brand-black">Back to Events</p>
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="bg-white text-center w-36 rounded-xl h-10 relative text-brand-black text-sm font-semibold group shadow-md hover:shadow-lg transition-all duration-300"
                    type="button"
                  >
                    <div className="bg-brand-red rounded-lg h-8 w-8 flex items-center justify-center absolute left-1 top-1 group-hover:w-[136px] z-10 duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="16px"
                        width="16px"
                        fill="white"
                      >
                        <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                        <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                      </svg>
                    </div>
                    <p className="translate-x-4 text-brand-black">Change Seating</p>
                  </button>
                )}
              </motion.div>

              {/* Event Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-4 mb-4"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="lg:w-1/3 relative">
                    <Image
                      src={eventData.image}
                      alt={eventData.title}
                      width={400}
                      height={192}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    {eventData.featured && (
                      <span className="absolute top-3 right-3 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="lg:w-2/3">
                    <div className="mb-3">
                      <h1 className="text-xl font-serif font-bold text-brand-black mb-2">
                        {eventData.title}
                      </h1>
                      <p className="text-brand-earthen text-base leading-relaxed text-justify">
                        {eventData.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-brand-earthen">
                        <Clock className="w-5 h-5 text-brand-red flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium whitespace-nowrap">{eventData.time}</p>
                          <p className="text-sm">{eventData.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-brand-earthen">
                        <MapPin className="w-5 h-5 text-brand-red flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium whitespace-nowrap">{eventData.location}</p>
                          <p className="text-sm">{eventData.duration || 'Duration varies'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-brand-earthen col-span-2 md:col-span-1">
                        <Users className="w-5 h-5 text-brand-red flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium whitespace-nowrap">{eventData.seats}</p>
                          <p className="text-sm">{eventData.ageRestriction || 'All ages welcome'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Booking Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-4"
              >
                <div className="flex items-start justify-between max-w-4xl mx-auto px-2">
                  {bookingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center w-full">
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                            currentStep >= step.id
                              ? 'bg-brand-red text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {currentStep > step.id ? (
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          ) : (
                            step.id
                          )}
                        </div>
                        <div className="mt-1 text-center w-full">
                          <p className={`text-xs sm:text-sm font-medium ${
                            currentStep >= step.id ? 'text-brand-red' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-400 hidden sm:block">{step.description}</p>
                        </div>
                      </div>
                      {index < bookingSteps.length - 1 && (
                        <div className={`w-6 sm:w-8 md:w-12 h-1 mx-1 sm:mx-2 md:mx-3 transition-all duration-300 ${
                          currentStep > step.id ? 'bg-brand-red' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Instructions Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mb-4"
              >
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="inline-flex items-center gap-2 bg-brand-earthen-light/20 hover:bg-brand-earthen-light/30 text-brand-earthen px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <Info className="w-4 h-4" />
                  <span>Booking Instructions</span>
                </button>
              </motion.div>

              {/* Instructions Modal */}
              <AnimatePresence>
                {showInstructions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowInstructions(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-brand-black">Booking Instructions</h3>
                        <button
                          onClick={() => setShowInstructions(false)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-4 text-brand-earthen">
                        <div>
                          <h4 className="font-bold text-brand-red mb-2">Seating Selection</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>All seats are allocated on a first-come, first-served basis</li>
                            <li>Seat availability is shown in real-time</li>
                            <li>You can select up to 10 tickets per booking</li>
                            <li>Different seating areas offer various amenities and perks</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-brand-red mb-2">Payment & Confirmation</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Payment must be completed within 15 minutes of seat selection</li>
                            <li>You will receive an email confirmation with your tickets</li>
                            <li>Tickets are non-refundable but transferable</li>
                            <li>Please arrive 30 minutes before the event start time</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-brand-red mb-2">Special Notes</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>VIP seating includes premium amenities and services</li>
                            <li>Traditional floor seating provides an authentic cultural experience</li>
                            <li>All seating areas have wheelchair accessibility</li>
                            <li>Children under 5 years can sit on parent&apos;s lap for free</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content */}
              <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-xl font-serif font-bold text-brand-black mb-4 text-center">
                        Select Your Seating Area
                      </h2>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {seatingAreas.map((area, index) => {
                          const IconComponent = getIconComponent(area.icon)
                          const isAvailable = area.available > 0
                          
                          return (
                            <motion.div
                              key={area.id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col group ${
                                isAvailable 
                                  ? 'border-gray-100 hover:border-brand-red/30 cursor-pointer' 
                                  : 'border-gray-50 opacity-60 cursor-not-allowed'
                              }`}
                              onClick={() => isAvailable && handleSeatingSelect(area.id)}
                            >
                              {/* Header with gradient */}
                              <div className={`h-24 bg-gradient-to-br ${area.color} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10"></div>
                                <div className="relative p-5 flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                                      <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                      <h3 className="text-white font-bold text-lg mb-1">{area.name}</h3>
                                      <p className="text-white/90 text-sm leading-relaxed">{area.description}</p>
                                    </div>
                                  </div>
                                  {!isAvailable && (
                                    <span className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                      Sold Out
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="p-5 flex flex-col flex-1">
                                {/* Price */}
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-brand-black">
                                      ₹{area.price}
                                    </span>
                                    <span className="text-lg text-gray-400 line-through">
                                      ₹{area.originalPrice}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-brand-earthen font-medium">
                                      {area.available} of {area.total} available
                                    </p>
                                    <div className="w-24 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full transition-all duration-500 ${
                                          area.available > area.total * 0.5 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                          area.available > area.total * 0.25 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                                        }`}
                                        style={{ width: `${(area.available / area.total) * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Perks */}
                                <div className="mb-4 flex-1">
                                  <h4 className="font-bold text-brand-black mb-3 text-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                                    Included Perks
                                  </h4>
                                  <div className="grid grid-cols-1 gap-2">
                                    {area.perks.map((perk, perkIndex) => (
                                      <div key={perkIndex} className="flex items-center gap-3 text-sm text-brand-earthen group/perk">
                                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/perk:bg-green-200 transition-colors">
                                          <CheckCircle className="w-3 h-3 text-green-600" />
                                        </div>
                                        <span className="group-hover/perk:text-brand-black transition-colors">{perk}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Select Button */}
                                {isAvailable && (
                                  <motion.button
                                    className="w-full bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white py-3 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-auto shadow-lg hover:shadow-xl group/btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <span>Select This Area</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-xl font-serif font-bold text-brand-black mb-4 text-center">
                        Review Your Selection
                      </h2>
                      
                      <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                          {selectedSeating && (
                            <>
                              <div className="mb-4">
                                <h3 className="text-2xl font-bold text-brand-black">Booking Summary</h3>
                              </div>
                              
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Event Details */}
                                <div>
                                  <h4 className="font-bold text-brand-black mb-3">Event Details</h4>
                                  <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3">
                                      <Clock className="w-5 h-5 text-brand-red" />
                                      <span className="text-brand-earthen">{eventData.time} • {eventData.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <MapPin className="w-5 h-5 text-brand-red" />
                                      <span className="text-brand-earthen">{eventData.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Users className="w-5 h-5 text-brand-red" />
                                      <span className="text-brand-earthen">{eventData.duration || 'Duration varies'}</span>
                                    </div>
                                  </div>

                                  {/* Terms and Conditions */}
                                  <div className="p-3 bg-gray-50 rounded-xl">
                                    <h4 className="font-bold text-brand-black mb-2">Terms & Conditions</h4>
                                    <ul className="text-sm text-brand-earthen space-y-1">
                                      <li>• Seats are allocated on first-come, first-served basis</li>
                                      <li>• Payment must be completed within 15 minutes</li>
                                      <li>• Tickets are non-refundable but transferable</li>
                                      <li>• Please arrive 30 minutes before event start time</li>
                                      <li>• Children under 5 can sit on parent&apos;s lap for free</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Seating Details */}
                                <div>
                                  <h4 className="font-bold text-brand-black mb-3">Seating Details</h4>
                                  {(() => {
                                    const seating = getSelectedSeatingData()
                                    if (!seating) return null
                                    
                                    return (
                                      <div className={`${seating.bgColor} rounded-xl p-4 border ${seating.borderColor}`}>
                                        <div className="flex items-center gap-3 mb-3">
                                          {(() => {
                                            const IconComponent = getIconComponent(seating.icon)
                                            return <IconComponent className="w-6 h-6 text-brand-red" />
                                          })()}
                                          <div>
                                            <h5 className="font-bold text-brand-black">{seating.name}</h5>
                                            <p className="text-sm text-brand-earthen">{seating.description}</p>
                                          </div>
                                        </div>
                                        
                                        {/* Quantity Selector */}
                                        <div className="mb-3">
                                          <label className="block text-sm font-medium text-brand-black mb-2">
                                            Number of Tickets
                                          </label>
                                          <div className="flex items-center gap-3">
                                            <button
                                              onClick={() => handleQuantityChange(selectedQuantity - 1)}
                                              disabled={selectedQuantity <= 1}
                                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                            >
                                              -
                                            </button>
                                            <span className="text-lg font-bold text-brand-black min-w-[2rem] text-center">
                                              {selectedQuantity}
                                            </span>
                                            <button
                                              onClick={() => handleQuantityChange(selectedQuantity + 1)}
                                              disabled={selectedQuantity >= 10}
                                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>

                                        {/* Price Breakdown */}
                                        <div className="space-y-2">
                                          <div className="flex justify-between text-sm">
                                            <span className="text-brand-earthen">Price per ticket:</span>
                                            <span className="font-medium">₹{seating.price}</span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                            <span className="text-brand-earthen">Quantity:</span>
                                            <span className="font-medium">{selectedQuantity}</span>
                                          </div>
                                          <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                            <span className="text-brand-black">Total:</span>
                                            <span className="text-brand-red">₹{calculateTotal()}</span>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })()}
                                </div>
                              </div>

                              {/* Continue Button */}
                              <div className="mt-6 text-center">
                                <motion.button
                                  onClick={handleBookNow}
                                  className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <span>Proceed to Payment</span>
                                  <ArrowRight className="w-5 h-5" />
                                </motion.button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-16"
                    >
                      <div className="max-w-md mx-auto">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <Clock className="w-8 h-8 text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-brand-black mb-4">
                          Processing Payment
                        </h2>
                        <p className="text-brand-earthen text-lg">
                          Please wait while we process your booking...
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-16"
                    >
                      <div className="max-w-md mx-auto">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <CheckCircle className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-brand-black mb-4">
                          Booking Confirmed!
                        </h2>
                        <p className="text-brand-earthen text-lg mb-8">
                          Your tickets have been booked successfully. You will receive a confirmation email shortly.
                        </p>
                        <div className="space-y-4">
                          <Link
                            href="/events"
                            className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                          >
                            View More Events
                          </Link>
                          <p className="text-sm text-brand-earthen">
                            Booking ID: VIR-{Date.now().toString().slice(-6)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

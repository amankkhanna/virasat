import { allEventsData } from './eventData'
import EventBookingClient from './EventBookingClient'
import { allEvents } from '@/lib/events'
import { getCachedEvent, preloadEventData } from '@/lib/event-preloader'

// Generate static params for all event IDs using actual events data
export async function generateStaticParams() {
  // Use the centralized events data to ensure all events are pre-generated
  return allEvents.map(event => ({
    id: event.id.toString(),
  }))
}

interface PageProps {
  params: {
    id: string
  }
}

export default function EventBookingPage({ params }: PageProps) {
  const eventId = parseInt(params.id)
  
  // Try to get cached event data first for better performance
  let eventData = getCachedEvent(eventId)
  
  // If not cached, find in events array and cache it
  if (!eventData) {
    eventData = allEvents.find(event => event.id === eventId)
    if (eventData) {
      preloadEventData(eventId) // Cache for future use
    }
  }
  
  // Fallback to first event if not found (shouldn't happen with proper static generation)
  if (!eventData) {
    console.warn(`Event with ID ${eventId} not found, using fallback`)
    return <EventBookingClient eventData={allEvents[0]} />
  }

  return <EventBookingClient eventData={eventData} />
}

import { allEventsData } from './eventData'
import EventBookingClient from './EventBookingClient'
import { allEvents } from '@/lib/events'
import { getCachedEvent, preloadEventData } from '@/lib/event-preloader'

// Generate static params for all event IDs - FIXED to use actual events data
export async function generateStaticParams() {
  console.log('Generating static params for', allEvents.length, 'events')
  return allEvents.map(event => ({
    id: event.id.toString(),
  }))
}

// Enable static generation for better performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: {
    id: string
  }
}

export default function EventBookingPage({ params }: PageProps) {
  const eventId = parseInt(params.id)
  
  console.log('Loading booking page for event ID:', eventId)
  
  // Try cached data first for instant loading
  let eventData = getCachedEvent(eventId)
  
  // Fallback to events array if not cached
  if (!eventData) {
    console.log('Event not in cache, loading from events array')
    eventData = allEvents.find(event => event.id === eventId)
    if (eventData) {
      // Cache immediately for future use
      preloadEventData(eventId)
    }
  }
  
  // Fallback to first event if not found
  if (!eventData) {
    console.warn(`Event with ID ${eventId} not found, using fallback`)
    return <EventBookingClient eventData={allEvents[0]} />
  }

  console.log('Successfully loaded event:', eventData.title)
  return <EventBookingClient eventData={eventData} />
}

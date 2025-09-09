// Event preloader utility for better performance
import { allEvents } from './events'

// Cache for preloaded event data
const eventCache = new Map<number, any>()

// Preload event data for better performance
export function preloadEventData(eventId: number) {
  if (eventCache.has(eventId)) {
    return eventCache.get(eventId)
  }

  const event = allEvents.find(e => e.id === eventId)
  if (event) {
    eventCache.set(eventId, event)
    return event
  }

  return null
}

// Preload multiple events at once
export function preloadEvents(eventIds: number[]) {
  const events = eventIds.map(id => preloadEventData(id)).filter(Boolean)
  return events
}

// Preload all events (useful for initial page load)
export function preloadAllEvents() {
  allEvents.forEach(event => {
    eventCache.set(event.id, event)
  })
  return allEvents
}

// Get cached event data
export function getCachedEvent(eventId: number) {
  return eventCache.get(eventId)
}

// Clear cache (useful for development or memory management)
export function clearEventCache() {
  eventCache.clear()
}

// Preload events based on current viewport (for infinite scroll optimization)
export function preloadVisibleEvents(currentPage: number, pageSize: number = 2) {
  const startIndex = (currentPage - 1) * pageSize * 4 // Assuming 4 events per day on average
  const endIndex = startIndex + (pageSize * 4)
  
  const eventsToPreload = allEvents.slice(startIndex, endIndex)
  eventsToPreload.forEach(event => {
    eventCache.set(event.id, event)
  })
  
  return eventsToPreload
}

// Preload next page events (for infinite scroll)
export function preloadNextPageEvents(currentPage: number, pageSize: number = 2) {
  const nextPage = currentPage + 1
  return preloadVisibleEvents(nextPage, pageSize)
}

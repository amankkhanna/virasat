// Event preloader utility for better performance
import { allEvents } from './events'

// Enhanced cache for preloaded event data with metadata
interface CachedEvent {
  data: any;
  timestamp: number;
  preloaded: boolean;
}

const eventCache = new Map<number, CachedEvent>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Preload event data for better performance
export function preloadEventData(eventId: number) {
  const cached = eventCache.get(eventId)
  const now = Date.now()
  
  // Return cached data if it's still valid
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }

  const event = allEvents.find(e => e.id === eventId)
  if (event) {
    eventCache.set(eventId, {
      data: event,
      timestamp: now,
      preloaded: true
    })
    return event
  }

  return null
}

// Preload multiple events at once
export function preloadEvents(eventIds: number[]) {
  return Promise.all(
    eventIds.map(async (id) => {
      // Add small delay to prevent overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 10))
      return preloadEventData(id)
    })
  ).then(events => events.filter(Boolean))
}

// Preload all events (useful for initial page load)
export async function preloadAllEvents() {
  const now = Date.now()
  
  // Batch preload in chunks to avoid blocking
  const chunkSize = 10
  for (let i = 0; i < allEvents.length; i += chunkSize) {
    const chunk = allEvents.slice(i, i + chunkSize)
    chunk.forEach(event => {
      eventCache.set(event.id, {
        data: event,
        timestamp: now,
        preloaded: true
      })
    })
    
    // Small delay between chunks
    if (i + chunkSize < allEvents.length) {
      await new Promise(resolve => setTimeout(resolve, 5))
    }
  }
  
  return allEvents
}

// Get cached event data
export function getCachedEvent(eventId: number) {
  const cached = eventCache.get(eventId)
  const now = Date.now()
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }
  
  return null
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

// Preload events based on user interaction patterns
export function preloadEventsByCategory(category: string, limit: number = 5) {
  const categoryEvents = allEvents
    .filter(event => event.category === category)
    .slice(0, limit)
  
  categoryEvents.forEach(event => preloadEventData(event.id))
  return categoryEvents
}

// Get cache statistics for monitoring
export function getCacheStats() {
  const now = Date.now()
  let validEntries = 0
  let expiredEntries = 0
  
  eventCache.forEach((cached) => {
    if ((now - cached.timestamp) < CACHE_DURATION) {
      validEntries++
    } else {
      expiredEntries++
    }
  })
  
  return {
    totalEntries: eventCache.size,
    validEntries,
    expiredEntries,
    hitRate: validEntries / Math.max(eventCache.size, 1)
  }
}

// Performance monitoring utilities for the Virasat website

interface PerformanceMetrics {
  navigationStart: number;
  loadEventStart: number;
  loadEventEnd: number;
  domContentLoaded: number;
  loadComplete: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

interface BookingPerformanceData {
  eventId: number;
  loadTime: number;
  cacheHit: boolean;
  userAgent: string;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics | null = null;
  private bookingData: BookingPerformanceData[] = [];

  // Initialize performance monitoring
  init() {
    if (typeof window === 'undefined') return;

    // Capture navigation timing
    window.addEventListener('load', () => {
      this.captureNavigationMetrics();
    });

    // Monitor Core Web Vitals
    this.monitorWebVitals();
  }

  // Capture navigation timing metrics
  private captureNavigationMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    this.metrics = {
      navigationStart: navigation.navigationStart,
      loadEventStart: navigation.loadEventStart,
      loadEventEnd: navigation.loadEventEnd,
      domContentLoaded: navigation.domContentLoadedEventEnd,
      loadComplete: navigation.loadEventEnd,
    };

    console.log('Navigation Metrics:', this.metrics);
  }

  // Monitor Core Web Vitals
  private monitorWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          if (this.metrics) {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
          console.log('First Contentful Paint:', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (this.metrics) {
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      }
      console.log('Largest Contentful Paint:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // Track booking page load performance
  trackBookingLoad(eventId: number, startTime: number, cacheHit: boolean = false) {
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    const data: BookingPerformanceData = {
      eventId,
      loadTime,
      cacheHit,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    this.bookingData.push(data);
    
    console.log(`Booking Load Performance - Event ${eventId}:`, {
      loadTime: `${loadTime.toFixed(2)}ms`,
      cacheHit,
      performance: loadTime < 500 ? 'Excellent' : loadTime < 1000 ? 'Good' : 'Needs Improvement'
    });

    // Alert if performance is poor
    if (loadTime > 2000) {
      console.warn(`Slow booking load detected for event ${eventId}: ${loadTime.toFixed(2)}ms`);
    }

    return data;
  }

  // Get performance summary
  getPerformanceSummary() {
    if (this.bookingData.length === 0) {
      return null;
    }

    const totalLoads = this.bookingData.length;
    const cacheHits = this.bookingData.filter(d => d.cacheHit).length;
    const averageLoadTime = this.bookingData.reduce((sum, d) => sum + d.loadTime, 0) / totalLoads;
    const slowLoads = this.bookingData.filter(d => d.loadTime > 1000).length;

    return {
      totalLoads,
      cacheHitRate: (cacheHits / totalLoads) * 100,
      averageLoadTime: averageLoadTime.toFixed(2),
      slowLoadsPercentage: (slowLoads / totalLoads) * 100,
      fastLoadsPercentage: ((totalLoads - slowLoads) / totalLoads) * 100,
    };
  }

  // Export performance data for analysis
  exportPerformanceData() {
    return {
      navigationMetrics: this.metrics,
      bookingData: this.bookingData,
      summary: this.getPerformanceSummary(),
    };
  }

  // Clear performance data
  clearData() {
    this.bookingData = [];
    this.metrics = null;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility function to measure function execution time
export function measureExecutionTime<T>(
  fn: () => T | Promise<T>,
  label: string
): T | Promise<T> {
  const start = performance.now();
  
  const result = fn();
  
  if (result instanceof Promise) {
    return result.then((value) => {
      const end = performance.now();
      console.log(`${label} execution time: ${(end - start).toFixed(2)}ms`);
      return value;
    });
  } else {
    const end = performance.now();
    console.log(`${label} execution time: ${(end - start).toFixed(2)}ms`);
    return result;
  }
}

// Track booking button clicks
export function trackBookingClick(eventId: number, source: 'homepage' | 'events-page') {
  const startTime = performance.now();
  
  console.log(`Booking click tracked - Event ${eventId} from ${source}`);
  
  return {
    eventId,
    source,
    startTime,
    complete: (cacheHit: boolean = false) => {
      return performanceMonitor.trackBookingLoad(eventId, startTime, cacheHit);
    }
  };
}
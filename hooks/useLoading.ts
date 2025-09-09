'use client';

import { useState, useCallback, useRef } from 'react';

interface UseLoadingReturn {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>;
  progress: number;
  setProgress: (progress: number) => void;
}

export function useLoading(initialState: boolean = false): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(initialState);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
    
    // Simulate progress for better UX
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress < 90) {
        setProgress(currentProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 100);
    
    timeoutRef.current = progressInterval;
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setProgress(100);
    
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    
    // Reset progress after a short delay
    setTimeout(() => setProgress(0), 500);
  }, []);

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      startLoading();
      const result = await asyncFn();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
    progress,
    setProgress
  };
}
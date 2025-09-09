'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SmallLoaderProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export default function SmallLoader({ isLoading, progress = 0, message }: SmallLoaderProps) {
  if (!isLoading) return null;

  return (
    <motion.div 
      className="fixed top-20 left-0 right-0 bottom-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm" 
      style={{ backgroundColor: 'rgba(255, 247, 245, 0.95)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-sm w-full mx-4">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-red rounded-full animate-spin"></div>
            {progress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-brand-red">{Math.round(progress)}%</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-red to-brand-red-dark rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
        
        {/* Loading Message */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-brand-black mb-2">
            {message || 'Loading Event Details...'}
          </h3>
          <p className="text-sm text-brand-earthen">
            Please wait while we prepare your booking experience
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';

interface SmallLoaderProps {
  isLoading: boolean;
}

export default function SmallLoader({ isLoading }: SmallLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#FFF7F5' }}>
      <div className="w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
}

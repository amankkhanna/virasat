'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from './button';

interface LoadingButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function LoadingButton({
  isLoading = false,
  loadingText = 'Loading...',
  children,
  onClick,
  disabled,
  className,
  variant = 'default',
  size = 'default',
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      <motion.div
        className="flex items-center gap-2"
        initial={false}
        animate={{
          opacity: isLoading ? 0.7 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {children}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </motion.div>
    </Button>
  );
}
'use client';

import { useEffect } from 'react';
import { Lexend, Orbitron } from 'next/font/google';

const lexend = Lexend({ subsets: ['latin'], weight: ['400'] });

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
      onClose();
      }, 800); 

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg border border-red-400/50 ${lexend.className}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
} 
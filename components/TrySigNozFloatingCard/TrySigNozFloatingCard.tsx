'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

const TrySigNozFloatingCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cardClosed = localStorage.getItem('trySigNozCardClosed');
    if (cardClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('trySigNozCardClosed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 w-64 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl px-4 py-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hidden lg:block">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <h3 className="text-lg font-bold text-white mt-0 mb-2">Try SigNoz Cloud for FREE</h3>
      <p className="text-gray-300 text-sm mb-3">Instant setup, predictable pricing, and advanced features without infrastructure hassles.</p>
      <Link 
        id='try-signoz-cloud-floating-card-cta'
        href="/teams/" 
        style={{color: 'white', textDecoration: 'none'}}
        className="inline-block bg-signoz_robin-500 hover:bg-signoz_robin-600 text-white px-4 py-2 mt-6 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center justify-between"
      >
        <span>Get Started - Free</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default TrySigNozFloatingCard;

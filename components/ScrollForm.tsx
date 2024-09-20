'use client'

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ScrollForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showValueProps, setShowValueProps] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage > 40) {
        setIsRendered(true);
        setTimeout(() => setIsVisible(true), 50);
      } else {
        setIsVisible(false);
        setTimeout(() => setIsRendered(false), 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option !== 'Casually exploring') {
      setShowValueProps(true);
    } else {
      setIsVisible(false);
      setIsDismissed(true);
      setTimeout(() => setIsRendered(false), 500);
    }
  };

  if (!isRendered) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-80 bg-signoz_ink-500 p-4 rounded-lg shadow-lg border border-signoz_slate-400 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {!showValueProps ? (
        <>
          <h3 className="text-signoz_sienna-100 text-lg font-semibold mb-2">What are you looking for?</h3>
          <div className="space-y-2">
            {['Casually exploring', 'Setting up a new observability product', 'Understanding SigNoz offerings', 'Migrating from datadog/newrelic'].map((option) => (
              <button
                key={option}
                className="block w-full text-left px-3 py-2 text-sm text-signoz_vanilla-100 hover:bg-signoz_slate-400 rounded transition duration-150 ease-in-out"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-signoz_sienna-100 text-lg font-semibold mb-2">Try SigNoz</h3>
          <ul className="list-disc list-inside text-sm text-signoz_vanilla-400 mb-4">
            <li>Open-source observability platform</li>
            <li>Unified view of metrics, traces, and logs</li>
            <li>Cost-effective alternative to proprietary solutions</li>
          </ul>
          <Button id="btn-get-started-scroll-form" className="w-full justify-center">
            <Link href="/teams/" className="flex items-center justify-center">
              Get Started
              <ArrowRight size={14} className="ml-2" />
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default ScrollForm;

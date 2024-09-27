'use client'

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface OptionBehavior {
  action: 'close' | 'showCTA';
}

interface ScrollFormProps {
  question?: string;
  options?: string[];
  valueProps?: string[];
  optionBehaviors?: Record<string, OptionBehavior>;
}

const ScrollForm: React.FC<ScrollFormProps> = ({
  question = "What are you looking for?",
  options = ['Casually exploring', 'Setting up a new observability product', 'Understanding SigNoz offerings', 'Migrating from datadog/newrelic'],
  valueProps = [
    'Open-source observability platform',
    'Unified view of metrics, traces, and logs',
    'Cost-effective alternative to proprietary solutions'
  ],
  optionBehaviors = {
    'Casually exploring': { action: 'close' },
    'Setting up a new observability product': { action: 'showCTA' },
    'Understanding SigNoz offerings': { action: 'showCTA' },
    'Migrating from datadog/newrelic': { action: 'showCTA' }
  }
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showValueProps, setShowValueProps] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage > 30 && !isVisible) {
        setIsVisible(true);
      } else if (scrollPercentage <= 30 && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, isVisible]);

  useEffect(() => {
    if (showValueProps) {
      setTimeout(() => setShowItems(true), 100);
    } else {
      setShowItems(false);
    }
  }, [showValueProps]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    const behavior = optionBehaviors[option];
    if (behavior.action === 'showCTA') {
      setShowValueProps(true);
    } else {
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 500);
  };

  if (isDismissed) return null;

  const formStyle = {
    transition: 'all 0.5s ease-in-out',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  };

  return (
    <div 
      style={formStyle}
      className={`fixed bottom-4 right-4 z-50 w-80 bg-signoz_ink-500 p-4 rounded-lg shadow-lg border border-signoz_slate-400 hidden lg:block`}
    >
      {!showValueProps ? (
        <>
          <h3 className="text-signoz_sienna-100 text-lg font-semibold mb-2">{question}</h3>
          <div className="space-y-2">
            {options.map((option) => (
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
        <div className="relative">
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-1 w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-200"
            aria-label="Close"
          />
          <h3 className="text-signoz_sienna-100 text-lg font-semibold mb-3">Try SigNoz</h3>
          <ul className="space-y-2 pl-0 mb-4">
            {valueProps.map((item, index) => (
              <li 
                key={index} 
                className={`flex items-center transition-all duration-300 ease-out ${
                  showItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                <span className="text-sm mb-1 text-signoz_vanilla-100">{item}</span>
              </li>
            ))}
          </ul>
          <button 
            id="btn-get-started-scroll-form" 
            className="w-full justify-center bg-blue-500 text-white font-semibold py-1 px-4 rounded-md transition-colors duration-300"
          >
            <Link href="/teams/" className="flex items-center justify-center">
              Get Started
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollForm;

// To use this component, you need to import it and pass the required props.
// import ScrollForm from '@/components/ScrollForm';

// // In your parent component
// const customOptionBehaviors = {
//   'Option 1': { action: 'close' },
//   'Option 2': { action: 'showCTA' },
//   'Option 3': { action: 'showCTA' },
//   'Option 4': { action: 'close' }
// };

// // In your JSX
// <ScrollForm 
//   question="Custom question?"
//   options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
//   optionBehaviors={customOptionBehaviors}
// />

// When nothing is passed, it will use the default props.
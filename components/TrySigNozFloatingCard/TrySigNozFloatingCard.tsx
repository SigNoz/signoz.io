import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const TrySigNozFloatingCard: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 w-64 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl px-4 py-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <h3 className="text-lg font-bold text-white mt-0 mb-2">Try SigNoz Cloud for FREE</h3>
      <p className="text-gray-300 text-sm mb-3">Instant setup, predictable pricing, and advanced features without infrastructure hassles.</p>
      <Link 
        href="/teams/" 
        style={{color: 'white', textDecoration: 'none'}}
        className="inline-block bg-blue-600 text-white px-4 py-2 mt-6 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-between"
      >
        <span>Get Started</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default TrySigNozFloatingCard;

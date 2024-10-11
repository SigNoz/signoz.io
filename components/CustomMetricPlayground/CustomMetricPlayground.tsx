'use client'

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomMetricPlayground: React.FC = () => {
  const [regions, setRegions] = useState(5);
  const [products, setProducts] = useState(10);
  const [payments, setPayments] = useState(6);

  const fullCardinality = regions * products * payments * 0.05;
  const optimized = regions * products * 0.05;

  const chartData = [
    { name: 'Full Cardinality', cost: fullCardinality },
    { name: 'Optimized', cost: optimized },
  ];

  const fullExamples = [
    { region: 'North America', product: 'electronics', payment: 'credit card', time: '48.3 seconds' },
    { region: 'Europe', product: 'clothing', payment: 'credit card', time: '49.7 seconds' },
    { region: 'Asia', product: 'electronics', payment: 'PayPal', time: '51.2 seconds' },
    { region: 'North America', product: 'clothing', payment: 'credit card', time: '39.9 seconds' },
    { region: 'North America', product: 'home goods', payment: 'credit card', time: '42.1 seconds' },
  ];

  const optimizedExamples = [
    { region: 'North America', product: 'electronics', time: '47.3 seconds' },
    { region: 'Europe', product: 'electronics', time: '49.5 seconds' },
    { region: 'Asia', product: 'electronics', time: '52.8 seconds' },
    { region: 'North America', product: 'clothing', time: '39.6 seconds' },
    { region: 'North America', product: 'home goods', time: '43.7 seconds' },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Metric: order_processing_time</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        {['region', 'product_category', 'payment_method'].map((tag, index) => (
          <div key={tag} className="bg-gray-800 rounded p-2">
            <h2 className="text-sm mb-1">{tag}</h2>
            <input
              type="range"
              min="1"
              max="20"
              value={index === 0 ? regions : index === 1 ? products : payments}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (index === 0) setRegions(value);
                else if (index === 1) setProducts(value);
                else setPayments(value);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs mt-1">{index === 0 ? regions : index === 1 ? products : payments}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Monthly Cost ($)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Bar dataKey="cost" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded px-4 py-1">
          <h3 className="font-semibold mt-1 mb-1">Full Cardinality</h3>
          <p className="text-xs">Cost = (Regions * Products * Payments) * $0.05</p>
          <p className="font-bold text-left">${fullCardinality.toFixed(2)}</p>
          <p className="text-xs">(Assuming additional custom metrics are charged at $1 per 100 metrics per month.)</p>
          <h4 className="text-xs font-semibold mt-3 mb-1">Examples:</h4>
          <ul className="text-xs">
            {fullExamples.map((ex, index) => (
              <li key={index} className="mb-1">
                {ex.region}, {ex.product}, {ex.payment}: {ex.time}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 rounded px-4 py-1">
          <h3 className="font-semibold mt-1 mb-1">Optimized</h3>
          <p className="text-xs">Cost = (Regions * Products) * $0.05</p>
          <p className="font-bold text-left">${optimized.toFixed(2)}</p>
          <p className="text-xs">(Assuming additional custom metrics are charged at $1 per 100 metrics per month.)</p>
          <h4 className="text-xs font-semibold mt-3 mb-1">Examples:</h4>
          <ul className="text-xs">
            {optimizedExamples.map((ex, index) => (
              <li key={index} className="mb-1">
                {ex.region}, {ex.product}: {ex.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomMetricPlayground;

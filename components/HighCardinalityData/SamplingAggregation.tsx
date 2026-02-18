'use client'

import { useState } from 'react'

export default function SamplingAggregation() {
  const [mode, setMode] = useState<'raw' | 'aggregated' | 'sampled'>('raw')

  // Generate deterministic random-looking data
  const points = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    x: Math.sin(i * 0.5) * 40 + 50 + (Math.random() * 10 - 5),
    y: Math.cos(i * 0.3) * 30 + 50 + (Math.random() * 10 - 5),
    color: i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-red-500' : 'bg-green-500',
  }))

  // Aggregated: Just 3 large points
  const aggregatedPoints = [
    { x: 50, y: 30, color: 'bg-blue-500', size: 64, label: 'Avg: 45ms' },
    { x: 20, y: 70, color: 'bg-red-500', size: 64, label: 'Avg: 120ms' },
    { x: 80, y: 60, color: 'bg-green-500', size: 64, label: 'Avg: 12ms' },
  ]

  return (
    <div className="mx-auto my-16 w-full max-w-3xl">
      {/* Minimal Tab Switcher */}
      <div className="mb-8 flex justify-center border-b border-zinc-700">
        {(['raw', 'aggregated', 'sampled'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`relative px-3 pb-4 text-sm font-medium transition-all sm:px-6 ${
              mode === m ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)} Data
            {mode === m && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-100" />}
          </button>
        ))}
      </div>

      {/* Visualization Container */}
      <div className="relative h-64 w-full overflow-hidden transition-all duration-500">
        {/* Scatter Plot Layer */}
        <div className="absolute inset-0 transition-opacity duration-500">
          {mode === 'aggregated'
            ? // Aggregated View
              aggregatedPoints.map((p, i) => (
                <div
                  key={i}
                  className={`absolute flex transform items-center justify-center rounded-full text-xs font-bold text-white opacity-90 shadow-lg transition-all duration-500 ${p.color}`}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {p.label}
                </div>
              ))
            : // Raw / Sampled View
              points.map((p) => {
                const isVisible = mode === 'raw' || (mode === 'sampled' && p.id % 10 === 0)
                return (
                  <div
                    key={p.id}
                    className={`absolute h-2 w-2 rounded-full transition-all duration-500 ${p.color} ${
                      isVisible ? 'scale-100 opacity-60' : 'scale-0 opacity-0'
                    }`}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                    }}
                  />
                )
              })}
        </div>
      </div>

      {/* Contextual Caption */}
      <div className="mt-4 h-12 text-center">
        <p className="animate-fade-in key-mode italic text-zinc-400 transition-all">
          {mode === 'raw' && '150 raw events. Perfect detail, maximum storage cost.'}
          {mode === 'aggregated' &&
            '3 summary metrics. Cardinality reduced to near zero. Great for dashboards.'}
          {mode === 'sampled' &&
            '15 representative traces (10% sample). Good detail, 90% cost savings.'}
        </p>
      </div>
    </div>
  )
}

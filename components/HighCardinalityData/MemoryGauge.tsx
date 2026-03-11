'use client'

import { useState } from 'react'

export default function MemoryGauge() {
  // Slider value: 0 to 100
  // Maps to Users: 0 to 1,000,000 (Exponentialish)
  const [sliderVal, setSliderVal] = useState(1)

  // Current Users Calculation
  // Linear Scale: 1,000 to 100,000 for cleaner 1:1 visualization
  const getUsers = (val: number) => {
    // val is 0-100
    // min = 1,000
    // max = 800,000 (roughly enough to cause ~16GB memory with 5 series/user * 4KB)
    // 800,000 * 5 * 4KB = 16,000,000 KB = 16 GB

    const minUsers = 1000
    const maxUsers = 900000

    return Math.floor(minUsers + (val / 100) * (maxUsers - minUsers))
  }

  const users = getUsers(sliderVal)

  // Series = Users * 5 (representing other labels like method, status)
  const seriesPerUser = 5
  const totalSeries = users * seriesPerUser

  // Memory = Series * 4KB
  const memoryBytes = totalSeries * 4096
  const memoryMB = memoryBytes / (1024 * 1024)
  const memoryGB = memoryMB / 1024

  // Max Memory for visually filling the container (e.g., 16GB limit)
  const maxMemoryGB = 16
  const fillPercentage = Math.min((memoryGB / maxMemoryGB) * 100, 100)

  const isOOM = memoryGB > 16 // Crash threshold exactly at limit

  return (
    <div className="mx-auto my-16 w-full max-w-4xl font-sans">
      {/* Main Container - Integrated look, less boxy */}
      <div className="mb-12 flex flex-col items-end gap-8 px-2 md:flex-row md:gap-12 md:px-12">
        {/* Left: Stats */}
        <div className="flex-1 space-y-6 pb-4 md:space-y-8">
          <div>
            <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Total Users
            </div>
            <div className="text-3xl font-bold tabular-nums text-zinc-100 md:text-4xl">
              {users.toLocaleString()}
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Active Series
            </div>
            <div
              className={`text-3xl font-bold tabular-nums transition-colors duration-300 md:text-4xl ${isOOM ? 'text-red-500' : 'text-zinc-100'}`}
            >
              {totalSeries.toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-zinc-400">Users × Labels = Series</div>
          </div>

          {isOOM && (
            <div className="animate-pulse rounded-lg border border-red-900 bg-red-900/20 px-4 py-3 text-sm font-medium text-red-300">
              💥 <strong>OOM Killed!</strong>
              <br />
              Server ran out of memory and crashed.
            </div>
          )}
        </div>

        {/* Right: The RAM Tank */}
        <div className="relative flex w-full flex-col items-center md:block md:w-auto">
          {/* Tank Container */}
          <div className="relative h-64 w-24 overflow-hidden rounded-lg border-2 border-zinc-800 bg-zinc-900 md:w-32">
            {/* Fluid */}
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out ${isOOM ? 'bg-red-600' : 'bg-blue-600'}`}
              style={{ height: `${fillPercentage}%` }}
            >
              {/* Surface line */}
              <div className="absolute top-0 h-1 w-full bg-white/10" />
            </div>

            {/* Markers */}
            <div className="absolute bottom-0 right-0 top-0 flex w-8 flex-col justify-between border-l border-zinc-700/50 py-2 pr-1 text-right font-mono text-[10px] text-zinc-400">
              <span>16GB</span>
              <span>12GB</span>
              <span>8GB</span>
              <span>4GB</span>
              <span>0GB</span>
            </div>
          </div>

          <div className="mt-3 text-center font-mono font-bold text-zinc-300">
            {memoryGB >= 1 ? memoryGB.toFixed(1) + ' GB' : memoryMB.toFixed(0) + ' MB'}
          </div>
          <div className="mt-1 text-center text-xs uppercase tracking-wider text-zinc-400">
            RAM Usage
          </div>
        </div>
      </div>

      {/* Full Width Slider Control */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:p-8">
        <div className="mb-4 flex items-end justify-between">
          <label className="text-sm font-bold uppercase tracking-wider text-zinc-300">
            Scale Users (Cardinality)
          </label>
          <span className="font-mono text-xs text-zinc-400">1k → 900k Users</span>
        </div>

        <div className="relative flex h-6 items-center">
          {/* Track */}
          <div className="absolute left-0 right-0 h-2 rounded-full bg-gradient-to-r from-blue-900 via-purple-900 to-red-900" />

          {/* Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="absolute z-10 h-full w-full cursor-pointer opacity-0"
          />

          {/* Thumb Visual */}
          <div
            className="pointer-events-none absolute h-6 w-6 rounded-full border-2 border-zinc-600 bg-zinc-200 shadow-md transition-all duration-75"
            style={{ left: `${sliderVal}%`, transform: 'translateX(-50%)' }}
          >
            <div
              className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${isOOM ? 'bg-red-500' : 'bg-blue-500'}`}
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm italic text-zinc-300">
          Drag to increase users. Watch how RAM fills up linearly with the exploding series count.
        </p>
      </div>
    </div>
  )
}

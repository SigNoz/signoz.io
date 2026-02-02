'use client'

import { useState, useRef } from 'react'

export default function QueryRace() {
  const [racing, setRacing] = useState(false)
  const [highCardProgress, setHighCardProgress] = useState(0)
  const [lowCardDone, setLowCardDone] = useState(false)

  // Animation loop
  const requestRef = useRef<number>(0)

  const start = () => {
    if (racing) return
    setRacing(true)
    setHighCardProgress(0)
    setLowCardDone(false)

    // Low card finishes "instantly" after a tiny delay to show the jump
    setTimeout(() => setLowCardDone(true), 150)

    // High card is slow linear scan
    const startTime = Date.now()
    const duration = 4000 // 4 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setHighCardProgress(progress * 100)

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate)
      } else {
        setRacing(false)
      }
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  return (
    <div className="mx-auto my-12 w-full max-w-3xl">
      <div className="flex flex-col gap-12">
        {/* Scenario 1: Index Lookup */}
        <div className="relative">
          <div className="mb-2 flex items-end justify-between">
            <h4 className="font-semibold text-zinc-100">
              Low Cardinality Query
              <span className="ml-2 text-sm font-normal text-zinc-400">(Indexed Lookup)</span>
            </h4>
            <span
              className={`text-sm font-bold transition-all ${lowCardDone ? 'scale-110 text-green-500' : 'text-zinc-500'}`}
            >
              {lowCardDone ? '0.05ms' : 'Waiting...'}
            </span>
          </div>

          <div className="relative flex h-12 items-center overflow-hidden rounded-lg bg-zinc-800 px-4">
            {/* Index Visual: Just a few sorted blocks */}
            <div className="flex w-full gap-1 opacity-50">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-6 flex-1 rounded-sm bg-zinc-600" />
              ))}
            </div>

            {/* The "JUMP" cursor */}
            <div
              className={`absolute bottom-0 top-0 flex w-8 items-center justify-center border-l-2 border-r-2 border-green-500 bg-green-900/40 transition-all duration-200
                 ${lowCardDone ? 'left-[40%]' : 'left-0'}`}
            >
              {lowCardDone && <span className="text-xs font-bold text-green-400">FOUND</span>}
            </div>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            The database jumps directly to the bucket. It doesn't scan everything.
          </p>
        </div>

        {/* Scenario 2: Full Scan */}
        <div className="relative">
          <div className="mb-2 flex items-end justify-between">
            <h4 className="font-semibold text-zinc-100">
              High Cardinality Query
              <span className="ml-2 text-sm font-normal text-zinc-400">(Full Scan)</span>
            </h4>
            <span
              className={`text-sm font-bold transition-all ${highCardProgress === 100 ? 'text-red-500' : 'text-zinc-500'}`}
            >
              {racing
                ? `${(highCardProgress * 15).toFixed(0)}ms`
                : highCardProgress === 100
                  ? '1500ms'
                  : 'Waiting...'}
            </span>
          </div>

          <div className="relative flex h-12 items-center overflow-hidden rounded-lg bg-zinc-800">
            {/* Scan Visual: Millions of tiny lines */}
            <div
              className="flex h-full w-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 2px, #3f3f46 2px, #3f3f46 4px)',
              }}
            ></div>

            {/* The "SCAN" cursor */}
            <div
              className="absolute bottom-0 top-0 border-r-2 border-red-500 bg-red-900/30"
              style={{ width: `${highCardProgress}%` }}
            >
              <div className="absolute right-0 top-1/2 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
                🔍
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            The database must check every single index entry because there are too many unique
            values to group effectively.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={start}
          disabled={racing}
          className={`rounded-full px-8 py-3 text-sm font-bold shadow-sm transition-all ${
            racing
              ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
              : 'bg-zinc-100 text-zinc-900 hover:scale-105 active:scale-95'
          }`}
        >
          {racing ? 'Scanning...' : 'Start Race'}
        </button>
      </div>
    </div>
  )
}

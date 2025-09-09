'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Request {
  id: number
  startTime: number
  duration: number
  isActive: boolean
  x?: number
  type?: 'fast' | 'normal' | 'slow' | 'timeout'
}

interface Metrics {
  average: number
  p50: number
  p95: number
  p99: number
}

const ResponseTimeVisualizer: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([])
  const [recentDurations, setRecentDurations] = useState<number[]>([])
  const [metrics, setMetrics] = useState<Metrics>({ average: 0, p50: 0, p95: 0, p99: 0 })
  const [activeRequestCount, setActiveRequestCount] = useState(0)
  const requestIdRef = useRef(0)
  const animationRef = useRef<number[]>([])

  // Realistic response time distribution
  const generateResponseTime = (): { duration: number; type: 'fast' | 'normal' | 'slow' | 'timeout' } => {
    const rand = Math.random()
    if (rand < 0.75) return { duration: 40 + Math.random() * 20, type: 'fast' } // 75%: 40-60ms (fast)
    if (rand < 0.90) return { duration: 80 + Math.random() * 40, type: 'normal' } // 15%: 80-120ms (normal)
    if (rand < 0.98) return { duration: 400 + Math.random() * 200, type: 'slow' } // 8%: 400-600ms (slow)
    return { duration: 4000 + Math.random() * 2000, type: 'timeout' } // 2%: 4-6s (timeout)
  }

  // Get color based on request type
  const getRequestColor = (type?: 'fast' | 'normal' | 'slow' | 'timeout'): string => {
    switch(type) {
      case 'fast': return 'bg-green-500'
      case 'normal': return 'bg-blue-500'
      case 'slow': return 'bg-yellow-500'
      case 'timeout': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const calculateMetrics = (durations: number[]): Metrics => {
    if (durations.length === 0) {
      return { average: 0, p50: 0, p95: 0, p99: 0 }
    }

    const sorted = [...durations].sort((a, b) => a - b)
    const average = durations.reduce((a, b) => a + b, 0) / durations.length
    const p50 = sorted[Math.floor(sorted.length * 0.5)]
    const p95 = sorted[Math.floor(sorted.length * 0.95)]
    const p99 = sorted[Math.floor(sorted.length * 0.99)]

    return { average, p50, p95, p99 }
  }

  const sendRequest = (isManual = false) => {
    // Limit concurrent requests to prevent overwhelming the visualization
    if (!isManual && activeRequestCount >= 3) return
    
    setActiveRequestCount(prev => prev + 1)
    const { duration, type } = generateResponseTime()
    const requestId = requestIdRef.current++
    const newRequest: Request = {
      id: requestId,
      startTime: Date.now(),
      duration,
      isActive: true,
      x: 0,
      type
    }

    setRequests(prev => [...prev.slice(-9), newRequest]) // Keep last 10 requests
    
    // Animate request - make it slower and more visible
    let startTime = Date.now()
    const animationDuration = Math.min(duration * 8, 3000) // Much slower animation, max 3 seconds
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      
      setRequests(prev => 
        prev.map(req => {
          if (req.id === requestId) {
            if (progress >= 1) {
              // Request complete
              if (req.isActive) {
                setRecentDurations(prevDurations => {
                  const updated = [...prevDurations.slice(-49), duration]
                  setMetrics(calculateMetrics(updated))
                  return updated
                })
                setActiveRequestCount(prev => Math.max(0, prev - 1))
              }
              return { ...req, isActive: false, x: 0 }
            }
            
            // Moving to server and back with smooth easing
            const easedProgress = progress < 0.5
              ? 2 * progress * progress // Ease in quadratic
              : 1 - Math.pow(-2 * progress + 2, 2) / 2 // Ease out quadratic
            
            const x = easedProgress <= 0.5 
              ? easedProgress * 2 * 100 
              : (1 - (easedProgress - 0.5) * 2) * 100
            
            return { ...req, x, isActive: true }
          }
          return req
        })
      )
      
      if (progress < 1) {
        const rafId = requestAnimationFrame(animate)
        animationRef.current[requestId] = rafId
      } else {
        delete animationRef.current[requestId]
      }
    }
    
    animate()
  }

  // Auto-play functionality
  useEffect(() => {
    // Start with some initial requests
    const initialDelay = setTimeout(() => {
      sendRequest()
    }, 500)

    // Then send requests at random intervals
    const interval = setInterval(() => {
      sendRequest()
    }, 500 + Math.random() * 1000) // Random interval between 0.5-1.5 seconds

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
      // Clean up all animation frames
      Object.values(animationRef.current).forEach(rafId => {
        if (typeof rafId === 'number') {
          cancelAnimationFrame(rafId)
        }
      })
    }
  }, [])

  const formatTime = (ms: number): string => {
    if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`
    return `${Math.round(ms)}ms`
  }

  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {/* Request Animation */}
      <div className="relative h-32 mb-8">
        <div className="absolute inset-0 flex items-center justify-between px-8">
          {/* Requester */}
          <button
            onClick={() => sendRequest(true)}
            className="relative z-10 w-20 h-20 bg-blue-500 hover:bg-blue-600 rounded-lg flex flex-col items-center justify-center text-white transition-colors cursor-pointer group"
          >
            <svg className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Client</span>
          </button>

          {/* Connection Line */}
          <div className="absolute left-28 right-28 h-0.5 bg-gray-300 dark:bg-gray-700 top-1/2 -translate-y-1/2">
            {requests.map(req => (
              req.isActive && (
                <div
                  key={req.id}
                  className={`absolute w-3 h-3 ${getRequestColor(req.type)} rounded-full -top-1 shadow-lg`}
                  style={{
                    left: `${req.x}%`,
                    transform: 'translateX(-50%)',
                    transition: 'none'
                  }}
                >
                  {/* Add a small glow effect */}
                  <div className={`absolute inset-0 ${getRequestColor(req.type)} rounded-full animate-ping opacity-75`} />
                </div>
              )
            ))}
          </div>

          {/* Server */}
          <div className="relative z-10 w-20 h-20 bg-gray-700 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center text-white">
            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            <span className="text-xs">Server</span>
          </div>
        </div>
      </div>

      {/* Metrics Display */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Average</div>
          <div className="text-2xl font-mono font-semibold text-gray-900 dark:text-gray-100">
            {formatTime(metrics.average)}
          </div>
          <div className="h-1 bg-orange-200 dark:bg-orange-900 rounded-full mt-2">
            <div 
              className="h-1 bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((metrics.average / 500) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">P50</div>
          <div className="text-2xl font-mono font-semibold text-gray-900 dark:text-gray-100">
            {formatTime(metrics.p50)}
          </div>
          <div className="h-1 bg-green-200 dark:bg-green-900 rounded-full mt-2">
            <div 
              className="h-1 bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((metrics.p50 / 500) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">P95</div>
          <div className="text-2xl font-mono font-semibold text-gray-900 dark:text-gray-100">
            {formatTime(metrics.p95)}
          </div>
          <div className="h-1 bg-yellow-200 dark:bg-yellow-900 rounded-full mt-2">
            <div 
              className="h-1 bg-yellow-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((metrics.p95 / 500) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">P99</div>
          <div className="text-2xl font-mono font-semibold text-gray-900 dark:text-gray-100">
            {formatTime(metrics.p99)}
          </div>
          <div className="h-1 bg-red-200 dark:bg-red-900 rounded-full mt-2">
            <div 
              className="h-1 bg-red-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((metrics.p99 / 500) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Legend and Info */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-center items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Fast (40-60ms)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Normal (80-120ms)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Slow (400-600ms)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Timeout (4-6s)</span>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Click client to add more requests • Based on last {recentDurations.length} requests
        </div>
      </div>
    </div>
  )
}

export default ResponseTimeVisualizer
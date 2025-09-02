'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Request {
  id: number
  x: number
  status: 'moving' | 'queued' | 'processing' | 'done'
  processingStartTime?: number
}

const ThroughputCapacityVisualizer: React.FC = () => {
  const [incomingRate, setIncomingRate] = useState(30) // requests per minute
  const [requests, setRequests] = useState<Request[]>([])
  const [queueLength, setQueueLength] = useState(0)
  const [throughput, setThroughput] = useState(0)
  const [avgResponseTime, setAvgResponseTime] = useState(200)
  const [processedCount, setProcessedCount] = useState(0)
  
  const requestIdRef = useRef(0)
  const lastProcessedRef = useRef<number[]>([])
  const serverCapacity = 40 // max requests per minute the server can handle
  
  // Calculate response time based on load
  const calculateResponseTime = (queueSize: number): number => {
    const baseTime = 200
    const queuePenalty = queueSize * 50 // Each queued request adds 50ms
    return Math.min(baseTime + queuePenalty, 2000) // Cap at 2 seconds
  }

  // Send requests based on incoming rate
  useEffect(() => {
    if (incomingRate === 0) return
    
    const interval = 60000 / incomingRate // Convert to milliseconds between requests
    
    const timer = setInterval(() => {
      const newRequest: Request = {
        id: requestIdRef.current++,
        x: 0,
        status: 'moving'
      }
      setRequests(prev => [...prev.slice(-20), newRequest]) // Keep last 20 requests
    }, interval)

    return () => clearInterval(timer)
  }, [incomingRate])

  // Animate and process requests
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setRequests(prev => {
        const updated = prev.map(req => {
          // Move request to server
          if (req.status === 'moving') {
            const newX = req.x + 5
            if (newX >= 100) {
              return { ...req, x: 100, status: 'queued' as const }
            }
            return { ...req, x: newX }
          }
          return req
        })

        // Process requests from queue
        const queued = updated.filter(r => r.status === 'queued')
        const processing = updated.filter(r => r.status === 'processing')
        const currentTime = Date.now()
        
        // Check if processing request is done
        const stillProcessing = processing.filter(req => {
          if (req.processingStartTime) {
            const responseTime = calculateResponseTime(queued.length)
            if (currentTime - req.processingStartTime >= responseTime) {
              setProcessedCount(prev => prev + 1)
              lastProcessedRef.current.push(currentTime)
              return false
            }
          }
          return true
        })

        // Start processing if server has capacity
        let finalRequests = updated
        if (stillProcessing.length === 0 && queued.length > 0) {
          const toProcess = queued[0]
          finalRequests = updated.map(req => 
            req.id === toProcess.id 
              ? { ...req, status: 'processing' as const, processingStartTime: currentTime }
              : req
          )
        }

        // Remove completed requests
        finalRequests = finalRequests.filter(r => 
          !(r.status === 'processing' && 
            r.processingStartTime && 
            currentTime - r.processingStartTime >= calculateResponseTime(queued.length))
        )

        // Update queue length
        const newQueueLength = finalRequests.filter(r => r.status === 'queued').length
        setQueueLength(newQueueLength)
        
        // Update response time
        setAvgResponseTime(calculateResponseTime(newQueueLength))

        return finalRequests
      })
    }, 50)

    return () => clearInterval(animationFrame)
  }, [])

  // Calculate throughput
  useEffect(() => {
    const interval = setInterval(() => {
      const oneMinuteAgo = Date.now() - 60000
      lastProcessedRef.current = lastProcessedRef.current.filter(t => t > oneMinuteAgo)
      setThroughput(lastProcessedRef.current.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getLoadIndicator = () => {
    const load = (incomingRate / serverCapacity) * 100
    if (load <= 75) return { color: 'bg-green-500', text: 'Healthy', textColor: 'text-green-600 dark:text-green-400' }
    if (load <= 100) return { color: 'bg-yellow-500', text: 'Increased', textColor: 'text-yellow-600 dark:text-yellow-400' }
    return { color: 'bg-red-500', text: 'Overloaded', textColor: 'text-red-600 dark:text-red-400' }
  }

  const loadStatus = getLoadIndicator()

  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {/* Input Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Incoming Requests: <span className="font-mono">{incomingRate}</span> req/min
          </label>
          <span className={`text-xs font-medium ${loadStatus.textColor}`}>
            {loadStatus.text}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="80"
          step="5"
          value={incomingRate}
          onChange={(e) => setIncomingRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0</span>
          <span>Server capacity: {serverCapacity} req/min</span>
          <span>80</span>
        </div>
      </div>

      {/* Animation Area */}
      <div className="relative h-24 mb-6 bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="absolute inset-4 flex items-center">
          {/* Client */}
          <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
            Client
          </div>

          {/* Request Path */}
          <div className="flex-1 mx-4 h-0.5 bg-gray-300 dark:bg-gray-600 relative">
            {requests.filter(r => r.status === 'moving').map(req => (
              <div
                key={req.id}
                className="absolute w-2 h-2 bg-blue-400 rounded-full -top-[3px]"
                style={{ left: `${req.x}%`, transform: 'translateX(-50%)' }}
              />
            ))}
          </div>

          {/* Server with Queue */}
          <div className="flex items-center gap-2">
            {/* Queue visualization */}
            <div className="flex gap-0.5">
              {requests.filter(r => r.status === 'queued').slice(0, 5).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
              ))}
              {queueLength > 5 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">+{queueLength - 5}</span>
              )}
            </div>

            {/* Server */}
            <div className="relative w-12 h-12 bg-gray-700 dark:bg-gray-600 rounded flex items-center justify-center text-white text-xs">
              Server
              {requests.some(r => r.status === 'processing') && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-500 dark:text-gray-400">Queue Length</div>
          <div className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100">
            {queueLength}
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div 
              className={`h-1 ${queueLength > 10 ? 'bg-red-500' : queueLength > 5 ? 'bg-yellow-500' : 'bg-green-500'} rounded-full transition-all duration-300`}
              style={{ width: `${Math.min(queueLength * 10, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-500 dark:text-gray-400">Throughput</div>
          <div className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100">
            {throughput} <span className="text-xs text-gray-500">req/min</span>
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div 
              className={`h-1 ${loadStatus.color} rounded-full transition-all duration-300`}
              style={{ width: `${Math.min((throughput / serverCapacity) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-3 rounded">
          <div className="text-xs text-gray-500 dark:text-gray-400">Response Time</div>
          <div className={`text-xl font-mono font-bold ${
            avgResponseTime < 300 ? 'text-green-600 dark:text-green-400' : 
            avgResponseTime < 800 ? 'text-yellow-600 dark:text-yellow-400' : 
            'text-red-600 dark:text-red-400'
          }`}>
            {avgResponseTime}ms
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div 
              className={`h-1 ${
                avgResponseTime < 300 ? 'bg-green-500' : 
                avgResponseTime < 800 ? 'bg-yellow-500' : 'bg-red-500'
              } rounded-full transition-all duration-300`}
              style={{ width: `${Math.min((avgResponseTime / 2000) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        {incomingRate <= serverCapacity ? 
          "System handling load well - throughput matches incoming rate" :
          "System overloaded - queue building, response times increasing, throughput capped"
        }
      </div>
    </div>
  )
}

export default ThroughputCapacityVisualizer
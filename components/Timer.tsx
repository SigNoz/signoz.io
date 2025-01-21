'use client'

import React, { useState, useEffect } from 'react'

interface TimerProps {
  eventDate: string
}

const CountdownTimer: React.FC<TimerProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const targetDate = new Date(eventDate).getTime()

    const intervalId = setInterval(() => {
      const now = new Date().getTime()
      const difference = Math.floor((targetDate - now) / 1000)

      if (difference <= 0) {
        clearInterval(intervalId)
        setTimeLeft('')
      } else {
        const days = Math.floor(difference / 86400)
        const hours = Math.floor((difference % 86400) / 3600)
        const minutes = Math.floor(((difference % 86400) % 3600) / 60)
        const seconds = difference % 60

        const formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`
        setTimeLeft(formattedTime)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [eventDate])

  return (
    <div className="w-[68%] text-signoz_vanilla-400">
      {timeLeft != '' ? (
        <>
          <span className="font-mono text-sm font-bold text-signoz_slate-50 sm:text-base">
            LIVE IN :
          </span>
          <span className="ml-2 font-mono ">{timeLeft}</span>
        </>
      ) : (
        'Event Started!'
      )}
    </div>
  )
}

export default CountdownTimer

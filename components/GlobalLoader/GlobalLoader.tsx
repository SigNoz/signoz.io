'use client';

import "./styles.css"
import { useEffect } from 'react'

export default function GlobalLoading() {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0)
    
    // Disable scrolling
    document.body.style.overflow = 'hidden'
    
    // Enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="z-10 h-screen flex items-center justify-center backdrop-blur-md bg-[rgba(60,65,82,0.1)] pointer-events-all cursor-not-allowed">
      <div className="flex gap-2">
        <div className="w-4 h-4 rounded-sm animate-[bounce_1s_0ms_infinite] bg-[#FF8C42]"></div>
        <div className="w-4 h-4 rounded-sm animate-[bounce_1s_100ms_infinite] bg-[#FF7B5B]"></div>
        <div className="w-4 h-4 rounded-sm animate-[bounce_1s_200ms_infinite] bg-[#FF6B74]"></div>
        <div className="w-4 h-4 rounded-sm animate-[bounce_1s_300ms_infinite] bg-[#FF5A8D]"></div>
      </div>
    </div>
  )
}
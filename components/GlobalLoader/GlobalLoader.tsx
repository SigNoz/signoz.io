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
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="box box-1"></div>
        <div className="box box-2"></div>
        <div className="box box-3"></div>
        <div className="box box-4"></div>
      </div>
    </div>
  )
} 
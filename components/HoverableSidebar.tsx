'use client'

import '../css/doc.css'
import React, { useState, useEffect } from 'react'
import DocsSidebar from '@/components/DocsSidebar/DocsSidebar'
import { Menu, X } from 'lucide-react'

const HoverableSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nearEdge = e.clientX <= 56
      setIsHovering(nearEdge)

      // Auto-open when cursor is near edge, but don't auto-close if manually opened
      if (nearEdge && !isOpen) {
        setIsOpen(true)
      } else if (!nearEdge && isOpen && !isHovering) {
        // Only auto-close if we're not hovering over the sidebar area
        const sidebarArea = e.clientX <= 256 + 56 // 256px is the sidebar width and 56px is the margin
        if (!sidebarArea) {
          setIsOpen(false)
        }
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      // Close sidebar when mouse leaves the window
      if (isOpen) {
        setIsOpen(false)
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isOpen, isHovering])

  return (
    <div className="hidden lg:block">
      {/* Compact square menu button - only show when closed */}
      {!isOpen && (
        <div
          className="fixed left-6 top-[71px] z-50 cursor-pointer transition-all duration-300"
          onClick={toggleSidebar}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded border border-gray-600/50 bg-gray-800/90 shadow-sm backdrop-blur-sm hover:bg-gray-700/90">
            <Menu size={16} className="text-gray-300" />
          </div>
        </div>
      )}

      {/* Collapsible Sidebar - styled exactly like docs layout */}
      <div
        className={`fixed left-0 top-[56px] z-40 h-full transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="doc-sidenav h-full border-r border-signoz_slate-500 bg-black">
          <DocsSidebar />
        </div>
      </div>
    </div>
  )
}

export default HoverableSidebar

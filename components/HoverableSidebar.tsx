'use client'

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
          className="fixed top-[71px] left-6 z-50 cursor-pointer transition-all duration-300"
          onClick={toggleSidebar}
        >
          <div className="border-border bg-card flex h-10 w-10 items-center justify-center rounded border shadow-sm backdrop-blur-sm hover:bg-gray-700/90">
            <Menu size={16} className="text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Collapsible Sidebar - styled exactly like docs layout */}
      <div
        className={`fixed top-[56px] left-0 z-40 h-full transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="border-border box-border h-full w-80 max-w-[320px] min-w-[320px] self-stretch border-r bg-black">
          <DocsSidebar />
        </div>
      </div>
    </div>
  )
}

export default HoverableSidebar

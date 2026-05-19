'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavDropdownContext } from './NavDropdownContext'
import { ProductDropdownContent } from './ProductDropdown'
import { ResourcesDropdownContent } from './ResourcesDropdown'
import { CompareSignozDropdownContent } from './CompareSignozDropdown'

export default function NavDropdownPanel() {
  const { activeId, closeDropdown, cancelClose, closeImmediate, getTriggerRect } =
    useNavDropdownContext()

  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [shouldTransition, setShouldTransition] = useState(false)
  const prevActiveId = useRef<string | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!activeId) {
      setIsVisible(false)
      prevActiveId.current = null
      return
    }

    const rect = getTriggerRect(activeId)
    if (!rect) return

    const isSwitching = prevActiveId.current !== null && prevActiveId.current !== activeId
    setShouldTransition(isSwitching)

    setPosition({ left: rect.left, top: rect.bottom + 4 })
    prevActiveId.current = activeId

    requestAnimationFrame(() => setIsVisible(true))
  }, [activeId, getTriggerRect])

  if (!mounted || !activeId) return null

  return createPortal(
    <div
      className="fixed z-50"
      style={{
        left: position.left,
        top: position.top,
        transition: shouldTransition
          ? 'left 250ms cubic-bezier(0.16, 1, 0.3, 1), top 250ms cubic-bezier(0.16, 1, 0.3, 1)'
          : 'none',
      }}
      onPointerEnter={cancelClose}
      onPointerLeave={closeDropdown}
    >
      {/* Bridge area between trigger and panel */}
      <div className="absolute -top-1 left-0 right-0 h-1" />

      <div
        className="origin-top-left rounded-[4px] border border-signoz_slate-500 bg-[hsl(240_5.88%_10%)] shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-4px) scale(0.96)',
          transition: 'opacity 150ms ease, transform 150ms ease',
        }}
      >
        {activeId === 'product' && <ProductDropdownContent onClose={closeImmediate} />}
        {activeId === 'resources' && <ResourcesDropdownContent onClose={closeImmediate} />}
        {activeId === 'compare' && <CompareSignozDropdownContent onClose={closeImmediate} />}
      </div>
    </div>,
    document.body
  )
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavDropdownContext } from './NavDropdownContext'
import { ProductDropdownContent } from './ProductDropdown'
import { ResourcesDropdownContent } from './ResourcesDropdown'
import { CompareSignozDropdownContent } from './CompareSignozDropdown'

export default function NavDropdownPanel() {
  const { activeId, closeDropdown, cancelClose, closeImmediate, getTriggerRect } =
    useNavDropdownContext()

  const [mounted, setMounted] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [shouldTransition, setShouldTransition] = useState(false)
  const prevActiveId = useRef<string | null>(null)

  useEffect(() => setMounted(true), [])

  // Escape key handler
  useEffect(() => {
    if (!activeId) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImmediate()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeId, closeImmediate])

  useEffect(() => {
    if (!activeId) {
      setIsVisible(false)
      // Keep mounted during close animation (150ms), then unmount
      const id = setTimeout(() => setShouldRender(false), 150)
      prevActiveId.current = null
      return () => clearTimeout(id)
    }

    setShouldRender(true)
    const rect = getTriggerRect(activeId)
    if (!rect) return

    const isSwitching = prevActiveId.current !== null && prevActiveId.current !== activeId
    setShouldTransition(isSwitching)

    // Clamp left so panel doesn't overflow the right viewport edge
    const panelWidth = activeId === 'product' ? 820 : 500
    const clampedLeft = Math.min(rect.left, window.innerWidth - panelWidth - 16)
    setPosition({ left: Math.max(16, clampedLeft), top: rect.bottom + 4 })
    prevActiveId.current = activeId

    requestAnimationFrame(() => setIsVisible(true))
  }, [activeId, getTriggerRect])

  // Click outside handler
  const panelRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeImmediate()
      }
    },
    [closeImmediate]
  )

  useEffect(() => {
    if (!activeId) return
    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [activeId, handleClickOutside])

  if (!mounted || !shouldRender) return null

  return (
    <>
      {createPortal(
        <div
          ref={panelRef}
          className="fixed z-50"
          style={{
            left: position.left,
            top: position.top,
            pointerEvents: isVisible ? 'auto' : 'none',
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
            {(activeId === 'product' || prevActiveId.current === 'product') && (
              <ProductDropdownContent onClose={closeImmediate} />
            )}
            {(activeId === 'resources' || prevActiveId.current === 'resources') && (
              <ResourcesDropdownContent onClose={closeImmediate} />
            )}
            {(activeId === 'compare' || prevActiveId.current === 'compare') && (
              <CompareSignozDropdownContent onClose={closeImmediate} />
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

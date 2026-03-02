'use client'

import React, { useEffect, useRef } from 'react'

const ToggleHeading = ({ children }: { children: React.ReactNode }) => {
  const summaryRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const checkHash = () => {
      if (typeof window === 'undefined' || !summaryRef.current) return
      const hash = window.location.hash.slice(1)
      if (!hash) return

      const details = summaryRef.current.closest('details')
      if (!details) return

      // Check if the hash target is inside this details element
      const target = document.getElementById(hash)
      if (target && details.contains(target)) {
        details.open = true
        // Scroll to target after opening
        setTimeout(() => {
          target.scrollIntoView()
        }, 0)
      }
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => {
      window.removeEventListener('hashchange', checkHash)
    }
  }, [])

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        className: `toggle-heading ${(child.props as any).className || ''}`,
        style: {
          margin: 0,
          ...(child.props as any).style,
        },
      })
    }
    return child
  })

  return (
    <summary ref={summaryRef} className="toggle-summary">
      {childrenWithProps}
    </summary>
  )
}

export default ToggleHeading

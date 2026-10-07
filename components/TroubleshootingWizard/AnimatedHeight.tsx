'use client'

import React, { useEffect, useRef } from 'react'

export default function AnimatedHeight({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const lastHeight = useRef<number | null>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    let settleTimer: ReturnType<typeof setTimeout> | undefined

    const settle = () => {
      if (settleTimer) clearTimeout(settleTimer)
      settleTimer = undefined
      outer.style.height = ''
      outer.style.overflowY = ''
    }

    const observer = new ResizeObserver(() => {
      const to = inner.offsetHeight
      const from = lastHeight.current
      lastHeight.current = to
      if (from === null || from === to) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // Retarget from the live height if a previous transition is mid-flight.
      const start = outer.style.height ? outer.getBoundingClientRect().height : from
      outer.style.overflowY = 'clip'
      outer.style.height = `${start}px`
      void outer.getBoundingClientRect() // force reflow so the transition starts from `start`
      outer.style.height = `${to}px`
      if (settleTimer) clearTimeout(settleTimer)
      settleTimer = setTimeout(settle, 300) // fallback if transitionend is lost
    })
    observer.observe(inner)

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target === outer && event.propertyName === 'height') settle()
    }
    outer.addEventListener('transitionend', onTransitionEnd)

    return () => {
      observer.disconnect()
      outer.removeEventListener('transitionend', onTransitionEnd)
      if (settleTimer) clearTimeout(settleTimer)
    }
  }, [])

  return (
    <div
      ref={outerRef}
      className="transition-[height] duration-200 ease-out motion-reduce:transition-none"
    >
      {/* flow-root contains the children's margins so offsetHeight is accurate */}
      <div ref={innerRef} className="flow-root">
        {children}
      </div>
    </div>
  )
}

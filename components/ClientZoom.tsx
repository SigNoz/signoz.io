'use client'

import React, { forwardRef, useCallback, useEffect, useRef, type ReactNode } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ZoomDiv = forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>(function ZoomDiv(
  { 'aria-owns': _, ...props },
  ref
) {
  return <div ref={ref} {...props} />
})

// Cover the library's 0.3s close transition + the subsequent scrollTo restore.
const SCROLL_RESTORE_MS = 500

export default function ClientZoom({ children }: { children: ReactNode }) {
  // Tracks the original html.scrollBehavior and a pending restore timer so
  // overlapping zoom toggles don't capture an already-overridden value.
  const restoreRef = useRef<{ prev: string; timer: number | null }>({ prev: '', timer: null })

  const handleZoomChange = useCallback((isZoomed: boolean) => {
    if (isZoomed) return
    // The library restores body position via window.scrollTo(0, prevScrollY).
    // Our global `html { scroll-behavior: smooth }` would animate that restore;
    // disable smooth scroll until the restore completes.
    const html = document.documentElement
    if (restoreRef.current.timer == null) {
      restoreRef.current.prev = html.style.scrollBehavior
    } else {
      window.clearTimeout(restoreRef.current.timer)
    }
    html.style.scrollBehavior = 'auto'
    restoreRef.current.timer = window.setTimeout(() => {
      document.documentElement.style.scrollBehavior = restoreRef.current.prev
      restoreRef.current.timer = null
    }, SCROLL_RESTORE_MS)
  }, [])

  useEffect(
    () => () => {
      if (restoreRef.current.timer != null) {
        window.clearTimeout(restoreRef.current.timer)
        document.documentElement.style.scrollBehavior = restoreRef.current.prev
      }
    },
    []
  )

  return (
    <Zoom wrapElement={ZoomDiv as unknown as 'div'} onZoomChange={handleZoomChange}>
      {children}
    </Zoom>
  )
}

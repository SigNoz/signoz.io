'use client'

import { useEffect, type RefObject } from 'react'

/** Pupil follows the cursor after the dock has settled. */
export function useNozPeekEyeTracking({
  enabled,
  dismissed,
  anchoredRef,
  bodyRef,
}: {
  enabled: boolean
  dismissed: boolean
  anchoredRef: RefObject<boolean>
  bodyRef: RefObject<HTMLDivElement | null>
}) {
  useEffect(() => {
    if (!enabled || dismissed) return

    const onMove = (e: MouseEvent) => {
      if (!anchoredRef.current) return
      const eye = bodyRef.current?.querySelector('.noz-peek-eye-white') as SVGCircleElement | null
      const pupil = bodyRef.current?.querySelector('.noz-peek-pupil') as SVGGElement | null
      if (!eye || !pupil) return

      const r = eye.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const maxOffset = 1.25
      const mag = Math.min(1, dist / 160) * maxOffset
      const ox = (dx / dist) * mag
      const oy = (dy / dist) * mag
      pupil.style.transform = `translate(${ox.toFixed(3)}px, ${oy.toFixed(3)}px)`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, dismissed, anchoredRef, bodyRef])
}

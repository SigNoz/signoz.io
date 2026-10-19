'use client'

import { useEffect, type RefObject } from 'react'

export function onceVisible(
  el: Element,
  onVisible: () => void,
  options?: IntersectionObserverInit
): () => void {
  if (!('IntersectionObserver' in window)) {
    onVisible()
    return () => {}
  }
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      onVisible()
      io.disconnect()
    }
  }, options)
  io.observe(el)
  return () => io.disconnect()
}

interface PeekRevealOptions {
  observeRef: RefObject<HTMLElement | null>
  liveRefs: RefObject<HTMLElement | null>[]
  liveClass: string
  readyDelayMs: number
  threshold: number
  eyeRef: RefObject<SVGCircleElement | null>
  pupilRef: RefObject<SVGGElement | null>
}

export function usePeekReveal({
  observeRef,
  liveRefs,
  liveClass,
  readyDelayMs,
  threshold,
  eyeRef,
  pupilRef,
}: PeekRevealOptions) {
  useEffect(() => {
    const observed = observeRef.current
    if (!observed) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ready = false
    let raf = 0

    const reveal = () => {
      liveRefs.forEach((ref) => ref.current?.classList.add(liveClass))
      window.setTimeout(
        () => {
          ready = true
        },
        reduced ? 0 : readyDelayMs
      )
    }

    const disconnect = onceVisible(observed, reveal, { threshold })

    const onMouseMove = (event: MouseEvent) => {
      if (!ready || reduced || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const eye = eyeRef.current
        const pupil = pupilRef.current
        if (!eye || !pupil) return
        const rect = eye.getBoundingClientRect()
        const deltaX = event.clientX - (rect.left + rect.width / 2)
        const deltaY = event.clientY - (rect.top + rect.height / 2)
        const distance = Math.hypot(deltaX, deltaY) || 1
        const magnitude = Math.min(1, distance / 160) * 1.25
        pupil.style.transform = `translate(${((deltaX / distance) * magnitude).toFixed(3)}px, ${(
          (deltaY / distance) *
          magnitude
        ).toFixed(3)}px)`
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveClass, readyDelayMs, threshold])
}

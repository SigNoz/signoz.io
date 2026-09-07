'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import './footer-fx.css'

export default function FooterStatus() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const nozRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const noz = nozRef.current
    if (!noz) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ready = false
    let raf = 0

    const reveal = () => {
      noz.classList.add('is-live')
      window.setTimeout(
        () => {
          ready = true
        },
        reduced ? 0 : 1200
      )
    }

    let io: IntersectionObserver | undefined
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            reveal()
            io?.disconnect()
          }
        },
        { threshold: 0.35 }
      )
      io.observe(noz)
    } else {
      reveal()
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!ready || reduced || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const eye = noz.querySelector('.footer-status-noz__eye')
        const pupil = noz.querySelector<SVGGElement>('.footer-status-noz__pupil')
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
      io?.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className="footer-status-wrap">
      <div ref={nozRef} className="footer-status-noz" aria-hidden="true" data-markdown-ignore>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <rect
            x="4.36"
            y="8.5"
            width="15.46"
            height="11.98"
            rx="1.76"
            fill="var(--bg-cherry-500)"
          />
          <g className="footer-status-noz__head">
            <circle
              className="footer-status-noz__eye"
              cx="12.02"
              cy="14.49"
              r="3.88"
              fill="#F5F5F5"
            />
            <g className="footer-status-noz__pupil">
              <path
                d="M12.02 12.8c0 .93-.75 1.69-1.68 1.69-.31 0-.59-.08-.84-.22-.03.28 0 .58.08.87.36 1.35 1.75 2.15 3.1 1.79 1.35-.36 2.15-1.75 1.79-3.1-.32-1.2-1.47-1.97-2.67-1.86.14.24.22.53.22.83Z"
                fill="#0A0C10"
              />
            </g>
            <path
              d="M8.34 7.95 9.83 4.31a3.56 3.56 0 0 1 1.52-1.68l2.57-1.36c.21-.12.46.08.4.31l-.65 2.49a.85.85 0 0 0 .04.54l1.33 3.34h-3.62l.21-.62.7-.24a.28.28 0 0 0 0-.53l-.7-.23-.24-.71a.28.28 0 0 0-.53 0l-.23.71-.71.23a.28.28 0 0 0 0 .53l.71.24.2.62H8.34Zm-.56-.04h7.82a.56.56 0 1 1 0 1.12H7.78a.56.56 0 1 1 0-1.12Z"
              fill="var(--bg-robin-500)"
            />
          </g>
        </svg>
      </div>
      <svg className="footer-status-noz__hands" viewBox="0 0 34 7" fill="none" aria-hidden="true">
        <rect width="3.53" height="6.17" rx="1.47" fill="var(--bg-cherry-500)" />
        <rect x="30.47" width="3.53" height="6.17" rx="1.47" fill="var(--bg-cherry-500)" />
      </svg>
      <Link
        href="https://status.signoz.io/"
        target="_blank"
        prefetch={false}
        className="footer-status"
      >
        <span className="footer-status__dot" aria-hidden="true" />
        All systems operational
      </Link>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'

const DOT_GRID = { cols: 16, rows: 2, spacing: 7, radius: 1.6 }
const BASE_OPACITY = 0.14

export default function AnimatedDotGrid() {
  const svgRef = useRef<SVGSVGElement>(null)

  const { cols, rows, spacing, radius } = DOT_GRID
  const width = (cols - 1) * spacing + 6
  const height = (rows - 1) * spacing + 8

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dotEls = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-dot]'))
    const glowEls = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-glow]'))
    const dots = dotEls.map((el, i) => ({
      el,
      glow: glowEls[i],
      col: i % cols,
      row: Math.floor(i / cols),
      freq: 0.8 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      pop: 0,
    }))

    let raf = 0
    let visible = false
    let t = 0
    let last = performance.now()

    const paint = (dt: number) => {
      t += dt
      for (const d of dots) {
        const wave = 0.5 + 0.5 * Math.sin(t * 2.1 - d.col * 0.5 - d.row * 0.45)
        const own = 0.5 + 0.5 * Math.sin(t * d.freq + d.phase)
        if (Math.random() < 0.0035) d.pop = 1
        d.pop *= Math.pow(0.9, dt * 60)
        let e = wave * 0.55 + own * 0.45
        e = Math.pow(e, 1.7)
        e = Math.min(1, e + d.pop * 0.75)
        d.el.setAttribute('fill-opacity', (BASE_OPACITY + e * (1 - BASE_OPACITY)).toFixed(3))
        d.glow?.setAttribute('fill-opacity', (e * e * 0.55).toFixed(3))
      }
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      paint(dt)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = Boolean(entries[0]?.isIntersecting)
        if (visible) start()
      },
      { rootMargin: '80px' }
    )
    io.observe(svg)

    const onVisibility = () => {
      if (!document.hidden) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(raf)
    }
  }, [cols])

  const cells: { cx: number; cy: number; key: string }[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({ cx: 3 + col * spacing, cy: 4 + row * spacing, key: `${row}-${col}` })
    }
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      data-markdown-ignore
      className="shrink-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id="agentDotGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <g filter="url(#agentDotGlow)">
        {cells.map((cell) => (
          <circle
            key={`glow-${cell.key}`}
            data-glow
            cx={cell.cx}
            cy={cell.cy}
            r={radius}
            fill="var(--bg-robin-500)"
            fillOpacity={0}
          />
        ))}
      </g>
      {cells.map((cell) => (
        <circle
          key={cell.key}
          data-dot
          cx={cell.cx}
          cy={cell.cy}
          r={radius}
          fill="var(--bg-robin-500)"
          fillOpacity={0.4}
        />
      ))}
    </svg>
  )
}

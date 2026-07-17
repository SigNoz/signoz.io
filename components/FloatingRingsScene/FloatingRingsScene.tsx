'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import './FloatingRingsScene.css'

interface FloatingRingsSceneProps {
  src: string
  alt: string
  className?: string
}

/**
 * Dual-canvas rings + sparks wrapping a floating illustration.
 * Image + rings share one float animation (no mouse tilt).
 */
export default function FloatingRingsScene({ src, alt, className = '' }: FloatingRingsSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const fgCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const bgCanvas = bgCanvasRef.current
    const fgCanvas = fgCanvasRef.current
    if (!container || !bgCanvas || !fgCanvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const bgCtx = bgCanvas.getContext('2d')
    const fgCtx = fgCanvas.getContext('2d')
    if (!bgCtx || !fgCtx) return

    const metrics = { width: 0, height: 0, cx: 0, cy: 0, baseRadius: 0 }
    let rafId = 0

    const ringOffsets = [0, 18, 48, 96]
    const NUM_SPARKS = 80

    const resize = () => {
      metrics.width = bgCanvas.width = fgCanvas.width = container.clientWidth
      metrics.height = bgCanvas.height = fgCanvas.height = container.clientHeight
      metrics.cx = metrics.width / 2
      metrics.cy = metrics.height / 2
      metrics.baseRadius = Math.min(metrics.width, metrics.height) * 0.38
    }

    type RingGroup = { y: number; speed: number }
    const ringGroup: RingGroup = { y: 0, speed: 0.8 }

    type Spark = {
      angle: number
      y: number
      radiusOffset: number
      vY: number
      vRadius: number
      color: string
      size: number
    }

    const resetSpark = (s: Spark) => {
      s.angle = Math.random() * Math.PI * 2
      s.y = metrics.height / 2 + 50
      s.radiusOffset = (Math.random() - 0.5) * 50
      s.vY = 0
      s.vRadius = 0
      s.color = '#ffffff'
      s.size = Math.random() * 2 + 0.5
    }

    const createSpark = (): Spark => {
      const s: Spark = {
        angle: 0,
        y: 0,
        radiusOffset: 0,
        vY: 0,
        vRadius: 0,
        color: '#ffffff',
        size: 1,
      }
      resetSpark(s)
      s.y = (Math.random() - 0.5) * Math.max(metrics.height, 1)
      return s
    }

    resize()
    ringGroup.y = metrics.height / 2 + 100
    const sparks: Spark[] = Array.from({ length: NUM_SPARKS }, createSpark)

    const updateRingGroup = () => {
      ringGroup.y -= ringGroup.speed
      if (ringGroup.y < -metrics.height / 2 - 150) {
        ringGroup.y = metrics.height / 2 + 150
      }
    }

    const drawRingGroup = () => {
      const { cx, cy, baseRadius, height } = metrics
      for (const offset of ringOffsets) {
        const currentY = ringGroup.y + offset
        const drawY = Math.round(cy + currentY)
        let opacity = Math.cos((currentY / (height / 2)) * (Math.PI / 2))
        opacity = Math.max(0, opacity)
        opacity = Math.pow(opacity, 1.5)

        if (opacity > 0.005) {
          bgCtx.beginPath()
          bgCtx.ellipse(
            cx,
            drawY,
            baseRadius,
            baseRadius * 0.25,
            0,
            Math.PI - 0.05,
            Math.PI * 2 + 0.05
          )
          bgCtx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`
          bgCtx.lineWidth = 1.5
          bgCtx.stroke()
          bgCtx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`
          bgCtx.lineWidth = 0.5
          bgCtx.stroke()

          fgCtx.beginPath()
          fgCtx.ellipse(cx, drawY, baseRadius, baseRadius * 0.25, 0, -0.05, Math.PI + 0.05)
          fgCtx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`
          fgCtx.lineWidth = 1.5
          fgCtx.stroke()
          fgCtx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`
          fgCtx.lineWidth = 0.5
          fgCtx.stroke()
        }
      }
    }

    const updateSpark = (s: Spark) => {
      s.vY += (Math.random() - 0.5) * 0.2
      s.vRadius += (Math.random() - 0.5) * 1.5
      s.vY *= 0.92
      s.vRadius *= 0.85
      s.angle += 0.005
      s.y += s.vY - 1.5
      s.radiusOffset += s.vRadius
      s.radiusOffset += (0 - s.radiusOffset) * 0.02
      if (s.y < -metrics.height / 2 - 50) resetSpark(s)
    }

    const drawSpark = (s: Spark) => {
      const { cx, cy, baseRadius, height } = metrics
      const depth = Math.sin(s.angle)
      let yOpacity = Math.cos((s.y / (height / 2)) * (Math.PI / 2))
      yOpacity = Math.max(0, yOpacity)
      const scale = 1 + depth * 0.4
      const opacity = 0.6 * yOpacity * (0.4 + depth * 0.6)

      if (opacity > 0.02) {
        const r = baseRadius + s.radiusOffset
        const x = cx + Math.cos(s.angle) * r
        const y = cy + s.y + depth * r * 0.25
        const targetCtx = depth < 0 ? bgCtx : fgCtx
        targetCtx.beginPath()
        targetCtx.arc(x, y, s.size * scale, 0, Math.PI * 2)
        targetCtx.fillStyle = s.color
        targetCtx.globalAlpha = opacity
        targetCtx.fill()
      }
    }

    const animate = () => {
      bgCtx.clearRect(0, 0, metrics.width, metrics.height)
      fgCtx.clearRect(0, 0, metrics.width, metrics.height)

      bgCtx.globalAlpha = 1
      fgCtx.globalAlpha = 1
      bgCtx.globalCompositeOperation = 'screen'
      fgCtx.globalCompositeOperation = 'screen'

      updateRingGroup()
      drawRingGroup()
      for (const s of sparks) {
        updateSpark(s)
        drawSpark(s)
      }

      bgCtx.globalCompositeOperation = 'source-over'
      fgCtx.globalCompositeOperation = 'source-over'
      bgCtx.globalAlpha = 1
      fgCtx.globalAlpha = 1

      rafId = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-visible bg-transparent ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle at center, transparent 30%, rgba(10, 12, 16, 0.55) 100%)',
        }}
        aria-hidden
      />
      {/* Image + rings stay behind card grids (cards use opaque bg + higher z-index) */}
      <div className="floating-rings-layer absolute inset-0 z-0">
        <canvas
          ref={bgCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ transform: 'translateZ(0)' }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <Image
            src={src}
            alt={alt}
            width={495}
            height={527}
            className="floating-rings-img"
            unoptimized
          />
        </div>
        <canvas
          ref={fgCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ transform: 'translateZ(0)' }}
          aria-hidden
        />
      </div>
    </div>
  )
}

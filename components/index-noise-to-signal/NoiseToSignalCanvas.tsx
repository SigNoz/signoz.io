'use client'

import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { themeRgb } from '@/utils/cssColor'
import styles from './NoiseToSignal.module.css'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerReducedMotionSnapshot() {
  return false
}

type ThemeToken = `--${string}`
type Rgb = { r: number; g: number; b: number }

const SPIKE_AMP = 38
const TAIL_LEN = 46
const PULSE_WIDTH = 44
const PULSE_SPEED = 1.75
const GRID_STEP = 40

interface Trace {
  speed: number
  amp: number
  offset: number
  token: ThemeToken
}

const TRACES: Trace[] = [
  { speed: 0.012, amp: 40, offset: 0, token: '--bg-sakura-500' },
  { speed: 0.018, amp: 30, offset: 100, token: '--bg-cherry-500' },
  { speed: 0.009, amp: 50, offset: 200, token: '--bg-amber-500' },
  { speed: 0.024, amp: 20, offset: 50, token: '--bg-cherry-500' },
  { speed: 0.015, amp: 35, offset: 150, token: '--bg-forest-500' },
]

const PILL_MESSAGES: { text: string; token: ThemeToken }[] = [
  { text: 'All systems stable', token: '--bg-forest-500' },
  { text: 'Threshold recovered', token: '--bg-robin-500' },
  { text: 'Anomaly detected', token: '--bg-amber-500' },
  { text: 'Mayday', token: '--bg-cherry-500' },
  { text: 'System stress resolved', token: '--bg-sakura-500' },
]

interface Pulse {
  x: number
  dir: number
  el: HTMLDivElement
}

function rgba(color: Rgb, alpha: number) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  }
}

export default function NoiseToSignalCanvas() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const syncRunRef = useRef<(() => void) | null>(null)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  )

  useEffect(() => {
    pausedRef.current = paused
    overlayRef.current?.classList.toggle(styles.overlayPaused, paused)
    syncRunRef.current?.()
  }, [paused])

  useEffect(() => {
    if (!stageRef.current || !canvasRef.current || !overlayRef.current) return
    const stage = stageRef.current
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    const maybeCtx = canvas.getContext('2d')
    if (!maybeCtx) return
    const ctx = maybeCtx

    let width = 0
    let height = 0
    let time = 0
    let rafId = 0
    let running = false
    let inView = false
    let pulseCount = 0
    let pillIndex = 0
    let pulses: Pulse[] = []
    let mouseX = -1
    let mouseY = -1
    let mouseOnLeft = false

    let robin: Rgb = { r: 128, g: 128, b: 128 }
    let foreground: Rgb = { r: 128, g: 128, b: 128 }
    let traceColors: Rgb[] = []

    const pendingTimeouts = new Set<number>()

    function syncColors() {
      robin = themeRgb(stage, '--bg-robin-500')
      foreground = themeRgb(stage, '--l1-foreground')
      traceColors = TRACES.map((trace) => themeRgb(stage, trace.token))
    }

    function resize() {
      const w = stage.clientWidth
      const h = stage.clientHeight
      if (w === 0 || h === 0) return
      width = w
      height = h
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function createPill(
      x: number,
      dir: number,
      cy: number,
      opts?: { messageIndex?: number; immediate?: boolean }
    ) {
      const meta = PILL_MESSAGES[(opts?.messageIndex ?? pillIndex) % PILL_MESSAGES.length]
      if (opts?.messageIndex === undefined) pillIndex++

      const pill = document.createElement('div')
      pill.className = styles.pill
      pill.style.setProperty('--pill-accent', `var(${meta.token})`)

      const dot = document.createElement('span')
      dot.className = styles.pillDot
      dot.style.animationDelay = `${(Math.random() * 1.8).toFixed(2)}s`

      const label = document.createElement('span')
      label.textContent = meta.text

      pill.append(dot, label)

      const tailTipY = cy + dir * (SPIKE_AMP + TAIL_LEN)
      pill.style.left = `${x}px`
      pill.style.top = dir === -1 ? `${tailTipY - 28}px` : `${tailTipY + 6}px`
      overlay.appendChild(pill)

      if (opts?.immediate) {
        pill.classList.add(styles.pillVisible)
      } else {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => pill.classList.add(styles.pillVisible))
        })
      }
      return pill
    }

    function retirePill(el: HTMLDivElement) {
      el.classList.remove(styles.pillVisible)
      el.classList.add(styles.pillFading)
      const id = window.setTimeout(() => {
        pendingTimeouts.delete(id)
        el.remove()
      }, 550)
      pendingTimeouts.add(id)
    }

    function drawFrame() {
      if (!width || !height || traceColors.length === 0) return
      ctx.clearRect(0, 0, width, height)

      const cy = height / 2
      const cx = width / 2

      TRACES.forEach((trace, i) => {
        ctx.beginPath()
        ctx.lineWidth = 1
        const alpha = 0.45 + Math.sin(time * 0.015 + i) * 0.15
        ctx.strokeStyle = rgba(traceColors[i], alpha)
        for (let x = 0; x <= cx; x += 3) {
          const progress = x / cx
          const mergeFactor = 1 - Math.pow(progress, 3)
          const baseWave =
            Math.sin(x * trace.speed + time * trace.speed * 0.5 + trace.offset) * trace.amp
          const noiseVal = (Math.random() - 0.5) * 28 * mergeFactor
          let mouseNudge = 0
          if (mouseOnLeft && mouseX >= 0) {
            const dx = x - mouseX
            const dy = cy + baseWave * mergeFactor + (i - 2) * 40 * mergeFactor - mouseY
            const dist = Math.sqrt(dx * dx + dy * dy)
            const influence = Math.max(0, 1 - dist / 120)
            mouseNudge = dy * influence * 0.18
          }
          const y =
            cy + (baseWave + noiseVal) * mergeFactor + (i - 2) * 40 * mergeFactor + mouseNudge
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      ctx.beginPath()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = rgba(robin, 1)
      for (let x = Math.floor(cx); x <= width; x += 1) {
        let yOffset = 0
        for (const p of pulses) {
          if (Math.abs(x - p.x) < PULSE_WIDTH) {
            const dist = (x - p.x) / (PULSE_WIDTH / 3)
            yOffset += p.dir * SPIKE_AMP * Math.exp(-(dist * dist))
          }
        }
        const y = cy + yOffset
        if (x === Math.floor(cx)) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      pulses.forEach((p) => {
        const crestY = cy + p.dir * SPIKE_AMP
        const tailTipY = cy + p.dir * (SPIKE_AMP + TAIL_LEN)

        ctx.beginPath()
        ctx.setLineDash([3, 4])
        ctx.strokeStyle = rgba(robin, 0.28)
        ctx.lineWidth = 1
        ctx.moveTo(p.x, crestY)
        ctx.lineTo(p.x, tailTipY)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.beginPath()
        ctx.strokeStyle = rgba(robin, 0.4)
        ctx.lineWidth = 1
        ctx.moveTo(p.x - 4, tailTipY)
        ctx.lineTo(p.x + 4, tailTipY)
        ctx.stroke()
      })

      ctx.lineWidth = 1
      ctx.strokeStyle = rgba(foreground, 0.07)
      ctx.setLineDash([3, 5])
      ctx.beginPath()
      for (let y = 0; y < height; y += GRID_STEP) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      for (let x = 0; x < width; x += GRID_STEP) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      ctx.stroke()
      ctx.setLineDash([])

      ctx.beginPath()
      ctx.setLineDash([4, 5])
      ctx.strokeStyle = rgba(foreground, 0.12)
      ctx.lineWidth = 1
      ctx.moveTo(cx, 0)
      ctx.lineTo(cx, height)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.beginPath()
      ctx.strokeStyle = rgba(robin, 0.07)
      ctx.lineWidth = 1
      for (const r of [90, 180, 270]) {
        ctx.moveTo(cx + r, cy)
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
      }
      ctx.stroke()

      ctx.beginPath()
      ctx.fillStyle = rgba(robin, 1)
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.strokeStyle = rgba(mixRgb(robin, foreground, 0.4), 1)
      ctx.lineWidth = 1
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.stroke()
    }

    function tick() {
      if (!running) return

      time += 0.2
      const cy = height / 2
      const cx = width / 2

      if (Math.random() < 0.005) {
        const dir = pulseCount % 2 === 0 ? -1 : 1
        const el = createPill(cx, dir, cy)
        pulses.push({ x: cx, dir, el })
        pulseCount++
      }

      pulses = pulses.filter((p) => {
        if (p.x > width + 80) {
          retirePill(p.el)
          return false
        }
        return true
      })

      pulses.forEach((p) => {
        p.x += PULSE_SPEED
        p.el.style.left = `${p.x}px`
      })

      drawFrame()
      rafId = requestAnimationFrame(tick)
    }

    function shouldRun() {
      return inView && !pausedRef.current && !document.hidden
    }

    function updateLoop() {
      if (shouldRun()) {
        if (running) return
        running = true
        rafId = requestAnimationFrame(tick)
      } else {
        running = false
        cancelAnimationFrame(rafId)
      }
    }

    function buildStaticScene() {
      overlay.replaceChildren()
      pulses = []
      const cy = height / 2
      const cx = width / 2
      const bumpX = cx + (width - cx) * 0.32
      const dipX = cx + (width - cx) * 0.72
      pulses.push({
        x: bumpX,
        dir: -1,
        el: createPill(bumpX, -1, cy, { messageIndex: 2, immediate: true }),
      })
      pulses.push({
        x: dipX,
        dir: 1,
        el: createPill(dipX, 1, cy, { messageIndex: 0, immediate: true }),
      })
      drawFrame()
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      mouseOnLeft = mouseX < width / 2
    }

    function onPointerLeave() {
      mouseOnLeft = false
      mouseX = -1
    }

    resize()
    syncColors()

    const afterResize = prefersReducedMotion
      ? buildStaticScene
      : () => {
          if (!running) drawFrame()
        }
    const resizeObserver = new ResizeObserver(() => {
      resize()
      afterResize()
    })
    resizeObserver.observe(stage)

    const themeObserver = new MutationObserver(() => {
      syncColors()
      if (!running) drawFrame()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    let io: IntersectionObserver | undefined

    if (prefersReducedMotion) {
      buildStaticScene()
    } else {
      drawFrame()

      stage.addEventListener('pointermove', onPointerMove)
      stage.addEventListener('pointerleave', onPointerLeave)
      document.addEventListener('visibilitychange', updateLoop)
      syncRunRef.current = updateLoop

      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(
          ([entry]) => {
            inView = entry.isIntersecting
            updateLoop()
          },
          { rootMargin: '120px' }
        )
        io.observe(stage)
      } else {
        inView = true
        updateLoop()
      }
    }

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      io?.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', updateLoop)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', onPointerLeave)
      pendingTimeouts.forEach((id) => window.clearTimeout(id))
      pendingTimeouts.clear()
      overlay.replaceChildren()
      syncRunRef.current = null
    }
  }, [prefersReducedMotion])

  return (
    <div className="grid aspect-[16/9] max-h-[70vh] w-full grid-rows-[2rem_minmax(0,1fr)_2.5rem]">
      <div className="border-b border-[var(--l2-border)]" aria-hidden data-markdown-ignore />
      <div
        ref={stageRef}
        className="relative min-h-0 overflow-hidden"
        aria-hidden
        data-markdown-ignore
      >
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
        <div ref={overlayRef} className={styles.overlay} />
      </div>
      <div className="flex items-center justify-end border-t border-[var(--l2-border)] px-3">
        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((prev) => !prev)}
            aria-pressed={paused}
            aria-label="Pause animation"
            className="inline-flex h-7 w-7 items-center justify-center rounded text-[var(--l3-foreground)] transition-colors hover:text-[var(--l1-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-background)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--l1-background)]"
          >
            {paused ? (
              <Play className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

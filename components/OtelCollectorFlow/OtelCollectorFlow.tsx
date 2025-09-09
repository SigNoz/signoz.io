'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type ShapeType = 'circle' | 'diamond' | 'triangle' | 'square'

type Particle = {
  id: number
  // 0..1 progress across the full canvas width
  t: number
  // unique stream row (0,1,2)
  stream: number
  shape: ShapeType
  color: string
  speed: number
}

// Theme palettes
const THEME_DEFAULT = {
  serverColor: '#EF4444',
  collectorBorder: '#fb7185', // rose-400
  stageBorder: '#fb7185',
  stageText: '#fecdd3', // rose-200
  backendBg: '#F59E0B',
  backendText: 'Observability Backend',
  normalized: '#22D3EE',
}

const THEME_SIGNOZ = {
  serverColor: '#FF6A2B',
  collectorBorder: '#4F46E5',
  stageBorder: '#4F46E5',
  stageText: '#E5E7EB',
  backendBg: '#4F46E5',
  backendText: 'SigNoz',
  normalized: '#4F46E5',
}

const BASE_W = 920
const BASE_H = 320

// Server block layout constants (to visually emit from labels)
const SERVER_LEFT = 40
const SERVER_LABEL_W = 200
const SERVER_LABEL_H = 72

// Collector stage sizing for visible vertical gaps
const STAGE_H = 74
const STAGE_GAP = 30

// X breakpoints as fractions of the drawable width
// servers -> receiver -> processor -> exporter -> backend
const BREAKS = {
  receiver: 0.28, // servers -> receiver entrance
  processor: 0.52, // inside collector: receiver -> processor
  exporter: 0.72, // inside collector: processor -> exporter
  backend: 0.9, // exporter -> backend
}

let nextId = 1

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomShape(): ShapeType {
  return 'square' // single server sends squares
}

function ServerLabel({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex select-none items-center justify-center rounded-xl px-4 text-center text-sm font-medium text-white shadow"
      style={{ background: color, width: SERVER_LABEL_W, height: SERVER_LABEL_H }}
    >
      {label}
    </div>
  )
}

function Shape({ shape, size = 14, color }: { shape: ShapeType; size?: number; color: string }) {
  // Use SVG so we can easily morph shapes by swapping elements
  const s = size
  if (shape === 'circle') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={s / 2} cy={s / 2} r={s / 2} fill={color} />
      </svg>
    )
  }

  if (shape === 'diamond') {
    const mid = s / 2
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <polygon points={`${mid},0 ${s},${mid} ${mid},${s} 0,${mid}`} fill={color} />
      </svg>
    )
  }

  if (shape === 'square') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <rect x={0} y={0} width={s} height={s} rx={3} fill={color} />
      </svg>
    )
  }

  // triangle
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <polygon points={`0,${s} ${s},${s} ${s / 2},0`} fill={color} />
    </svg>
  )
}

export default function OtelCollectorFlow() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [running, setRunning] = useState(true)
  const frame = useRef<number | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const lastTs = useRef<number | null>(null)
  const [sigNozMode, setSigNozMode] = useState(false)
  const theme = useMemo(() => (sigNozMode ? THEME_SIGNOZ : THEME_DEFAULT), [sigNozMode])

  const makeParticle = useCallback((stream: number): Particle => {
    return {
      id: nextId++,
      t: 0,
      stream,
      shape: randomShape(),
      color: theme.serverColor,
      // Normalized speed (1 == full path in 1s). We choose ~0.22
      speed: 0.22 + Math.random() * 0.03,
    }
  }, [theme.serverColor])

  // spawn new particles periodically while running
  useEffect(() => {
    if (!running) return
    const spawn = setInterval(() => {
      setParticles((prev) => {
        // single server emits
        const picks = [0]
        const added = picks.map((p) => makeParticle(p))
        return [...prev, ...added]
      })
    }, 1200)
    return () => clearInterval(spawn)
  }, [makeParticle, running])

  // animation loop
  useEffect(() => {
    if (!running) return
    const step = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts
      const dt = (ts - lastTs.current) / 1000 // seconds
      lastTs.current = ts

      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, t: p.t + dt * p.speed }))
          // drop when past backend
          .filter((p) => p.t < 1.05)
          .map((p) => {
            // normalize after processor (i.e., when leaving processor)
            const morphPoint = (BREAKS.processor + BREAKS.exporter) / 2
            if (p.t >= morphPoint) {
              return { ...p, shape: 'circle' as ShapeType, color: theme.normalized }
            }
            return p
          })
      )
      frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      lastTs.current = null
    }
  }, [running])

  // responsive scale to avoid horizontal scroll while keeping proportions
  useEffect(() => {
    const update = () => {
      const w = wrapRef.current?.clientWidth || BASE_W
      const s = Math.min(1, w / BASE_W)
      setScale(s)
    }
    update()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => update()) : null
    if (ro && wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      ro?.disconnect()
    }
  }, [])

  const reset = useCallback(() => {
    setParticles([])
  }, [])

  const layout = useMemo(() => {
    return {
      width: BASE_W,
      height: BASE_H,
      leftServersX: SERVER_LEFT,
      collectorX: 300,
      collectorW: 260,
      backendX: 690,
      backendW: 200,
      padding: 20,
    }
  }, [])

  // Pre-compute anchors for cleaner math
  const anchors = useMemo(() => {
    const collectorTop = 8
    const collectorPad = 12
    const innerTop = collectorTop + collectorPad
    const innerHeight = BASE_H - 16 // collector height (top/bottom gaps already accounted)
    const totalStages = STAGE_H * 3 + STAGE_GAP * 2
    const outerPadY = Math.max(0, Math.round((innerHeight - totalStages) / 2))

    const stageTop0 = innerTop + outerPadY
    const stageTop1 = stageTop0 + (STAGE_H + STAGE_GAP)
    const stageTop2 = stageTop1 + (STAGE_H + STAGE_GAP)
    const stageY = [
      Math.round(stageTop0 + STAGE_H / 2),
      Math.round(stageTop1 + STAGE_H / 2),
      Math.round(stageTop2 + STAGE_H / 2),
    ]
    const stageXCenter = layout.collectorX + Math.round(layout.collectorW / 2)
    const serverTop = Math.round(layout.height / 2 - SERVER_LABEL_H / 2)
    return {
      serverEmitX: layout.leftServersX + SERVER_LABEL_W + 20,
      serverTop,
      serverEmitY: serverTop + SERVER_LABEL_H / 2,
      receiverInX: layout.collectorX + 24,
      stageXCenter,
      collectorOutX: layout.collectorX + layout.collectorW + 12,
      backendCenterX: layout.backendX + Math.round(layout.backendW / 2),
      stageY,
      backendCenterY: Math.round(layout.height / 2),
    }
  }, [layout])

  // Small easing for smoother motion
  const easeInOut = (u: number) => 0.5 - 0.5 * Math.cos(Math.PI * u)

  const getPosition = useCallback(
    (stream: number, t: number) => {
      const {
        serverEmitX,
        serverEmitY,
        receiverInX,
        stageXCenter,
        collectorOutX,
        backendCenterX,
        stageY,
        backendCenterY,
      } = anchors
      // piecewise linear path
      if (t < BREAKS.receiver) {
        const u = easeInOut(t / BREAKS.receiver)
        const x = serverEmitX + (receiverInX - serverEmitX) * u
        const y = serverEmitY + (stageY[0] - serverEmitY) * u
        return { x, y }
      }
      if (t < BREAKS.processor) {
        const u = easeInOut((t - BREAKS.receiver) / (BREAKS.processor - BREAKS.receiver))
        const x = receiverInX + (stageXCenter - receiverInX) * u
        const y = stageY[0] + (stageY[1] - stageY[0]) * u
        return { x, y }
      }
      if (t < BREAKS.exporter) {
        const u = easeInOut((t - BREAKS.processor) / (BREAKS.exporter - BREAKS.processor))
        const x = stageXCenter
        const y = stageY[1] + (stageY[2] - stageY[1]) * u
        return { x, y }
      }
      if (t < BREAKS.backend) {
        const u = easeInOut((t - BREAKS.exporter) / (BREAKS.backend - BREAKS.exporter))
        const x = collectorOutX + (backendCenterX - collectorOutX) * u
        const y = stageY[2] + (backendCenterY - stageY[2]) * u
        return { x, y }
      }
      // beyond backend keep moving a tad to fade
      const x = anchors.backendCenterX + (t - BREAKS.backend) * 60
      const y = anchors.backendCenterY
      return { x, y }
    },
    [anchors]
  )

  return (
    <div ref={wrapRef} className="not-prose my-8 w-full">
      <div className="mb-3 flex items-center justify-end gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-200">
          SigNoz Mode
          <span className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-300 transition dark:bg-gray-700">
            <input
              type="checkbox"
              className="peer absolute h-6 w-11 cursor-pointer opacity-0"
              checked={sigNozMode}
              onChange={(e) => setSigNozMode(e.target.checked)}
            />
            <span className="pointer-events-none ml-1 inline-block h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5 peer-checked:bg-emerald-400" />
          </span>
        </label>
      </div>

      {/* Scaled wrapper to avoid horizontal scroll */}
      <div style={{ width: BASE_W * scale, height: BASE_H * scale }}>
        <div
          className="relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#0b0d12]"
          style={{
            width: layout.width,
            height: layout.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Servers */}
          <div className="absolute" style={{ left: SERVER_LEFT, top: anchors.serverTop }}>
            <button onClick={() => setParticles((p) => [...p, makeParticle(0)])}>
              <ServerLabel label="Server" color={theme.serverColor} />
            </button>
          </div>

          {/* Collector */}
          <div
            className="absolute rounded-2xl border"
            style={{
              left: layout.collectorX,
              top: 8,
              width: layout.collectorW,
              height: layout.height - 16,
              padding: 12,
              borderColor: theme.collectorBorder,
            }}
          >
            {(['Receiver', 'Processor', 'Exporter'] as const).map((title, i) => (
              <div
                key={title}
                className="absolute flex items-center justify-center rounded-xl border text-xs"
                style={{
                  left: 12,
                  right: 12,
                  height: STAGE_H,
                  top: 8 + i * (STAGE_H + STAGE_GAP),
                  borderColor: theme.stageBorder,
                  color: theme.stageText,
                }}
              >
                {title}
              </div>
            ))}
          </div>

          {/* Backend */}
          <div
            className="absolute flex items-center justify-center rounded-xl text-sm font-medium"
            style={{
              left: layout.backendX,
              top: layout.height / 2 - 36,
              width: layout.backendW,
              height: 72,
              backgroundColor: theme.backendBg,
              color: '#000',
            }}
          >
            {theme.backendText}
          </div>

          {/* Animated particles */}
          {particles.map((p) => {
            const { x, y } = getPosition(p.stream, p.t)
            // fade once it enters backend
            const atBackend = p.t > BREAKS.backend
            return (
              <motion.div
                key={p.id}
                className="pointer-events-none absolute"
                style={{ left: x, top: y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: atBackend ? 0.3 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Shape shape={p.shape} color={p.color} />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Section captions under the canvas for clarity */}
      {/* <div
        className="mx-auto mt-2 flex justify-between px-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400"
        style={{ width: BASE_W * scale }}
      >
        <span>Server</span>
        <span>Collector</span>
        <span>Backend</span>
      </div> */}
    </div>
  )
}

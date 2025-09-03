"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

type ShapeType = "circle" | "diamond" | "triangle"

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

// Simple palette to keep the look playful but not loud
const COLORS = ["#60A5FA", "#F472B6", "#34D399", "#F59E0B"]

const STREAM_Y = [50, 150, 250] // relative y within the drawing area

// X breakpoints as fractions of the drawable width
// servers -> receiver -> processor -> exporter -> backend
const BREAKS = {
  receiver: 0.32,
  processor: 0.46,
  exporter: 0.60,
  backend: 0.84,
}

let nextId = 1

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomShape(): ShapeType {
  return rand(["triangle", "diamond", "circle"]) // input variety
}

function ServerLabel({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="select-none rounded-xl px-4 py-2 text-sm font-medium text-white shadow"
      style={{ background: color }}
    >
      {label}
    </div>
  )
}

function Shape({
  shape,
  size = 14,
  color,
}: {
  shape: ShapeType
  size?: number
  color: string
}) {
  // Use SVG so we can easily morph shapes by swapping elements
  const s = size
  if (shape === "circle") {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={s / 2} cy={s / 2} r={s / 2} fill={color} />
      </svg>
    )
  }

  if (shape === "diamond") {
    const mid = s / 2
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <polygon
          points={`${mid},0 ${s},${mid} ${mid},${s} 0,${mid}`}
          fill={color}
        />
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

  const makeParticle = useCallback((stream: number): Particle => {
    return {
      id: nextId++,
      t: 0,
      stream,
      shape: randomShape(),
      color: rand(COLORS),
      speed: 0.002 + Math.random() * 0.004, // variety
    }
  }, [])

  // spawn new particles periodically while running
  useEffect(() => {
    if (!running) return
    const spawn = setInterval(() => {
      setParticles((prev) => {
        // bias: each tick, randomly pick one or two streams to emit
        const picks = [Math.floor(Math.random() * 3)]
        if (Math.random() < 0.35) picks.push(Math.floor(Math.random() * 3))
        const added = picks.map((p) => makeParticle(p))
        return [...prev, ...added]
      })
    }, 600)
    return () => clearInterval(spawn)
  }, [makeParticle, running])

  // animation loop
  useEffect(() => {
    if (!running) return
    const step = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, t: p.t + p.speed }))
          // drop when past backend
          .filter((p) => p.t < 1.02)
          .map((p) => {
            // normalize once it enters processor region
            if (p.t >= BREAKS.processor) {
              return { ...p, shape: "circle" as ShapeType, color: "#22D3EE" }
            }
            return p
          })
      )
      frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [running])

  const reset = useCallback(() => {
    setParticles([])
  }, [])

  const layout = useMemo(() => {
    return {
      width: 920,
      height: 320,
      leftServersX: 40,
      collectorX: 280,
      collectorW: 260,
      backendX: 680,
      backendW: 200,
    }
  }, [])

  const pathX = useCallback(
    (t: number) => {
      // map 0..1 to absolute x within layout width
      return 20 + t * (layout.width - 40)
    },
    [layout.width]
  )

  return (
    <div className="not-prose my-8 w-full overflow-x-auto">
      <div className="mb-3 flex items-center gap-3">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "Pause" : "Play"}
        </button>
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          onClick={reset}
        >
          Reset
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Click a server to emit data
        </span>
      </div>

      <div
        className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#0b0d12]"
        style={{ width: layout.width, height: layout.height }}
      >
        {/* Servers */}
        <div className="absolute left-4 top-6 flex flex-col gap-8">
          <button onClick={() => setParticles((p) => [...p, makeParticle(0)])}>
            <ServerLabel label="Server - 1" color="#EF4444" />
          </button>
          <button onClick={() => setParticles((p) => [...p, makeParticle(1)])}>
            <ServerLabel label="Server - 2" color="#F59E0B" />
          </button>
          <button onClick={() => setParticles((p) => [...p, makeParticle(2)])}>
            <ServerLabel label="Server - 3" color="#10B981" />
          </button>
        </div>

        {/* Collector */}
        <div
          className="absolute rounded-2xl border border-rose-400/60 p-3"
          style={{
            left: layout.collectorX,
            top: 20,
            width: layout.collectorW,
            height: layout.height - 40,
          }}
        >
          {["Receiver", "Processor", "Exporter"].map((title, i) => (
            <div
              key={title}
              className="mb-3 flex h-24 items-center justify-center rounded-xl border border-rose-400/40 text-xs text-rose-200 last:mb-0 dark:text-rose-300"
            >
              {title}
            </div>
          ))}
        </div>

        {/* Backend */}
        <div
          className="absolute flex items-center justify-center rounded-xl bg-amber-400 text-sm font-medium text-black"
          style={{
            left: layout.backendX,
            top: layout.height / 2 - 36,
            width: layout.backendW,
            height: 72,
          }}
        >
          Observability Backend
        </div>

        {/* Animated particles */}
        {particles.map((p) => {
          const x = pathX(p.t)
          // derive y from stream
          const y = STREAM_Y[p.stream]
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

        {/* Section captions under the canvas for clarity */}
        <div className="absolute bottom-3 left-0 flex w-full justify-between px-6 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <span>Servers</span>
          <span>Collector</span>
          <span>Backend</span>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        Different shapes/colors represent varied data formats emitted by servers. As
        they pass through the Processor, they are normalized into a single format
        (teal circles) before being exported to the backend.
      </p>
    </div>
  )
}


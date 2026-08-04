'use client'

import { useEffect, useRef } from 'react'

import { cn } from 'app/lib/utils'

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((value) => (value + 0.5) / 16))

const MAX_COLUMNS = 480
const MAX_ROWS = 320

type TailwindDitherColor =
  'bg-signoz_robin-500' | 'bg-signoz_sakura-500' | 'bg-signoz_aqua-500' | 'bg-signoz_forest-500'

type DitherDirection = 'up' | 'down' | 'left' | 'right'

type TailwindDitherGradientProps = {
  cell?: number
  className?: string
  direction?: DitherDirection
  fromClassName: TailwindDitherColor
  toClassName: TailwindDitherColor
}

type PaintSpec = {
  cell: number
  direction: DitherDirection
  fromColor: string
  toColor: string
}

function paintGradient(canvas: HTMLCanvasElement, width: number, height: number, spec: PaintSpec) {
  const context = canvas.getContext('2d')
  if (!context || width <= 0 || height <= 0) return

  const columns = Math.min(MAX_COLUMNS, Math.max(4, Math.round(width / spec.cell)))
  const rows = Math.min(MAX_ROWS, Math.max(4, Math.round(height / spec.cell)))
  canvas.width = columns
  canvas.height = rows
  context.clearRect(0, 0, columns, rows)

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const progress =
        spec.direction === 'up'
          ? 1 - (y + 0.5) / rows
          : spec.direction === 'down'
            ? (y + 0.5) / rows
            : spec.direction === 'left'
              ? 1 - (x + 0.5) / columns
              : (x + 0.5) / columns
      const useFromColor = 1 - progress > BAYER_4[y & 3][x & 3]

      context.fillStyle = useFromColor ? spec.fromColor : spec.toColor
      context.fillRect(x, y, 1, 1)
    }
  }
}

/**
 * Ordered-dither gradient adapted from Dither Kit's gradient wash.
 * Color values are resolved from SigNoz Tailwind utility classes at runtime.
 * Source: https://www.tripwire.sh/dither-kit
 */
export function TailwindDitherGradient({
  cell = 4,
  className,
  direction = 'right',
  fromClassName,
  toClassName,
}: TailwindDitherGradientProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fromSwatchRef = useRef<HTMLSpanElement>(null)
  const toSwatchRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    const fromSwatch = fromSwatchRef.current
    const toSwatch = toSwatchRef.current
    if (!wrapper || !canvas || !fromSwatch || !toSwatch) return

    const paint = () => {
      const bounds = wrapper.getBoundingClientRect()
      paintGradient(canvas, bounds.width, bounds.height, {
        cell,
        direction,
        fromColor: window.getComputedStyle(fromSwatch).backgroundColor,
        toColor: window.getComputedStyle(toSwatch).backgroundColor,
      })
    }

    paint()
    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(paint)
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [cell, direction, fromClassName, toClassName])

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      ref={wrapperRef}
    >
      <span className={cn('invisible absolute size-px', fromClassName)} ref={fromSwatchRef} />
      <span className={cn('invisible absolute size-px', toClassName)} ref={toSwatchRef} />
      <canvas
        className="absolute inset-0 h-full w-full [image-rendering:pixelated]"
        ref={canvasRef}
      />
    </div>
  )
}

const SIGNOZ_DITHER_PRESETS = [
  {
    direction: 'right',
    fromClassName: 'bg-signoz_robin-500',
    toClassName: 'bg-signoz_sakura-500',
  },
  {
    direction: 'left',
    fromClassName: 'bg-signoz_sakura-500',
    toClassName: 'bg-signoz_robin-500',
  },
  {
    direction: 'down',
    fromClassName: 'bg-signoz_aqua-500',
    toClassName: 'bg-signoz_robin-500',
  },
  {
    direction: 'up',
    fromClassName: 'bg-signoz_forest-500',
    toClassName: 'bg-signoz_sakura-500',
  },
] as const satisfies TailwindDitherGradientProps[]

export function SignozDitherCardBackground({
  className,
  index,
}: {
  className?: string
  index: number
}) {
  const preset = SIGNOZ_DITHER_PRESETS[index % SIGNOZ_DITHER_PRESETS.length]

  return <TailwindDitherGradient {...preset} className={cn('opacity-20', className)} />
}

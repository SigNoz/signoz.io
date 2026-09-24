import { MIN_JOG_GAP } from '../NozPathWalk.constants'
import { clamp, lerp } from './math'
import type { BuiltPath, PathSample, Point, ScrollMap } from './types'

/** Parse the absolute-only `M/L/H/V` subset the walk route is authored in. */
export function parsePath(d: string): Point[] {
  const points: Point[] = []
  const command = /([MLHV])\s*([-\d.\s,]+)/g
  let x = 0
  let y = 0
  let match = command.exec(d)
  while (match) {
    const numbers = match[2]
      .trim()
      .split(/[\s,]+/)
      .map(Number)
    if (match[1] === 'M' || match[1] === 'L') {
      x = numbers[0]
      y = numbers[1]
    } else if (match[1] === 'H') {
      x = numbers[0]
    } else {
      y = numbers[0]
    }
    points.push({ x, y })
    match = command.exec(d)
  }
  return points
}

export interface PathLayoutInput {
  vertices: Point[]
  corridorWidth: number
  corridorLeft: number
  startY: number
  endY: number
  viewportHeight: number
  horizontalScrollRatio: number
  catchUpSpeed: number
  sourceWidth: number
  sourceHeight: number
}

export interface PathLayout {
  path: BuiltPath
  scrollMap: ScrollMap
}

export function buildPath(input: PathLayoutInput): PathLayout {
  const {
    vertices: source,
    corridorWidth,
    corridorLeft,
    startY,
    endY,
    viewportHeight,
    horizontalScrollRatio,
    catchUpSpeed,
    sourceWidth,
    sourceHeight,
  } = input

  const scaleX = corridorWidth / sourceWidth
  const scaleY = (endY - startY) / sourceHeight
  const vertices = source.map((p) => ({
    x: corridorLeft + p.x * scaleX,
    y: startY + p.y * scaleY,
  }))

  const samples = sampleVertices(vertices)
  const length = samples.length ? samples[samples.length - 1].arc : 0

  return {
    path: { samples, length },
    scrollMap: mapScrollToArc(vertices, {
      startY,
      viewportHeight,
      horizontalScrollRatio,
      catchUpSpeed,
    }),
  }
}

/** Fit an existing scroll table onto a new end scroll without changing its pacing. */
export function scaleScrollMap(map: ScrollMap, targetEnd: number): ScrollMap {
  const end = map.scrollEnd
  if (!(end > 1) || !(targetEnd > 1) || Math.abs(end - targetEnd) < 1) return map
  const scale = targetEnd / end
  const scrollBreaks = map.scrollBreaks.map((value) => value * scale)
  return {
    scrollBreaks,
    arcBreaks: map.arcBreaks,
    scrollEnd: scrollBreaks[scrollBreaks.length - 1] ?? targetEnd,
  }
}

/** Dense polyline sampling plus a smoothed tangent, so corners turn over ~80px. */
function sampleVertices(vertices: Point[]): PathSample[] {
  const points: Point[] = []
  for (let i = 0; i < vertices.length - 1; i += 1) {
    const a = vertices[i]
    const b = vertices[i + 1]
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 4))
    for (let k = 0; k < steps; k += 1) {
      const t = k / steps
      points.push({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) })
    }
  }
  if (vertices.length) points.push({ ...vertices[vertices.length - 1] })

  const samples: PathSample[] = []
  let arc = 0
  for (let i = 0; i < points.length; i += 1) {
    if (i > 0) {
      const previous = points[i - 1]
      arc += Math.hypot(points[i].x - previous.x, points[i].y - previous.y)
    }
    samples.push({ x: points[i].x, y: points[i].y, arc, tx: 0, ty: 1 })
  }

  const SPAN = 10
  for (let i = 0; i < samples.length; i += 1) {
    const a = samples[Math.max(0, i - SPAN)]
    const b = samples[Math.min(samples.length - 1, i + SPAN)]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy) || 1
    samples[i].tx = dx / len
    samples[i].ty = dy / len
  }
  return samples
}

/**
 * Build the piecewise scroll→arc table. Sideways runs are cheap in scroll terms,
 * which leaves noz lagging behind mid-viewport; the next drop is then walked at
 * `catchUpSpeed` until he has caught up again.
 */
function mapScrollToArc(
  vertices: Point[],
  opts: {
    startY: number
    viewportHeight: number
    horizontalScrollRatio: number
    catchUpSpeed: number
  }
): ScrollMap {
  const { startY, viewportHeight, horizontalScrollRatio, catchUpSpeed } = opts
  const scrollBreaks = [0]
  const arcBreaks = [0]
  let scroll = 0
  let arc = 0
  let y = startY

  for (let i = 0; i < vertices.length - 1; i += 1) {
    const a = vertices[i]
    const b = vertices[i + 1]
    const len = Math.hypot(b.x - a.x, b.y - a.y)
    if (len < 0.5) continue

    const isDrop = Math.abs(b.y - a.y) > Math.abs(b.x - a.x) && b.y > a.y
    if (!isDrop) {
      scroll += len * horizontalScrollRatio
      arc += len
      scrollBreaks.push(scroll)
      arcBreaks.push(arc)
      continue
    }

    const lag = y - (scroll + viewportHeight / 2)
    if (lag < -1) {
      const catchUpScroll = -lag / (catchUpSpeed - 1)
      const catchUpArc = catchUpScroll * catchUpSpeed
      if (catchUpArc < len) {
        scroll += catchUpScroll
        arc += catchUpArc
        y += catchUpArc
        scrollBreaks.push(scroll)
        arcBreaks.push(arc)
        const remainder = len - catchUpArc
        scroll += remainder
        arc += remainder
        y += remainder
      } else {
        scroll += len / catchUpSpeed
        arc += len
        y += len
      }
    } else {
      scroll += len
      arc += len
      y += len
    }
    scrollBreaks.push(scroll)
    arcBreaks.push(arc)
  }

  return { scrollBreaks, arcBreaks, scrollEnd: scroll }
}

export function arcAtScroll({ scrollBreaks, arcBreaks }: ScrollMap, scroll: number): number {
  const last = scrollBreaks.length - 1
  if (scroll <= 0) return 0
  if (scroll >= scrollBreaks[last]) return arcBreaks[last]
  let lo = 0
  let hi = last
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (scrollBreaks[mid] <= scroll) lo = mid
    else hi = mid
  }
  const span = scrollBreaks[hi] - scrollBreaks[lo] || 1
  return lerp(arcBreaks[lo], arcBreaks[hi], (scroll - scrollBreaks[lo]) / span)
}

export function sampleAtArc({ samples }: BuiltPath, arc: number): PathSample {
  const last = samples.length - 1
  if (last < 0) return { x: 0, y: 0, arc: 0, tx: 0, ty: 1 }
  if (arc <= samples[0].arc) return { ...samples[0] }
  if (arc >= samples[last].arc) return { ...samples[last] }
  let lo = 0
  let hi = last
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (samples[mid].arc <= arc) lo = mid
    else hi = mid
  }
  const a = samples[lo]
  const b = samples[hi]
  const t = (arc - a.arc) / (b.arc - a.arc || 1)
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    arc: lerp(a.arc, b.arc, t),
    tx: lerp(a.tx, b.tx, t),
    ty: lerp(a.ty, b.ty, t),
  }
}

/**
 * Lay a route out against the content it runs beside: one drop per boundary,
 * with a sideways jog at each, cycling through the lane pattern. Coordinates
 * come back normalised — x as a fraction of the corridor, y of the span.
 */
export function routeFromAnchors(
  anchors: number[],
  startY: number,
  endY: number,
  lanes: number[],
  minJogGap = MIN_JOG_GAP
): Point[] {
  const span = endY - startY || 1
  const minFraction = minJogGap / span
  // Pixel margins, so a block near the end of the walk still gets its own turn.
  const startCut = 24 / span
  const endCut = 16 / span
  const fractions: number[] = []
  for (const y of anchors.map((a) => (a - startY) / span).sort((a, b) => a - b)) {
    if (y <= startCut || y >= 1 - endCut) continue
    if (fractions.length && y - fractions[fractions.length - 1] < minFraction) continue
    fractions.push(y)
  }

  const vertices: Point[] = [{ x: lanes[0], y: 0 }]
  fractions.forEach((y, index) => {
    const lane = lanes[(index + 1) % lanes.length]
    vertices.push({ x: vertices[vertices.length - 1].x, y })
    vertices.push({ x: lane, y })
  })
  vertices.push({ x: vertices[vertices.length - 1].x, y: 1 })
  return vertices
}

/** Index of the first sample whose `y` is at or past `value`. */
export function lowerBoundByY(samples: PathSample[], value: number): number {
  let lo = 0
  let hi = samples.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (samples[mid].y < value) lo = mid + 1
    else hi = mid
  }
  return lo
}

export { clamp }

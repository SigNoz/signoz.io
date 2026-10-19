import { sampleAtArc } from './path'
import { createRng, pop, smooth } from './math'
import { rgba } from './tokens'
import type { NozPalette } from './tokens'
import type { BuiltPath, PathSample, WalkState } from './types'

interface TrailDot extends PathSample {}

interface Pellet extends PathSample {
  color: [number, number, number]
}

interface ConfettiPiece {
  vx: number
  vy: number
  spin: number
  flutter: number
  rotation: number
  size: number
  alpha: number
  color: [number, number, number]
}

export interface SceneItems {
  trail: TrailDot[]
  pellets: Pellet[]
  confetti: ConfettiPiece[]
  end: PathSample
}

const TRAIL_SPACING = 13
const PELLET_SPACING = 150
const CONFETTI_COUNT = 140

export function buildSceneItems(
  path: BuiltPath,
  badgeArcs: number[],
  palette: NozPalette
): SceneItems {
  const { length } = path

  const pellets: Pellet[] = []
  let colorIndex = 0
  for (let arc = 160; arc < length - 60; arc += PELLET_SPACING) {
    if (badgeArcs.some((badgeArc) => Math.abs(badgeArc - arc) < 90)) continue
    pellets.push({
      ...sampleAtArc(path, arc),
      color: palette.pellets[colorIndex % palette.pellets.length],
    })
    colorIndex += 1
  }

  const trail: TrailDot[] = []
  for (let arc = 0; arc <= length; arc += TRAIL_SPACING) {
    if (pellets.some((pellet) => Math.abs(pellet.arc - arc) < 14)) continue
    if (badgeArcs.some((badgeArc) => Math.abs(badgeArc - arc) < 16)) continue
    trail.push(sampleAtArc(path, arc))
  }

  // Seeded, so the burst is identical across resizes and re-renders.
  const random = createRng(5)
  const confetti: ConfettiPiece[] = []
  for (let i = 0; i < CONFETTI_COUNT; i += 1) {
    confetti.push({
      vx: (random() - 0.5) * 760,
      vy: -(300 + random() * 480),
      spin: (random() - 0.5) * 24,
      flutter: random() * Math.PI * 2,
      rotation: random() * Math.PI * 2,
      size: 2.5 + random() * 2.5,
      alpha: 0.75 + 0.25 * random(),
      color: palette.confetti[Math.floor(random() * palette.confetti.length)],
    })
  }

  return { trail, pellets, confetti, end: sampleAtArc(path, length) }
}

/** Confetti plays out in real time once thrown, whatever the scroll then does. */
export class ConfettiBurst {
  private startedAt: number | null = null
  private finished = false

  update(tau: number) {
    if (tau > 0.22 && this.startedAt === null && !this.finished) {
      this.startedAt = performance.now()
    }
    if (tau < 0.15) {
      this.startedAt = null
      this.finished = false
    }
  }

  /** Seconds since the throw, or null when nothing should be drawn. */
  elapsed(): number | null {
    if (this.startedAt === null || this.finished) return null
    return (performance.now() - this.startedAt) / 1000
  }

  markFinished() {
    this.finished = true
  }
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  state: WalkState,
  items: SceneItems,
  palette: NozPalette,
  burst: ConfettiBurst,
  nozSize: number,
  idle: boolean
) {
  const { viewportWidth, viewportHeight, renderScroll, dpr, opacity } = state
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, viewportWidth, viewportHeight)
  if (opacity <= 0.01) return

  for (const dot of items.trail) {
    const y = dot.y - renderScroll
    if (y < -10 || y > viewportHeight + 10) continue
    const revealed = smooth((state.revealArc - dot.arc) / 36, 0, 1)
    const eaten = smooth((state.nozArc - dot.arc + 6) / 18, 0, 1)
    const radius = 1.4 * pop(revealed) * (1 - eaten)
    if (radius <= 0.05) continue
    ctx.fillStyle = rgba(palette.pathDot, 0.8 * opacity)
    ctx.beginPath()
    ctx.arc(dot.x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  for (const pellet of items.pellets) {
    const y = pellet.y - renderScroll
    if (y < -40 || y > viewportHeight + 40) continue
    const revealed = smooth((state.revealArc - pellet.arc) / 36, 0, 1)
    const eaten = smooth((state.nozArc - pellet.arc + 8) / 28, 0, 1)
    const alpha = revealed * (1 - eaten)
    if (alpha <= 0) continue
    const breath = idle ? 1 : 0.8 + 0.2 * Math.sin(state.time * 1.8 + pellet.arc * 0.05)
    ctx.save()
    ctx.globalAlpha = alpha * opacity
    ctx.shadowColor = rgba(pellet.color, 1)
    ctx.shadowBlur = 24 * breath
    ctx.fillStyle = rgba(pellet.color, 1)
    ctx.beginPath()
    ctx.arc(pellet.x, y, 5.5 * pop(revealed) * (1 - eaten) * (0.9 + 0.1 * breath), 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  burst.update(state.tau)
  const elapsed = burst.elapsed()
  if (elapsed === null) return

  const fade = 1 - smooth(elapsed, 0.9, 1.5)
  if (fade <= 0) {
    burst.markFinished()
    return
  }

  const originX = items.end.x
  const originY = items.end.y - nozSize
  for (const piece of items.confetti) {
    const x = originX + piece.vx * elapsed + Math.sin(elapsed * 7 + piece.flutter) * 4 * elapsed
    const y = originY + piece.vy * elapsed + 700 * elapsed * elapsed - renderScroll
    if (y < -20 || y > viewportHeight + 20) continue
    ctx.save()
    ctx.globalAlpha = fade * piece.alpha * opacity
    ctx.translate(x, y)
    ctx.rotate(piece.rotation + piece.spin * elapsed)
    ctx.fillStyle = rgba(piece.color, 1)
    ctx.fillRect(-piece.size / 2, -piece.size * 0.4, piece.size, piece.size * 0.8)
    ctx.restore()
  }
}

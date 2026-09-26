import { lowerBoundByY } from './path'
import { smooth } from './math'
import { rgba } from './tokens'
import type { BuiltPath, WalkState } from './types'

interface SkylineDot {
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  radius: number
  phase: number
  speed: number
  pathDistance: number
  pathArc: number
  /** Unit vector pointing away from the path, so noz parts the crowd as he passes. */
  pushX: number
  pushY: number
}

export interface SkylineOptions {
  targetColumns: number
  threshold: number
  mouseRadiusFraction: number
  mouseStrength: number
  clearRadius: number
}

/**
 * Samples the Salt Lake City silhouette into a field of dots that idle, scatter
 * away from the pointer, and part where the walk path has been revealed.
 */
export class SkylineField {
  private dots: SkylineDot[] = []
  private cell = 6
  private width = 0
  private height = 0
  private dpr = 1
  private aspect = 330 / 1140
  private ctx: CanvasRenderingContext2D | null = null
  private image: HTMLImageElement | null = null
  private pointer = { x: -1e9, y: -1e9, active: false }

  /**
   * Canvas offset within the scroll track (y) and the viewport (x), so dots and
   * path samples can be compared in the same coordinate space.
   */
  topOffset = 0
  leftOffset = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private options: SkylineOptions,
    private color: [number, number, number]
  ) {
    this.ctx = canvas.getContext('2d')
  }

  setImage(image: HTMLImageElement) {
    this.image = image
    if (image.naturalWidth > 0) this.aspect = image.naturalHeight / image.naturalWidth
  }

  build(fallbackWidth: number) {
    const image = this.image
    if (!image) return
    const width = Math.max(1, this.canvas.clientWidth || fallbackWidth)
    const height = Math.round(width * this.aspect)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    this.width = width
    this.height = height
    this.dpr = dpr
    this.canvas.style.height = `${height}px`
    this.canvas.width = Math.round(width * dpr)
    this.canvas.height = Math.round(height * dpr)

    const columns = Math.min(this.options.targetColumns, Math.max(80, Math.round(width / 3.5)))
    const cell = width / columns
    const rows = Math.round(height / cell)
    this.cell = cell

    const offscreen = document.createElement('canvas')
    offscreen.width = columns
    offscreen.height = rows
    const offscreenCtx = offscreen.getContext('2d', { willReadFrequently: true })
    if (!offscreenCtx) return
    offscreenCtx.fillStyle = '#fff'
    offscreenCtx.fillRect(0, 0, columns, rows)
    offscreenCtx.drawImage(image, 0, 0, columns, rows)
    const { data } = offscreenCtx.getImageData(0, 0, columns, rows)

    const dots: SkylineDot[] = []
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const i = (row * columns + col) * 4
        const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        const ink = (255 - luminance) * (data[i + 3] / 255)
        if (255 - ink > this.options.threshold) continue

        const baseX = (col + 0.5) * cell
        const baseY = (row + 0.5) * cell
        // Fade out on the left and along the bottom so the dots never fight the copy.
        const alpha = smooth(baseX / width, 0, 0.42) * (1 - smooth(baseY / height, 0.55, 1))
        if (alpha < 0.02) continue

        dots.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          alpha,
          radius: cell * 0.22 * (0.75 + 0.25 * (ink / 255)),
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 0.8,
          pathDistance: Number.POSITIVE_INFINITY,
          pathArc: 0,
          pushX: 0,
          pushY: 0,
        })
      }
    }
    this.dots = dots
  }

  linkToPath(path: BuiltPath | null) {
    if (!path || !path.samples.length) return
    const { samples } = path
    const { clearRadius } = this.options
    const top = this.topOffset
    const left = this.leftOffset

    for (const dot of this.dots) {
      dot.pathDistance = Number.POSITIVE_INFINITY
      const trackX = dot.baseX + left
      const trackY = dot.baseY + top
      const from = Math.max(0, lowerBoundByY(samples, trackY - clearRadius) - 1)
      const to = Math.min(samples.length - 1, lowerBoundByY(samples, trackY + clearRadius))

      let best = Number.POSITIVE_INFINITY
      let bestIndex = -1
      for (let i = from; i <= to; i += 1) {
        const dx = trackX - samples[i].x
        const dy = trackY - samples[i].y
        const distanceSq = dx * dx + dy * dy
        if (distanceSq < best) {
          best = distanceSq
          bestIndex = i
        }
      }
      if (bestIndex < 0) continue

      const distance = Math.sqrt(best)
      if (distance >= clearRadius) continue
      dot.pathDistance = distance
      dot.pathArc = samples[bestIndex].arc
      if (distance > 0.5) {
        dot.pushX = (trackX - samples[bestIndex].x) / distance
        dot.pushY = (trackY - samples[bestIndex].y) / distance
      } else {
        dot.pushX = -samples[bestIndex].ty
        dot.pushY = samples[bestIndex].tx
      }
    }
  }

  setPointer(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect()
    this.pointer.x = clientX - rect.left
    this.pointer.y = clientY - rect.top
    this.pointer.active = true
  }

  clearPointer() {
    this.pointer.active = false
    this.pointer.x = -1e9
    this.pointer.y = -1e9
  }

  draw(state: WalkState, idle: boolean) {
    const ctx = this.ctx
    if (!ctx) return
    const { width, height, cell } = this
    const [r, g, b] = this.color
    const radius = width * this.options.mouseRadiusFraction
    const radiusSq = radius * radius
    const pushStrength = cell * this.options.mouseStrength * 10

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)

    for (const dot of this.dots) {
      let targetX = dot.baseX
      let targetY = dot.baseY
      let alphaScale = 1

      if (!idle) {
        const wave =
          Math.sin(state.time * dot.speed + dot.baseX * 0.012 + dot.phase) * 0.35 +
          Math.sin(state.time * 0.7 + dot.baseY * 0.02 - dot.baseX * 0.006) * 0.25
        targetX += wave * cell * 0.35
        targetY +=
          Math.cos(state.time * dot.speed * 0.8 + dot.baseY * 0.015 + dot.phase) * cell * 0.22
      }

      if (dot.pathDistance < this.options.clearRadius) {
        const revealed = smooth((state.revealArc - dot.pathArc) / 44, 0, 1)
        if (revealed > 0) {
          const push = (this.options.clearRadius - dot.pathDistance) * 1.15 * revealed
          targetX += dot.pushX * push
          targetY += dot.pushY * push
          alphaScale =
            1 - revealed * (1 - smooth(dot.pathDistance / this.options.clearRadius, 0.4, 1))
        }
      }

      if (this.pointer.active) {
        const dx = dot.x - this.pointer.x
        const dy = dot.y - this.pointer.y
        const distanceSq = dx * dx + dy * dy
        if (distanceSq < radiusSq && distanceSq > 0.0001) {
          const distance = Math.sqrt(distanceSq)
          const falloff = 1 - distance / radius
          const scale = (falloff * falloff * pushStrength) / distance
          targetX += dx * scale
          targetY += dy * scale
        }
      }

      dot.vx += (targetX - dot.x) * 0.08
      dot.vy += (targetY - dot.y) * 0.08
      dot.vx *= 0.78
      dot.vy *= 0.78
      dot.x += dot.vx
      dot.y += dot.vy

      const alpha = dot.alpha * alphaScale * state.opacity
      if (alpha < 0.01) continue

      // Dots brighten slightly while they are moving, so the scatter reads as motion.
      const speed = Math.min(1, (Math.abs(dot.vx) + Math.abs(dot.vy)) / (cell * 0.5))
      const lift = 1 + speed * 0.5
      ctx.fillStyle = rgba(
        [Math.min(255, r * lift), Math.min(255, g * lift), Math.min(255, b * lift)],
        alpha
      )
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  /** One static pass for reduced motion and small screens. */
  drawStatic() {
    const ctx = this.ctx
    if (!ctx) return
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.clearRect(0, 0, this.width, this.height)
    for (const dot of this.dots) {
      ctx.fillStyle = rgba(this.color, dot.alpha)
      ctx.beginPath()
      ctx.arc(dot.baseX, dot.baseY, dot.radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

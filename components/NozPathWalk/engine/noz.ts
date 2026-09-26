import { clamp, lerp, pop, smooth } from './math'
import type { PathSample, WalkState } from './types'

export interface NozSpriteRefs {
  button: HTMLElement
  root: SVGGElement
  body: SVGGElement
  footLeft: SVGGElement
  footRight: SVGGElement
  armLeft: SVGGElement
  armRight: SVGGElement
  head: SVGGElement
}

export interface BadgeHandle {
  el: HTMLElement
  arc: number
  x: number
  y: number
  width: number
  height: number
}

/** Path distance covered per full stride cycle. */
const STRIDE = 22

export function poseNoz(refs: NozSpriteRefs, point: PathSample, state: WalkState, size: number) {
  const { jump, tau } = state
  // Amplitude falls to zero as he arrives, so he settles rather than stops mid-step.
  const amplitude = 1 - smooth(tau, 0, 0.12)
  const phase = (point.arc / STRIDE) * Math.PI * 2
  const swing = Math.sin(phase)
  const forward = Math.max(0, swing)
  const backward = Math.max(0, -swing)
  const absSwing = Math.abs(swing)

  const horizontality = Math.abs(point.tx)
  const sideways = smooth(horizontality, 0.3, 0.68) * amplitude
  const towards = (1 - smooth(horizontality, 0.3, 0.68)) * amplitude
  const flip = point.tx < 0 ? 1 - 2 * smooth(horizontality, 0.42, 0.6) : 1
  const facing = lerp(1, flip, amplitude)

  const armSwing = towards * 8 * swing + sideways * 25 * swing
  const throwArc = -150 * Math.sin(Math.PI * clamp((tau - 0.05) / 0.55, 0, 1))

  refs.root.setAttribute(
    'transform',
    `translate(0 ${(-16 * jump).toFixed(3)}) translate(12 0) scale(${facing.toFixed(3)} 1) translate(-12 0)`
  )
  refs.body.setAttribute(
    'transform',
    `translate(0 ${(-0.35 * absSwing * amplitude).toFixed(3)}) rotate(${(towards * 3 * swing + sideways * 7).toFixed(2)} 12 20.5)`
  )
  refs.footLeft.setAttribute(
    'transform',
    `translate(${(sideways * 1.5 * swing).toFixed(3)} ${(-(towards * 1 * forward + sideways * 0.7 * forward) - 1.6 * jump).toFixed(3)})`
  )
  refs.footRight.setAttribute(
    'transform',
    `translate(${(-sideways * 1.5 * swing).toFixed(3)} ${(-(towards * 1 * backward + sideways * 0.7 * backward) - 1.6 * jump).toFixed(3)})`
  )
  refs.armLeft.setAttribute('transform', `rotate(${armSwing.toFixed(2)} 4.184 13.475)`)
  refs.armRight.setAttribute(
    'transform',
    `rotate(${(-armSwing + throwArc).toFixed(2)} 19.817 13.475)`
  )
  refs.head.setAttribute('transform', `translate(0 ${(-0.25 * absSwing * amplitude).toFixed(3)})`)

  refs.button.style.transform = `translate3d(${(point.x - size / 2).toFixed(1)}px, ${(point.y - state.renderScroll - size * 0.95).toFixed(1)}px, 0)`
}

export function placeBadges(
  badges: BadgeHandle[],
  point: PathSample,
  state: WalkState,
  size: number
) {
  const unit = size / 24
  const nozCenterX = point.x
  const nozCenterY = point.y - state.renderScroll - size / 2 - 16 * unit * state.jump
  const lastIndex = badges.length - 1

  badges.forEach((badge, index) => {
    const revealed = smooth((state.revealArc - badge.arc) / 40, 0, 1)
    let collected = smooth((state.nozArc - (badge.arc - 24)) / 50, 0, 1)
    // The final badge is only handed over during the finale.
    if (index === lastIndex) collected = Math.max(collected, smooth(state.tau, 0, 0.15))
    const visibility = Math.max(revealed, collected)

    if (visibility <= 0 || state.opacity <= 0.01) {
      badge.el.style.opacity = '0'
      return
    }

    const restX = badge.x
    const restY = badge.y - state.renderScroll
    const angle = ((-18 - index * 21) * Math.PI) / 180
    const radius = badge.width * 0.42 * 0.5 + 6
    const carriedX = nozCenterX + 10 + radius * Math.cos(angle)
    const carriedY = nozCenterY + radius * Math.sin(angle)

    const x = lerp(restX, carriedX, collected)
    const y = lerp(restY, carriedY, collected)
    const scale = lerp(1, 0.42, collected) * pop(visibility)
    const rotation = lerp(-3, (angle * 180) / Math.PI, collected)

    badge.el.style.opacity = (visibility * state.opacity).toFixed(3)
    badge.el.style.transform = `translate(${(x - badge.width / 2).toFixed(1)}px, ${(y - badge.height / 2).toFixed(1)}px) rotate(${rotation.toFixed(1)}deg) scale(${scale.toFixed(3)})`
  })
}

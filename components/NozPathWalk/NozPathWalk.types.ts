import type { ReactNode } from 'react'

export interface NozPathWalkTuning {
  /** Horizontal columns sampled out of the skyline image. */
  skylineColumns: number
  /** Ink threshold (0-255) for keeping a skyline dot. */
  skylineThreshold: number
  /** Pointer influence radius, as a fraction of the skyline width. */
  pointerRadiusFraction: number
  pointerStrength: number
  /** Skyline dots within this many px of the path are pushed aside. */
  clearRadius: number
  /** Trail revealed ahead of noz, in px of path. */
  lookahead: number
  /** Rendered size of the mascot, in px. */
  nozSize: number
  /** Scroll reserved after the path ends for the jump, confetti and wave. */
  tail: number
  /** Scroll px per unit of finale time. */
  tauPx: number
  /** Scroll px consumed per px walked sideways. */
  horizontalScrollRatio: number
  /** Walk speed multiplier while catching back up to mid-viewport. */
  catchUpSpeed: number
  /** Scroll easing factor per frame. */
  scrollEasing: number
  /** Corridor width as a fraction of the viewport, and its centre. */
  corridorWidthFraction: number
  corridorMaxWidth: number
  corridorCenterFraction: number
}

export interface NozPathWalkProps {
  children: ReactNode
  badges: string[]
  skylineSrc: string
  skylineAlt: string
  /**
   * Lanes the route weaves between, as fractions of the corridor width. The
   * route itself is derived from the `data-noz-anchor` elements in `children`,
   * and finishes beside `data-noz-end` when that marker is present.
   */
  lanes?: number[]
  tuning?: Partial<NozPathWalkTuning>
  className?: string
  nozLabel?: string
}

import type { NozPathWalkTuning } from './NozPathWalk.types'

/**
 * Lanes noz weaves between, as fractions of the corridor width. The route drops
 * down one lane, jogs across to the next at each content boundary, and repeats;
 * the pattern cycles, so any number of boundaries produces a coherent meander.
 */
export const NOZ_LANE_PATTERN = [0.395, 0.998, 0.738, 0.263, 0.64, 0.001]

/** Elements the route turns beside, and the ones each badge is handed over at. */
export const ANCHOR_ATTRIBUTE = 'data-noz-anchor'
export const BADGE_ANCHOR_ATTRIBUTE = 'data-noz-badge-anchor'

/** The element the walk finishes beside. Without one, the walk ends with the track. */
export const END_ATTRIBUTE = 'data-noz-end'

/** Keep jogs at least this far apart, in px, so each content block gets its own turn. */
export const MIN_JOG_GAP = 72

/** Fallback badge placement when a page marks no badge anchors. */
export const BADGE_ARC_FRACTIONS = [0.5, 0.67, 0.84, 1]

/** The path starts just above the track so noz walks in from off-screen. */
export const PATH_START_Y = -14

export const DEFAULT_TUNING: NozPathWalkTuning = {
  skylineColumns: 300,
  skylineThreshold: 110,
  pointerRadiusFraction: 0.09,
  pointerStrength: 0.11,
  clearRadius: 34,
  lookahead: 560,
  nozSize: 48,
  tail: 150,
  tauPx: 110,
  horizontalScrollRatio: 0.15,
  catchUpSpeed: 4,
  scrollEasing: 0.14,
  corridorWidthFraction: 0.3,
  corridorMaxWidth: 440,
  corridorCenterFraction: 0.79,
}

/** Below this the corridor would collide with the copy, so the walk is skipped. */
export const DESKTOP_QUERY = '(min-width: 1024px)'
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

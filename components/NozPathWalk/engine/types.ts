export interface Point {
  x: number
  y: number
}

/** One densely-sampled point on the walk path, in track-local coordinates. */
export interface PathSample extends Point {
  arc: number
  /** Smoothed unit tangent, so noz turns corners over ~80px instead of snapping. */
  tx: number
  ty: number
}

export interface BuiltPath {
  samples: PathSample[]
  length: number
}

/**
 * Piecewise-linear map from scroll offset to arc length. Vertical drops consume
 * scroll 1:1 (noz holds his place in the viewport); sideways runs are cheaper,
 * and afterwards he walks faster until he has caught back up to mid-viewport.
 */
export interface ScrollMap {
  scrollBreaks: number[]
  arcBreaks: number[]
  scrollEnd: number
}

export interface WalkState {
  /** Raw scroll offset within the track, unclamped. */
  rawScroll: number
  /**
   * Eased scroll clamped to the walk's range — drives how far along the path
   * noz is, and the finale.
   */
  smoothScroll: number
  /**
   * Eased scroll with no upper bound — drives where the scene is *drawn*, so
   * once the walk is over noz and his badges scroll away with the page instead
   * of hanging in the viewport.
   */
  renderScroll: number
  viewportWidth: number
  viewportHeight: number
  dpr: number
  trackHeight: number
  /** Arc length revealed so far — path dots unfurl ahead of noz. */
  revealArc: number
  nozArc: number
  /** Finale progress: 0 while walking, ramps past 1 through jump → confetti → wave. */
  tau: number
  jump: number
  time: number
  opacity: number
}

export interface ScenePalette {
  skylineDot: [number, number, number]
  pathDot: string
  pellets: string[]
  confetti: string[]
}

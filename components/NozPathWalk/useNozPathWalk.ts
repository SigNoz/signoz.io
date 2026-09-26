'use client'

import { useEffect, type RefObject } from 'react'

import {
  ANCHOR_ATTRIBUTE,
  BADGE_ANCHOR_ATTRIBUTE,
  BADGE_ARC_FRACTIONS,
  DEFAULT_TUNING,
  DESKTOP_QUERY,
  END_ATTRIBUTE,
  NOZ_LANE_PATTERN,
  PATH_START_Y,
  REDUCED_MOTION_QUERY,
} from './NozPathWalk.constants'
import type { NozPathWalkTuning } from './NozPathWalk.types'
import type { NozSpriteHandle } from './NozSprite'
import {
  arcAtScroll,
  buildPath,
  lowerBoundByY,
  routeFromAnchors,
  sampleAtArc,
  scaleScrollMap,
  type PathLayout,
} from './engine/path'
import { clamp, smooth } from './engine/math'
import { ConfettiBurst, buildSceneItems, drawScene, type SceneItems } from './engine/scene'
import { SkylineField } from './engine/skyline'
import { placeBadges, poseNoz, type BadgeHandle } from './engine/noz'
import { readTokenPalette } from './engine/tokens'
import type { BuiltPath, ScrollMap, WalkState } from './engine/types'

interface UseNozPathWalkArgs {
  trackRef: RefObject<HTMLDivElement | null>
  sceneCanvasRef: RefObject<HTMLCanvasElement | null>
  badgeLayerRef: RefObject<HTMLDivElement | null>
  nozButtonRef: RefObject<HTMLButtonElement | null>
  spriteRef: RefObject<NozSpriteHandle | null>
  skylineCanvas: HTMLCanvasElement | null
  skylineSrc: string
  badgeCount: number
  lanes?: number[]
  tuning?: Partial<NozPathWalkTuning>
  wavingClassName: string
}

export function useNozPathWalk({
  trackRef,
  sceneCanvasRef,
  badgeLayerRef,
  nozButtonRef,
  spriteRef,
  skylineCanvas,
  skylineSrc,
  badgeCount,
  lanes = NOZ_LANE_PATTERN,
  tuning: tuningOverrides,
  wavingClassName,
}: UseNozPathWalkArgs) {
  useEffect(() => {
    const track = trackRef.current
    const sceneCanvas = sceneCanvasRef.current
    const badgeLayer = badgeLayerRef.current
    const nozButton = nozButtonRef.current
    const sprite = spriteRef.current
    if (!track || !sceneCanvas || !badgeLayer || !nozButton || !sprite || !skylineCanvas) return

    const sceneCtx = sceneCanvas.getContext('2d')
    if (!sceneCtx) return

    const tuning: NozPathWalkTuning = { ...DEFAULT_TUNING, ...tuningOverrides }
    const palette = readTokenPalette(track)

    const skyline = new SkylineField(
      skylineCanvas,
      {
        targetColumns: tuning.skylineColumns,
        threshold: tuning.skylineThreshold,
        mouseRadiusFraction: tuning.pointerRadiusFraction,
        mouseStrength: tuning.pointerStrength,
        clearRadius: tuning.clearRadius,
      },
      palette.skylineDot
    )

    const state: WalkState = {
      rawScroll: 0,
      smoothScroll: 0,
      renderScroll: 0,
      viewportWidth: 1,
      viewportHeight: 1,
      dpr: 1,
      trackHeight: 0,
      revealArc: 0,
      nozArc: 0,
      tau: 0,
      jump: 0,
      time: 0,
      opacity: 1,
    }

    const anchorTops = (attribute: string) => {
      const trackTop = track!.getBoundingClientRect().top
      return Array.from(track!.querySelectorAll<HTMLElement>(`[${attribute}]`)).map(
        (el) => el.getBoundingClientRect().top - trackTop
      )
    }

    const endMarkerY = () => {
      const el = track!.querySelector<HTMLElement>(`[${END_ATTRIBUTE}]`)
      if (!el) return null
      const box = el.getBoundingClientRect()
      const beside = Math.min(Math.max(box.height * 0.35, 36), 96)
      return box.top - track!.getBoundingClientRect().top + beside
    }

    const badges: BadgeHandle[] = Array.from(
      badgeLayer.querySelectorAll<HTMLElement>('[data-noz-badge]')
    ).map((el) => {
      // Desync the breathing glow so the badges do not pulse in lockstep.
      el.style.animationDelay = `${(-Math.random() * 3.4).toFixed(2)}s`
      return { el, arc: 0, x: 0, y: 0, width: 120, height: 30 }
    })

    const spriteRefs = { ...sprite, button: nozButton }
    const burst = new ConfettiBurst()
    let path: BuiltPath | null = null
    let scrollMap: ScrollMap | null = null
    let sceneItems: SceneItems | null = null
    let imageReady = false
    let animated = false
    let rafId = 0
    let frameCount = 0
    let lastWidth = 0
    let lastTrackHeight = 0

    const viewportWidth = () => document.documentElement.clientWidth || window.innerWidth
    const viewportHeight = () => document.documentElement.clientHeight || window.innerHeight

    function badgeArcsFor(count: number, builtPath: BuiltPath, anchors: number[]) {
      if (anchors.length < count) {
        return BADGE_ARC_FRACTIONS.slice(0, count).map((fraction) => builtPath.length * fraction)
      }

      const arcs = anchors
        .slice(0, count)
        .map((y) => builtPath.samples[lowerBoundByY(builtPath.samples, y)]?.arc ?? builtPath.length)

      // Anchors below the end of the walk all collapse onto the last sample, so
      // pull them apart again — otherwise those badges stack on one another.
      const minGap = builtPath.length * 0.07
      for (let i = arcs.length - 2; i >= 0; i -= 1) {
        arcs[i] = Math.min(arcs[i], arcs[i + 1] - minGap)
      }
      return arcs.map((arc) => Math.max(0, arc))
    }

    function layout() {
      if (!skylineCanvas) return
      state.viewportWidth = viewportWidth()
      state.viewportHeight = viewportHeight()
      state.dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.trackHeight = Math.max(state.viewportHeight + 1, track!.getBoundingClientRect().height)

      sceneCanvas!.width = Math.round(state.viewportWidth * state.dpr)
      sceneCanvas!.height = Math.round(state.viewportHeight * state.dpr)

      badges.forEach((badge) => {
        badge.width = badge.el.offsetWidth || badge.width
        badge.height = badge.el.offsetHeight || badge.height
      })

      // Anchor the route to the content column so it stays beside the copy on
      // viewports wider than the page's max width.
      const trackBox = track!.getBoundingClientRect()
      const corridorWidth = Math.min(
        trackBox.width * tuning.corridorWidthFraction,
        tuning.corridorMaxWidth
      )
      const corridorLeft =
        trackBox.left + trackBox.width * tuning.corridorCenterFraction - corridorWidth / 2

      // The route is regenerated for each candidate end point, because which
      // content boundaries fall inside the walk depends on how far it reaches.
      const anchors = anchorTops(ANCHOR_ATTRIBUTE)
      const build = (endY: number) =>
        buildPath({
          vertices: routeFromAnchors(anchors, PATH_START_Y, endY, lanes),
          corridorWidth,
          corridorLeft,
          startY: PATH_START_Y,
          endY,
          viewportHeight: state.viewportHeight,
          horizontalScrollRatio: tuning.horizontalScrollRatio,
          catchUpSpeed: tuning.catchUpSpeed,
          sourceWidth: 1,
          sourceHeight: 1,
        })

      const maxScroll = Math.max(1, state.trackHeight - state.viewportHeight)
      const markedEnd = endMarkerY()
      let layoutResult: PathLayout

      if (markedEnd == null) {
        // No end marker: solve for the end that finishes `tail` px before the track does.
        const target = maxScroll - tuning.tail
        let endY = Math.max(
          state.viewportHeight,
          state.trackHeight - state.viewportHeight / 2 - tuning.tail
        )
        layoutResult = build(endY)
        for (let i = 0; i < 5; i += 1) {
          endY = Math.max(state.viewportHeight, endY + (target - layoutResult.scrollMap.scrollEnd))
          layoutResult = build(endY)
        }
      } else {
        // Pin the geometry to the marked block, then fit scroll so he arrives
        // when that block is near mid-viewport, with room left for the finale.
        const endY = clamp(markedEnd, state.viewportHeight * 0.5, state.trackHeight - 1)
        layoutResult = build(endY)
        const ideal = Math.max(1, endY - state.viewportHeight / 2)
        const latest = Math.max(1, maxScroll - tuning.tail)
        layoutResult = {
          path: layoutResult.path,
          scrollMap: scaleScrollMap(layoutResult.scrollMap, Math.min(ideal, latest)),
        }
      }

      path = layoutResult.path
      scrollMap = layoutResult.scrollMap

      const badgeArcs = badgeArcsFor(badges.length, path, anchorTops(BADGE_ANCHOR_ATTRIBUTE))
      badges.forEach((badge, index) => {
        const arc = badgeArcs[index] ?? path!.length
        const point = sampleAtArc(path!, arc)
        badge.arc = arc
        badge.x = point.x
        badge.y = point.y
      })

      sceneItems = buildSceneItems(path, badgeArcs, palette)

      const skylineBox = skylineCanvas.getBoundingClientRect()
      skyline.topOffset = skylineBox.top - trackBox.top
      skyline.leftOffset = skylineBox.left
      skyline.linkToPath(path)
    }

    function rebuild() {
      if (!imageReady) return
      skyline.build(viewportWidth())
      layout()
      lastWidth = viewportWidth()
      lastTrackHeight = track!.getBoundingClientRect().height
    }

    function renderStatic() {
      sceneCtx!.setTransform(1, 0, 0, 1, 0, 0)
      sceneCtx!.clearRect(0, 0, sceneCanvas!.width, sceneCanvas!.height)
      badges.forEach((badge) => {
        badge.el.style.opacity = '0'
      })
      nozButton!.style.opacity = '0'
      skyline.drawStatic()
    }

    function frame() {
      rafId = requestAnimationFrame(frame)
      state.time += 0.016
      frameCount += 1

      // Fonts, images and viewer resizes can change the track late; watch for it.
      if (frameCount % 20 === 0) {
        const width = viewportWidth()
        const height = track!.getBoundingClientRect().height
        if (Math.abs(width - lastWidth) > 1 || Math.abs(height - lastTrackHeight) > 1) {
          rebuild()
        }
      }

      if (!path || !scrollMap || !sceneItems) return

      const raw = -track!.getBoundingClientRect().top
      state.rawScroll = raw
      const maxScroll = state.trackHeight - state.viewportHeight

      const walkTarget = clamp(raw, 0, maxScroll)
      const walkDelta = walkTarget - state.smoothScroll
      state.smoothScroll =
        Math.abs(walkDelta) < 0.05
          ? walkTarget
          : state.smoothScroll + walkDelta * tuning.scrollEasing

      // Unbounded above, so past the finale the scene rides the page out of view.
      const renderTarget = Math.max(raw, 0)
      const renderDelta = renderTarget - state.renderScroll
      state.renderScroll =
        Math.abs(renderDelta) < 0.05
          ? renderTarget
          : state.renderScroll + renderDelta * tuning.scrollEasing

      state.opacity = smooth(raw, -0.9 * state.viewportHeight, -0.4 * state.viewportHeight)

      const point = sampleAtArc(path, arcAtScroll(scrollMap, state.smoothScroll))
      state.nozArc = point.arc
      // The trail only starts unravelling once he is properly under way.
      state.revealArc = smooth(point.arc, 50, 90) * (point.arc + tuning.lookahead)
      state.tau = clamp((state.smoothScroll - scrollMap.scrollEnd) / tuning.tauPx, 0, 1.6)
      state.jump = Math.sin(Math.PI * clamp(state.tau / 0.5, 0, 1))

      drawScene(sceneCtx!, state, sceneItems, palette, burst, tuning.nozSize, false)
      poseNoz(spriteRefs, point, state, tuning.nozSize)
      placeBadges(badges, point, state, tuning.nozSize)
      skyline.draw(state, false)

      nozButton!.style.opacity = state.opacity.toFixed(3)
      nozButton!.classList.toggle(wavingClassName, state.tau > 0.72)
    }

    function startAnimating() {
      if (animated || !imageReady) return
      animated = true
      nozButton!.style.display = ''
      badgeLayer!.style.display = ''
      sceneCanvas!.style.display = ''
      rafId = requestAnimationFrame(frame)
    }

    function stopAnimating() {
      if (!animated) return
      animated = false
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    function goStatic() {
      stopAnimating()
      nozButton!.style.display = 'none'
      badgeLayer!.style.display = 'none'
      sceneCanvas!.style.display = 'none'
      if (imageReady) renderStatic()
    }

    const desktopQuery = window.matchMedia(DESKTOP_QUERY)
    const reducedQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    let inView = false

    const canAnimate = () => desktopQuery.matches && !reducedQuery.matches

    function sync() {
      if (!canAnimate()) {
        goStatic()
        return
      }
      nozButton!.style.display = ''
      badgeLayer!.style.display = ''
      sceneCanvas!.style.display = ''
      if (inView) startAnimating()
      else stopAnimating()
    }

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              inView = entries.some((entry) => entry.isIntersecting)
              sync()
            },
            { rootMargin: '25% 0px' }
          )
        : null
    if (observer) observer.observe(track)
    else inView = true

    const onPointerMove = (event: PointerEvent) => {
      if (!animated) return
      skyline.setPointer(event.clientX, event.clientY)
    }
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) skyline.clearPointer()
    }
    const onVisibility = () => {
      if (document.hidden) stopAnimating()
      else sync()
    }

    let rebuildTimer = 0
    const scheduleRebuild = () => {
      window.clearTimeout(rebuildTimer)
      rebuildTimer = window.setTimeout(() => {
        if (viewportWidth() > 40) {
          rebuild()
          if (!canAnimate()) renderStatic()
        }
      }, 60)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerout', onPointerOut, { passive: true })
    window.addEventListener('resize', scheduleRebuild)
    document.addEventListener('visibilitychange', onVisibility)
    desktopQuery.addEventListener('change', sync)
    reducedQuery.addEventListener('change', sync)

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(scheduleRebuild) : undefined
    resizeObserver?.observe(track)

    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      imageReady = true
      skyline.setImage(image)
      rebuild()
      sync()
    }
    image.src = skylineSrc

    return () => {
      stopAnimating()
      observer?.disconnect()
      resizeObserver?.disconnect()
      window.clearTimeout(rebuildTimer)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerout', onPointerOut)
      window.removeEventListener('resize', scheduleRebuild)
      document.removeEventListener('visibilitychange', onVisibility)
      desktopQuery.removeEventListener('change', sync)
      reducedQuery.removeEventListener('change', sync)
      image.onload = null
    }
  }, [
    trackRef,
    sceneCanvasRef,
    badgeLayerRef,
    nozButtonRef,
    spriteRef,
    skylineCanvas,
    skylineSrc,
    badgeCount,
    lanes,
    tuningOverrides,
    wavingClassName,
  ])
}

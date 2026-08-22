'use client'

import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'

import {
  createFullscreenTriangle,
  createProgram,
  loseContext,
  resizeCanvas,
} from '@/utils/webglFullscreenTriangle'
import { hexToRgbUnit } from '@/utils/hexToRgb'

const MAX_COLORS = 8
const DEFAULT_INITIAL_SPOTLIGHT_POSITION = { x: 0.08, y: 0.14 }

type GradientBlindsProps = {
  angle?: number
  blindCount?: number
  blindMinWidth?: number
  className?: string
  distortAmount?: number
  dpr?: number
  gradientColors?: string[]
  initialSpotlightPosition?: {
    x: number
    y: number
  }
  mirrorGradient?: boolean
  mixBlendMode?: CSSProperties['mixBlendMode']
  mouseDampening?: number
  noise?: number
  paused?: boolean
  shineDirection?: 'left' | 'right'
  spotlightOpacity?: number
  spotlightRadius?: number
  spotlightSoftness?: number
}

function prepStops(stops?: string[]) {
  const base = (stops?.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS)
  if (base.length === 1) base.push(base[0])
  while (base.length < MAX_COLORS) base.push(base[base.length - 1])

  const arr = base.slice(0, MAX_COLORS).map((color) => hexToRgbUnit(color))
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2))

  return { arr, count }
}

export default function GradientBlinds({
  angle = 0,
  blindCount = 16,
  blindMinWidth = 60,
  className,
  distortAmount = 0,
  dpr,
  gradientColors,
  initialSpotlightPosition = DEFAULT_INITIAL_SPOTLIGHT_POSITION,
  mirrorGradient = false,
  mixBlendMode = 'lighten',
  mouseDampening = 0.15,
  noise = 0.3,
  paused = false,
  shineDirection = 'left',
  spotlightOpacity = 1,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
}: GradientBlindsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouseTargetRef = useRef([0, 0])
  const lastTimeRef = useRef(0)
  const firstResizeRef = useRef(true)
  const gradientColorKey = gradientColors?.join('|') ?? ''
  const initialSpotlightX = initialSpotlightPosition.x
  const initialSpotlightY = initialSpotlightPosition.y

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    firstResizeRef.current = true
    lastTimeRef.current = 0

    const pixelRatio = dpr ?? Math.min(window.devicePixelRatio || 1, 1.5)
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
    })

    if (!gl) return undefined

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const vertex = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

    const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;
uniform int uColorCount;

varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t) {
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);

  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv0 = fragCoord.xy / iResolution.xy;
  float aspect = iResolution.x / iResolution.y;
  vec2 p = uv0 * 2.0 - 1.0;
  p.x *= aspect;
  vec2 pr = rotate2D(p, uAngle);
  pr.x /= aspect;
  vec2 uv = pr * 0.5 + 0.5;
  vec2 uvMod = uv;

  if (uDistort > 0.0) {
    float a = uvMod.y * 6.0;
    float b = uvMod.x * 6.0;
    float w = 0.01 * uDistort;
    uvMod.x += sin(a) * w;
    uvMod.y += cos(b) * w;
  }

  float t = uvMod.x;
  if (uMirror > 0.5) {
    t = 1.0 - abs(1.0 - 2.0 * fract(t));
  }

  vec3 base = getGradientColor(t);
  vec2 offset = vec2(iMouse.x / iResolution.x, iMouse.y / iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
  vec3 col = vec3(spot) + base - vec3(stripe);
  col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;
  float alpha = smoothstep(0.04, 0.64, max(max(col.r, col.g), col.b));
  fragColor = vec4(col, alpha);
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`

    const gradientColorStops = gradientColorKey ? gradientColorKey.split('|') : undefined
    const { arr: colorArr, count: colorCount } = prepStops(gradientColorStops)
    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uAngle: { value: (angle * Math.PI) / 180 },
      uNoise: { value: noise },
      uBlindCount: { value: Math.max(1, blindCount) },
      uSpotlightRadius: { value: spotlightRadius },
      uSpotlightSoftness: { value: spotlightSoftness },
      uSpotlightOpacity: { value: spotlightOpacity },
      uMirror: { value: mirrorGradient ? 1 : 0 },
      uDistort: { value: distortAmount },
      uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },
      uColor0: { value: colorArr[0] },
      uColor1: { value: colorArr[1] },
      uColor2: { value: colorArr[2] },
      uColor3: { value: colorArr[3] },
      uColor4: { value: colorArr[4] },
      uColor5: { value: colorArr[5] },
      uColor6: { value: colorArr[6] },
      uColor7: { value: colorArr[7] },
      uColorCount: { value: colorCount },
    }

    let program: WebGLProgram
    let destroyTriangle: () => void

    try {
      program = createProgram(gl, vertex, fragment)
      gl.useProgram(program)
      destroyTriangle = createFullscreenTriangle(gl, program)
    } catch (error) {
      console.error(error)
      canvas.remove()
      loseContext(gl)
      return undefined
    }

    const uniformLocations = {
      iMouse: gl.getUniformLocation(program, 'iMouse'),
      iResolution: gl.getUniformLocation(program, 'iResolution'),
      iTime: gl.getUniformLocation(program, 'iTime'),
      uAngle: gl.getUniformLocation(program, 'uAngle'),
      uBlindCount: gl.getUniformLocation(program, 'uBlindCount'),
      uColor0: gl.getUniformLocation(program, 'uColor0'),
      uColor1: gl.getUniformLocation(program, 'uColor1'),
      uColor2: gl.getUniformLocation(program, 'uColor2'),
      uColor3: gl.getUniformLocation(program, 'uColor3'),
      uColor4: gl.getUniformLocation(program, 'uColor4'),
      uColor5: gl.getUniformLocation(program, 'uColor5'),
      uColor6: gl.getUniformLocation(program, 'uColor6'),
      uColor7: gl.getUniformLocation(program, 'uColor7'),
      uColorCount: gl.getUniformLocation(program, 'uColorCount'),
      uDistort: gl.getUniformLocation(program, 'uDistort'),
      uMirror: gl.getUniformLocation(program, 'uMirror'),
      uNoise: gl.getUniformLocation(program, 'uNoise'),
      uShineFlip: gl.getUniformLocation(program, 'uShineFlip'),
      uSpotlightOpacity: gl.getUniformLocation(program, 'uSpotlightOpacity'),
      uSpotlightRadius: gl.getUniformLocation(program, 'uSpotlightRadius'),
      uSpotlightSoftness: gl.getUniformLocation(program, 'uSpotlightSoftness'),
    }

    const setUniform1f = (location: WebGLUniformLocation | null, value: number) => {
      if (location) gl.uniform1f(location, value)
    }
    const setUniform1i = (location: WebGLUniformLocation | null, value: number) => {
      if (location) gl.uniform1i(location, value)
    }
    const setUniform2fv = (location: WebGLUniformLocation | null, value: number[]) => {
      if (location) gl.uniform2fv(location, value)
    }
    const setUniform3fv = (location: WebGLUniformLocation | null, value: number[]) => {
      if (location) gl.uniform3fv(location, value)
    }

    const render = () => {
      gl.useProgram(program)
      setUniform3fv(uniformLocations.iResolution, uniforms.iResolution.value)
      setUniform2fv(uniformLocations.iMouse, uniforms.iMouse.value)
      setUniform1f(uniformLocations.iTime, uniforms.iTime.value)
      setUniform1f(uniformLocations.uAngle, uniforms.uAngle.value)
      setUniform1f(uniformLocations.uNoise, uniforms.uNoise.value)
      setUniform1f(uniformLocations.uBlindCount, uniforms.uBlindCount.value)
      setUniform1f(uniformLocations.uSpotlightRadius, uniforms.uSpotlightRadius.value)
      setUniform1f(uniformLocations.uSpotlightSoftness, uniforms.uSpotlightSoftness.value)
      setUniform1f(uniformLocations.uSpotlightOpacity, uniforms.uSpotlightOpacity.value)
      setUniform1f(uniformLocations.uMirror, uniforms.uMirror.value)
      setUniform1f(uniformLocations.uDistort, uniforms.uDistort.value)
      setUniform1f(uniformLocations.uShineFlip, uniforms.uShineFlip.value)
      setUniform3fv(uniformLocations.uColor0, uniforms.uColor0.value)
      setUniform3fv(uniformLocations.uColor1, uniforms.uColor1.value)
      setUniform3fv(uniformLocations.uColor2, uniforms.uColor2.value)
      setUniform3fv(uniformLocations.uColor3, uniforms.uColor3.value)
      setUniform3fv(uniformLocations.uColor4, uniforms.uColor4.value)
      setUniform3fv(uniformLocations.uColor5, uniforms.uColor5.value)
      setUniform3fv(uniformLocations.uColor6, uniforms.uColor6.value)
      setUniform3fv(uniformLocations.uColor7, uniforms.uColor7.value)
      setUniform1i(uniformLocations.uColorCount, uniforms.uColorCount.value)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      resizeCanvas(gl, rect.width, rect.height, pixelRatio)
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]

      if (blindMinWidth > 0) {
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / blindMinWidth))
        const effective = Math.min(blindCount, maxByMinWidth)
        uniforms.uBlindCount.value = Math.max(1, effective)
      }

      if (firstResizeRef.current) {
        firstResizeRef.current = false
        const cx = gl.drawingBufferWidth * initialSpotlightX
        const cy = gl.drawingBufferHeight * initialSpotlightY
        uniforms.iMouse.value = [cx, cy]
        mouseTargetRef.current = [cx, cy]
      }

      render()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const onPointerMove = (event: PointerEvent) => {
      if (paused) return

      const rect = canvas.getBoundingClientRect()
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return
      }

      const x = (event.clientX - rect.left) * pixelRatio
      const y = (rect.height - (event.clientY - rect.top)) * pixelRatio
      mouseTargetRef.current = [x, y]
      if (mouseDampening <= 0) {
        uniforms.iMouse.value = [x, y]
      }
    }
    window.addEventListener('pointermove', onPointerMove)

    let isVisible = true
    let isPageVisible = !document.hidden

    const stop = () => {
      if (rafRef.current === null) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    const loop = (time: number) => {
      rafRef.current = requestAnimationFrame(loop)
      uniforms.iTime.value = time * 0.001

      if (mouseDampening > 0) {
        if (!lastTimeRef.current) lastTimeRef.current = time
        const dt = (time - lastTimeRef.current) / 1000
        lastTimeRef.current = time
        const factor = Math.min(1, 1 - Math.exp(-dt / Math.max(0.0001, mouseDampening)))
        const target = mouseTargetRef.current
        const current = uniforms.iMouse.value
        current[0] += (target[0] - current[0]) * factor
        current[1] += (target[1] - current[1]) * factor
      } else {
        lastTimeRef.current = time
      }

      if (!paused) {
        render()
      }
    }

    const start = () => {
      if (paused || !isVisible || !isPageVisible || rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) start()
        else stop()
      },
      { threshold: 0 }
    )
    io.observe(container)

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden
      if (isPageVisible) start()
      else stop()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    start()

    return () => {
      stop()
      window.removeEventListener('pointermove', onPointerMove)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      destroyTriangle()
      gl.deleteProgram(program)
      canvas.remove()
      loseContext(gl)
    }
  }, [
    angle,
    blindCount,
    blindMinWidth,
    distortAmount,
    dpr,
    gradientColorKey,
    initialSpotlightX,
    initialSpotlightY,
    mirrorGradient,
    mouseDampening,
    noise,
    paused,
    shineDirection,
    spotlightOpacity,
    spotlightRadius,
    spotlightSoftness,
  ])

  return (
    <div
      ref={containerRef}
      className={className}
      style={mixBlendMode ? { mixBlendMode } : undefined}
    />
  )
}

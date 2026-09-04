'use client'

import { useRef, useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { cn } from '../../app/lib/utils'
import { themeRgb } from '@/utils/cssColor'

type DitherFade = 'none' | 'left' | 'bottom'

interface DitherCanvasProps {
  children?: ReactNode
  className?: string
  /** Fade the dither out toward an edge. Supersedes `fadeToLeft`. */
  fade?: DitherFade
  /** @deprecated use `fade="left"` */
  fadeToLeft?: boolean
  enableClick?: boolean
  /** Skip the WebGL work below the `md` breakpoint (DOM stays identical). */
  desktopOnly?: boolean
  id?: string
}

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)'

function subscribeToDesktopViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getDesktopViewportSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
}

function getServerViewportSnapshot() {
  return false
}

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uFade;
uniform vec3 uBg;
uniform vec3 uPx;

const int MAX_CLICKS = 10;
uniform vec2 uClickPos[MAX_CLICKS];
uniform float uClickT[MAX_CLICKS];

const float PX = 4.0;
const float CELL = 8.0 * PX;

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define Bayer4(a) (Bayer2(0.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(0.5*(a))*0.25 + Bayer2(a))

float hash11(float n) { return fract(sin(n) * 43758.5453); }

float vnoise(vec3 p) {
  vec3 ip = floor(p), fp = fract(p);
  vec3 w = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);

  float n000 = hash11(dot(ip, vec3(1, 57, 113)));
  float n100 = hash11(dot(ip + vec3(1, 0, 0), vec3(1, 57, 113)));
  float n010 = hash11(dot(ip + vec3(0, 1, 0), vec3(1, 57, 113)));
  float n110 = hash11(dot(ip + vec3(1, 1, 0), vec3(1, 57, 113)));
  float n001 = hash11(dot(ip + vec3(0, 0, 1), vec3(1, 57, 113)));
  float n101 = hash11(dot(ip + vec3(1, 0, 1), vec3(1, 57, 113)));
  float n011 = hash11(dot(ip + vec3(0, 1, 1), vec3(1, 57, 113)));
  float n111 = hash11(dot(ip + vec3(1, 1, 1), vec3(1, 57, 113)));

  return mix(
    mix(mix(n000, n100, w.x), mix(n010, n110, w.x), w.y),
    mix(mix(n001, n101, w.x), mix(n011, n111, w.x), w.y),
    w.z
  ) * 2.0 - 1.0;
}

float fbm(vec2 uv, float t) {
  vec3 p = vec3(uv * 4.0, t);
  float amp = 1.0, freq = 1.0, sum = 1.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * vnoise(p * freq);
    freq *= 1.25;
  }
  return sum * 0.5 + 0.5;
}

void main() {
  vec2 fc = gl_FragCoord.xy - uRes * 0.5;
  float ar = uRes.x / uRes.y;

  vec2 cellCoord = floor(fc / CELL) * CELL;
  vec2 uv = (cellCoord / uRes) * vec2(ar, 1.0);

  float feed = fbm(uv, uTime * 0.1);
  feed = feed * 0.5 + (-0.65);

  for (int i = 0; i < MAX_CLICKS; i++) {
    vec2 pos = uClickPos[i];
    if (pos.x < 0.0 && pos.y < 0.0) continue;
    vec2 cuv = ((pos - uRes * 0.5 - CELL * 0.5) / uRes) * vec2(ar, 1.0);
    float t = max(uTime - uClickT[i], 0.0);
    float r = distance(uv, cuv);
    float ring = exp(-pow((r - 0.3 * t) / 0.1, 2.0));
    float atten = exp(-t) * exp(-r);
    feed = max(feed, ring * atten);
  }

  float bayer = Bayer8(fc / PX) - 0.5;
  float bw = step(0.5, feed + bayer);

  // uFade: 0 = none, 1 = fade out toward the left edge, 2 = toward the bottom edge
  if (uFade > 1.5) {
    float ny = gl_FragCoord.y / uRes.y;
    bw *= smoothstep(0.0, 0.35, ny);
  } else if (uFade > 0.5) {
    float nx = gl_FragCoord.x / uRes.x;
    bw *= smoothstep(0.0, 0.55, nx);
  }

  fragColor = vec4(mix(uBg, uPx, bw), 1.0);
}
`

function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    powerPreference: 'low-power',
  })
  if (!gl) return null

  const vs = gl.createShader(gl.VERTEX_SHADER)!
  gl.shaderSource(vs, VERT)
  gl.compileShader(vs)

  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.error('DitherCanvas vertex shader:', gl.getShaderInfoLog(vs))
    return null
  }

  const fs = gl.createShader(gl.FRAGMENT_SHADER)!
  gl.shaderSource(fs, FRAG)
  gl.compileShader(fs)

  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error('DitherCanvas fragment shader:', gl.getShaderInfoLog(fs))
    return null
  }

  const prog = gl.createProgram()!
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

  const aPos = gl.getAttribLocation(prog, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  return { gl, prog, vs, fs, buf }
}

const MAX_CLICKS = 10

export default function DitherCanvas({
  children,
  className,
  fade,
  fadeToLeft = false,
  enableClick = true,
  desktopOnly = false,
  id,
}: DitherCanvasProps) {
  const fadeMode: DitherFade = fade ?? (fadeToLeft ? 'left' : 'none')
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const clickRef = useRef<((clientX: number, clientY: number) => void) | null>(null)
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerViewportSnapshot
  )
  const glEnabled = !desktopOnly || isDesktop

  useEffect(() => {
    if (!glEnabled) return
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const ctx = initGL(canvas)
    if (!ctx) return
    const { gl, prog, vs, fs, buf } = ctx

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uFade = gl.getUniformLocation(prog, 'uFade')
    const uBg = gl.getUniformLocation(prog, 'uBg')
    const uPx = gl.getUniformLocation(prog, 'uPx')

    const uClickPosLocs: (WebGLUniformLocation | null)[] = []
    const uClickTLocs: (WebGLUniformLocation | null)[] = []
    for (let i = 0; i < MAX_CLICKS; i++) {
      uClickPosLocs.push(gl.getUniformLocation(prog, `uClickPos[${i}]`))
      uClickTLocs.push(gl.getUniformLocation(prog, `uClickT[${i}]`))
    }

    const syncColors = () => {
      const bg = themeRgb(root, '--l1-background')
      const l3 = themeRgb(root, '--l3-background')
      // l3/background-30 over l1/background
      gl.uniform3f(uBg, bg.r / 255, bg.g / 255, bg.b / 255)
      gl.uniform3f(
        uPx,
        (bg.r * 0.7 + l3.r * 0.3) / 255,
        (bg.g * 0.7 + l3.g * 0.3) / 255,
        (bg.b * 0.7 + l3.b * 0.3) / 255
      )
    }

    gl.uniform1f(uFade, fadeMode === 'bottom' ? 2.0 : fadeMode === 'left' ? 1.0 : 0.0)
    for (let i = 0; i < MAX_CLICKS; i++) {
      gl.uniform2f(uClickPosLocs[i], -1, -1)
      gl.uniform1f(uClickTLocs[i], 0)
    }
    syncColors()

    let clickIndex = 0
    const timeRef = { current: 0 }

    clickRef.current = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const fragX = ((clientX - rect.left) * canvas.width) / rect.width
      const fragY = ((rect.height - (clientY - rect.top)) * canvas.height) / rect.height

      gl.uniform2f(uClickPosLocs[clickIndex], fragX, fragY)
      gl.uniform1f(uClickTLocs[clickIndex], timeRef.current)
      clickIndex = (clickIndex + 1) % MAX_CLICKS
    }

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const themeObserver = new MutationObserver(syncColors)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    let rafId = 0
    let running = false
    const start = performance.now()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let io: IntersectionObserver | undefined

    if (prefersReducedMotion) {
      gl.uniform1f(uTime, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    } else {
      const render = () => {
        timeRef.current = (performance.now() - start) / 1000
        gl.uniform1f(uTime, timeRef.current)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        rafId = requestAnimationFrame(render)
      }
      const startLoop = () => {
        if (running) return
        running = true
        rafId = requestAnimationFrame(render)
      }
      const stopLoop = () => {
        running = false
        cancelAnimationFrame(rafId)
      }

      render()
      cancelAnimationFrame(rafId)

      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) startLoop()
            else stopLoop()
          },
          { rootMargin: '120px' }
        )
        io.observe(root)
      } else {
        startLoop()
      }
    }

    return () => {
      cancelAnimationFrame(rafId)
      io?.disconnect()
      ro.disconnect()
      themeObserver.disconnect()
      clickRef.current = null
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [fadeMode, glEnabled])

  const handlePointerDown = enableClick
    ? (e: React.PointerEvent) => clickRef.current?.(e.clientX, e.clientY)
    : undefined

  return (
    <div
      ref={rootRef}
      id={id}
      className={cn('relative overflow-hidden', className)}
      onPointerDown={handlePointerDown}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      {fadeMode === 'left' && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[45%]"
          style={{
            background:
              'linear-gradient(to right, var(--l1-background) 0%, var(--l1-background) 10%, transparent 100%)',
          }}
        />
      )}
      {fadeMode === 'bottom' && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[35%]"
          style={{
            background: 'linear-gradient(to top, var(--l1-background) 0%, transparent 100%)',
          }}
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}

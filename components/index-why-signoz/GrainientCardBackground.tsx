'use client'

import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

const SIGNOZ_COLORS = {
  aqua600: '#07AFE6',
  cherry500: '#E5484D',
  ink500: '#0B0C0E',
  robin500: '#4E74F8',
  slate500: '#161922',
}

type GrainientCardBackgroundProps = {
  className?: string
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return new Float32Array([1, 1, 1])

  return new Float32Array([
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ])
}

const vertex = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
  return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float n = mix(
    mix(
      dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
      dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)),
      u.x
    ),
    mix(
      dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
      dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)),
      u.x
    ),
    u.y
  );
  return 0.5 + 0.5 * n;
}

void mainImage(out vec4 color, vec2 coord) {
  float t = iTime * 0.08;
  vec2 uv = coord / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;
  vec2 tuv = uv - 0.5 + vec2(-0.08, 0.04);

  float degree = noise(vec2(t * 0.18, tuv.x * tuv.y) * 2.2);
  tuv /= 0.82;
  tuv.y *= 1.0 / ratio;
  tuv *= Rot(radians((degree - 0.5) * 260.0 + 180.0));
  tuv.y *= ratio;

  float warpTime = t * 1.4;
  tuv.x += sin(tuv.y * 4.2 + warpTime) / 72.0;
  tuv.y += sin(tuv.x * 6.3 + warpTime) / 36.0;

  float blendX = (tuv * Rot(radians(-22.0))).x;
  vec3 deepBase = mix(uColor3, uColor4, 0.42);
  vec3 coolAccent = mix(uColor1, uColor5, 0.32);
  vec3 layer1 = mix(deepBase, uColor2, S(-0.46, 0.28, blendX));
  vec3 layer2 = mix(uColor2, coolAccent, S(-0.36, 0.34, blendX));
  vec3 col = mix(layer1, layer2, S(0.46, -0.38, tuv.y));

  float grain = fract(sin(dot(uv * 2.4, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.06;
  col = mix(uColor3, col, 0.72);
  col = (col - 0.5) * 1.18 + 0.5;
  col = clamp(col, 0.0, 1.0);

  color = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  fragColor = color;
}
`

export default function GrainientCardBackground({ className }: GrainientCardBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      webgl: 2,
    })
    const gl = renderer.gl
    const canvas = gl.canvas

    canvas.style.display = 'block'
    canvas.style.height = '100%'
    canvas.style.width = '100%'
    container.appendChild(canvas)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      fragment,
      uniforms: {
        iResolution: { value: new Float32Array([1, 1]) },
        iTime: { value: 0 },
        uColor1: { value: hexToRgb(SIGNOZ_COLORS.robin500) },
        uColor2: { value: hexToRgb(SIGNOZ_COLORS.cherry500) },
        uColor3: { value: hexToRgb(SIGNOZ_COLORS.ink500) },
        uColor4: { value: hexToRgb(SIGNOZ_COLORS.slate500) },
        uColor5: { value: hexToRgb(SIGNOZ_COLORS.aqua600) },
      },
      vertex,
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height))
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight
      renderer.render({ scene: mesh })
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    let isVisible = true
    let isPageVisible = !document.hidden
    const startTime = performance.now()

    const stop = () => {
      if (rafRef.current === null) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    const loop = (time: number) => {
      program.uniforms.iTime.value = (time - startTime) * 0.001
      renderer.render({ scene: mesh })
      rafRef.current = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!isVisible || !isPageVisible || rafRef.current !== null) return
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
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      canvas.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <div ref={containerRef} className={className} />
}

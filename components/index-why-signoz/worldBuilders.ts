// Class names in these innerHTML templates stay literal on purpose (see why-signoz-proto.css).

export const WW = 520

export const CUBES = [
  { x: 130, y: 360, c: '#4E74F8', svc: 'checkout', g: 'M-3.6,-1.8h7.2M-3.6,1.2h4.6' },
  { x: 260, y: 360, c: '#E5484D', svc: 'payments', g: 'M-4.4,1.6l2.2,-3.6l2.2,4.2l2.2,-2.4' },
  {
    x: 390,
    y: 360,
    c: '#FFCD56',
    svc: 'cart-service',
    g: 'M0,-3.4l3.1,1.8v3.2L0,3.6l-3.1,-1.8v-3.2z',
  },
]
export const CW = 32
export const CH = 16
export const CS = 36
export const COL = { x: 260, y: 600, w: 46, h: 23, s: 52 }
export const STORE_TOP = 740
export const MID = 260

export const LINES = [
  'Correlated the p99 spike on <code>payments</code> with 47 error logs in the same minute.',
  '<div class="schema"><span class="chip"><b>traces</b> 1.2k</span><span class="chip"><b>logs</b> 47</span><span class="chip"><b>metrics</b> 9</span><span class="chip"><b>services</b> 4</span></div>',
  'Root cause: the DB connection pool hit its ceiling of 20 while retries piled up.',
]
export const EXTRA: Record<string, string> = {
  blast: 'Same pool is shared by <code>checkout</code> — it saw a 96 ms secondary spike.',
  fix: 'Suggested: raise <code>pool.max</code> to 40 and cap retries at 1 for <code>charge</code>.',
}

export function fx(n: number) {
  return Math.round(n * 10) / 10
}

export function makeTelemetrySeries(profile: number) {
  const count = 48
  const base = 28 + Math.random() * 58
  const phase = Math.random() * Math.PI * 2
  const cycles = 0.7 + Math.random() * 3.8
  const trend = (Math.random() - 0.5) * 1.7
  const events: { at: number; width: number; amp: number }[] = []
  const eventCount = 3 + Math.floor(Math.random() * 4)
  for (let e = 0; e < eventCount; e++) {
    events.push({
      at: 3 + Math.random() * (count - 6),
      width: 0.45 + Math.random() * 3.6,
      amp: (45 + Math.random() * 170) * (Math.random() < 0.28 ? -0.55 : 1),
    })
  }
  let walk = 0
  return Array.from({ length: count }, (_, i) => {
    const wave = Math.sin(phase + (i / count) * Math.PI * 2 * cycles)
    let value = base + trend * i
    if (profile === 0) {
      value += wave * (6 + Math.random() * 10) + (Math.random() - 0.5) * 18
    } else if (profile === 1) {
      value += wave * (24 + Math.random() * 18)
      value += Math.sin(phase * 0.4 + i * 0.82) * (8 + Math.random() * 12)
    } else {
      walk += (Math.random() - 0.47) * 17
      value += walk + ((i % 9) / 9) * (22 + Math.random() * 28)
      value += (Math.random() - 0.5) * 26
    }
    events.forEach((event) => {
      const distance = (i - event.at) / event.width
      value += event.amp * Math.exp(-distance * distance * 2)
    })
    return Math.max(4, Math.round(value))
  })
}

export const pts = (a: number[][]) => a.map((p) => `${fx(p[0])},${fx(p[1])}`).join(' ')
export const dia = (cx: number, cy: number, rx: number, ry: number) =>
  `M${fx(cx)} ${fx(cy - ry)}L${fx(cx + rx)} ${fx(cy)}L${fx(cx)} ${fx(cy + ry)}L${fx(cx - rx)} ${fx(cy)}Z`

export function cubeSVG(
  o: { x: number; y: number; c: string },
  w: number,
  h: number,
  s: number,
  cls: string,
  key: string,
  cssvar: string,
  glyph: string | 0
) {
  const cx = o.x
  const cy = o.y
  const T = [cx, cy - h]
  const R = [cx + w, cy]
  const B = [cx, cy + h]
  const L = [cx - w, cy]
  const Ld = [cx - w, cy + s]
  const Bd = [cx, cy + h + s]
  const Rd = [cx + w, cy + s]
  const qq = 0.5
  const iT = [cx, cy - h * qq]
  const iR = [cx + w * qq, cy]
  const iB = [cx, cy + h * qq]
  const iL = [cx - w * qq, cy]
  const by = cy - h - 20
  return (
    `<g class="${cls}" style="--c:${o.c};--t:var(${cssvar})">` +
    `<ellipse class="glow" cx="${cx}" cy="${fx(cy + h + s + 4)}" rx="${fx(w * 1.7)}" ry="${fx(h * 0.95)}" fill="url(#gl-${key})"/>` +
    `<polygon class="f-left" points="${pts([L, B, Bd, Ld])}"/>` +
    `<polygon class="f-right" points="${pts([B, R, Rd, Bd])}"/>` +
    `<polygon class="tint" points="${pts([L, B, Bd, Ld])}" fill="url(#tn-${key})"/>` +
    `<polygon class="tint" points="${pts([B, R, Rd, Bd])}" fill="url(#tn-${key})"/>` +
    `<polygon class="f-top" points="${pts([T, R, B, L])}"/>` +
    `<polygon class="rim" points="${pts([T, R, B, L])}"/>` +
    `<polygon class="f-topin" points="${pts([iT, iR, iB, iL])}"/>` +
    (glyph
      ? `<g><line class="stem" x1="${cx}" y1="${fx(by + 10)}" x2="${cx}" y2="${fx(cy - h + 2)}"/>` +
        `<circle class="bdg-r" cx="${cx}" cy="${fx(by)}" r="8.5"/>` +
        `<circle class="bdg-f" cx="${cx}" cy="${fx(by)}" r="8.5"/>` +
        `<path class="bdg-g" transform="translate(${cx} ${fx(by)})" d="${glyph}"/></g>`
      : '') +
    (glyph ? `<polygon class="hit" points="${pts([T, R, Rd, Bd, Ld, L])}"/>` : '') +
    '</g>'
  )
}

export function decal(o: { x: number; y: number }, w: number, h: number, s: number) {
  const inset = 0.17
  const span = 1 - inset * 2
  const p6 = (n: number) => n.toFixed(5)
  const a = -(span * w) / 128
  const bb = -(span * h) / 128
  const d = (span * s) / 128
  const e = o.x - inset * w
  const ff = o.y + h - inset * h + inset * s
  return (
    `<g class="decal" transform="matrix(${p6(a)} ${p6(bb)} 0 ${p6(d)} ${p6(e)} ${p6(ff)})">` +
    '<path fill="#f5a800" d="M67.648 69.797c-5.246 5.25-5.246 13.758 0 19.008 5.25 5.246 13.758 5.246 19.004 0 5.25-5.25 5.25-13.758 0-19.008-5.246-5.246-13.754-5.246-19.004 0Zm14.207 14.219a6.649 6.649 0 0 1-9.41 0 6.65 6.65 0 0 1 0-9.407 6.649 6.649 0 0 1 9.41 0c2.598 2.586 2.598 6.809 0 9.407ZM86.43 3.672l-8.235 8.234a4.17 4.17 0 0 0 0 5.875l32.149 32.149a4.17 4.17 0 0 0 5.875 0l8.234-8.235c1.61-1.61 1.61-4.261 0-5.87L92.29 3.671a4.159 4.159 0 0 0-5.86 0ZM28.738 108.895a3.763 3.763 0 0 0 0-5.31l-4.183-4.187a3.768 3.768 0 0 0-5.313 0l-8.644 8.649-.016.012-2.371-2.375c-1.313-1.313-3.45-1.313-4.75 0-1.313 1.312-1.313 3.449 0 4.75l14.246 14.242a3.353 3.353 0 0 0 4.746 0c1.3-1.313 1.313-3.45 0-4.746l-2.375-2.375.016-.012Zm0 0"/>' +
    '<path fill="#425cc7" d="M72.297 27.313 54.004 45.605c-1.625 1.625-1.625 4.301 0 5.926L65.3 62.824c7.984-5.746 19.18-5.035 26.363 2.153l9.148-9.149c1.622-1.625 1.622-4.297 0-5.922L78.22 27.313a4.185 4.185 0 0 0-5.922 0ZM60.55 67.585l-6.672-6.672c-1.563-1.562-4.125-1.562-5.684 0l-23.53 23.54a4.036 4.036 0 0 0 0 5.687l13.331 13.332a4.036 4.036 0 0 0 5.688 0l15.132-15.157c-3.199-6.609-2.625-14.593 1.735-20.73Zm0 0"/></g>'
  )
}

export function fans(o: { x: number; y: number; c: string }, w: number, h: number, s: number) {
  const cx = o.x
  const cy = o.y
  const L = [cx - w, cy]
  const B = [cx, cy + h]
  const R = [cx + w, cy]
  const Ld = [cx - w, cy + s]
  const Bd = [cx, cy + h + s]
  const Rd = [cx + w, cy + s]
  const off = (quad: number[][], dx: number, dy: number, t: number) =>
    quad.map((v) => [v[0] + dx * t, v[1] + dy * t])
  let out = `<g class="fan" style="--c:${o.c};--t:var(--halo);transform-origin:${cx}px ${fx(cy + h + s / 2)}px">`
  ;(
    [
      [[L, B, Bd, Ld], -w, h],
      [[B, R, Rd, Bd], w, h],
    ] as [number[][], number, number][]
  ).forEach((side) => {
    const quad = side[0]
    const dx = side[1]
    const dy = side[2]
    const t1 = off(quad, dx, dy, 0.95)
    const t2 = off(quad, dx, dy, 1.8)
    out += `<polygon class="ly1" points="${pts(t1)}"/><polygon class="ly2" points="${pts(t2)}"/>`
    let lines = ''
    for (let i = 0; i < 4; i++) {
      lines += `M${fx(quad[i][0])} ${fx(quad[i][1])}L${fx(t2[i][0])} ${fx(t2[i][1])}`
    }
    out += `<path class="fx" d="${lines}"/>`
  })
  return out + '</g>'
}

export function trace(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1
  const dy = y2 - y1
  if (Math.abs(dx) < 0.5) return `M${x1} ${y1}V${y2}`
  const sy = dy < 0 ? -1 : 1
  const sx = dx < 0 ? -1 : 1
  const mid = y1 + dy / 2
  const r = Math.min(10, Math.abs(dx) / 2, Math.abs(dy) / 4)
  if (r < 1) return `M${x1} ${y1}V${mid}H${x2}V${y2}`
  return (
    `M${x1} ${y1}V${fx(mid - sy * r)}Q${x1} ${fx(mid)} ${fx(x1 + sx * r)} ${fx(mid)}` +
    `H${fx(x2 - sx * r)}Q${x2} ${fx(mid)} ${x2} ${fx(mid + sy * r)}V${y2}`
  )
}

export function link(id: string, colour: string, d: string, cssvar: string, glow?: number) {
  return (
    `<g data-id="${id}" style="--c:${colour};--t:var(${cssvar})">` +
    (glow ? `<path class="glowwire" d="${d}"/>` : '') +
    `<path class="wire" d="${d}"/><path class="dashes" d="${d}"/></g>`
  )
}

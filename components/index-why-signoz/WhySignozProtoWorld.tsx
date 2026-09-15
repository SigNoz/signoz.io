'use client'

import { Bot, Database } from 'lucide-react'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import './why-signoz-proto.css'
import {
  COL,
  CUBES,
  CW,
  CH,
  CS,
  EXTRA,
  LINES,
  MID,
  STORE_TOP,
  WW,
  cubeSVG,
  decal,
  dia,
  fans,
  fx,
  link,
  makeTelemetrySeries,
  pts,
  trace,
} from './worldBuilders'

export interface WhySignozWorldHandle {
  update: (g: number) => void
  relayout: () => void
}

const TROWS: [string, string, string, string, string, number][] = [
  ['14:02:11', 'payments', 'trace', '486ms', 'hot', 0],
  ['14:02:11', 'consumer-svc-1', 'log', 'error', 'hot', 1],
  ['14:02:10', 'checkout', 'trace', '311ms', '', 0],
  ['14:02:09', 'consumer-svc-1', 'metric', '0.99', '', 1],
  ['14:02:08', 'cart-service', 'log', 'warn', 'warn', 0],
  ['14:02:07', 'consumer-svc-1', 'trace', '128ms', '', 1],
  ['14:02:06', 'catalog', 'trace', '42ms', '', 0],
  ['14:02:05', 'consumer-svc-1', 'log', 'info', '', 1],
  ['14:02:04', 'payments', 'log', 'error', 'hot', 0],
]

type SigRow = [string, string, string, number]
const SVC: Record<
  string,
  {
    c: string
    tag: string
    traces: SigRow[]
    logs: SigRow[]
    spans: SigRow[]
    metrics: SigRow[]
    d?: number[]
  }
> = {
  payments: {
    c: '#E5484D',
    tag: '+412 ms',
    traces: [
      ['a7f1c2', 'POST /charge — payments.charge', '486ms', 1],
      ['b30e94', 'POST /charge — pool.acquire', '402ms', 0],
      ['c81a45', 'GET /methods — redis.get', '38ms', 0],
      ['d07be1', 'POST /ledger — ledger.commit', '116ms', 0],
      ['e41a8c', 'POST /charge — retry.backoff', '91ms', 0],
    ],
    logs: [
      ['error', 'connection pool exhausted (max 20)', '14:02', 1],
      ['warn', 'retry 3/3 payments-db', '14:02', 0],
      ['error', 'ledger request exceeded deadline', '14:03', 1],
      ['warn', 'queue depth reached 184', '14:04', 0],
      ['info', 'pool resized to 40', '14:07', 0],
    ],
    spans: [
      ['db.query', 'SELECT … FROM charges WHERE …', '318ms', 1],
      ['http', 'ledger-api /v2/post', '104ms', 0],
      ['queue', 'payments.events publish', '47ms', 0],
      ['cache', 'redis MGET pm:*', '11ms', 0],
      ['encode', 'protobuf marshal charge', '4ms', 0],
    ],
    metrics: [
      ['p99', 'http.server.duration', '486ms', 1],
      ['pool', 'db.connections.used', '20/20', 1],
      ['rate', 'payments.requests', '812/s', 0],
      ['errors', 'payments.errors', '4.8%', 1],
      ['queue', 'payments.queue.depth', '184', 0],
    ],
  },
  checkout: {
    c: '#4E74F8',
    tag: '+96 ms',
    traces: [
      ['d2b917', 'POST /checkout — cart.reprice', '311ms', 1],
      ['e4c033', 'POST /checkout — payments.charge', '486ms', 0],
      ['f0a781', 'GET /cart — catalog.batch', '54ms', 0],
      ['1f2c90', 'POST /checkout — tax.quote', '73ms', 0],
      ['83bc11', 'POST /checkout — inventory.hold', '68ms', 0],
    ],
    logs: [
      ['warn', 'downstream payments slow (p99 486ms)', '14:02', 1],
      ['info', 'reprice cache miss ratio 0.34', '14:02', 0],
      ['warn', 'inventory hold retried once', '14:03', 0],
      ['info', 'checkout completed 1,204', '14:03', 0],
      ['info', 'tax quote cache warmed', '14:05', 0],
    ],
    spans: [
      ['http', 'payments-api /v2/charge', '402ms', 1],
      ['http', 'tax-api /v1/quote', '73ms', 0],
      ['db.query', 'SELECT … FROM carts WHERE …', '44ms', 0],
      ['http', 'inventory /v1/hold', '38ms', 0],
      ['cache', 'redis GET cart:9f2', '6ms', 0],
    ],
    metrics: [
      ['p99', 'checkout.duration', '311ms', 1],
      ['rate', 'checkout.requests', '1.2k/s', 0],
      ['cache', 'reprice.hit_ratio', '66%', 0],
      ['errors', 'checkout.errors', '1.3%', 0],
      ['saturation', 'worker.utilization', '78%', 0],
    ],
  },
  'cart-service': {
    c: '#FFCD56',
    tag: 'stable',
    traces: [
      ['aa10f4', 'PUT /cart/items — cart.add', '62ms', 0],
      ['bb7712', 'GET /cart — redis.get', '9ms', 0],
      ['cc93ad', 'DELETE /cart/items', '31ms', 0],
      ['dd104c', 'POST /cart/merge — session', '48ms', 0],
      ['ee62af', 'GET /cart/price — catalog', '22ms', 0],
    ],
    logs: [
      ['info', 'cart merged for session 41ac', '14:02', 0],
      ['info', 'ttl refreshed 1,882 keys', '14:02', 0],
      ['warn', 'stale price for sku 77120', '14:04', 1],
      ['info', 'orphan carts swept 42', '14:05', 0],
      ['info', 'catalog snapshot advanced', '14:06', 0],
    ],
    spans: [
      ['cache', 'redis MGET cart:*', '9ms', 0],
      ['db.query', 'SELECT … FROM items WHERE …', '21ms', 0],
      ['http', 'catalog /v1/prices', '18ms', 0],
      ['merge', 'session cart reconcile', '14ms', 0],
      ['encode', 'cart response marshal', '3ms', 0],
    ],
    metrics: [
      ['p99', 'cart.duration', '62ms', 0],
      ['rate', 'cart.operations', '2.8k/s', 0],
      ['cache', 'redis.hit_ratio', '97%', 0],
      ['size', 'cart.items.avg', '4.2', 0],
      ['errors', 'cart.errors', '0.08%', 0],
    ],
  },
}

const BEATS: Record<string, [number, number]> = {
  c0: [-0.24, -0.02],
  c1: [-0.2, -0.02],
  c2: [-0.16, -0.02],
  halo: [0.3, 0.66],
  panelt: [-0.18, -0.02],
  otel: [1.04, 1.3],
  link1: [1.34, 1.76],
  pulse: [1.4, 1.64],
  tab: [1.52, 1.78],
  link2: [1.92, 2.1],
  store: [2.02, 2.3],
  rows: [2.1, 2.38],
  search: [2.26, 2.44],
  type: [2.58, 2.82],
  cond: [2.84, 2.95],
  link3: [3.06, 3.46],
  agent: [3.18, 3.58],
}

const WhySignozProtoWorld = forwardRef<WhySignozWorldHandle>(function WhySignozProtoWorld(_, ref) {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const apiRef = useRef<WhySignozWorldHandle>({ update: () => {}, relayout: () => {} })

  useImperativeHandle(ref, () => ({
    update: (g) => apiRef.current.update(g),
    relayout: () => apiRef.current.relayout(),
  }))

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const q = <T extends Element>(sel: string) => frame.querySelector(sel) as T
    const viewport = q<HTMLDivElement>('.viewport')
    const world = q<HTMLDivElement>('.world')
    const canvas = q<SVGSVGElement>('.wcanvas')
    const nInfo = q<HTMLDivElement>('.nInfo')
    const nStore = q<HTMLDivElement>('.nStore')
    const nAgent = q<HTMLDivElement>('.nAgent')
    const nozTraveler = q<HTMLDivElement>('.noz-traveler')
    const chart = q<SVGSVGElement>('.ipChart')
    const sigRows = q<HTMLDivElement>('.rows')
    const ipName = q<HTMLElement>('.ipName')
    const ipTag = q<HTMLElement>('.ipTag')
    const tgrid = q<HTMLDivElement>('.tgrid')
    const qline = q<HTMLElement>('.qline')
    const agentCode = q<HTMLDivElement>('.code')
    const agentBody = q<HTMLDivElement>('.ans .body')
    const sugg = q<HTMLDivElement>('.sugg')
    const chartbox = q<HTMLDivElement>('.chartbox')
    const tip = q<HTMLDivElement>('.tip')
    const sigTabs = q<HTMLDivElement>('.tabs')
    const trailCanvas = q<HTMLCanvasElement>('.pointer-trail')

    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const timeouts: number[] = []

    const CT = COL.y - COL.h
    const CB = COL.y + COL.h + COL.s

    ;(function build() {
      let defs = '<defs>'
      CUBES.concat([{ x: COL.x, y: 0, c: '#9aa3af', svc: '', g: '' }]).forEach((o, n) => {
        const key = (n === 3 ? 'ccube-' : 'cube-') + o.x
        defs +=
          `<linearGradient id="tn-${key}" x1="0" y1="0" x2="0" y2="1">` +
          `<stop offset="0" stop-color="${o.c}" stop-opacity="0"/>` +
          `<stop offset="1" stop-color="${o.c}" stop-opacity="${n === 3 ? '.13' : '.22'}"/></linearGradient>` +
          `<radialGradient id="gl-${key}">` +
          `<stop offset="0" stop-color="${o.c}" stop-opacity="${n === 3 ? '.3' : '.45'}"/>` +
          `<stop offset="1" stop-color="${o.c}" stop-opacity="0"/></radialGradient>`
      })
      defs += '</defs>'

      const fan = CUBES.map((o) => fans(o, CW, CH, CS)).join('')
      const cp =
        '<g class="cpg">' +
        CUBES.map((o, i) => link('cp' + i, o.c, trace(MID, 208, o.x, o.y - CH), '--panelt')).join(
          ''
        ) +
        '</g>'
      const l1 = CUBES.map((o, i) =>
        link('l1' + i, o.c, trace(COL.x, CT, o.x, o.y + CH + CS), '--link1')
      ).join('')

      const rc = [COL.x, COL.y + COL.s]
      const pulse =
        '<g class="pulse" style="--t:var(--pulse)">' +
        `<path class="ring solid r1" d="${dia(rc[0], rc[1], COL.w * 1.3, COL.h * 1.3)}"/>` +
        `<path class="ring bord r2" d="${dia(rc[0], rc[1], COL.w * 1.6, COL.h * 1.6)}"/>` +
        `<path class="ring solid r3" d="${dia(rc[0], rc[1], COL.w * 1.95, COL.h * 1.95)}"/>` +
        `<path class="ring dashed r4" d="${dia(rc[0], rc[1], COL.w * 2.3, COL.h * 2.3)}"/></g>`
      const ccube =
        '<g class="collector" style="--t:var(--otel);--collector:1">' +
        cubeSVG(
          { x: COL.x, y: COL.y, c: '#9aa3af' },
          COL.w,
          COL.h,
          COL.s,
          'cube ccube',
          'ccube-' + COL.x,
          '--collector',
          0
        ) +
        decal(COL, COL.w, COL.h, COL.s) +
        '</g>'

      const LBL = 'opentelemetry'
      const CHW = 5.72
      const PADL = 20
      const PADR = 10
      const LEAD = 20
      const tw = LBL.length * CHW + PADL + PADR
      const vc = fx(COL.y + COL.s / 2)
      const lx = COL.x + COL.w + LEAD
      const otab =
        '<g class="otab" style="--t:var(--tab)">' +
        `<line x1="${COL.x + COL.w - 2}" y1="${vc}" x2="${lx}" y2="${vc}" stroke="rgba(255,255,255,.18)" stroke-width="1"/>` +
        `<rect x="${lx}" y="${fx(vc - 11)}" width="${fx(tw)}" height="22" rx="2"/>` +
        `<circle class="odot" cx="${lx + 10}" cy="${vc}" r="2.6"/>` +
        `<text x="${lx + PADL}" y="${fx(vc + 3.4)}">${LBL}</text></g>`

      const l2 = link('l2', '#9aa3af', `M${COL.x} ${CB}V${STORE_TOP + 8}`, '--link2')
      const l3 = link('l3', '#8aa7fb', `M${MID} 1000V1100`, '--link3', 1)

      canvas.innerHTML =
        defs +
        l1 +
        cp +
        l2 +
        l3 +
        fan +
        pulse +
        ccube +
        otab +
        CUBES.map((o, i) => cubeSVG(o, CW, CH, CS, 'cube', 'cube-' + o.x, '--c' + i, o.g)).join('')
    })()

    const pathL3 = canvas.querySelector<SVGGElement>('[data-id="l3"]')!

    tgrid.innerHTML =
      '<div class="trow head"><span>timestamp</span><span>service.name</span><span>signal</span><span>value</span></div>' +
      TROWS.map(
        (r, i) =>
          `<div class="trow ${r[5] ? 'hit' : 'miss'}" style="--i:${i}">` +
          `<span>${r[0]}</span><span class="svc">${r[1]}</span>` +
          `<span class="sg">${r[2]}</span><span class="v ${r[4]}">${r[3]}</span></div>`
      ).join('')

    ;(function buildQuery() {
      let n = 0
      let h = ''
      ;(
        [
          ['service', 'q-a'],
          ['.name', 'q-b'],
          [' ', 'q-a'],
          ['=', 'q-c'],
          [' ', 'q-a'],
          ["'consumer-svc-1'", 'q-d'],
        ] as [string, string][]
      ).forEach((t) => {
        for (let i = 0; i < t[0].length; i++) {
          h += `<i class="${t[1]}" style="--i:${n}">${t[0][i] === ' ' ? '&nbsp;' : t[0][i]}</i>`
          n++
        }
      })
      qline.insertAdjacentHTML('afterbegin', h)
      world.style.setProperty('--nch', String(n))
      function advance() {
        const p = document.createElement('span')
        p.style.cssText =
          'position:absolute;visibility:hidden;white-space:pre;font-family:var(--mono);font-size:16.5px'
        p.textContent = '0000000000'
        qline.appendChild(p)
        const w = p.offsetWidth / 10
        p.remove()
        if (w > 0) world.style.setProperty('--cw', w.toFixed(3) + 'px')
      }
      advance()
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(advance)
    })()

    Object.keys(SVC).forEach((service, profile) => {
      SVC[service].d = makeTelemetrySeries(profile)
    })

    const cubeEls = Array.from(canvas.querySelectorAll<SVGGElement>('.cube:not(.ccube)'))
    const CH_W = 400
    const CH_H = 104
    const PADT = 12
    const PADB = 10
    let curSvc = 'payments'
    let curKey: 'traces' | 'logs' | 'spans' | 'metrics' = 'traces'
    let cd: number[] | null = null
    let cpxF: ((i: number) => number) | null = null
    let cpyF: ((v: number) => number) | null = null

    function drawChart(svc: string) {
      const d = SVC[svc].d!
      const mx = Math.max.apply(null, d)
      const col = SVC[svc].c
      cd = d
      cpxF = (i) => (i / (d.length - 1)) * CH_W
      cpyF = (v) => CH_H - PADB - (v / mx) * (CH_H - PADT - PADB)
      const line = d
        .map((v, i) => {
          const x = cpxF!(i)
          const y = cpyF!(v)
          if (!i) return `M${x.toFixed(1)} ${y.toFixed(1)}`
          const previousX = cpxF!(i - 1)
          const previousY = cpyF!(d[i - 1])
          const controlX = (previousX + x) / 2
          return `C${controlX.toFixed(1)} ${previousY.toFixed(1)} ${controlX.toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`
        })
        .join(' ')
      const area = `${line} L${CH_W} ${CH_H} L0 ${CH_H} Z`
      const spike = d.indexOf(mx)
      chart.innerHTML =
        '<defs>' +
        `<linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".04"/><stop offset=".62" stop-color="${col}" stop-opacity=".18"/><stop offset="1" stop-color="${col}" stop-opacity=".46"/></linearGradient>` +
        '<linearGradient id="df" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="white" stop-opacity="1"/><stop offset=".62" stop-color="white" stop-opacity=".68"/><stop offset="1" stop-color="white" stop-opacity=".08"/></linearGradient>' +
        `<pattern id="dp" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.05" fill="${col}" fill-opacity=".9"/><circle cx="5" cy="5" r=".72" fill="${col}" fill-opacity=".55"/></pattern>` +
        `<clipPath id="dc"><path d="${area}"/></clipPath>` +
        `<mask id="dm"><rect width="${CH_W}" height="${CH_H}" fill="url(#df)"/></mask>` +
        '</defs>' +
        `<path d="${area}" fill="url(#cg)"/>` +
        `<rect width="${CH_W}" height="${CH_H}" fill="url(#dp)" clip-path="url(#dc)" mask="url(#dm)"/>` +
        `<path d="${line}" fill="none" stroke="${col}" stroke-width="1.4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>` +
        `<line class="cursor" data-id="cur" x1="0" y1="0" x2="0" y2="${CH_H}" stroke-width="1" vector-effect="non-scaling-stroke" opacity="0"/>` +
        `<circle data-id="pt" r="2.6" fill="#0a0b0d" stroke="${col}" stroke-width="1.4" opacity="0"/>` +
        `<line x1="${cpxF(spike)}" y1="${cpyF(mx)}" x2="${cpxF(spike)}" y2="${CH_H}" stroke="${col}" stroke-opacity=".3" stroke-dasharray="2 3" stroke-width="1" vector-effect="non-scaling-stroke"/>`
    }
    function renderSig() {
      sigRows.innerHTML = SVC[curSvc][curKey]
        .map(
          (r, n) =>
            `<div class="row" style="animation-delay:${n * 55}ms"><span class="id">${r[0]}</span><span class="lbl">${r[1]}</span><span class="val${r[3] ? ' hot' : ''}">${r[2]}</span></div>`
        )
        .join('')
    }
    function selectCube(i: number) {
      curSvc = CUBES[i].svc
      nInfo.style.setProperty('--c', SVC[curSvc].c)
      ipName.textContent = curSvc
      ipTag.textContent = SVC[curSvc].tag
      drawChart(curSvc)
      renderSig()
      cubeEls.forEach((g, n) => g.classList.toggle('act', n === i))
      for (let n = 0; n < 3; n++) {
        const g = canvas.querySelector<SVGGElement>(`[data-id="cp${n}"]`)
        if (g) g.style.opacity = n === i ? '1' : '0'
      }
    }

    const lastVar: Record<string, string | null> = {}
    const lastCls: Record<string, boolean> = {}
    function tog(c: string, on: boolean) {
      if (lastCls[c] === on) return
      lastCls[c] = on
      world.classList.toggle(c, on)
    }
    let typed = false
    function typeAgent() {
      if (typed) return
      typed = true
      LINES.forEach((html, n) => {
        timeouts.push(
          window.setTimeout(
            () => {
              const p = document.createElement('p')
              p.innerHTML = html
              agentBody.appendChild(p)
            },
            200 + n * 420
          )
        )
      })
    }
    function setVars(g: number) {
      for (const k in BEATS) {
        const s = BEATS[k]
        let v = (g - s[0]) / (s[1] - s[0])
        v = v < 0 ? 0 : v > 1 ? 1 : v
        const r = v.toFixed(3)
        if (lastVar[k] !== r) {
          lastVar[k] = r
          world.style.setProperty('--' + k, r)
        }
      }
      tog('pulseOn', g > 1.42 && g < 2.62)
      tog('s-pill', g > 2.46)
      tog('s-glow', g > 2.52)
      tog('s-cond', g > 2.88)
      tog('agentPeek', g > 3.18)
      if (g > 3.34) typeAgent()
    }

    const FOCUS: [number, number][] = [
      [0.0, 240],
      [0.6, 240],
      [0.95, 240],
      [1.55, 626],
      [1.95, 742],
      [2.32, 840],
      [2.86, 848],
      [3.1, 966],
      [3.55, 1292],
      [4.0, 1312],
    ]
    function focusY(g: number) {
      if (g <= FOCUS[0][0]) return FOCUS[0][1]
      for (let i = 1; i < FOCUS.length; i++) {
        if (g <= FOCUS[i][0]) {
          const a = FOCUS[i - 1]
          const c = FOCUS[i]
          const t = (g - a[0]) / (c[0] - a[0])
          return a[1] + (c[1] - a[1]) * t * t * (3 - 2 * t)
        }
      }
      return FOCUS[FOCUS.length - 1][1]
    }

    let MOUNTS: { el: Element; y0: number; y1: number; on: boolean }[] = []
    function collectMounts() {
      MOUNTS = []
      function add(el: Element, y0: number, y1: number) {
        el.classList.remove('gone')
        MOUNTS.push({ el, y0, y1, on: true })
      }
      world.querySelectorAll('.wnode').forEach((el) => {
        add(el, Number((el as HTMLElement).dataset.y0), Number((el as HTMLElement).dataset.y1))
      })
      ;(
        [
          ['.fan', 370, 446],
          ['.cube:not(.ccube)', 336, 420],
          ['.cpg', 258, 350],
          ['[data-id="l10"]', 404, 585],
          ['[data-id="l11"]', 404, 585],
          ['[data-id="l12"]', 404, 585],
          ['.pulse', 592, 712],
          ['.collector', 568, 685],
          ['.otab', 612, 640],
          ['[data-id="l2"]', 666, STORE_TOP + 20],
        ] as [string, number, number][]
      ).forEach((m) => {
        canvas.querySelectorAll(m[0]).forEach((el) => add(el, m[1], m[2]))
      })
      add(pathL3, Number(nAgent.dataset.y0) - 130, Number(nAgent.dataset.y0) + 10)
    }
    function updateMounts(top: number, bottom: number) {
      for (let i = 0; i < MOUNTS.length; i++) {
        const m = MOUNTS[i]
        const on = m.y1 > top - 130 && m.y0 < bottom + 130
        if (on !== m.on) {
          m.on = on
          m.el.classList.toggle('gone', !on)
        }
      }
    }

    function measurePaths() {
      canvas.querySelectorAll<SVGPathElement>('.wire,.glowwire').forEach((p) => {
        let L = 400
        try {
          L = p.getTotalLength()
        } catch (e) {
          /* not rendered yet */
        }
        p.style.setProperty('--len', String(fx(L + 1)))
      })
    }

    function layout() {
      world.style.setProperty('--search', '1')
      world.style.setProperty('--rows', '1')
      world.style.setProperty('--cond', '1')
      const hCond = nStore.offsetHeight
      world.style.setProperty('--cond', '0')
      const hFull = nStore.offsetHeight

      const aTop = STORE_TOP + hCond + 122
      nAgent.style.top = aTop + 'px'
      const aH = nAgent.offsetHeight
      nAgent.dataset.y0 = String(aTop - 14)
      nAgent.dataset.y1 = String(aTop + aH + 24)
      nStore.dataset.y1 = String(STORE_TOP + hFull + 14)

      pathL3.querySelectorAll('path').forEach((p) => {
        p.setAttribute('d', `M${MID} ${STORE_TOP + hCond + 10}V${aTop - 8}`)
      })

      const infoBaseTop = 24
      nInfo.style.top = infoBaseTop + 'px'
      const currentGap = CUBES[0].y - CH - (infoBaseTop + nInfo.offsetHeight + 12)
      nInfo.style.top = infoBaseTop - Math.max(0, currentGap) * 3 + 'px'
      const pBot = nInfo.offsetTop + nInfo.offsetHeight + 12
      nInfo.dataset.y0 = String(nInfo.offsetTop - 16)
      nInfo.dataset.y1 = String(pBot + 6)
      CUBES.forEach((o, i) => {
        const g = canvas.querySelector<SVGGElement>(`[data-id="cp${i}"]`)
        if (!g) return
        const d = trace(MID, pBot, o.x, o.y - CH)
        g.querySelectorAll('path').forEach((p) => p.setAttribute('d', d))
      })

      FOCUS[5][1] = STORE_TOP + hFull / 2
      FOCUS[6][1] = STORE_TOP + hFull / 2 + 8
      FOCUS[7][1] = STORE_TOP + hCond + 54
      FOCUS[8][1] = aTop + aH / 2
      FOCUS[9][1] = aTop + aH / 2 + 16

      const hWorld = aTop + aH + 70
      world.style.height = hWorld + 'px'
      canvas.style.height = hWorld + 'px'
      canvas.setAttribute('viewBox', '0 0 520 ' + hWorld)

      lastVar.search = lastVar.rows = lastVar.cond = null
      measurePaths()
      collectMounts()
    }

    let k = 1
    let vh = 700
    let lastG = 0
    function measureFrame() {
      vh = viewport.clientHeight || 700
      k = Math.min(1, ((viewport.clientWidth || WW) - 14) / WW)
    }
    function apply(g: number) {
      lastG = g
      setVars(g)
      const focus = focusY(g)
      const top = focus - vh / (2 * k)
      const travelerY = Math.max(430 + g * 70, focus + 90)
      const travelerIn = Math.min(Math.max((g - 0.38) / 0.08, 0), 1)
      const travelerOut = Math.min(Math.max((3.04 - g) / 0.08, 0), 1)
      const stageThree = Math.min(Math.max((g - 2) / 0.35, 0), 1)
      const travelerX = -36 * stageThree
      nozTraveler.style.setProperty('--rider-close', (-10 * stageThree).toFixed(1) + 'px')
      nozTraveler.style.opacity = Math.min(travelerIn, travelerOut).toFixed(3)
      nozTraveler.style.transform = `translate3d(${travelerX.toFixed(1)}px,${travelerY.toFixed(1)}px,0)`
      world.style.transform = `scale(${k.toFixed(4)}) translate3d(0,${(-top).toFixed(1)}px,0)`
      updateMounts(top, top + vh / k)
    }

    const onCubeClicks = cubeEls.map((cube, i) => {
      const handler = () => selectCube(i)
      cube.addEventListener('click', handler)
      return { cube, handler }
    })

    const onChartMove = (e: MouseEvent) => {
      if (!cd || !cpxF || !cpyF) return
      const r = chart.getBoundingClientRect()
      const fr = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1)
      const i = Math.round(fr * (cd.length - 1))
      const cur = chart.querySelector<SVGLineElement>('[data-id="cur"]')
      const pt = chart.querySelector<SVGCircleElement>('[data-id="pt"]')
      if (!cur || !pt) return
      cur.setAttribute('x1', String(cpxF(i)))
      cur.setAttribute('x2', String(cpxF(i)))
      cur.setAttribute('opacity', '1')
      pt.setAttribute('cx', String(cpxF(i)))
      pt.setAttribute('cy', String(cpyF(cd[i])))
      pt.setAttribute('opacity', '1')
      const m = 33 + Math.floor(i * 0.75)
      const hh = 13 + Math.floor(m / 60)
      const mm = m % 60
      tip.textContent = `${hh}:${mm < 10 ? '0' + mm : mm} · ${Math.round(cd[i] * 2.8)}ms`
      tip.style.left = (fr * 100).toFixed(1) + '%'
    }
    const onChartLeave = () => {
      const cur = chart.querySelector<SVGLineElement>('[data-id="cur"]')
      const pt = chart.querySelector<SVGCircleElement>('[data-id="pt"]')
      if (cur) cur.setAttribute('opacity', '0')
      if (pt) pt.setAttribute('opacity', '0')
    }
    chartbox.addEventListener('mousemove', onChartMove)
    chartbox.addEventListener('mouseleave', onChartLeave)

    const onTabs = (e: Event) => {
      const t = (e.target as HTMLElement).closest('.tab') as HTMLElement | null
      if (!t) return
      sigTabs.querySelectorAll('.tab').forEach((x) => x.setAttribute('aria-selected', 'false'))
      t.setAttribute('aria-selected', 'true')
      curKey = t.dataset.k as typeof curKey
      renderSig()
    }
    sigTabs.addEventListener('click', onTabs)

    agentCode.innerHTML =
      '<span class="c">-- agent · signoz mcp</span>\n' +
      '<span class="k">SELECT</span> service_name, <span class="f">count</span>()\n' +
      '<span class="k">FROM</span> signoz_signals <span class="k">WHERE</span> ' +
      '<span class="s">service</span><span class="k">.name</span> <span class="o">=</span> ' +
      '<span class="s">\'consumer-svc-1\'</span>'

    const onSugg = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.sbtn') as HTMLButtonElement | null
      if (!btn) return
      btn.disabled = true
      btn.style.opacity = '0.45'
      const p = document.createElement('p')
      p.innerHTML = EXTRA[btn.dataset.a as string]
      agentBody.appendChild(p)
    }
    sugg.addEventListener('click', onSugg)

    const trailContext = trailCanvas.getContext('2d')!
    let trailPoints: { x: number; y: number; life: number; colour: string }[] = []
    let trailRaf = 0
    let trailIndex = 0
    const trailColours = ['#4E74F8', '#E5484D', '#FFCD56']
    function sizeTrail() {
      const rect = trailCanvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      trailCanvas.width = Math.max(1, Math.round(rect.width * ratio))
      trailCanvas.height = Math.max(1, Math.round(rect.height * ratio))
      trailContext.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    function paintTrail() {
      trailRaf = 0
      trailContext.clearRect(0, 0, trailCanvas.clientWidth, trailCanvas.clientHeight)
      trailContext.globalCompositeOperation = 'lighter'
      trailPoints.forEach((point) => {
        point.life -= 0.045
      })
      trailPoints = trailPoints.filter((point) => point.life > 0)
      for (let i = 1; i < trailPoints.length; i++) {
        const previous = trailPoints[i - 1]
        const point = trailPoints[i]
        const alpha = Math.min(previous.life, point.life) * (i / trailPoints.length)
        const distance = Math.max(Math.abs(point.x - previous.x), Math.abs(point.y - previous.y))
        const stamps = Math.max(1, Math.ceil(distance / 4))
        const size = alpha > 0.72 ? 8 : 4
        trailContext.globalAlpha = alpha * 0.82
        trailContext.fillStyle = point.colour
        for (let stamp = 0; stamp <= stamps; stamp++) {
          const progress = stamp / stamps
          const x = Math.round((previous.x + (point.x - previous.x) * progress) / 4) * 4
          const y = Math.round((previous.y + (point.y - previous.y) * progress) / 4) * 4
          trailContext.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }
      trailContext.globalAlpha = 1
      if (trailPoints.length) trailRaf = requestAnimationFrame(paintTrail)
    }
    const gridSpot = q<HTMLElement>('.grid-bg-spot')
    const GRID_SPOT = 380
    const GRID_STEP = 22
    let gridRaf = 0
    let gridPointer = { x: 0, y: 0 }
    const paintGridSpot = () => {
      gridRaf = 0
      if (!gridSpot) return
      const rect = gridSpot.parentElement!.getBoundingClientRect()
      const left = gridPointer.x - rect.left - GRID_SPOT / 2
      const top = gridPointer.y - rect.top - GRID_SPOT / 2
      gridSpot.style.transform = `translate3d(${left}px, ${top}px, 0)`
      gridSpot.style.backgroundPosition = `${(((1 - left) % GRID_STEP) + GRID_STEP) % GRID_STEP}px ${(((1 - top) % GRID_STEP) + GRID_STEP) % GRID_STEP}px`
    }
    const onPointerMove = (e: PointerEvent) => {
      const rect = frame.getBoundingClientRect()
      gridPointer = { x: e.clientX, y: e.clientY }
      if (!gridRaf) gridRaf = requestAnimationFrame(paintGridSpot)
      frame.classList.add('pointer-active')
      if (!reduced) {
        trailPoints.push({
          x: Math.round((e.clientX - rect.left) / 4) * 4,
          y: Math.round((e.clientY - rect.top) / 4) * 4,
          life: 1,
          colour: trailColours[trailIndex++ % trailColours.length],
        })
        if (trailPoints.length > 28) trailPoints.shift()
        if (!trailRaf) trailRaf = requestAnimationFrame(paintTrail)
      }
    }
    const onPointerLeave = () => frame.classList.remove('pointer-active')
    frame.addEventListener('pointermove', onPointerMove)
    frame.addEventListener('pointerleave', onPointerLeave)

    const agentPeekBody = frame.querySelector<HTMLElement>('.agent-peek-body')
    const agentPeekEye = frame.querySelector<SVGCircleElement>('.agent-peek-eye')
    const agentPeekPupil = frame.querySelector<SVGPathElement>('.agent-peek-pupil')
    const onDocPointerMove = (e: PointerEvent) => {
      if (!agentPeekEye || !agentPeekPupil || !agentPeekBody) return
      if (!world.classList.contains('agentPeek')) return
      const rect = agentPeekEye.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const distance = Math.sqrt(dx * dx + dy * dy) || 1
      const reach = Math.min(1.35, distance)
      agentPeekBody.style.setProperty('--pupil-x', ((dx / distance) * reach).toFixed(2) + 'px')
      agentPeekBody.style.setProperty('--pupil-y', ((dy / distance) * reach).toFixed(2) + 'px')
    }
    document.addEventListener('pointermove', onDocPointerMove, { passive: true })

    const relayout = () => {
      measureFrame()
      sizeTrail()
      layout()
      apply(lastG)
    }

    const ro = 'ResizeObserver' in window ? new ResizeObserver(relayout) : undefined
    ro?.observe(viewport)

    measureFrame()
    sizeTrail()
    layout()
    selectCube(1)
    apply(0)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        layout()
        apply(lastG)
      })
    }

    apiRef.current = { update: apply, relayout }

    return () => {
      apiRef.current = { update: () => {}, relayout: () => {} }
      ro?.disconnect()
      cancelAnimationFrame(trailRaf)
      cancelAnimationFrame(gridRaf)
      timeouts.forEach((id) => window.clearTimeout(id))
      document.removeEventListener('pointermove', onDocPointerMove)
      frame.removeEventListener('pointermove', onPointerMove)
      frame.removeEventListener('pointerleave', onPointerLeave)
      chartbox.removeEventListener('mousemove', onChartMove)
      chartbox.removeEventListener('mouseleave', onChartLeave)
      sigTabs.removeEventListener('click', onTabs)
      sugg.removeEventListener('click', onSugg)
      onCubeClicks.forEach(({ cube, handler }) => cube.removeEventListener('click', handler))
    }
  }, [])

  const riderCube = (
    <svg className="rider-cube" viewBox="0 0 94 80" fill="none" aria-hidden="true">
      <g className="rider-emanation rider-emanation--left">
        <polygon points="-22,36 23,58 23,90 -22,68" />
        <polygon points="-43,47 2,69 2,101 -43,79" />
      </g>
      <g className="rider-emanation rider-emanation--right">
        <polygon points="71,58 116,36 116,68 71,90" />
        <polygon points="92,69 137,47 137,79 92,101" />
      </g>
      <polygon
        points="47,2 92,24 47,46 2,24"
        fill="var(--bg-neutral-dark-800)"
        stroke="var(--bg-neutral-dark-500)"
      />
      <polygon
        points="2,24 47,46 47,78 2,56"
        fill="var(--bg-neutral-dark-1000)"
        stroke="var(--bg-neutral-dark-700)"
      />
      <polygon
        points="47,46 92,24 92,56 47,78"
        fill="var(--bg-neutral-dark-950)"
        stroke="var(--bg-neutral-dark-600)"
      />
      <polygon
        points="47,9 78,24 47,39 16,24"
        fill="var(--bg-neutral-dark-700)"
        stroke="var(--bg-neutral-dark-500)"
      />
    </svg>
  )

  return (
    <div
      ref={frameRef}
      className="why-proto frame"
      aria-hidden="true"
      data-markdown-ignore
      role="img"
      aria-label="Preview of an observability workspace assembling itself"
    >
      <div className="viewport">
        <div className="grid-bg" aria-hidden="true">
          <div className="grid-bg-spot" />
        </div>
        <canvas className="pointer-trail" aria-hidden="true" />

        <div className="world">
          <svg className="wcanvas" viewBox="0 0 520 1500" aria-hidden="true" />

          <div className="noz-traveler" aria-hidden="true">
            <div className="noz-traveler-inner">
              <div className="olly-rider olly-rider--large">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/graphics/homepage/olly.svg" alt="" />
                {riderCube}
              </div>
              <div className="olly-rider olly-rider--small">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/graphics/homepage/noz-back.svg" alt="" />
                {riderCube}
              </div>
            </div>
          </div>

          <div className="wnode nInfo" data-y0="24" data-y1="272">
            <div className="card">
              <div className="card-hd">
                <span className="t ipName">payments</span>
                <span className="s">p99 · 30m</span>
                <span className="push tag hl ipTag">+412 ms</span>
              </div>
              <div className="chartbox">
                <div className="tip">14:02 · 486ms</div>
                <svg className="ipChart" viewBox="0 0 400 104" preserveAspectRatio="none" />
              </div>
              <div className="tabs" role="tablist">
                <button
                  className="tab"
                  role="tab"
                  aria-selected="true"
                  data-k="traces"
                  type="button"
                >
                  <i className="dot" />
                  Traces
                </button>
                <button
                  className="tab"
                  role="tab"
                  aria-selected="false"
                  data-k="logs"
                  type="button"
                >
                  <i className="dot" />
                  Logs
                </button>
                <button
                  className="tab"
                  role="tab"
                  aria-selected="false"
                  data-k="spans"
                  type="button"
                >
                  <i className="dot" />
                  Spans
                </button>
                <button
                  className="tab"
                  role="tab"
                  aria-selected="false"
                  data-k="metrics"
                  type="button"
                >
                  <i className="dot" />
                  Metrics
                </button>
              </div>
              <div className="rows" />
            </div>
          </div>

          <div className="wnode nStore" data-y0="728" data-y1="1110">
            <div className="card">
              <div className="card-hd">
                <span className="t">signoz_signals</span>
                <span className="s">distributed</span>
                <span className="push tag mut">columnar</span>
              </div>
              <div className="sbar">
                <span className="sig-pill">
                  <Database aria-hidden="true" strokeWidth={1.6} />
                  LOGS
                </span>
                <span className="qline">
                  <b className="qcaret" aria-hidden="true" />
                </span>
                <span className="qhint">search…</span>
              </div>
              <div className="tblx">
                <div className="tgrid" />
                <div className="tfoot">
                  <span className="m1">1.24B rows stored · 9 shown</span>
                  <span className="m2">4 of 1.24B rows scanned · 142 ms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="wnode nAgent" data-y0="1096" data-y1="1470">
            <div className="agent-peek-body" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="4.35938"
                  y="8.49908"
                  width="15.4569"
                  height="11.978"
                  rx="1.76147"
                  fill="var(--bg-cherry-500)"
                />
                <g className="agent-peek-head">
                  <circle
                    className="agent-peek-eye"
                    cx="12.0217"
                    cy="14.4881"
                    r="3.87523"
                    fill="var(--bg-neutral-dark-50)"
                  />
                  <path
                    className="agent-peek-pupil"
                    d="M12.0237 12.8024C12.0237 13.7328 11.2673 14.4892 10.337 14.4892C10.0339 14.4892 9.74926 14.4101 9.50152 14.2678C9.47517 14.5551 9.49888 14.8502 9.57795 15.1428C9.93901 16.4921 11.3279 17.2933 12.6773 16.9323C14.0267 16.5712 14.8279 15.1823 14.4668 13.8329C14.1453 12.6285 13.0041 11.8616 11.8023 11.967C11.942 12.2121 12.0237 12.4967 12.0237 12.8024Z"
                    fill="var(--bg-neutral-dark-1000)"
                  />
                  <path
                    d="M8.33833 7.94578L9.83358 4.31319C10.1302 3.59261 10.6676 2.99939 11.355 2.63299L13.9181 1.26684C14.1327 1.15169 14.3804 1.34885 14.3194 1.58439L13.6703 4.06892C13.6511 4.14046 13.6424 4.21374 13.6424 4.28876C13.6424 4.39868 13.6633 4.5086 13.7052 4.61154L15.0382 7.94578H8.33833ZM7.78 7.91088H15.5965C15.9053 7.91088 16.1548 8.16038 16.1548 8.4692C16.1548 8.77803 15.9053 9.02753 15.5965 9.02753H7.78C7.47118 9.02753 7.22168 8.77803 7.22168 8.4692C7.22168 8.16038 7.47118 7.91088 7.78 7.91088Z"
                    fill="var(--bg-robin-500)"
                  />
                </g>
              </svg>
            </div>
            <svg className="agent-peek-hands" viewBox="0 0 34 7" fill="none" aria-hidden="true">
              <rect width="3.52294" height="6.16514" rx="1.46789" fill="var(--bg-cherry-500)" />
              <rect
                x="30.4775"
                width="3.52294"
                height="6.16514"
                rx="1.46789"
                fill="var(--bg-cherry-500)"
              />
            </svg>
            <div className="card">
              <div className="card-hd">
                <span className="t">Agent</span>
                <span className="s">reading telemetry</span>
                <span className="push tag ok">schema known</span>
              </div>
              <div className="code" />
              <div className="chat">
                <div className="ask">Why did p99 spike at 14:02?</div>
                <div className="ans">
                  <span className="av">
                    <Bot aria-hidden="true" strokeWidth={1.6} />
                  </span>
                  <div className="body" />
                </div>
              </div>
              <div className="sugg">
                <button className="sbtn" data-a="blast" type="button">
                  Who else is affected?
                </button>
                <button className="sbtn" data-a="fix" type="button">
                  Draft a fix
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default WhySignozProtoWorld

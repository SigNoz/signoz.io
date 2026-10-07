type Rgb = [number, number, number]

/**
 * Resolve a design token to concrete channel values, which is what a canvas needs.
 *
 * `getComputedStyle().getPropertyValue('--l3-border')` hands back the *specified*
 * value — for our tokens that is another `var(...)` reference — so bounce the
 * expression through a probe element's `color` and let the engine resolve it.
 */
function createResolver(host: HTMLElement) {
  const probe = document.createElement('span')
  probe.setAttribute('aria-hidden', 'true')
  probe.style.cssText = 'position:absolute;width:0;height:0;opacity:0;pointer-events:none'
  host.appendChild(probe)

  const rgbFromToken = (token: string, fallback: Rgb): Rgb => {
    probe.style.color = ''
    probe.style.color = `var(${token})`
    const channels = getComputedStyle(probe).color.match(/-?[\d.]+/g)
    if (!channels || channels.length < 3) return fallback
    return [Number(channels[0]), Number(channels[1]), Number(channels[2])]
  }

  return { rgbFromToken, dispose: () => probe.remove() }
}

export function readTokenPalette(host: HTMLElement) {
  const { rgbFromToken, dispose } = createResolver(host)
  const palette = {
    skylineDot: rgbFromToken('--l3-border', [44, 48, 58]),
    pathDot: rgbFromToken('--l3-foreground', [116, 123, 139]),
    pellets: [
      rgbFromToken('--bg-robin-500', [78, 116, 248]),
      rgbFromToken('--bg-sakura-500', [242, 71, 105]),
      rgbFromToken('--bg-amber-500', [255, 204, 86]),
    ] as Rgb[],
    confetti: [
      rgbFromToken('--bg-robin-500', [78, 116, 248]),
      rgbFromToken('--bg-sakura-500', [242, 71, 105]),
      rgbFromToken('--bg-amber-500', [255, 204, 86]),
      rgbFromToken('--bg-forest-500', [37, 225, 146]),
      rgbFromToken('--bg-aqua-500', [35, 196, 248]),
      rgbFromToken('--bg-cherry-400', [234, 109, 113]),
      rgbFromToken('--bg-sienna-400', [189, 153, 121]),
      rgbFromToken('--l1-foreground', [236, 238, 242]),
    ] as Rgb[],
  }
  dispose()
  return palette
}

export type NozPalette = ReturnType<typeof readTokenPalette>

export const rgba = ([r, g, b]: Rgb, alpha: number) =>
  `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`

export const rgb = ([r, g, b]: Rgb) => `rgb(${r | 0},${g | 0},${b | 0})`

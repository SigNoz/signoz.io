export function themeRgb(
  el: HTMLElement,
  prop: `--${string}`
): { r: number; g: number; b: number } {
  const probe = document.createElement('span')
  probe.style.color = `var(${prop})`
  el.appendChild(probe)
  const match = getComputedStyle(probe).color.match(/[\d.]+/g)
  probe.remove()
  if (!match || match.length < 3) return { r: 128, g: 128, b: 128 }
  return { r: Number(match[0]), g: Number(match[1]), b: Number(match[2]) }
}

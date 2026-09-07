export default function ListicleIconFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <filter
        id="listicle-icon-filter"
        x="-36%"
        y="-36%"
        width="172%"
        height="172%"
        colorInterpolationFilters="sRGB"
      >
        {/* Alpha mask of near-white pixels (luminance ramp from 0.8 to 1). */}
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  1.063 3.576 0.361 0 -4"
          result="white-mask"
        />
        <feComponentTransfer in="white-mask" result="white-core">
          <feFuncA type="linear" slope="3" intercept="-0.6" />
        </feComponentTransfer>
        <feGaussianBlur in="white-core" stdDeviation="3" result="white-density" />
        <feComponentTransfer in="white-density" result="chip-seed">
          <feFuncA type="linear" slope="6" intercept="-1.8" />
        </feComponentTransfer>
        <feMorphology in="chip-seed" operator="dilate" radius="40" result="chip-fill" />
        <feGaussianBlur in="chip-fill" stdDeviation="6" result="chip-soft" />
        <feComponentTransfer in="chip-soft" result="chip-shape">
          <feFuncA type="linear" slope="15" intercept="-6" />
        </feComponentTransfer>
        <feFlood floodColor="#16181D" result="ink" />
        <feComposite in="ink" in2="chip-shape" operator="in" result="chip" />
        <feMerge>
          <feMergeNode in="chip" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  )
}

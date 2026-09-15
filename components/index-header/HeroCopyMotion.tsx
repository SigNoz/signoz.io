import type { CSSProperties, ReactNode } from 'react'

type HeroCopyMotionProps = {
  children: ReactNode
  className?: string
  delay?: number
}

// Pure CSS entrance so the LCP text paints at first render, before hydration.
export default function HeroCopyMotion({ children, className, delay = 0 }: HeroCopyMotionProps) {
  const style = delay ? ({ '--hero-copy-delay': `${delay}s` } as CSSProperties) : undefined

  return (
    <div className={className ? `hero-copy-in ${className}` : 'hero-copy-in'} style={style}>
      {children}
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'

import { cn } from 'app/lib/utils'

import './shimmer-badge.css'

export type ShimmerBadgeTone = 'green' | 'blue' | 'pink' | 'yellow'

interface ShimmerBadgeProps {
  children: React.ReactNode
  tone?: ShimmerBadgeTone
  shape?: 'pill' | 'right-soft'
  clickable?: boolean
  shimmerOnMount?: boolean
  className?: string
  onClick?: () => void
}

export default function ShimmerBadge({
  children,
  tone = 'green',
  shape = 'pill',
  clickable = false,
  shimmerOnMount = true,
  className,
  onClick,
}: ShimmerBadgeProps) {
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (!shimmerOnMount) return
    const timeout = setTimeout(() => setAnimating(true), 200)
    return () => clearTimeout(timeout)
  }, [shimmerOnMount])

  const Comp: 'button' | 'span' = clickable ? 'button' : 'span'

  return (
    <Comp
      type={clickable ? 'button' : undefined}
      onClick={onClick}
      onMouseEnter={() => setAnimating(true)}
      className={cn(
        'shimmer-badge',
        `shimmer-badge--${tone}`,
        shape === 'right-soft' && 'shimmer-badge--right-soft',
        clickable && 'shimmer-badge--clickable',
        animating && 'shimmer-badge--animate',
        className
      )}
    >
      <span
        className="shimmer-badge__shine"
        onAnimationEnd={() => setAnimating(false)}
        aria-hidden="true"
      />
      <span className="shimmer-badge__label">{children}</span>
    </Comp>
  )
}

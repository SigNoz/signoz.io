'use client'

import React, { useEffect, useState } from 'react'

import { cn } from 'app/lib/utils'

import styles from './shimmer-badge.module.css'

export type ShimmerBadgeTone = 'green' | 'blue' | 'pink' | 'yellow'

const TONE_CLASS: Record<ShimmerBadgeTone, string> = {
  green: styles.green,
  blue: styles.blue,
  pink: styles.pink,
  yellow: styles.yellow,
}

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
        styles.badge,
        TONE_CLASS[tone],
        shape === 'right-soft' && styles.rightSoft,
        clickable && styles.clickable,
        animating && styles.animate,
        className
      )}
    >
      <span
        className={styles.shine}
        onAnimationEnd={() => setAnimating(false)}
        aria-hidden="true"
      />
      <span className={styles.label}>{children}</span>
    </Comp>
  )
}

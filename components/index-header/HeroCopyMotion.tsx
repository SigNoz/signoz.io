'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type HeroCopyMotionProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export default function HeroCopyMotion({ children, className, delay = 0 }: HeroCopyMotionProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return className ? <div className={className}>{children}</div> : <>{children}</>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10, filter: 'blur(28px)' }}
      animate={{
        opacity: [0, 0.72, 1],
        y: [10, 2, 0],
        filter: ['blur(28px)', 'blur(10px)', 'blur(0px)'],
      }}
      transition={{
        delay,
        duration: 1.05,
        times: [0, 0.62, 1],
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

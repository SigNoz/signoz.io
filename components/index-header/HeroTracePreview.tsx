'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import heroTracePreview from '@/public/img/website/homepage-hero-trace-noz.png'

export default function HeroTracePreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0.94, 1])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26, filter: 'blur(22px)' }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        delay: 0.34,
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative mx-auto h-[720px] w-full max-w-[1296px] origin-center overflow-hidden rounded-[14px] border border-signoz_slate-400/60 bg-signoz_ink-400 shadow-[0_32px_86px_rgba(0,0,0,0.72)] md:h-[780px]"
      style={{ scale: hasMounted ? scale : prefersReducedMotion ? 1 : 0.94 }}
    >
      <Image
        src={heroTracePreview}
        alt="SigNoz trace detail view with Noz assistant explaining checkout latency"
        priority
        unoptimized
        className="h-full w-full object-cover object-left-top"
        sizes="(max-width: 768px) 1180px, 1258px"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0)_58%,rgba(8,9,10,0.60)_100%)]" />
    </motion.div>
  )
}

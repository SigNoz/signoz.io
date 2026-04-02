'use client'

import { useCallback, useEffect, useState } from 'react'

type ProgressBarProps = {
  target: React.RefObject<HTMLElement>
}

export const ProgressBar = ({ target }: ProgressBarProps) => {
  const [readingProgress, setReadingProgress] = useState(0)

  const scrollListener = useCallback(() => {
    if (!target.current) {
      return
    }

    const element = target.current
    const totalHeight = element.clientHeight - element.offsetTop - window.innerHeight
    const windowScrollTop =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop

    if (totalHeight <= 0) {
      setReadingProgress(100)
      return
    }

    if (windowScrollTop === 0) {
      return setReadingProgress(0)
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100)
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100)
  }, [target])

  useEffect(() => {
    let frameId: number | null = null

    const scheduleProgressUpdate = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        scrollListener()
      })
    }

    scheduleProgressUpdate()

    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true })
    window.addEventListener('resize', scheduleProgressUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleProgressUpdate)
      window.removeEventListener('resize', scheduleProgressUpdate)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [scrollListener])

  return (
    <div className="progress-bar fixed left-0 right-0 top-[52px] z-30 w-full">
      <div
        className="h-1 bg-indigo-500"
        style={{
          width: `${readingProgress}%`,
        }}
      />
    </div>
  )
}

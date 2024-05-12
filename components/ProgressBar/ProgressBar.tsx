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

    if (windowScrollTop === 0) {
      return setReadingProgress(0)
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100)
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100)
  }, [target])

  useEffect(() => {
    window.addEventListener('scroll', scrollListener)

    return () => window.removeEventListener('scroll', scrollListener)
  }, [scrollListener])

  return (
    <div className="progress-bar fixed left-0 right-0 top-[64px] z-30 w-full">
      <div
        className="h-1 bg-indigo-500"
        style={{
          width: `${readingProgress}%`,
        }}
      />
    </div>
  )
}

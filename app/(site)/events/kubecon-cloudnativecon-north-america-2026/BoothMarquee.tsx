import { cn } from 'app/lib/utils'

import { EVENT } from './KubeconPage.constants'
import styles from './kubecon.module.css'

interface BoothMarqueeProps {
  /** `banner` is the page-wide strip; `inline` is the event card's header. */
  variant?: 'banner' | 'inline'
  className?: string
}

const REPEATS = 6

/**
 * The scrolling booth strip. One run of labels is rendered twice inside a track
 * that translates by half its width, so the loop is seamless at any width.
 */
export default function BoothMarquee({ variant = 'banner', className }: BoothMarqueeProps) {
  const isBanner = variant === 'banner'
  const labels = Array.from({ length: REPEATS }, () => EVENT.marqueeLabels).flat()

  const run = (key: string) => (
    <div className="flex items-center" key={key}>
      {labels.map((label, index) => (
        <div className="flex items-center" key={`${key}-${label}-${index}`}>
          <span className="whitespace-nowrap px-4 font-mono text-sm font-bold uppercase tracking-[0.08em]">
            {label}
          </span>
          <span className={styles.marqueeGrid} />
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={cn(
        styles.marquee,
        isBanner
          ? 'h-14 bg-[var(--bg-sakura-500)] text-[var(--bg-neutral-dark-1000)]'
          : 'h-8 bg-[var(--bg-robin-500)] text-[var(--bg-neutral-light-1000)]',
        className
      )}
    >
      <span className="sr-only">{`${EVENT.marqueeLabels[1]} — ${EVENT.marqueeLabels[0]}`}</span>
      <div
        className={cn(styles.marqueeTrack, 'h-full', !isBanner && styles.marqueeSlow)}
        aria-hidden="true"
      >
        {run('run')}
        {run('clone')}
      </div>
    </div>
  )
}

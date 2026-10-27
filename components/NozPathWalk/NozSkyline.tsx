'use client'

import { useNozPathWalkContext } from './NozPathWalk.context'
import styles from './NozPathWalk.module.css'

/**
 * The Salt Lake City silhouette, as a field of dots. Place it inside the section
 * it should sit behind — it pins itself to that section's bottom edge and the
 * engine picks it up from context.
 */
export default function NozSkyline() {
  const { registerSkyline, skylineAlt } = useNozPathWalkContext('NozSkyline')

  return (
    <canvas ref={registerSkyline} className={styles.skyline} role="img" aria-label={skylineAlt} />
  )
}

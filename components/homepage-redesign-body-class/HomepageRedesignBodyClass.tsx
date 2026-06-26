'use client'

import { useEffect } from 'react'

const HOMEPAGE_REDESIGN_BODY_CLASS = 'homepage-redesign-active'

export default function HomepageRedesignBodyClass() {
  useEffect(() => {
    document.body.classList.add(HOMEPAGE_REDESIGN_BODY_CLASS)

    return () => {
      document.body.classList.remove(HOMEPAGE_REDESIGN_BODY_CLASS)
    }
  }, [])

  return null
}

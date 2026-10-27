'use client'

import { useEffect, useState } from 'react'

interface GitHubStarsResponse {
  stars?: number
}

export const formatStars = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

export function useGithubStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchStars = async () => {
      try {
        const response = await fetch('/api/github-stars/')
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data: GitHubStarsResponse = await response.json()
        if (isMounted && Number.isFinite(data.stars)) {
          setStars(data.stars ?? null)
        }
      } catch (error) {
        console.error('Error fetching GitHub stars count:', error)
      }
    }

    fetchStars()

    return () => {
      isMounted = false
    }
  }, [])

  return { stars, formatted: stars === null ? '' : formatStars(stars) }
}

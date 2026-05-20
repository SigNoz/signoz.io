import { Github } from '@/components/social-icons/SolidIcons'
import TrackingLink from '@/components/TrackingLink'
import React, { useState, useEffect } from 'react'

interface GitHubStarsProps {
  location?: string
}

interface GitHubStarsResponse {
  stars?: number
}

const formatStars = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

const GitHubStars: React.FC<GitHubStarsProps> = ({ location = 'Top Navbar' }) => {
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

  const displayedStarsText = stars === null ? '' : formatStars(stars)

  return (
    <TrackingLink
      href="https://github.com/SigNoz/signoz"
      target="_blank"
      clickType="External Click"
      clickName="GitHub Repository"
      clickText={stars === null ? 'GitHub Icon' : `${displayedStarsText} Stars`}
      clickLocation={location}
      className="inline-flex h-8 items-center gap-2 rounded-full bg-signoz_slate-500 pl-2 pr-2.5 text-signoz_ink-300 transition-colors hover:bg-slate-700/50"
    >
      <div className="github-icon box-border rounded-full p-1">
        <Github className="fill-signoz_vanilla-100" width={16} />
      </div>
      {stars === null ? (
        <div className="h-4 w-[33px] animate-pulse rounded bg-signoz_slate-400" />
      ) : (
        <div className="text-right text-xs font-medium tabular-nums text-signoz_vanilla-100">
          {displayedStarsText}
        </div>
      )}
    </TrackingLink>
  )
}

export default GitHubStars

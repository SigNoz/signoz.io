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
      className="bg-muted text-muted-foreground hover:bg-muted inline-flex h-8 items-center gap-2 rounded-full pr-2.5 pl-2 transition-colors"
    >
      <div className="github-icon box-border rounded-full p-1">
        <Github className="fill-vanilla-100" width={16} />
      </div>
      {stars === null ? (
        <div className="bg-muted h-4 w-[33px] animate-pulse rounded" />
      ) : (
        <div className="text-l1-foreground text-right text-xs font-medium tabular-nums">
          {displayedStarsText}
        </div>
      )}
    </TrackingLink>
  )
}

export default GitHubStars

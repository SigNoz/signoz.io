import { Github } from '@/components/social-icons/SolidIcons'
import { Button } from '@/components/ui/Button'
import { useLogEvent } from 'hooks/useLogEvent'
import { usePathname } from 'next/navigation'
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
  const logEvent = useLogEvent()
  const pathname = usePathname()

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
    <Button
      isButton
      href="https://github.com/SigNoz/signoz"
      variant="ghost"
      rounded="full"
      className={`h-8 gap-2 bg-signoz_slate-500 px-2 text-signoz_ink-300 hover:bg-slate-700/50 ${
        stars === null ? 'w-8' : 'pl-2 pr-2.5'
      }`}
      onClick={() => {
        logEvent({
          eventName: 'Website Click',
          eventType: 'track',
          attributes: {
            clickType: 'External Click',
            clickName: 'GitHub Repository',
            clickText: stars === null ? 'GitHub Icon' : `${displayedStarsText} Stars`,
            clickLocation: location,
            pageLocation: pathname,
          },
        })
      }}
    >
      <div className="github-icon box-border rounded-full p-1">
        <Github className="fill-signoz_vanilla-100" width={16} />
      </div>
      {stars !== null && (
        <div className="text-right text-xs font-medium tabular-nums text-signoz_vanilla-100">
          {displayedStarsText}
        </div>
      )}
    </Button>
  )
}

export default GitHubStars

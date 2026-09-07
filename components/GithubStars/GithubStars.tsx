import { Github } from '@/components/social-icons/SolidIcons'
import TrackingLink from '@/components/TrackingLink'
import React from 'react'

import { useGithubStars } from './useGithubStars'
import './github-stars.css'

interface GitHubStarsProps {
  location?: string
}

const SmileyStarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeLinejoin="round"
    width={16}
    height={16}
    aria-hidden="true"
  >
    <path
      d="M12 2.5 L14.7 8.5 L21.5 9.5 L16.5 14 L18 20.5 L12 17 L6 20.5 L7.5 14 L2.5 9.5 L9.3 8.5 Z"
      fill="var(--star-fill)"
      stroke="var(--star-stroke)"
      strokeWidth="1.5"
    />
    <line
      x1="10"
      y1="10.225"
      x2="10"
      y2="12.775"
      stroke="var(--star-eye)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="14"
      y1="10.225"
      x2="14"
      y2="12.775"
      stroke="var(--star-eye)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const GitHubStars: React.FC<GitHubStarsProps> = ({ location = 'Top Navbar' }) => {
  const { stars, formatted } = useGithubStars()

  return (
    <TrackingLink
      href="https://github.com/SigNoz/signoz"
      target="_blank"
      clickType="External Click"
      clickName="GitHub Repository"
      clickText={stars === null ? 'GitHub Icon' : `${formatted} Stars`}
      clickLocation={location}
      className="github-stars-chip inline-flex h-8 items-center gap-2 rounded-md bg-[var(--l3-background)] pl-2.5 pr-2.5 transition-colors hover:bg-[var(--l3-background-hover)]"
    >
      <span className="icon-morph">
        <span className="icon-old">
          <Github className="fill-[var(--l1-foreground)]" width={16} />
        </span>
        <span className="icon-star">
          <SmileyStarIcon />
        </span>
      </span>
      {stars === null ? (
        <span className="h-4 w-[33px] animate-pulse rounded bg-[var(--l2-border)]" />
      ) : (
        <span className="text-right text-xs font-medium tabular-nums text-[var(--l1-foreground)]">
          {formatted}
        </span>
      )}
    </TrackingLink>
  )
}

export default GitHubStars

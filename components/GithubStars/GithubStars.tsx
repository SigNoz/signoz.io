import { Github } from '@/components/social-icons/SolidIcons'
import TrackingLink from '@/components/TrackingLink'
import React, { useState, useEffect } from 'react'

interface GitHubStarsProps {
  location?: string;
}

const GitHubStars: React.FC<GitHubStarsProps> = ({ location = "Top Navbar" }) => {
  const [stars, setStars] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/SigNoz/signoz`)
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const data = await response.json()
        setStars(data.stargazers_count)
      } catch (error) {
        console.error('Error fetching GitHub stars count:', error)
        setError('Error fetching stars count')
      }
    }

    fetchStars()
  }, [])

  const formatStars = (num) => {
    if (num>= 1000){
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  if (error) {
    return null
  }

  if (!stars) {
    return null
  }

  return (
    <TrackingLink 
      href="https://github.com/SigNoz/signoz" 
      target="_blank"
      clickType="External Click"
      clickName="GitHub Repository"
      clickText={`${formatStars(stars)} Stars`}
      clickLocation={location}
    >
        <div className="-ml-1 box-border flex items-center gap-2 rounded-full bg-signoz_slate-500 py-2 pl-2 pr-2.5 text-signoz_ink-300 h-8">
          <div className="github-icon box-border rounded-full p-1">
            <Github className='fill-signoz_vanilla-100' width={16} />
          </div> 
          <div className='font-medium text-signoz_vanilla-100'>
          {formatStars(stars)}
          </div>
        </div>
    </TrackingLink>
  )
}

export default GitHubStars

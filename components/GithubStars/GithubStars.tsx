import { Github } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const GitHubStars = () => {
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

  if (error) {
    return null
  }

  if (!stars) {
    return null
  }

  return (
    <Link href="https://github.com/SigNoz/signoz" target="_blank">
      <div className="github github-stars flex cursor-pointer items-stretch justify-center gap-1 rounded p-1 font-sans text-sm font-bold ">
        <div className="-ml-1 box-border flex items-center gap-2 rounded bg-white p-0.5 px-2 text-signoz_ink-300">
          <div className="github-icon box-border rounded-full bg-signoz_slate-500 p-1">
            <Github color="white" size={16} />
          </div>
          Stars
        </div>

        <div className="flex items-center">
          <div className="relative">
            <div className="-mr-[2px] h-0 w-0 border-b-8 border-r-8 border-t-8 border-b-transparent border-r-white border-t-transparent"></div>
          </div>
          <div className="stars-count rounded bg-white p-1 px-1.5 font-extrabold text-signoz_ink-300">
            {stars}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GitHubStars

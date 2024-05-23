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
      <div className="github github-stars primary-gradient flex cursor-pointer items-center justify-center gap-1 rounded bg-white pr-1 font-sans text-sm font-bold text-white">
        <div className="-ml-1 flex gap-1 rounded bg-black p-1 text-white">
          <Github color="white" size={16} />
        </div>

        {stars}
      </div>
    </Link>
  )
}

export default GitHubStars

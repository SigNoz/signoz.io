'use client'
import React, { useEffect, useRef, useState } from 'react'

const VimeoPlayer = ({ videoId }) => {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  let player = null

  useEffect(() => {
    const loadVimeoPlayer = async () => {
      try {
        if (videoId) {
          const { default: Player } = await import('@vimeo/player')

          player = new Player(playerRef.current, {
            url: `https://vimeo.com/${videoId}`,
          })
        }
      } catch (error) {
        console.error('Error loading Vimeo Player:', error)
      }
    }

    loadVimeoPlayer()
  }, [videoId])

  const handlePlay = () => {
    if (!isPlaying && player && typeof player.play === 'function') {
      player.play()
      setIsPlaying(true)
    }
  }

  return (
    <div>
      <div ref={playerRef} />
      {!isPlaying && (
        <div onClick={handlePlay}>
          <div className="play-container flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary-500 focus-visible:outline-none md:h-24 md:w-24">
            <img src="/img/landing/play-icon.webp" className="h-6 w-6 md:h-10 md:w-10" />
          </div>
        </div>
      )}
    </div>
  )
}

export default VimeoPlayer

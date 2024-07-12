'use client'

import React, { useRef, useEffect, useState } from 'react'
import Player from '@vimeo/player'

const VimeoPlayer = ({ videoId }) => {
  const playerRef = useRef(null)
  const [isPlayerReady, setIsPlayerReady] = useState(false)

  useEffect(() => {
    if (videoId && playerRef.current && !isPlayerReady) {
      const player = new Player(playerRef.current, {
        url: `https://vimeo.com/${videoId}`,
        autoplay: true,
      })
      setIsPlayerReady(true)
    }
  }, [videoId, isPlayerReady])

  return (
    <div ref={playerRef} className="embed-container w-full" />
  )
}

export default VimeoPlayer


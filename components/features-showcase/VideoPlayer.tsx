'use client'

import React, { useState, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import Image from 'next/image'

interface VideoPlayerProps {
  thumbnailSrc: string
  videoSrc: string
  title: string
  className?: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  thumbnailSrc,
  videoSrc,
  title,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
        setShowThumbnail(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePlayClick()
    }
  }

  return (
    <div
      className={`hover:border-signoz_accent-300/50 group relative overflow-hidden rounded-lg border border-signoz_slate-400/30 bg-signoz_ink-300/30 transition-all duration-300 ${className}`}
    >
      <div className="relative aspect-video w-full">
        {/* Thumbnail Image */}
        {showThumbnail && (
          <div className="absolute inset-0 z-10">
            <Image
              src={thumbnailSrc}
              alt={`${title} showcase thumbnail`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />

            {/* Play Button Overlay */}
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/30"
              onClick={handlePlayClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label={`Play ${title} showcase video`}
            >
              <div className="bg-signoz_accent-300/90 group-hover:bg-signoz_accent-300 flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 text-white" fill="currentColor" />
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => {
            setIsPlaying(true)
            setShowThumbnail(false)
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label={`${title} showcase video`}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay (when video is playing) */}
        {!showThumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 hover:bg-black/20 hover:opacity-100">
            <button
              onClick={handlePlayClick}
              className="bg-signoz_accent-300/80 hover:bg-signoz_accent-300 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              aria-label={isPlaying ? `Pause ${title} video` : `Play ${title} video`}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 text-white" fill="currentColor" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

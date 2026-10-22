'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

// Click-to-load: no YouTube request (and no YouTube cookies) until the visitor asks to play.
export default function YouTube({ id }: { id: string }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden" data-markdown-ignore>
      {isPlaying ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <button
          aria-label="Play YouTube video"
          className="group absolute inset-0 flex items-center justify-center bg-[var(--l2-background)] bg-cover bg-center"
          onClick={() => setIsPlaying(true)}
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
          type="button"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-cherry)] text-[var(--l1-foreground)] shadow-lg transition-transform group-hover:scale-105 sm:h-16 sm:w-16">
            <Play aria-hidden="true" className="ml-1" fill="currentColor" size={24} />
          </span>
        </button>
      )}
    </div>
  )
}

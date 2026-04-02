'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

export default function YouTube({ id }: { id: string }) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (isLoaded) {
    return (
      <div className="overflow-hidden rounded-xl bg-black">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="YouTube Video Player"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-black"
      aria-label="Play YouTube video"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-80 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
        style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg transition-transform duration-300 group-hover:scale-105">
          <Play className="h-4 w-4 fill-current" />
          Play video
        </span>
      </div>
    </button>
  )
}

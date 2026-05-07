import Image, { type StaticImageData } from 'next/image'
import PlayIcon from '@/public/svgs/icons/play-icon.svg'
import { VideoModalHandler } from './VideoModalHandler'

interface VideoModalPlayerProps {
  thumbnailSrc: string | StaticImageData
  thumbnailAlt: string
  videoId: string
}

const PLAY_BUTTON_ID = 'hero-video-play-button'

// Server Component - Image + play button render immediately without hydration
export const VideoModalPlayer = ({
  thumbnailSrc,
  thumbnailAlt,
  videoId,
}: VideoModalPlayerProps) => {
  return (
    <div className="product-explainer-video hero-figure rounded-lg">
      <div className="embed-container">
        <div className="relative aspect-[2400/1194] w-full">
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="rounded-lg"
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
          {/* Play button - fully server rendered */}
          <button
            id={PLAY_BUTTON_ID}
            type="button"
            aria-label="Play product demo video"
            data-track-click="Video Click"
            data-track-name="Video Play Button"
            data-track-text="Play Video"
            data-track-location="Hero Section"
            className="play-container absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none"
          >
            <PlayIcon className="h-6 w-6 md:h-20 md:w-20" aria-hidden="true" />
          </button>
          {/* Client component - attaches click handler after hydration */}
          <VideoModalHandler targetId={PLAY_BUTTON_ID} videoId={videoId} />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import Image, { type ImageLoader } from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { useLogEvent } from '@/hooks/useLogEvent'

import type { CustomerVideo } from './Customers.types'

const youtubeThumbnailLoader: ImageLoader = ({ src, width }) => `${src}?width=${width}`

interface CustomerVideoCarouselProps {
  videos: CustomerVideo[]
}

export default function CustomerVideoCarousel({ videos }: CustomerVideoCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    active: false,
    moved: false,
    scrollLeft: 0,
    startX: 0,
  })
  const suppressClickRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [interactiveVideoId, setInteractiveVideoId] = useState<string | null>(null)
  const logEvent = useLogEvent()
  const pathname = usePathname()

  // Fires for the initial slide and again once a slide change settles (the
  // timeout resets while the index is still moving during a scroll/drag).
  useEffect(() => {
    const activeVideo = videos[activeIndex]
    if (!activeVideo) return

    const timeout = window.setTimeout(() => {
      logEvent({
        eventName: 'Customer Video Slide Viewed',
        eventType: 'track',
        attributes: {
          company: activeVideo.company,
          pageLocation: pathname,
          slideCount: videos.length,
          slideIndex: activeIndex + 1,
          videoId: activeVideo.videoId,
        },
      })
    }, 400)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, logEvent, pathname, videos])

  const trackClick = (
    clickName: string,
    clickText: string,
    videoIndex: number,
    attributes: Record<string, unknown> = {}
  ) => {
    const video = videos[videoIndex]
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Customer Video',
        clickName,
        clickLocation: 'Customers Featured Videos',
        clickText,
        pageLocation: pathname,
        company: video.company,
        slideCount: videos.length,
        slideIndex: videoIndex + 1,
        videoId: video.videoId,
        ...attributes,
      },
    })
  }

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current
    if (!viewport) return

    const nextIndex = (activeIndex + direction + videos.length) % videos.length
    const nextSlide = viewport.children.item(nextIndex) as HTMLElement | null

    trackClick(
      direction === -1 ? 'Previous Customer Video' : 'Next Customer Video',
      direction === -1 ? 'Previous video' : 'Next video',
      nextIndex
    )
    setActiveIndex(nextIndex)
    viewport.scrollTo({
      behavior: 'smooth',
      left: nextSlide?.offsetLeft ?? 0,
    })
  }

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const viewport = viewportRef.current
    if (!viewport) return

    dragRef.current = {
      active: true,
      moved: false,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    }
  }

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    const drag = dragRef.current
    if (!viewport || !drag.active || (event.buttons & 1) === 0) return

    const distance = event.clientX - drag.startX
    if (Math.abs(distance) > 4) drag.moved = true
    if (!drag.moved) return

    event.preventDefault()
    viewport.scrollLeft = drag.scrollLeft - distance
  }

  const finishDrag = () => {
    const drag = dragRef.current
    if (!drag.active) return

    suppressClickRef.current = drag.moved
    drag.active = false

    if (drag.moved) {
      trackClick('Drag Customer Videos', 'Drag video carousel', activeIndex)
    }

    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
  }

  return (
    <div>
      <div
        aria-label="Customer video carousel"
        aria-roledescription="carousel"
        className="flex cursor-grab select-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [touch-action:pan-y] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return
          event.preventDefault()
          event.stopPropagation()
        }}
        onDragStart={(event) => event.preventDefault()}
        onMouseDown={handleMouseDown}
        onMouseLeave={finishDrag}
        onMouseMove={handleMouseMove}
        onMouseUp={finishDrag}
        onScroll={(event) => {
          const viewport = event.currentTarget
          const slides = Array.from(viewport.children) as HTMLElement[]
          const nextIndex = slides.reduce((closestIndex, slide, index) => {
            const closestDistance = Math.abs(slides[closestIndex].offsetLeft - viewport.scrollLeft)
            const slideDistance = Math.abs(slide.offsetLeft - viewport.scrollLeft)

            return slideDistance < closestDistance ? index : closestIndex
          }, 0)

          if (nextIndex !== activeIndex) {
            setActiveIndex(nextIndex)
          }
        }}
        ref={viewportRef}
        role="region"
        tabIndex={0}
      >
        {videos.map((video, index) => (
          <div
            className="relative aspect-video min-w-[88%] snap-start overflow-hidden rounded-xl border border-[var(--l2-border)] bg-[var(--l2-background)] sm:min-w-[82%] lg:min-w-[72%]"
            key={video.company}
          >
            <div className="absolute inset-0 bg-[var(--l1-background)]">
              {interactiveVideoId === video.videoId ? (
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
                  title={`${video.company} customer video`}
                />
              ) : (
                <>
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    loader={youtubeThumbnailLoader}
                    priority={index === 0}
                    sizes="(min-width: 1024px) 72vw, (min-width: 640px) 82vw, 88vw"
                    src={`https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`}
                  />
                  <button
                    aria-label={`Play the ${video.company} customer video`}
                    className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
                    onClick={() => {
                      trackClick('Play Customer Video', `Play ${video.company} video`, index)
                      setInteractiveVideoId(video.videoId)
                    }}
                    type="button"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-cherry)] text-[var(--l1-foreground)] shadow-lg transition-transform hover:scale-105 sm:h-16 sm:w-16">
                      <Play aria-hidden="true" className="ml-1" fill="currentColor" size={24} />
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-5">
        <div className="flex shrink-0 gap-2">
          <button
            aria-label="Previous customer video"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--l2-border)] text-[var(--l2-foreground)] transition-colors hover:border-[var(--l3-border)] hover:text-[var(--l1-foreground)]"
            onClick={() => move(-1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={17} />
          </button>
          <button
            aria-label="Next customer video"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--l2-border)] text-[var(--l2-foreground)] transition-colors hover:border-[var(--l3-border)] hover:text-[var(--l1-foreground)]"
            onClick={() => move(1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
        <div
          aria-label={`Video ${activeIndex + 1} of ${videos.length}`}
          aria-valuemax={videos.length}
          aria-valuemin={1}
          aria-valuenow={activeIndex + 1}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--l2-border)]"
          role="progressbar"
        >
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--l1-foreground)] transition-transform duration-300"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              width: `${100 / videos.length}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

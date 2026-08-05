'use client'

import { useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import Image, { type ImageLoader } from 'next/image'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

const youtubeThumbnailLoader: ImageLoader = ({ src, width }) => `${src}?width=${width}`

const customerVideos = [
  {
    company: 'Kernel',
    videoId: '0ZrTqonLE-I',
  },
  {
    company: 'Shaped',
    videoId: 'p4-dJkDtUbw',
  },
  {
    company: 'Alien Intelligence',
    videoId: '0-IRNacWDDA',
  },
] as const

export default function CustomerVideoCarousel() {
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

  const progressPosition = ['translate-x-0', 'translate-x-full', 'translate-x-[200%]'] as const

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current
    if (!viewport) return

    const nextIndex = (activeIndex + direction + customerVideos.length) % customerVideos.length
    const nextSlide = viewport.children.item(nextIndex) as HTMLElement | null

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

          setActiveIndex(nextIndex)
        }}
        ref={viewportRef}
        role="region"
        tabIndex={0}
      >
        {customerVideos.map((video, index) => (
          <div
            className="relative aspect-video min-w-[88%] snap-start overflow-hidden rounded-xl border border-signoz_slate-400 bg-signoz_ink-400 sm:min-w-[82%] lg:min-w-[72%]"
            key={video.company}
          >
            <div className="absolute inset-0 bg-signoz_ink-500">
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
                    onClick={() => setInteractiveVideoId(video.videoId)}
                    type="button"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signoz_cherry-500 text-signoz_vanilla-100 shadow-lg transition-transform hover:scale-105 sm:h-16 sm:w-16">
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-signoz_slate-400 text-signoz_vanilla-300 transition-colors hover:border-signoz_slate-300 hover:text-signoz_vanilla-100"
            onClick={() => move(-1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={17} />
          </button>
          <button
            aria-label="Next customer video"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-signoz_slate-400 text-signoz_vanilla-300 transition-colors hover:border-signoz_slate-300 hover:text-signoz_vanilla-100"
            onClick={() => move(1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
        <div
          aria-label={`Video ${activeIndex + 1} of ${customerVideos.length}`}
          aria-valuemax={customerVideos.length}
          aria-valuemin={1}
          aria-valuenow={activeIndex + 1}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-signoz_slate-400"
          role="progressbar"
        >
          <span
            className={`absolute inset-y-0 left-0 w-1/3 rounded-full bg-signoz_vanilla-100 transition-transform duration-300 ${progressPosition[activeIndex]}`}
          />
        </div>
      </div>
    </div>
  )
}

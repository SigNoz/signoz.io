'use client'

import Image from 'next/image'

import ClientZoom from '../ClientZoom'
import { cn } from 'app/lib/utils'
import { isSrcAllowedForNextImage } from '@/constants/allowedImageDomains'

interface FigureProps {
  src: string
  alt: string
  caption: string
  /** Light-mode variant of `src`; shown instead of `src` when the site theme is light. */
  lightSrc?: string
  /** When false, skip the light-mode color invert. Default true. */
  themeInvert?: boolean | 'true' | 'false'
  width?: number
  height?: number
  priority?: boolean
  link?: string
  sourceText?: string
  className?: string
  figureClassName?: string
  captionClassName?: string
}

export default function Figure({
  src,
  alt,
  caption,
  lightSrc,
  themeInvert = true,
  width = 1200,
  height = 675,
  priority = false,
  link,
  sourceText,
  className,
  figureClassName,
  captionClassName,
}: FigureProps) {
  const invert = themeInvert !== false && themeInvert !== 'false'

  const renderImage = (imageSrc: string, imageClassName: string, allowPriority: boolean) =>
    isSrcAllowedForNextImage(imageSrc) ? (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={allowPriority ? priority : false}
        loading={allowPriority && priority ? undefined : 'lazy'}
        className={imageClassName}
      />
    ) : (
      <img src={imageSrc} alt={alt} className={imageClassName} />
    )

  const figcaption = (
    <figcaption className={captionClassName}>
      <i>
        {link && !sourceText ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {caption}
          </a>
        ) : (
          <>
            {caption}{' '}
            {link && sourceText && (
              <>
                Source:{' '}
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {sourceText}
                </a>
              </>
            )}
          </>
        )}
      </i>
    </figcaption>
  )

  if (lightSrc) {
    return (
      <figure className={figureClassName}>
        <div className="hidden dark:block">
          <ClientZoom>{renderImage(src, cn('rounded-md', className), false)}</ClientZoom>
        </div>
        <div className="dark:hidden" data-markdown-ignore="">
          <ClientZoom>
            {renderImage(lightSrc, cn('rounded-md', 'no-theme-invert', className), false)}
          </ClientZoom>
        </div>
        {figcaption}
      </figure>
    )
  }

  return (
    <ClientZoom>
      <figure className={figureClassName}>
        {renderImage(src, cn('rounded-md', !invert && 'no-theme-invert', className), true)}
        {figcaption}
      </figure>
    </ClientZoom>
  )
}

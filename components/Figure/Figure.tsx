'use client'

import React from 'react'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface FigureProps {
  src: string
  alt: string
  caption: string
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
  link,
  sourceText,
  className,
  figureClassName,
  captionClassName,
}: FigureProps) {
  return (
    <Zoom>
      <figure className={figureClassName}>
        <img src={src} alt={alt} className={className} />
        <figcaption className={captionClassName}>
          <i>
            {caption}{' '}
            {link && sourceText && (
              <>
                Source:{' '}
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {sourceText}
                </a>
              </>
            )}
          </i>
        </figcaption>
      </figure>
    </Zoom>
  )
}

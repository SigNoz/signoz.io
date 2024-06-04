'use client'

import React from 'react'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface FigureProps {
  src: string
  alt: string
  caption: string
}

export default function Figure({ src, alt, caption }: FigureProps) {
  return (
    <Zoom>
      <figure>
        <img src={src} alt={alt} />
        <figcaption>
          <i>{caption}</i>
        </figcaption>
      </figure>
    </Zoom>
  )
}

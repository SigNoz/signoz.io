'use client'

import React from 'react'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface FigureProps {
  src: string
  alt: string
  caption: string
  link?: string
}

export default function Figure({ src, alt, caption, link }: FigureProps) {
  return (
    <Zoom>
      <figure>
        <img src={src} alt={alt} />
        <figcaption>
          <i>{caption} {link && <a href={link} target="_blank" rel="noopener noreferrer"> Source: {link}</a>}</i>
        </figcaption>
      </figure>
    </Zoom>
  )
}

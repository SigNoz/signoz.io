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
}

export default function Figure({ src, alt, caption, link, sourceText }: FigureProps) {
  return (
    <Zoom>
      <figure>
        <img src={src} alt={alt} />
          <figcaption>
              <i>{caption} {link && sourceText && (
                <> Source: <a href={link} target="_blank" rel="noopener noreferrer">{sourceText}</a></>
              )}</i>
        </figcaption>
      </figure>
    </Zoom>
  )
}

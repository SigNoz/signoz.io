'use client'

import NextImage, { ImageProps } from 'next/image'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Image = ({ ...rest }: ImageProps) => (
  <Zoom>
    <NextImage {...rest} />
  </Zoom>
)

export default Image

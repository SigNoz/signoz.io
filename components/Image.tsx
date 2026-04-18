'use client'

import NextImage, { ImageProps } from 'next/image'

import ClientZoom from './ClientZoom'

const Image = ({ ...rest }: ImageProps) => (
  <ClientZoom>
    <NextImage {...rest} />
  </ClientZoom>
)

export default Image

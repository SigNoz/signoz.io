'use client'

import NextImage, { ImageProps } from 'next/image'

import ClientZoom from './ClientZoom'
import { cn } from 'app/lib/utils'

type Props = ImageProps & {
  /** When false, skip light-mode color invert. Default true. */
  themeInvert?: boolean
}

const Image = ({ themeInvert = true, className, ...rest }: Props) => (
  <ClientZoom>
    <NextImage {...rest} className={cn(!themeInvert && 'no-theme-invert', className)} />
  </ClientZoom>
)

export default Image

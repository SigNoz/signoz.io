import { StaticImageData } from 'next/image'

export interface IconGridProps {
  icons: Array<{ src: string | StaticImageData | React.ReactNode; alt: string }>
  title: string
  className?: string
}

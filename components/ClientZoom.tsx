'use client'

import React, { forwardRef, type ReactNode } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ZoomDiv = forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>(function ZoomDiv(
  { 'aria-owns': _, ...props },
  ref
) {
  return <div ref={ref} {...props} />
})

export default function ClientZoom({ children }: { children: ReactNode }) {
  return <Zoom wrapElement={ZoomDiv as unknown as 'div'}>{children}</Zoom>
}

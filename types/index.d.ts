declare module '*.png' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.jpg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.jpeg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.webp' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.svg' {
  import type { FC, SVGProps } from 'react'

  const content: FC<SVGProps<SVGSVGElement>>
  export default content
}

declare module '*.svg?url' {
  const content: string
  export default content
}

declare global {
  interface Window {
    dataLayer: any[]
  }
}

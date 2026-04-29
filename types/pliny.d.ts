// Type declarations for pliny package
// These declarations are needed because pliny's wildcard exports don't work well
// with TypeScript's bundler module resolution in Next.js 16

declare module 'pliny/mdx-components' {
  import type { MDXComponents } from 'mdx/types'
  import type { ComponentType, JSX } from 'react'

  export function useMDXComponent(
    code: string,
    globals?: Record<string, unknown>
  ): ComponentType<Record<string, unknown>>

  export interface MDXLayoutRendererProps {
    code: string
    components?: MDXComponents
    [key: string]: unknown
  }

  export function MDXLayoutRenderer(props: MDXLayoutRendererProps): JSX.Element
}

declare module 'pliny/ui/TOCInline' {
  import type { ComponentType } from 'react'

  interface TOCInlineProps {
    toc: Array<{ value: string; url: string; depth: number }>
    indentDepth?: number
    fromHeading?: number
    toHeading?: number
    asDisclosure?: boolean
    exclude?: string | string[]
    collapse?: boolean
  }

  const TOCInline: ComponentType<TOCInlineProps>
  export default TOCInline
}

declare module 'pliny/ui/BlogNewsletterForm' {
  import type { ComponentType } from 'react'

  interface BlogNewsletterFormProps {
    title?: string
    apiUrl?: string
  }

  const BlogNewsletterForm: ComponentType<BlogNewsletterFormProps>
  export default BlogNewsletterForm
}

declare module 'pliny/ui/NewsletterForm' {
  import type { ComponentType } from 'react'

  interface NewsletterFormProps {
    title?: string
    apiUrl?: string
  }

  const NewsletterForm: ComponentType<NewsletterFormProps>
  export default NewsletterForm
}

declare module 'pliny/newsletter' {
  export interface NewsletterResponse {
    error?: string
  }

  export function NewsletterAPI(config: Record<string, unknown>): {
    GET: (req: Request) => Promise<Response>
    POST: (req: Request) => Promise<Response>
  }
}

declare module 'pliny/ui/Pre' {
  import type { ComponentType, ReactNode } from 'react'

  interface PreProps {
    children?: ReactNode
    className?: string
    [key: string]: unknown
  }

  const Pre: ComponentType<PreProps>
  export default Pre
}

declare module 'pliny/ui/Bleed' {
  import type { ComponentType, ReactNode } from 'react'

  interface BleedProps {
    children?: ReactNode
    full?: boolean
  }

  const Bleed: ComponentType<BleedProps>
  export default Bleed
}

declare module 'pliny/utils/formatDate' {
  export function formatDate(date: string, locale?: string): string
}

declare module 'pliny/utils/htmlEscaper' {
  export function escape(str: string): string
}

declare module 'pliny/utils/htmlEscaper.js' {
  export function escape(str: string): string
}

declare module 'pliny/mdx-plugins/index.js' {
  import type { Plugin } from 'unified'

  export const remarkExtractFrontmatter: Plugin
  export const remarkCodeTitles: Plugin
  export const remarkImgToJsx: Plugin
  export const extractTocHeadings: Plugin
}

declare module 'pliny/mdx-plugins' {
  import type { Plugin } from 'unified'

  export const remarkExtractFrontmatter: Plugin
  export const remarkCodeTitles: Plugin
  export const remarkImgToJsx: Plugin
  export const extractTocHeadings: Plugin
}

import type { IconType } from 'react-icons'

export interface OpenInAIProps {
  /** The raw markdown content - for copy functionality */
  markdownContent?: string
  /** Optional async generator for copy functionality */
  getMarkdownContent?: () => Promise<string> | string
  /** The current page URL (can be relative, will be made absolute) */
  pageUrl: string
  /** Optional slug for analytics */
  docSlug?: string
  /** Additional CSS classes */
  className?: string
  /** Label for the copy markdown button */
  copyLabel?: string
  /** `open` lists "Open in …" destinations; `explain` asks AI for a plain-language summary */
  aiVariant?: 'open' | 'explain'
}

export interface AIOptionsSection {
  title: string
  description: string
}

export interface AIOption {
  id: string
  name: string
  Icon: IconType
  getUrl: (pageUrl: string) => string
}

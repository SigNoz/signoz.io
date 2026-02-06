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
}

export interface AIOption {
  id: string
  name: string
  description: string
  Icon: IconType
  getUrl: (pageUrl: string) => string
}

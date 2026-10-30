import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ProboElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'probo-cookie-banner-root': ProboElementProps & {
        'banner-id': string
        'base-url': string
        'gcm-enabled'?: 'true' | 'false'
        lang?: string
      }
      'probo-banner': ProboElementProps
      'probo-accept-button': ProboElementProps
      'probo-reject-button': ProboElementProps
      'probo-customize-button': ProboElementProps
      'probo-preference-panel': ProboElementProps
      'probo-category-list': ProboElementProps
      'probo-save-button': ProboElementProps
      'probo-settings-link': ProboElementProps
    }
  }
}

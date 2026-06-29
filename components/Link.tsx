'use client'

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import { useBrowserSearch } from '@/hooks/useBrowserSearch'
import {
  isDocsOnboardingPathname,
  isDocsPathname,
  buildDocsOnboardingPath,
} from '@/utils/docs/onboardingPath'

export const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://signoz.io' : ''

type CustomLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

const CustomLink = ({ href, prefetch, ...rest }: CustomLinkProps) => {
  const pathname = usePathname()
  const search = useBrowserSearch()
  const searchParams = new URLSearchParams(search)
  const regionParam = searchParams.get('region')
  const cloudRegionParam = searchParams.get('cloud_region')

  const isOnboarding = isDocsOnboardingPathname(pathname)

  // Rewrite /docs/... links to /docs-onboarding/... when in onboarding context
  let resolvedHref = href
  if (isOnboarding && typeof href === 'string') {
    // Handle absolute signoz.io docs URLs
    if (href.startsWith('https://signoz.io/docs/') || href === 'https://signoz.io/docs') {
      const docsPath = href.replace('https://signoz.io', '')
      resolvedHref = buildDocsOnboardingPath(docsPath)
    } else if (isDocsPathname(href)) {
      resolvedHref = buildDocsOnboardingPath(href)
    }
  }

  const isInternalLink =
    (resolvedHref && (resolvedHref.startsWith('/') || resolvedHref.startsWith('.'))) ||
    (typeof resolvedHref === 'string' && resolvedHref.startsWith('https://signoz.io'))
  const isAnchorLink = resolvedHref && resolvedHref.startsWith('#')

  if (isInternalLink) {
    const isDocsUrl =
      typeof resolvedHref === 'string' &&
      (resolvedHref.includes('/docs/') || resolvedHref.includes('/docs-onboarding/'))

    if (isDocsUrl && regionParam) {
      const separator = resolvedHref.includes('?') ? '&' : '?'
      let newHref = `${resolvedHref}${separator}region=${regionParam}`

      if (cloudRegionParam) {
        newHref = `${newHref}&cloud_region=${cloudRegionParam}`
      }

      return <Link href={newHref} {...rest} target="_blank" prefetch={prefetch ?? false} />
    }

    if (typeof resolvedHref === 'string' && resolvedHref.startsWith('https://signoz.io/')) {
      return <Link href={resolvedHref} {...rest} target="_blank" prefetch={prefetch ?? false} />
    }

    // Prepend domain to site-relative URLs
    if (typeof resolvedHref === 'string' && resolvedHref.startsWith('/')) {
      resolvedHref = `${SITE_BASE_URL}${resolvedHref}`
    }

    return <Link href={resolvedHref} {...rest} prefetch={prefetch ?? false} />
  }

  if (isAnchorLink) {
    return <a href={resolvedHref} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer nofollow" href={resolvedHref} {...rest} />
}

export default CustomLink

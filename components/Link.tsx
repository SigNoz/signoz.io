'use client'

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { useBrowserSearch } from '@/hooks/useBrowserSearch'

type CustomLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

const CustomLink = ({ href, prefetch, ...rest }: CustomLinkProps) => {
  const search = useBrowserSearch()
  const searchParams = new URLSearchParams(search)
  const regionParam = searchParams.get('region')
  const cloudRegionParam = searchParams.get('cloud_region')

  const isInternalLink =
    (href && (href.startsWith('/') || href.startsWith('.'))) ||
    (typeof href === 'string' && href.startsWith('https://signoz.io'))
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    const isDocsUrl = typeof href === 'string' && href.includes('/docs/')

    if (isDocsUrl && regionParam) {
      const separator = href.includes('?') ? '&' : '?'
      let newHref = `${href}${separator}region=${regionParam}`

      if (cloudRegionParam) {
        newHref = `${newHref}&cloud_region=${cloudRegionParam}`
      }

      return <Link href={newHref} {...rest} target="_blank" prefetch={prefetch ?? false} />
    }

    if (href.startsWith('https://signoz.io/')) {
      return <Link href={href} {...rest} target="_blank" prefetch={prefetch ?? false} />
    }

    return <Link href={href} {...rest} prefetch={prefetch ?? false} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer nofollow" href={href} {...rest} />
}

export default CustomLink

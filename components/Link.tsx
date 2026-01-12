'use client'

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const searchParams = useSearchParams()
  const [regionParam, setRegionParam] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams) {
      setRegionParam(searchParams.get('region'))
    }
  }, [searchParams])

  const isInternalLink =
    (href && (href.startsWith('/') || href.startsWith('.'))) || href.startsWith('https://signoz.io') // Docs has complete URL as href, so we need to check for complete url, this is hardcoded for now
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    const isDocsUrl = typeof href === 'string' && href.includes('/docs/')
    const finalHref =
      regionParam && isDocsUrl
        ? `${href}${href.includes('?') ? '&' : '?'}region=${regionParam}`
        : href
    return <Link href={finalHref} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink

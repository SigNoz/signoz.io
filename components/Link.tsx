'use client'

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const searchParams = useSearchParams()
  const [regionParam, setRegionParam] = useState<string | null>(null)
  const [cloudRegionParam, setCloudRegionParam] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams) {
      setRegionParam(searchParams.get('region'))
      setCloudRegionParam(searchParams.get('cloud_region'))
    }
  }, [searchParams])

  const isInternalLink =
    (href && (href.startsWith('/') || href.startsWith('.'))) ||
    (typeof href === 'string' && href.startsWith('https://signoz.io'))
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    const isDocsUrl = typeof href === 'string' && href.includes('/docs/')
    let finalHref = href as string

    if (isDocsUrl && regionParam) {
      const separator = finalHref.includes('?') ? '&' : '?'
      finalHref = `${finalHref}${separator}region=${regionParam}`
      if (cloudRegionParam) {
        finalHref = `${finalHref}&cloud_region=${cloudRegionParam}`
      }
    }

    return <Link href={finalHref} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink

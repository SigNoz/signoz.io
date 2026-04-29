'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type CustomLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

function CustomLinkInner({ href, prefetch, ...rest }: CustomLinkProps) {
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

export default function CustomLink(props: CustomLinkProps) {
  return (
    <Suspense fallback={null}>
      <CustomLinkInner {...props} />
    </Suspense>
  )
}

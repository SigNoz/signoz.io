import React, { useEffect } from 'react'
import { RegionProvider } from '@/components/Region/RegionContext'

const DocRenderer = ({
  docUrl,
  docMetaBySlug,
  compiledDocsBySlug,
  setHasError,
}: {
  docUrl: string
  docMetaBySlug: Record<string, { title: string }>
  compiledDocsBySlug: Record<string, React.ReactNode>
  setHasError: (hasError: boolean) => void
}) => {
  const slug = decodeURI(`${docUrl.replace('https://signoz.io/docs/', '').replace(/^\/+/, '')}`)
  const meta = docMetaBySlug[slug]
  const content = compiledDocsBySlug[slug]

  useEffect(() => {
    setHasError(!content)
  }, [content, setHasError])

  if (!content) {
    return null
  }

  return (
    <RegionProvider>
      <article>
        <h1>{meta?.title}</h1>
        {content}
      </article>
    </RegionProvider>
  )
}

export default DocRenderer

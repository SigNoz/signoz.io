import React, { useEffect } from 'react'

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
    <article>
      <h1>{meta?.title}</h1>
      {content}
    </article>
  )
}

export default DocRenderer

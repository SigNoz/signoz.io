import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type UpgradeDoc = {
  title: string
  slug: string
  content: string
  body?: {
    raw?: string
  }
}

const DocRenderer = ({
  docUrl,
  docsBySlug,
  setHasError,
}: {
  docUrl: string
  docsBySlug: Record<string, UpgradeDoc>
  setHasError: (hasError: boolean) => void
}) => {
  const slug = decodeURI(`${docUrl.replace('https://signoz.io/docs/', '').replace(/^\/+/, '')}`)
  const post = docsBySlug[slug]

  useEffect(() => {
    setHasError(!post)
  }, [post, setHasError])

  if (!post) {
    return null
  }

  const markdown = post.body?.raw || post.content || ''

  return (
    <article>
      <h1>{post.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  )
}

export default DocRenderer

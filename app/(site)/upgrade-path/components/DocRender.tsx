import { coreContent } from 'pliny/utils/contentlayer.js'
import DocContent from '@/components/DocContent/DocContent'
import { RegionProvider } from '@/components/Region/RegionContext'
import type { Doc } from 'contentlayer/generated'

const DocRenderer = ({
  docUrl,
  docsBySlug,
  setHasError,
}: {
  docUrl: string
  docsBySlug: Record<string, Doc>
  setHasError: (hasError: boolean) => void
}) => {
  const slug = decodeURI(`${docUrl.replace('https://signoz.io/docs/', '').replace(/^\/+/, '')}`)

  const post = docsBySlug[slug]

  if (!post) {
    setHasError(true)
  }

  const mainContent = coreContent(post)
  const toc = post?.toc || []
  const { title } = mainContent

  return (
    <>
      {post && (
        <RegionProvider>
          <DocContent title={title} post={post} toc={toc} hideTableOfContents={true} />
        </RegionProvider>
      )}
    </>
  )
}

export default DocRenderer

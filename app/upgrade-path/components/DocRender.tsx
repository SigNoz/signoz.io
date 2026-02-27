import { allDocs, Doc } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer.js'
import DocContent from '@/components/DocContent/DocContent'
import { RegionProvider } from '@/components/Region/RegionContext'

const DocRenderer = ({
  docUrl,
  setHasError,
}: {
  docUrl: string
  setHasError: (hasError: boolean) => void
}) => {
  const slug = decodeURI(`${docUrl.replace('https://signoz.io/docs/', '').replace(/^\/+/, '')}`)

  const post = allDocs?.find((p) => p?.slug === slug) as Doc

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

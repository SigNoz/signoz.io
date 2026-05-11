import { Metadata } from 'next'
import { generateMetadata as docsGenerateMetadata } from '../../(site)/docs/(main-docs)/[...slug]/page'
import siteMetadata from '@/data/siteMetadata'

export {
  dynamicParams,
  default,
  generateStaticParams,
} from '../../(site)/docs/(main-docs)/[...slug]/page'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const metadata = await docsGenerateMetadata({ params })

  const slug = decodeURI(params.slug.join('/'))
  const canonicalUrl = `${siteMetadata.siteUrl}/docs/${slug}/`

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

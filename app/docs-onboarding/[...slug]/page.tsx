import { Metadata } from 'next'
import { generateMetadata as docsGenerateMetadata } from '../../(site)/docs/(main-docs)/[...slug]/page'
import siteMetadata from '@/data/siteMetadata'

export {
  dynamicParams,
  default,
  generateStaticParams,
} from '../../(site)/docs/(main-docs)/[...slug]/page'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const metadata = await docsGenerateMetadata({ params: Promise.resolve(params) })

  const slug = decodeURI(params.slug.join('/'))
  const canonicalUrl = `${siteMetadata.siteUrl}/docs/${slug}/`

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

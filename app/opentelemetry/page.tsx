import type { Metadata } from 'next'
import BlogArticlePage, {
  dynamic as blogDynamic,
  dynamicParams as blogDynamicParams,
  generateMetadata as generateBlogMetadata,
} from '../blog/[...slug]/page'

const LANDING_PARAMS = { slug: ['what-is-opentelemetry'] }

export const dynamic = blogDynamic
export const dynamicParams = blogDynamicParams

export async function generateMetadata(): Promise<Metadata | undefined> {
  return generateBlogMetadata({ params: LANDING_PARAMS })
}

export default function OpenTelemetryLanding() {
  return <BlogArticlePage params={LANDING_PARAMS} />
}

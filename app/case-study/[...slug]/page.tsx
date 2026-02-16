import 'css/prism.css'
import 'css/tailwind.css'
import 'css/post.css'
import 'css/global.css'
import 'css/doc.css'
import { components } from '@/components/MDXComponents'
import CaseStudyLayout from '../../../layouts/CaseStudyLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { fetchMDXContentByPath, MDXContent } from '@/utils/strapi'
import { compileMDX } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { CoreContent } from 'pliny/utils/contentlayer'
import { mdxOptions, generateTOC } from '@/utils/mdxUtils'

export const revalidate = 0
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
  try {
    // Handle root case
    if (!params.slug || params.slug.length === 0) {
      return {
        title: 'Case Studies - SigNoz',
        description: 'Customer case studies and success stories with SigNoz',
        openGraph: {
          title: 'Case Studies - SigNoz',
          description: 'Customer case studies and success stories with SigNoz',
          type: 'website',
        },
      }
    }

    // Convert slug array to path
    const path = params.slug.join('/')

    const isProduction = process.env.VERCEL_ENV === 'production'
    const deploymentStatus = isProduction ? 'live' : 'staging'

    try {
      const response = await fetchMDXContentByPath('case-studies', path, deploymentStatus)
      const content = Array.isArray(response.data) ? response.data[0] : response.data

      return {
        title: content?.title,
        description: content?.description || content?.title,
        openGraph: {
          title: content?.title,
          description: content?.description || content?.title,
          siteName: siteMetadata.title,
          locale: 'en_US',
          type: 'article',
          url: './',
        },
        twitter: {
          card: 'summary_large_image',
          title: content?.title,
          description: content?.description || content?.title,
        },
      }
    } catch (error) {
      // Content not found, return 404 metadata
      return {
        title: 'Page Not Found',
        description: 'The requested case study could not be found.',
        robots: {
          index: false,
          follow: false,
        },
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error',
      description: 'An error occurred while loading the case study.',
    }
  }
}

// Generate static params - returning empty array to generate all pages at runtime
export async function generateStaticParams() {
  return []
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const path = params.slug.join('/')

  // Fetch content from Strapi with error handling
  let content: MDXContent
  try {
    if (!process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL) {
      throw new Error('Strapi API URL is not configured')
    }

    const isProduction = process.env.VERCEL_ENV === 'production'
    const deploymentStatus = isProduction ? 'live' : 'staging'

    const response = await fetchMDXContentByPath('case-studies', path, deploymentStatus)
    if (!response || !response.data) {
      console.error(`Invalid response for path: ${path}`)
      notFound()
    }
    content = Array.isArray(response.data) ? response.data[0] : response.data
  } catch (error) {
    console.error('Error fetching case study content:', error)
    notFound()
  }

  if (!content) {
    console.log(`No content returned for path: ${path}`)
    notFound()
  }

  // Generate computed fields
  const readingTimeData = readingTime(content?.content)
  const toc = generateTOC(content?.content)

  // Compile MDX content with all plugins
  let compiledContent
  try {
    const { content: mdxContent } = await compileMDX({
      source: content?.content,
      components,
      options: mdxOptions as any,
    })
    compiledContent = mdxContent
  } catch (error) {
    console.error('Error compiling MDX:', error)
    notFound()
  }

  // Prepare content for CaseStudyLayout
  const mainContent: CoreContent<MDXContent> = {
    title: content?.title,
    slug: path,
    path: content?.path || `/case-study/${path}`,
    type: 'CaseStudy',
    readingTime: readingTimeData,
    filePath: `/case-study/${path}`,
    toc: toc,
    image: content.image,
    authors: content.authors?.map((author) => author?.key) || [],
  }

  return (
    <>
      <CaseStudyLayout content={mainContent} toc={toc}>
        <div className="prose prose-slate max-w-none dark:prose-invert">{compiledContent}</div>
      </CaseStudyLayout>
    </>
  )
}

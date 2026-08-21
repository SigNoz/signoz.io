import { components } from '@/components/MDXComponents'
import CaseStudyLayout from '@/layouts/CaseStudyLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { getContentBySlug } from '@/utils/contentRepository'
import { MDXContent } from '@/utils/strapi'
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { CoreContent } from 'pliny/utils/contentlayer'
import { mdxOptions, generateTOC } from '@/utils/mdxUtils'
import { getAuthorKeys, getTagValues } from '@/utils/contentHelpers'
import { getCachedAuthors } from '@/utils/cmsAuthors'
import JsonLdScript from '@/components/JsonLdScript'
import { buildBreadcrumbSchema, getSectionArticleBreadcrumbs } from '@/utils/breadcrumbSchema'

async function getCustomerStoryContent(path: string, deploymentStatus: string) {
  return getContentBySlug('case-studies', path, deploymentStatus)
}

export const revalidate = 86400 // 1 day — see CMS_REVALIDATE_INTERVAL
export const dynamicParams = true

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  try {
    // Handle root case
    if (!params.slug || params.slug.length === 0) {
      return {
        title: 'Customer Stories - SigNoz',
        description: 'Customer case studies and success stories with SigNoz',
        openGraph: {
          title: 'Customer Stories - SigNoz',
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
      const content = await getCustomerStoryContent(path, deploymentStatus)

      if (!content) {
        throw new Error(`Case study content not found for path: ${path}`)
      }

      const seoTitle = content?.meta_title || content?.title

      return {
        title: seoTitle,
        description: content?.description || content?.title,
        alternates: {
          canonical: `${siteMetadata.siteUrl}/customers/${path}/`,
        },
        openGraph: {
          title: seoTitle,
          description: content?.description || content?.title,
          siteName: siteMetadata.title,
          locale: 'en_US',
          type: 'article',
          url: `${siteMetadata.siteUrl}/customers/${path}/`,
        },
        twitter: {
          card: 'summary_large_image',
          title: seoTitle,
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

// To avoid dynamic treatment: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export async function generateStaticParams() {
  return []
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const path = params.slug.join('/')

  // Fetch content from the repository with error handling
  let content: MDXContent
  try {
    const isProduction = process.env.VERCEL_ENV === 'production'
    const deploymentStatus = isProduction ? 'live' : 'staging'

    const response = await getCustomerStoryContent(path, deploymentStatus)
    if (!response) {
      console.error(`Invalid response for path: ${path}`)
      notFound()
    }
    content = response
  } catch (error) {
    console.error('Error fetching case study content:', error)
    notFound()
  }

  if (!content) {
    console.log(`No content returned for path: ${path}`)
    notFound()
  }

  // Generate computed fields
  const readingTimeData = readingTime(content?.content || '')
  const toc = generateTOC(content?.content || '')

  const authorDirectory = await getCachedAuthors()
  const authorKeys = getAuthorKeys(content)
  const authorList = authorKeys.length > 0 ? authorKeys : ['default']
  const authorDetails = authorList.map((author) => {
    const a = authorDirectory[author]
    return a || { name: author }
  })

  // Compile MDX content with all plugins
  let compiledContent
  try {
    const { content: mdxContent } = await compileMDX({
      source: content?.content,
      components,
      options: mdxOptions as MDXRemoteProps['options'],
    })
    compiledContent = mdxContent
  } catch (error) {
    console.error('Error compiling MDX:', error)
    notFound()
  }

  // Prepare content for CaseStudyLayout — no date fields on purpose: customer
  // story pages must not display a date, and ArticleLayout only renders one
  // when the content carries date fields.
  const mainContent: CoreContent<MDXContent> = {
    title: content?.title,
    slug: path,
    path: `/customers/${path}`,
    type: 'CaseStudy',
    readingTime: readingTimeData,
    filePath: `/customers/${path}`,
    toc: toc,
    image: content.image,
    authors: authorList,
    tags: getTagValues(content),
  }

  const breadcrumbs = getSectionArticleBreadcrumbs('customers', content.title, path)
  const breadcrumbJsonLd = buildBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <CaseStudyLayout
        content={mainContent}
        authorDetails={authorDetails}
        authors={authorList}
        toc={toc}
        authorDirectory={authorDirectory}
        breadcrumbs={breadcrumbs}
      >
        {compiledContent}
      </CaseStudyLayout>
    </>
  )
}

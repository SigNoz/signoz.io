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
import GithubSlugger from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { CoreContent } from 'pliny/utils/contentlayer'
// import { CaseStudy } from '../../../.contentlayer/generated'

// Remark and rehype plugins
import remarkGfm from 'remark-gfm'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkMath from 'remark-math'

export const revalidate = 0
export const dynamicParams = true

// Heroicon mini link for auto-linking headers
const linkIcon = fromHtmlIsomorphic(
  `<span class="content-header-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
      <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
      <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
    </svg>
  </span>`,
  { fragment: true }
)

// MDX processing options with all plugins
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: linkIcon,
        },
      ],
      [rehypePrismPlus, { defaultLanguage: 'tsx', ignoreMissing: true }],
    ],
  },
}

// Generate table of contents from MDX content
function generateTOC(content: string) {
  const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
  const slugger = new GithubSlugger()

  // Remove code blocks to avoid parsing headers inside code
  const regXCodeBlock = /```[\s\S]*?```/g
  const contentWithoutCodeBlocks = content.replace(regXCodeBlock, '')

  const headings = Array.from(contentWithoutCodeBlocks.matchAll(regXHeader))
    .map(({ groups }) => {
      const flag = groups?.flag
      const content = groups?.content
      if (!content) return null
      return {
        value: content,
        url: `#${slugger.slug(content)}`,
        depth: flag?.length == 1 ? 1 : flag?.length == 2 ? 2 : 3,
      }
    })
    .filter((heading): heading is NonNullable<typeof heading> => heading !== null)

  return headings
}

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

    try {
      const response = await fetchMDXContentByPath('case-studies', path, 'live')
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
  console.log(`Fetching case study content for path: ${path}`)

  // Fetch content from Strapi with error handling
  let content: MDXContent
  try {
    if (!process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL) {
      throw new Error('Strapi API URL is not configured')
    }

    const response = await fetchMDXContentByPath('case-studies', path, 'live')
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

import 'css/prism.css'
import 'css/tailwind.css'
import 'css/post.css'
import 'css/global.css'
import 'css/doc.css'
import { components } from '@/components/MDXComponents'
import FAQLayout from '@/layouts/FAQLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SidebarIcons } from '@/components/sidebar-icons/icons'
import Button from '@/components/ui/Button'
import { fetchMDXContentByPath, MDXContent } from '@/utils/strapi'
import { generateStructuredData } from '@/utils/structuredData'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog, Authors } from 'contentlayer/generated'
import { compileMDX } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import GithubSlugger from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

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
    // Convert slug array to path
    const path = params.slug.join('/')

    const isProduction = process.env.VERCEL_ENV === 'production'

    try {
      const deployment_status = isProduction ? 'live' : 'staging'
      const { data: content } = await fetchMDXContentByPath('faqs', path, deployment_status)

      // Extract author names from the content
      const authorNames = (content as MDXContent)?.authors?.map((author) => author?.name) || [
        'SigNoz Team',
      ]

      return {
        title: (content as MDXContent).title,
        description:
          (content as MDXContent)?.description || `${(content as MDXContent)?.title} - SigNoz FAQ`,
        authors: authorNames.map((name) => ({ name })),
        openGraph: {
          title: (content as MDXContent)?.title,
          description:
            (content as MDXContent)?.description ||
            `${(content as MDXContent)?.title} - SigNoz FAQ`,
          siteName: siteMetadata.title,
          locale: 'en_US',
          type: 'article',
          publishedTime: (content as MDXContent)?.date,
          modifiedTime: (content as MDXContent)?.updatedAt,
          url: (content as MDXContent)?.path || './',
          authors: authorNames,
        },
        twitter: {
          card: 'summary_large_image',
          title: (content as MDXContent)?.title,
          description:
            (content as MDXContent)?.description ||
            `${(content as MDXContent)?.title} - SigNoz FAQ`,
        },
      }
    } catch (error) {
      // Content not found, return 404 metadata
      return {
        title: 'Page Not Found',
        description: 'The requested FAQ page could not be found.',
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
      description: 'An error occurred while loading the FAQ page.',
    }
  }
}

// Generate static params - returning empty array to generate all pages at runtime
export async function generateStaticParams() {
  return []
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  if (!params.slug || params.slug.length === 0) {
    return <div className="min-h-screen">Redirecting to FAQs index...</div>
  }

  const path = params.slug.join('/')
  console.log(`Fetching FAQ content for path: ${path}`)

  const isProduction = process.env.VERCEL_ENV === 'production'

  // Fetch content from Strapi with error handling
  let content: MDXContent
  try {
    if (!process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL) {
      throw new Error('Strapi API URL is not configured')
    }

    const deployment_status = isProduction ? 'live' : 'staging'

    const response = await fetchMDXContentByPath('faqs', path, deployment_status)
    if (!response || !response.data) {
      console.error(`Invalid response for path: ${path}`)
      notFound()
    }
    content = response.data as MDXContent
  } catch (error) {
    console.error('Error fetching FAQ content:', error)
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

  console.log('logging content tags', content.tags)

  // Generate structured data
  const structuredData = generateStructuredData('faqs', content)

  // Prepare content for FAQLayout
  const mainContent: CoreContent<Blog> = {
    title: content.title,
    date: content.date,
    lastmod: content.updatedAt,
    tags: content.tags?.data?.map((tag) => tag.attributes?.name) || [],
    draft: content.deployment_status === 'draft',
    summary: content.description,
    images: content.images || [],
    authors: content.authors?.map((author) => author?.name) || [],
    slug: path,
    path: content.path || `/faqs/${path}`,
    type: 'Blog',
    readingTime: readingTimeData,
    filePath: `/faqs/${path}`,
    structuredData: structuredData,
    toc: toc,
    relatedArticles:
      content.related_faqs?.data?.map((faq) => ({
        title: faq.attributes?.title,
        slug: faq.attributes?.path,
        date: faq.attributes?.date,
      })) || [],
  }

  // Prepare author details from the authors relation
  const authorDetails: CoreContent<Authors>[] = content.authors?.data?.map((author) => ({
    name: author.attributes?.name || 'Unknown Author',
    avatar: author.attributes?.image_url || '/static/images/signoz-logo.png',
    occupation: author.attributes?.title || 'Developer Tools',
    company: 'SigNoz',
    email: 'team@signoz.io',
    twitter: 'https://twitter.com/SigNozHQ',
    linkedin: 'https://www.linkedin.com/company/signoz',
    github: 'https://github.com/SigNoz/signoz',
    path: `/authors/${author.attributes?.key || 'default'}`,
    type: 'Authors',
    slug: author.attributes?.key || 'default',
    readingTime: { text: '', minutes: 0, time: 0, words: 0 },
    filePath: `/data/authors/${author.attributes?.key || 'default'}.mdx`,
  })) || [
    {
      // Fallback author if no authors are found
      name: 'SigNoz Team',
      avatar: '/static/images/signoz-logo.png',
      occupation: 'Developer Tools',
      company: 'SigNoz',
      email: 'team@signoz.io',
      twitter: 'https://twitter.com/SigNozHQ',
      linkedin: 'https://www.linkedin.com/company/signoz',
      github: 'https://github.com/SigNoz/signoz',
      path: '/authors/default',
      type: 'Authors',
      slug: 'default',
      readingTime: { text: '', minutes: 0, time: 0, words: 0 },
      filePath: '/data/authors/default.mdx',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto">
        <Button variant={'ghost'} isButton={true} className="ml-3.5 mt-10 hover:bg-transparent">
          <Link href={`/faqs/`} className="flex items-center">
            <SidebarIcons.ArrowLeft />
            <span className="pl-1.5 text-sm">Back to FAQs</span>
          </Link>
        </Button>
      </div>

      <FAQLayout
        content={mainContent}
        authorDetails={authorDetails}
        authors={content.authors?.map((author) => author?.name) || []}
        toc={toc}
        tags={content.tags?.map((tag) => tag?.value) || []}
        relatedArticles={
          content.related_faqs?.map((faq) => ({
            title: faq?.title,
            publishedOn: faq?.date,
            url: `/faqs/${faq?.path}`,
          })) || []
        }
      >
        <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-16">
          {compiledContent}
        </div>
      </FAQLayout>
    </>
  )
}

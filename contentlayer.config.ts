import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import GithubSlugger, { slug } from 'github-slugger'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import blogRelatedArticles from './constants/blogRelatedArticles.json'
import comparisonsRelatedArticles from './constants/comparisonsRelatedArticles.json'
import guidesRelatedArticles from './constants/guidesRelatedArticles.json'
import opentelemetryRelatedArticles from './constants/opentelemetryRelatedArticles.json'
import allAuthors from './constants/authors.json'

const isProduction = process.env.NODE_ENV === 'production'

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

const DEFAULT_DOC_TAGS = ['SigNoz Cloud', 'Self-Host']

type PlainArr<T> = {
  _array?: T[]
  toArray?: () => T[]
}

const isPlainArr = (value: unknown): value is PlainArr<unknown> => {
  if (!value || typeof value !== 'object') {
    return false
  }

  return '_array' in value || 'toArray' in value
}

const extractPlainArrayValues = <T>(value: T[] | PlainArr<T> | undefined): T[] | undefined => {
  if (!value) {
    return undefined
  }

  if (Array.isArray(value)) {
    return value
  }

  if (isPlainArr(value)) {
    if (Array.isArray(value._array)) {
      return value._array
    }

    const convertedArray = value.toArray?.()
    if (Array.isArray(convertedArray)) {
      return convertedArray
    }
  }

  return undefined
}

const sanitizeDocTags = (tags: string[]) => {
  return tags
    .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
    .filter((tag): tag is string => Boolean(tag))
}

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  // toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
  toc: {
    type: 'json',
    resolve: async (doc) => {
      const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
      const slugger = new GithubSlugger()

      const regXCodeBlock = /```[\s\S]*?```/g
      const contentWithoutCodeBlocks = doc.body.raw.replace(regXCodeBlock, '')

      const headings = Array.from(contentWithoutCodeBlocks.matchAll(regXHeader)).map(
        ({ groups }) => {
          const flag = groups?.flag
          const content = groups?.content
          return {
            value: content,
            url: content ? `#${slugger.slug(content)}` : undefined,
            depth: flag?.length == 1 ? 1 : flag?.length == 2 ? 2 : 3,
          }
        }
      )

      return headings
    },
  },
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tags: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tags) {
          tags[formattedTag] += 1
        } else {
          tags[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tags, null, 2), {
    flag: 'w',
    encoding: 'utf-8',
  })
}

function getRelatedArticles(doc, relatedArticles) {
  const blogSlug = doc._raw.flattenedPath

  const blog = relatedArticles.find((blog) => {
    return blog.blogURL === blogSlug
  })

  if (blog) {
    return blog.relatedArticles
  } else {
    return []
  }
}

const getAuthorDetails = (authorID) => {
  if (allAuthors[authorID]) {
    return allAuthors[authorID]
  }

  return {}
}

function getAuthors(doc) {
  const authorsArr = doc?.authors._array || ['SigNoz Team']

  return authorsArr.map((author) => ({
    '@type': 'Person',
    name: getAuthorDetails(author).name || 'SigNoz Team',
  }))
}

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    images: { type: 'json' },
    image: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
    slug: { type: 'string', required: false },
    hide_table_of_contents: { type: 'boolean', required: false },
    toc_min_heading_level: { type: 'number', required: false },
    toc_max_heading_level: { type: 'number', required: false },
    cta_title: { type: 'string', required: false },
    cta_text: { type: 'string', required: false },
    is_newsroom: { type: 'boolean', required: false },
  },
  computedFields: {
    ...computedFields,
    relatedArticles: {
      type: 'json',
      resolve: (doc) => getRelatedArticles(doc, blogRelatedArticles),
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://signoz.io/blog/${doc.slug}`,
        },
        author: getAuthors(doc),
        publisher: {
          '@type': 'Organization',
          name: 'SigNoz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://signoz.io/img/SigNozLogo-orange.svg',
          },
        },
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.description,
        image: `${siteMetadata.siteUrl}${doc.image || (doc.images ? doc.images[0] : siteMetadata.socialBanner)}`,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Newsroom = defineDocumentType(() => ({
  name: 'Newsroom',
  filePathPattern: 'newsroom/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    images: { type: 'json' },
    image: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
    slug: { type: 'string', required: false },
    hide_table_of_contents: { type: 'boolean', required: false },
    toc_min_heading_level: { type: 'number', required: false },
    toc_max_heading_level: { type: 'number', required: false },
    cta_title: { type: 'string', required: false },
    cta_text: { type: 'string', required: false },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://signoz.io/newsroom/${doc.slug}`,
        },
        author: {
          '@type': 'Organization',
          name: 'SigNoz',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SigNoz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://signoz.io/img/SigNozLogo-orange.svg',
          },
        },
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.description,
        image: `${siteMetadata.siteUrl}${doc.image || (doc.images ? doc.images[0] : siteMetadata.socialBanner)}`,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Comparison = defineDocumentType(() => ({
  name: 'Comparison',
  filePathPattern: 'comparisons/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    images: { type: 'json' },
    image: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
    slug: { type: 'string', required: false },
    hide_table_of_contents: { type: 'boolean', required: false },
    toc_min_heading_level: { type: 'number', required: false },
    toc_max_heading_level: { type: 'number', required: false },
    cta_title: { type: 'string', required: false },
    cta_text: { type: 'string', required: false },
  },
  computedFields: {
    ...computedFields,
    relatedArticles: {
      type: 'json',
      resolve: (doc) => getRelatedArticles(doc, comparisonsRelatedArticles),
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://signoz.io/comparisons/${doc.slug}`,
        },
        author: getAuthors(doc),
        publisher: {
          '@type': 'Organization',
          name: 'SigNoz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://signoz.io/img/SigNozLogo-orange.svg',
          },
        },
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.description,
        image: `${siteMetadata.siteUrl}${doc.image || (doc.images ? doc.images[0] : siteMetadata.socialBanner)}`,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Opentelemetry = defineDocumentType(() => ({
  name: 'Opentelemetry',
  filePathPattern: 'opentelemetry/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    slug: { type: 'string', required: false },
    images: { type: 'json' },
    image: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string', default: 'OpenTelemetryLayout' },
    cta_title: { type: 'string', required: false },
    cta_text: { type: 'string', required: false },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    ...computedFields,
    relatedArticles: {
      type: 'json',
      resolve: (doc) => getRelatedArticles(doc, opentelemetryRelatedArticles),
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://signoz.io/opentelemetry/${doc.slug}`,
        },
        author: getAuthors(doc),
        publisher: {
          '@type': 'Organization',
          name: 'SigNoz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://signoz.io/img/SigNozLogo-orange.svg',
          },
        },
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.description,
        image: `${siteMetadata.siteUrl}${doc.image || (doc.images ? doc.images[0] : siteMetadata.socialBanner)}`,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: 'guides/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    description: { type: 'string' },
    slug: { type: 'string', required: true },
    images: { type: 'json' },
    image: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    ...computedFields,
    relatedArticles: {
      type: 'json',
      resolve: (doc) => getRelatedArticles(doc, guidesRelatedArticles),
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://signoz.io/guides/${doc.slug}`,
        },
        author: getAuthors(doc),
        publisher: {
          '@type': 'Organization',
          name: 'SigNoz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://signoz.io/img/SigNozLogo-orange.svg',
          },
        },
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.description,
        image: `${siteMetadata.siteUrl}${doc.image || (doc.images ? doc.images[0] : siteMetadata.socialBanner)}`,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'docs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    id: { type: 'string', required: true },
    slug: { type: 'string', required: false },
    date: { type: 'date', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    lastmod: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    description: { type: 'string', required: false },
    doc_type: { type: 'string', required: false },
    images: { type: 'json', required: false },
    image: { type: 'string', required: false },
    authors: { type: 'list', of: { type: 'string' }, required: false },
    layout: { type: 'string', required: false },
    bibliography: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
    sidebar_label: { type: 'string', required: false },
    hide_table_of_contents: { type: 'boolean', required: false },
  },
  computedFields: {
    ...computedFields,
    docTags: {
      type: 'json',
      resolve: (doc) => {
        const resolvedTags = extractPlainArrayValues<string>(doc?.tags)

        if (resolvedTags === undefined) {
          return DEFAULT_DOC_TAGS
        }

        const sanitizedTags = sanitizeDocTags(resolvedTags)

        return sanitizedTags
      },
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://signoz.io/docs/${doc.slug}`,
        },
        author: {
          '@type': 'Organization',
          name: 'SigNoz',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SigNoz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://signoz.io/img/SigNozLogo-orange.svg',
          },
        },
        headline: doc.title,
        datePublished: doc.date || 'Thu Jun 06 2025', // Setting it Jun 06, 2025 as date metadat doesn't exist for docs, TODO: add date to all exisiting doc files
        dateModified: doc.lastmod || doc.date || 'Thu Jun 06 2025',
        description: doc.description,
        image: `${siteMetadata.siteUrl}${doc.image || (doc.images ? doc.images[0] : siteMetadata.socialBanner)}`,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'constants/authors.json',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    title: { type: 'string' },
    url: { type: 'string' },
    image_url: { type: 'string' },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors, Comparison, Guide, Opentelemetry, Doc, Newsroom],
  mdx: {
    cwd: process.cwd(),
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
          content: icon,
        },
      ],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    createTagCount(allBlogs)
  },
})

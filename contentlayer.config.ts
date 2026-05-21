import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files'
import readingTime from 'reading-time'
import GithubSlugger from 'github-slugger'
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

function getImageUrl(doc) {
  const raw = doc.image || (doc.images ? doc.images[0] : siteMetadata.socialBanner)
  return raw.startsWith('http') ? raw : `${siteMetadata.siteUrl}${raw}`
}

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
        headline: doc.title,
        description: doc.description,
        image: getImageUrl(doc),
        author: {
          '@type': 'Organization',
          name: siteMetadata.title,
        },
        publisher: {
          '@type': 'Organization',
          name: siteMetadata.title,
          logo: {
            '@type': 'ImageObject',
            url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
          },
          sameAs: [
            siteMetadata.linkedin,
            siteMetadata.x,
            siteMetadata.github,
            siteMetadata.youtube,
            siteMetadata.hackernews,
          ],
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        },
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        inLanguage: siteMetadata.language,
        wordCount: doc.body.raw.split(/\s+/g).filter(Boolean).length,
        datePublished: doc.date || '2025-06-06', // Setting it Jun 06, 2025 as date metadata doesn't exist for docs, TODO: add date to all existing doc files
        dateModified: doc.lastmod || doc.date || '2025-06-06',
      }),
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Doc],
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
})

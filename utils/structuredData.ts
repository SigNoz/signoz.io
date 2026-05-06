import siteMetadata from '@/data/siteMetadata'
import { MDXContent } from './strapi'

type Author = {
  '@type': 'Person' | 'Organization'
  name: string
  url?: string
}

type ImageObject = {
  '@type': 'ImageObject'
  url: string
  width: number
  height: number
}

type StructuredData = {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting' | 'TechArticle' | 'Article'
  headline: string
  description: string
  image: ImageObject
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  url: string
  datePublished: string
  dateModified: string
  inLanguage: string
  wordCount: number
  author: Author | Author[]
  publisher: {
    '@type': 'Organization'
    name: string
    logo: ImageObject
    sameAs: string[]
  }
  articleSection?: string
}

type FAQStructuredData = {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: {
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }
  url: string
}

const getDefaultAuthor = (): Author => ({
  '@type': 'Organization',
  name: siteMetadata.title,
})

const getDefaultPublisher = (): StructuredData['publisher'] => ({
  '@type': 'Organization',
  name: siteMetadata.title,
  logo: {
    '@type': 'ImageObject',
    url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
    width: 600,
    height: 60,
  },
  sameAs: [
    siteMetadata.linkedin,
    siteMetadata.x,
    siteMetadata.github,
    siteMetadata.youtube,
    siteMetadata.hackernews,
  ],
})

const getDefaultImage = (content: MDXContent): ImageObject => {
  const raw = content.image || (content.images ? content.images[0] : siteMetadata.socialBanner)
  const url = raw.startsWith('http') ? raw : `${siteMetadata.siteUrl}${raw}`

  return {
    '@type': 'ImageObject',
    url,
    width: 1200,
    height: 630,
  }
}

const getAuthors = (content: MDXContent): Author[] => {
  if (!content.authors || !Array.isArray(content.authors)) {
    return [getDefaultAuthor()]
  }

  return content.authors.map((author) => ({
    '@type': 'Person' as const,
    name: author.name || 'SigNoz Team',
    ...(author.url && { url: author.url }),
  }))
}

const getWordCount = (content: MDXContent): number => {
  const raw = content.content || ''
  return raw.split(/\s+/g).filter(Boolean).length
}

const getArticleSection = (content: MDXContent): string | undefined => {
  if (!Array.isArray(content.tags) || content.tags.length === 0) return undefined
  const first = content.tags[0]
  return typeof first === 'string' ? first : first?.value || first?.name
}

export const generateStructuredData = (
  collectionType: string,
  content: MDXContent
): StructuredData | FAQStructuredData => {
  const baseUrl = siteMetadata.siteUrl
  const contentPath = content.path || content.slug
  const fullUrl = `${baseUrl}/${contentPath}`

  // FAQ type has a different structure
  if (collectionType === 'faqs') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: {
        '@type': 'Question',
        name: content.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: content.description || '',
        },
      },
      url: fullUrl,
    }
  }

  // Map collection types to schema types
  const schemaTypeMap: Record<string, string> = {
    blog: 'BlogPosting',
    docs: 'TechArticle',
    guides: 'BlogPosting',
    comparisons: 'BlogPosting',
    opentelemetry: 'BlogPosting',
    newsroom: 'BlogPosting',
  }

  const schemaType = (schemaTypeMap[collectionType] || 'Article') as StructuredData['@type']
  const articleSection = getArticleSection(content)

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: content.title,
    description: content.description || `Read about ${content.title}`,
    image: getDefaultImage(content),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    url: fullUrl,
    datePublished: content.publishedAt || content.createdAt,
    dateModified: content.updatedAt || content.publishedAt || content.createdAt,
    inLanguage: siteMetadata.language,
    wordCount: getWordCount(content),
    author: collectionType === 'docs' ? getDefaultAuthor() : getAuthors(content),
    publisher: getDefaultPublisher(),
    ...(articleSection ? { articleSection } : {}),
  }
}

export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

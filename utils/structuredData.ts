import siteMetadata from '@/data/siteMetadata'
import { MDXContent } from './strapi'

type Author = {
  '@type': 'Person' | 'Organization'
  name: string
}

type StructuredData = {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting' | 'TechArticle' | 'Article'
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  author: Author | Author[]
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  headline: string
  datePublished: string
  dateModified: string
  description: string
  image: string
  url: string
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
  name: 'SigNoz',
})

const getDefaultPublisher = (): StructuredData['publisher'] => ({
  '@type': 'Organization',
  name: 'SigNoz',
  logo: {
    '@type': 'ImageObject',
    url: 'https://signoz.io/img/SigNozLogo-orange.svg',
  },
})

const getDefaultImage = (content: MDXContent): string => {
  return `${siteMetadata.siteUrl}${content.image || (content.images ? content.images[0] : siteMetadata.socialBanner)}`
}

const getAuthors = (content: MDXContent): Author[] => {
  if (!content.authors || !Array.isArray(content.authors)) {
    return [getDefaultAuthor()]
  }

  return content.authors.map((author) => ({
    '@type': 'Person',
    name: author.name || 'SigNoz Team',
  }))
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

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    author: collectionType === 'docs' ? getDefaultAuthor() : getAuthors(content),
    publisher: getDefaultPublisher(),
    headline: content.title,
    datePublished: content.publishedAt || content.createdAt,
    dateModified: content.updatedAt || content.publishedAt || content.createdAt,
    description: content.description || `Read about ${content.title}`,
    image: getDefaultImage(content),
    url: fullUrl,
  }
}

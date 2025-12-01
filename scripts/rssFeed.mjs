import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'

const DEFAULT_CHANNEL_PATH = 'blog'
const DEFAULT_FEED_PATH = 'rss'

const getDefaultDate = (date) => {
  if (!date) {
    return new Date().toUTCString()
  }
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString()
}

export const normaliseSlug = (value) => {
  if (!value) return ''
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return value.replace(/^\/+/, '').replace(/\/+$/, '')
}

export const resolvePostPath = (post) => {
  const sourcePath = post._raw?.sourceFilePath ?? ''
  if (sourcePath?.includes('faqs')) console.log("logging source file path", post._raw?.sourceFilePath, sourcePath, post)
  if (sourcePath.startsWith('docs/')) return `docs/${post.slug}`
  if (sourcePath.startsWith('comparisons/')) return `comparisons/${post.slug}`
  if (sourcePath.startsWith('guides/')) return `guides/${post.slug}`
  if (sourcePath.startsWith('opentelemetry/')) return `opentelemetry/${post.slug}`
  if (sourcePath.startsWith('faqs/')) return `faqs${post.path}`

  return `/${post.slug}`
}

export const getPostLink = (config, post) => {
  if (!post) return config.siteUrl
  if (post.url && (post.url.startsWith('http://') || post.url.startsWith('https://'))) {
    return post.url
  }

  const postPath = resolvePostPath(post)
  return `${config.siteUrl}/${normaliseSlug(postPath)}`
}

export const generateRssItem = (config, post) => {
  const link = getPostLink(config, post)
  const date = getDefaultDate(post.date ?? post.publishedAt ?? post.updated_at)

  return `
  <item>
    <guid>${link}</guid>
    <title>${escape(post.title ?? '')}</title>
    <link>${link}</link>
    ${
      post.summary || post.description
        ? `<description>${escape(post.summary || post.description)}</description>`
        : ''
    }
    <pubDate>${date}</pubDate>
    ${config.email ? `<author>${config.email} (${config.author ?? ''})</author>` : ''}
    ${link?.includes('/docs/') ? 
      (post.docTags ? post.docTags.map((t) => `<category>${t}</category>`).join('') : '') 
      :Array.isArray(post.tags)
      ? post.tags.map((t) => `<category>${escape(t)}</category>`).join('')
      : ''
    }
    }
  </item>
`.trim()
}

export const generateRss = (config, posts, options = {}) => {
  if (!Array.isArray(posts) || posts.length === 0) {
    return ''
  }

  const {
    channelPath = DEFAULT_CHANNEL_PATH,
    feedPath = DEFAULT_FEED_PATH,
    title = config.title,
    description = config.description,
  } = options

  const channelLinkPath = normaliseSlug(channelPath)
  const feedLinkPath = normaliseSlug(feedPath)
  const lastBuildDate = getDefaultDate(posts[0]?.date ?? posts[0]?.publishedAt ?? posts[0]?.updated_at)

  const items = posts.map((post) => generateRssItem(config, post)).join('\n      ')

  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(title)}</title>
      <link>${config.siteUrl}/${channelLinkPath}</link>
      <description>${escape(description ?? '')}</description>
      <language>${config.language}</language>
      ${config.email ? `<managingEditor>${config.email} (${config.author ?? ''})</managingEditor>` : ''}
      ${config.email ? `<webMaster>${config.email} (${config.author ?? ''})</webMaster>` : ''}
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${feedLinkPath}" rel="self" type="application/rss+xml"/>
      ${items}
    </channel>
  </rss>
`.trim()
}

export const filterPostsByTag = (posts, tag) => {
  if (!Array.isArray(posts) || typeof tag !== 'string' || !tag.length) return []
  return posts.filter((post) =>
    Array.isArray(post.tags) ? post.tags.map((t) => slug(t)).includes(tag) : false
  )
}


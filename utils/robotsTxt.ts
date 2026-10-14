import siteMetadata from '@/data/siteMetadata'

/**
 * Content Signals (https://contentsignals.org/) declare how crawlers may use
 * the site's content once accessed. The directive belongs inside a
 * User-Agent group, so it applies to every crawler matched by `*`.
 */
export const CONTENT_SIGNAL = 'ai-train=yes, search=yes, ai-input=yes'

/**
 * Build robots.txt. Next's robots metadata type has no field for custom
 * directives like Content-Signal, so the file is served from a route handler
 * that keeps the same output the metadata route produced.
 */
export function buildRobotsTxt(isProduction: boolean): string {
  if (!isProduction) {
    return ['User-Agent: *', 'Disallow: /', ''].join('\n')
  }

  const siteUrl = siteMetadata.siteUrl

  return [
    'User-Agent: *',
    `Content-Signal: ${CONTENT_SIGNAL}`,
    'Allow: /',
    'Disallow: /resource-center',
    '',
    `Host: ${siteUrl}`,
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')
}

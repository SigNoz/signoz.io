import siteMetadata from '@/data/siteMetadata'
import {
  ALTERNATIVES_SITEMAP_ROUTES,
  CMS_SITEMAP_SECTIONS,
  CORPORATE_SITEMAP_ROUTES,
  PRODUCT_SITEMAP_ROUTES,
  routeLabel,
  routeUrl,
} from '@/utils/sitemapRoutes'
import { getLlmStarterLinks, type LlmStarterLink } from './agentDiscovery'

const link = (label: string, url: string, description?: string): string =>
  description ? `- [${label}](${url}): ${description}` : `- [${label}](${url})`

const starterLink = (item: LlmStarterLink): string =>
  link(item.label, `${siteMetadata.siteUrl}${item.route}/`, item.description)

const routeLinks = (routes: readonly string[]): string =>
  routes.map((route) => link(routeLabel(route), routeUrl(route))).join('\n')

/**
 * Entry-point map of all SigNoz content. Every page already serves its own
 * markdown (`.md` suffix / Accept negotiation), so this file lists where to
 * start — key docs plus every product, alternatives, and company page — and
 * delegates exhaustive listings to the per-section markdown sitemaps that
 * mirror the XML sitemap segments.
 */
export async function buildLlmsFullMarkdown(): Promise<string> {
  const starters = await getLlmStarterLinks()

  const documentation = [
    link(
      'Docs sitemap (markdown)',
      `${siteMetadata.siteUrl}/docs/sitemap.md`,
      'Markdown index of every SigNoz documentation page.'
    ),
    ...starters.map(starterLink),
  ].join('\n')

  const learning = [
    link(
      'Blog & content sitemap (markdown)',
      `${siteMetadata.siteUrl}/blogs/sitemap.md`,
      'Markdown index of every blog post, guide, FAQ, case study, OpenTelemetry article, and comparison.'
    ),
    ...CMS_SITEMAP_SECTIONS.map(({ section, label }) => link(label, routeUrl(section))),
  ].join('\n')

  const product = [
    link('Product pages sitemap (markdown)', `${siteMetadata.siteUrl}/products/sitemap.md`),
    routeLinks(PRODUCT_SITEMAP_ROUTES),
  ].join('\n')

  const alternatives = [
    link('Alternatives sitemap (markdown)', `${siteMetadata.siteUrl}/alternatives/sitemap.md`),
    routeLinks(ALTERNATIVES_SITEMAP_ROUTES),
  ].join('\n')

  const company = [
    link('Company pages sitemap (markdown)', `${siteMetadata.siteUrl}/corporate/sitemap.md`),
    routeLinks(CORPORATE_SITEMAP_ROUTES),
  ].join('\n')

  return [
    '# SigNoz',
    '',
    `> Entry points to all SigNoz content. Every page serves a markdown version: append \`.md\` to the page URL or request it with \`Accept: text/markdown\`. For the curated quick-start index, see ${siteMetadata.siteUrl}/llms.txt.`,
    '',
    '## Documentation',
    '',
    documentation,
    '',
    '## Blog & learning content',
    '',
    learning,
    '',
    '## Product',
    '',
    product,
    '',
    '## Alternatives & migration',
    '',
    alternatives,
    '',
    '## Company',
    '',
    company,
    '',
  ].join('\n')
}

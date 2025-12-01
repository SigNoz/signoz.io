import '../css/opentelemetry-hub.css'

import Image from 'next/image'
import Link from 'next/link'

import SectionContainer from '@/components/SectionContainer'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import ArticleMetaDetailsCard, {
  type RenderedAuthor,
} from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import ScrollToHashClient from '@/components/ScrollToHashClient'
import authorsDirectory from '@/constants/authors.json'
import OpenTelemetrySidebarClient from './open-telemetry-hub/OpenTelemetrySidebarClient'
import OpenTelemetryProgressBar from './open-telemetry-hub/OpenTelemetryProgressBar'
import OpenTelemetryTocClient from './open-telemetry-hub/OpenTelemetryTocClient'
import type { HubPathMeta, LayoutProps } from './open-telemetry-hub/types'
import { normalizeRoute } from './open-telemetry-hub/navigation'
import { ExternalLink } from 'lucide-react'

const LANGUAGES_CATEGORY_KEY = 'Language and Frameworks'
const MAIN_CONTENT_ID = 'opentelemetry-hub-main'
const MOBILE_TRIGGER_ID = 'ot-hub-mobile-trigger'
const MOBILE_OVERLAY_ID = 'ot-hub-mobile-overlay'

const orderPathMeta = (pathMeta: HubPathMeta[]) => {
  const order = ['learn', 'quick-start']
  const ordered = order
    .map((key) => pathMeta.find((p) => p.key === key))
    .filter(Boolean) as HubPathMeta[]
  const remaining = pathMeta.filter((p) => !order.includes(p.key))
  return [...ordered, ...remaining]
}

const buildRenderedAuthors = (
  authorDetails: LayoutProps['authorDetails'],
  authors: LayoutProps['authors'],
  directory: Record<string, { name?: string; url?: string; image_url?: string }>
): RenderedAuthor[] => {
  if (authorDetails && authorDetails.length > 0) {
    return authorDetails
      .map((detail, idx) => {
        const slug = authors?.[idx]
        const fallbackProfile = slug ? directory[slug] : undefined

        const name = detail.name || fallbackProfile?.name

        if (!name) return null

        return {
          name,
          url: detail.url || fallbackProfile?.url,
          image: fallbackProfile?.image_url,
        }
      })
      .filter(Boolean) as RenderedAuthor[]
  }

  if (authors && authors.length > 0) {
    return authors
      .map((slug) => {
        const profile = directory[slug]
        if (!profile?.name) return null
        return {
          name: profile.name,
          url: profile.url,
          image: profile.image_url,
        }
      })
      .filter(Boolean) as RenderedAuthor[]
  }

  return []
}

const getReadingTimeText = (content: LayoutProps['content']) => {
  if ('readingTime' in content && content.readingTime) {
    return (
      content.readingTime.text ||
      (content.readingTime.minutes ? `${Math.ceil(content.readingTime.minutes)} min read` : null)
    )
  }
  return null
}

const getFormattedDate = (content: LayoutProps['content']) => {
  const updatedDate = content.lastmod || content.date
  return updatedDate
    ? new Date(updatedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null
}

export default function OpenTelemetryHubLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  navItems,
  currentHubPath,
  pathMeta,
  defaultLanguage,
  availableLanguages,
  currentRoute,
}: LayoutProps) {
  const { title } = content
  const normalizedRoute = normalizeRoute(currentRoute || '')
  const orderedPathMeta = orderPathMeta(pathMeta)
  const showSidebar = currentHubPath !== 'quick-start' && (navItems?.length ?? 0) > 0
  const docClasses = [
    'doc overflow-clip px-3 md:px-6 lg:px-8',
    !showSidebar ? 'doc-no-sidebar' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const hasToc = Array.isArray(toc) && toc.length > 0

  const renderedAuthors = buildRenderedAuthors(
    authorDetails,
    authors,
    authorsDirectory as Record<string, { name?: string; url?: string; image_url?: string }>
  )
  const formattedUpdatedDate = getFormattedDate(content)
  const readingTimeText = getReadingTimeText(content)

  const MAX_VISIBLE_TAGS = 2
  const tagsArray = Array.isArray(content.tags) ? content.tags : []
  const primaryTags = tagsArray.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTags = tagsArray.slice(MAX_VISIBLE_TAGS)
  const hiddenTagsTitle = hiddenTags.length ? hiddenTags.join(', ') : undefined
  const hasMetaInfo =
    renderedAuthors.length > 0 ||
    Boolean(readingTimeText) ||
    Boolean(formattedUpdatedDate) ||
    primaryTags.length > 0

  const metaInfoCard = hasMetaInfo ? (
    <ArticleMetaDetailsCard
      authors={renderedAuthors}
      readingTimeText={readingTimeText}
      formattedUpdatedDate={formattedUpdatedDate}
      primaryTags={primaryTags}
      hiddenTags={hiddenTags}
      hiddenTagsTitle={hiddenTagsTitle}
    />
  ) : null

  return (
    <main id={MAIN_CONTENT_ID}>
      <ScrollToHashClient />
      <SectionContainer>
        <OpenTelemetryProgressBar targetId={MAIN_CONTENT_ID} />

        <div className="mb-4 hidden flex-wrap items-center justify-between gap-3 border-b border-signoz_ink-300 px-4 pb-3 pt-6 md:px-6 lg:flex lg:px-8">
          <div className="doc-header flex flex-wrap items-center gap-6">
            {orderedPathMeta.map((path) => {
              if (!path.firstRoute) return null
              const isActive = path.key === currentHubPath
              const isQuickStart = path.key === 'quick-start'
              const label =
                path.key === 'learn'
                  ? 'Learn OpenTelemetry'
                  : path.key === 'quick-start'
                    ? 'OpenTelemetry Quick Start'
                    : path.label
              const iconColor = isActive ? 'text-white' : 'text-gray-400'
              return (
                <Link
                  key={path.key}
                  href={path.firstRoute}
                  target={isQuickStart ? '_blank' : undefined}
                  rel={isQuickStart ? 'noopener noreferrer' : undefined}
                  className={`border-b-2 px-1 pb-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-white/60 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    {isQuickStart && <ExternalLink size={14} className={iconColor} />}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className={docClasses}>
          {showSidebar && (
            <OpenTelemetrySidebarClient
              navItems={navItems}
              normalizedRoute={normalizedRoute}
              availableLanguages={availableLanguages}
              defaultLanguage={defaultLanguage}
              languagesCategoryKey={LANGUAGES_CATEGORY_KEY}
              showSidebar={showSidebar}
              mobileTriggerId={MOBILE_TRIGGER_ID}
              mobileOverlayId={MOBILE_OVERLAY_ID}
            />
          )}

          <div className="doc-content md:px-0 lg:px-4">
            {(showSidebar || hasToc) && <div id={MOBILE_TRIGGER_ID} className="mb-4 lg:hidden" />}

            <article className="prose prose-slate max-w-none px-3 py-6 dark:prose-invert">
              <h1 className="text-3xl font-bold">{title}</h1>
              {(formattedUpdatedDate || readingTimeText) && (
                <div className="mb-2 mt-3 flex flex-wrap gap-3 text-xs text-gray-400 lg:hidden">
                  {formattedUpdatedDate && <span>Updated {formattedUpdatedDate}</span>}
                  {readingTimeText && <span>{readingTimeText}</span>}
                </div>
              )}
              {children}
            </article>

            {(renderedAuthors.length > 0 || primaryTags.length > 0) && (
              <div className="lg:hidden">
                <div className="rounded-xl border border-signoz_ink-300/80 bg-signoz_ink-500/50 p-4 text-xs text-white/90 shadow-lg">
                  <div className="flex flex-col gap-4">
                    {renderedAuthors.length > 0 && (
                      <div className="flex items-center gap-3">
                        {renderedAuthors[0].image && (
                          <Image
                            src={renderedAuthors[0].image}
                            alt={renderedAuthors[0].name}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full border border-white/10 object-cover"
                          />
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                            Author{renderedAuthors.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-sm text-white">
                            {renderedAuthors.map((author, idx) => (
                              <span key={`${author.name}-${idx}`}>
                                {author.url ? (
                                  <Link
                                    href={author.url}
                                    className="!text-gray-200 transition-colors hover:text-signoz_robin-400"
                                  >
                                    {author.name}
                                  </Link>
                                ) : (
                                  author.name
                                )}
                                {idx < renderedAuthors.length - 1 && (
                                  <span className="text-white/60">, </span>
                                )}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    )}

                    {primaryTags.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                          Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {primaryTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                          {hiddenTags.length > 0 && (
                            <span
                              className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                              title={hiddenTagsTitle}
                            >
                              +{hiddenTags.length} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {(hasMetaInfo || hasToc) && (
            <aside className="doc-right hidden lg:block" aria-label="On this page navigation">
              <div className="doc-right-inner">
                {metaInfoCard}
                {hasToc && <OpenTelemetryTocClient toc={toc} />}
              </div>
            </aside>
          )}
        </div>

        {showSidebar && <div id={MOBILE_OVERLAY_ID} />}

        {hasToc && (
          <div className="lg:hidden">
            <FloatingTableOfContents />
          </div>
        )}
      </SectionContainer>
    </main>
  )
}

import React from 'react'
import articleSeriesJson from '@/constants/articleSeries.json'
import type { SeriesData, ArticleDetail } from '../../../../types/series'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, List, CheckCircle, BookOpen, Target } from 'lucide-react'

// Map series keys to clean URL slugs
const SERIES_SLUG_MAP: Record<string, string> = {
  'opentelemetry-nextjs': 'nextjs',
  // Add more series mappings here as needed
  // 'opentelemetry-python': 'python',
  // 'opentelemetry-go': 'go-series', // avoid conflict with existing /go route
}

// Reverse mapping for lookup
const SLUG_TO_SERIES_MAP = Object.fromEntries(
  Object.entries(SERIES_SLUG_MAP).map(([key, value]) => [value, key])
)

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  // Only generate params for series that have clean URL mappings
  return Object.values(SERIES_SLUG_MAP).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seriesKey = SLUG_TO_SERIES_MAP[params.slug]
  const seriesData = seriesKey
    ? articleSeriesJson[seriesKey as keyof typeof articleSeriesJson]
    : null

  if (!seriesData) return { title: 'Series Not Found' }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://signoz.io'
  const fullSeriesUrl = `${siteUrl}/opentelemetry/series/${params.slug}`
  const imageUrl = seriesData.heroImageUrl
    ? seriesData.heroImageUrl.startsWith('http')
      ? seriesData.heroImageUrl
      : `${siteUrl}${seriesData.heroImageUrl}`
    : `${siteUrl}/img/blog/common/signoz-cover.webp`

  return {
    title: `${seriesData.name} - Complete Tutorial Series`,
    description: seriesData.description,
    keywords: seriesData.keywords?.join(', '),
    alternates: {
      canonical: fullSeriesUrl,
    },
    openGraph: {
      title: `${seriesData.name} - Complete Tutorial Series`,
      description: seriesData.description,
      url: fullSeriesUrl,
      siteName: 'SigNoz',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${seriesData.name} Tutorial Series`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seriesData.name} - Complete Tutorial Series`,
      description: seriesData.description,
      images: [imageUrl],
    },
  }
}

function SeriesJsonLd({ seriesData, slug }: { seriesData: SeriesData; slug: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://signoz.io'
  const fullSeriesUrl = `${siteUrl}/opentelemetry/series/${slug}`
  const imageUrl = seriesData.heroImageUrl
    ? seriesData.heroImageUrl.startsWith('http')
      ? seriesData.heroImageUrl
      : `${siteUrl}${seriesData.heroImageUrl}`
    : `${siteUrl}/img/blog/common/signoz-cover.webp`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${seriesData.name} - Complete Tutorial Series`,
    description: seriesData.description,
    url: fullSeriesUrl,
    image: imageUrl,
    keywords: seriesData.keywords?.join(', '),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: seriesData.articles.map((article: ArticleDetail, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TechArticle',
          name: article.title,
          description: article.description,
          url: `${siteUrl}${article.href}`,
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function OpenTelemetrySeriesPage({ params }: Props) {
  const seriesKey = SLUG_TO_SERIES_MAP[params.slug]
  const seriesData: SeriesData | undefined = seriesKey
    ? articleSeriesJson[seriesKey as keyof typeof articleSeriesJson]
    : undefined

  if (!seriesData) {
    notFound()
  }

  // Calculate total learning outcomes
  const totalLearningOutcomes = seriesData.articles.reduce(
    (total, article) => total + (article.learningOutcomes?.length || 0),
    0
  )

  return (
    <>
      <SeriesJsonLd seriesData={seriesData} slug={params.slug} />
      <main className="min-h-screen bg-signoz_ink-500">
        {/* Background Pattern */}
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />

        {/* Gradient Overlay */}
        <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(78,116,248,0.3)] to-[rgba(78,116,248,0)] bg-[length:110%] bg-no-repeat opacity-40 blur-[300px] sm:h-[450px] sm:bg-[center_-500px] md:h-[956px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          {/* Single Column Layout */}
          <div className="space-y-12">
            {/* Title and Subtitle */}
            <header className="text-center">
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-signoz_robin-500/10 px-3 py-1 text-sm font-medium text-signoz_robin-400 ring-1 ring-inset ring-signoz_robin-500/20">
                  Article Series
                </span>
              </div>

              <h1 className="mb-6 bg-gradient-to-r from-signoz_vanilla-100 to-signoz_vanilla-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                {seriesData.name}
              </h1>

              <p className="mx-auto max-w-3xl text-xl leading-8 text-signoz_vanilla-400 lg:text-2xl">
                {seriesData.description}
              </p>

              {/* Series Stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-signoz_vanilla-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-signoz_robin-400" />
                  <span>{seriesData.articles.length} Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-signoz_robin-400" />
                  <span>{totalLearningOutcomes} Learning Outcomes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-signoz_robin-400" />
                  <span>Beginner to Advanced</span>
                </div>
              </div>
            </header>

            {/* Hero Image */}
            {seriesData.heroImageUrl && (
              <div className="overflow-hidden rounded-xl border border-signoz_slate-400/20 bg-signoz_ink-400/50 p-2 backdrop-blur-sm">
                <Image
                  src={seriesData.heroImageUrl}
                  alt={`${seriesData.name} Hero Image`}
                  width={800}
                  height={450}
                  className="h-full w-full rounded-lg object-cover"
                  priority
                />
              </div>
            )}

            {/* Articles List */}
            <div className="rounded-xl border border-signoz_slate-400/20 bg-signoz_ink-400/30 p-6 backdrop-blur-sm">
              <div className="mb-6">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-signoz_robin-500/10">
                    <List className="h-4 w-4 text-signoz_robin-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold leading-tight text-signoz_vanilla-100">
                      Articles in this Series
                    </h2>
                    <p className="mt-1 text-sm text-signoz_vanilla-400">
                      {seriesData.articles.length} articles • Start with Part 1 and progress
                      sequentially
                    </p>
                  </div>
                </div>
              </div>

              <nav className="space-y-2">
                {seriesData.articles.map((article, index) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group block rounded-lg border border-signoz_slate-400/10 p-4 transition-all duration-200 hover:border-signoz_slate-400/30 hover:bg-signoz_ink-400/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-signoz_robin-500/20 text-sm font-semibold text-signoz_robin-400 group-hover:bg-signoz_robin-500/30">
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1">
                          <span className="text-xs font-medium text-signoz_vanilla-400">
                            Part {index + 1}
                          </span>
                        </div>

                        <h3 className="line-clamp-2 text-sm font-medium leading-5 text-signoz_vanilla-200 group-hover:text-signoz_vanilla-100">
                          {article.title}
                        </h3>

                        {article.description && (
                          <p className="mt-2 line-clamp-2 text-xs leading-4 text-signoz_vanilla-400">
                            {article.description}
                          </p>
                        )}

                        {article.learningOutcomes && article.learningOutcomes.length > 0 && (
                          <div className="mt-2 text-xs text-signoz_robin-400">
                            {article.learningOutcomes.length} learning outcomes
                          </div>
                        )}
                      </div>

                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-signoz_slate-50 transition-all duration-200 group-hover:translate-x-1 group-hover:text-signoz_robin-400" />
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Long Description */}
            {seriesData.longDescription && (
              <div className="rounded-xl border border-signoz_slate-400/20 bg-signoz_ink-400/30 p-8 backdrop-blur-sm">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-signoz_vanilla-100 prose-p:text-signoz_vanilla-300 prose-a:text-signoz_robin-400 prose-a:no-underline hover:prose-a:text-signoz_robin-300 prose-strong:text-signoz_vanilla-200"
                  dangerouslySetInnerHTML={{ __html: seriesData.longDescription }}
                />
              </div>
            )}

            {/* What You'll Learn Section */}
            <div className="rounded-xl border border-signoz_slate-400/20 bg-signoz_ink-400/30 p-8 backdrop-blur-sm">
              <div className="mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-signoz_robin-500/10">
                    <Target className="h-4 w-4 text-signoz_robin-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-signoz_vanilla-100">
                      What You'll Learn
                    </h2>
                    <p className="mt-2 text-signoz_vanilla-400">
                      Master OpenTelemetry observability in Next.js with these comprehensive
                      learning outcomes
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {seriesData.articles.map((article, index) => (
                  <div key={article.href} className="border-l-2 border-signoz_robin-500/20 pl-6">
                    <div className="mb-4">
                      <span className="text-xs font-medium text-signoz_robin-400">
                        Part {index + 1}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-signoz_vanilla-100">
                        {article.title}
                      </h3>
                    </div>

                    {article.learningOutcomes && article.learningOutcomes.length > 0 && (
                      <div className="grid gap-2">
                        {article.learningOutcomes.map((outcome, outcomeIndex) => (
                          <div key={outcomeIndex} className="flex items-start gap-3">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-signoz_robin-400" />
                            <span className="text-sm text-signoz_vanilla-300">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="mb-6">
                <h2 className="mb-3 text-2xl font-bold text-signoz_vanilla-100">
                  Ready to Start Learning?
                </h2>
                <p className="text-signoz_vanilla-400">
                  Begin your journey to mastering OpenTelemetry observability in Next.js
                  applications
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href={seriesData.articles[0]?.href}
                  className="group inline-flex items-center justify-center rounded-lg bg-signoz_robin-500 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-signoz_robin-600 hover:shadow-lg hover:shadow-signoz_robin-500/25 focus:outline-none focus:ring-2 focus:ring-signoz_robin-500 focus:ring-offset-2 focus:ring-offset-signoz_ink-500"
                >
                  Start with Part 1
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="https://signoz.io/teams/"
                  className="inline-flex items-center justify-center rounded-lg border border-signoz_slate-400/30 bg-signoz_ink-400/50 px-8 py-4 text-base font-semibold text-signoz_vanilla-200 transition-all duration-200 hover:bg-signoz_ink-400/70 hover:text-signoz_vanilla-100 focus:outline-none focus:ring-2 focus:ring-signoz_slate-400 focus:ring-offset-2 focus:ring-offset-signoz_ink-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started with SigNoz - Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

'use client'

import { type ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import SectionContainer from '@/components/SectionContainer'
import ScrollToHashClient from '@/components/ScrollToHashClient'
import OpenTelemetrySidebarClient from '@/layouts/open-telemetry-hub/OpenTelemetrySidebarClient'
import OpenTelemetryProgressBar from '@/layouts/open-telemetry-hub/OpenTelemetryProgressBar'
import type { HubPathMeta } from '@/layouts/open-telemetry-hub/types'
import { getHubContextForRoute, resolveHubRoute } from '@/utils/opentelemetryHub'
import { RegionProvider } from '@/components/Region/RegionContext'

const LANGUAGES_CATEGORY_KEY = 'Language and Frameworks'
const MAIN_CONTENT_ID = 'opentelemetry-hub-main'
const MOBILE_OVERLAY_ID = 'ot-hub-mobile-overlay'
const MOBILE_TRIGGER_ID = 'ot-hub-mobile-trigger'

const PATH_META_ORDER = ['learn', 'quick-start']

function orderPathMeta(pathMeta: HubPathMeta[]) {
  const ordered = PATH_META_ORDER.map((key) => pathMeta.find((p) => p.key === key)).filter(
    Boolean
  ) as HubPathMeta[]
  const remaining = pathMeta.filter((p) => !PATH_META_ORDER.includes(p.key))
  return [...ordered, ...remaining]
}

export default function OpenTelemetryHubShellClient({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hubContext = useMemo(() => getHubContextForRoute(pathname), [pathname])

  if (!hubContext) {
    return <RegionProvider>{children}</RegionProvider>
  }

  const { pathKey, items, languages, defaultLanguage, firstRouteByPath } = hubContext
  const normalizedRoute = resolveHubRoute(pathname)
  const showSidebar = pathKey !== 'quick-start' && items.length > 0
  const orderedPathMeta = orderPathMeta(firstRouteByPath)
  const docClasses = [
    'box-border mx-auto flex h-full w-full min-w-0 max-w-ot-hub items-start gap-4 overflow-clip px-3 md:px-6 lg:px-8 max-lg:flex-col max-lg:gap-3',
    !showSidebar ? 'justify-center' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <RegionProvider>
      <main id={MAIN_CONTENT_ID} className="w-full min-w-0">
        <ScrollToHashClient />
        <SectionContainer>
          <OpenTelemetryProgressBar targetId={MAIN_CONTENT_ID} />

          <div className="mb-4 hidden flex-wrap items-center justify-between gap-3 border-b border-signoz_ink-300 px-4 pb-3 pt-6 md:px-6 lg:flex lg:px-8">
            <div className="mx-auto box-border flex w-full max-w-ot-hub flex-wrap items-center gap-6 px-12">
              {orderedPathMeta.map((path) => {
                if (!path.firstRoute) return null
                const isActive = path.key === pathKey
                const isQuickStart = path.key === 'quick-start'
                const label =
                  path.key === 'learn'
                    ? 'Learn OpenTelemetry'
                    : path.key === 'quick-start'
                      ? 'OpenTelemetry Quick Start'
                      : path.label
                const iconColor = isActive ? 'text-white' : 'text-gray-400'
                const linkClassName = `border-b-2 px-1 pb-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-white/60 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`
                return isQuickStart ? (
                  <TrackingLink
                    key={path.key}
                    href={path.firstRoute}
                    target="_blank"
                    className={linkClassName}
                    clickType="Nav Click"
                    clickName="OpenTelemetry Hub Quick Start Link"
                    clickLocation="OpenTelemetry Hub Header"
                    clickText={label}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      <ExternalLink size={14} className={iconColor} />
                    </span>
                  </TrackingLink>
                ) : (
                  <Link
                    key={path.key}
                    href={path.firstRoute}
                    prefetch={false}
                    className={linkClassName}
                  >
                    <span className="flex items-center gap-1">{label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className={docClasses}>
            {showSidebar && (
              <OpenTelemetrySidebarClient
                navItems={items}
                normalizedRoute={normalizedRoute}
                availableLanguages={languages}
                defaultLanguage={defaultLanguage}
                languagesCategoryKey={LANGUAGES_CATEGORY_KEY}
                showSidebar={showSidebar}
                mobileTriggerId={MOBILE_TRIGGER_ID}
                mobileOverlayId={MOBILE_OVERLAY_ID}
              />
            )}
            {children}
          </div>

          {showSidebar && <div id={MOBILE_OVERLAY_ID} />}
        </SectionContainer>
      </main>
    </RegionProvider>
  )
}

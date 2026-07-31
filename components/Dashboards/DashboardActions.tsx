'use client'

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Check, Copy, Download, TriangleAlert } from 'lucide-react'
import Button from '../ui/Button'

export const V2_MIN_SIGNOZ_VERSION = 'v0.135.0'
const DASHBOARDS_V2_DOC_URL = 'https://signoz.io/docs/dashboards/dashboards-v2-api/'
const UPGRADE_GUIDE_URL = 'https://signoz.io/docs/operate/migration/upgrade-0-135/'
const IMPORT_DOC_URL = 'https://signoz.io/docs/dashboards/import-dashboard/'

export type DashboardSchemaVersion = 'v2' | 'v1'

type PendingAction = 'download' | 'copy' | null

export interface DashboardActionsProps {
  /** V2 (Perses) dashboard JSON. The default and recommended version. */
  dashboardJsonV2Url?: string
  /**
   * Legacy V1 dashboard JSON. Omit when the dashboard has no V1 file — the
   * version switch is then hidden and only V2 is offered.
   */
  dashboardJsonV1Url?: string
  /**
   * Legacy alias for `dashboardJsonV2Url`, kept so docs written before the V2
   * rollout keep rendering.
   *
   * @deprecated Use `dashboardJsonV2Url`.
   */
  dashboardJsonUrl?: string
  dashboardName?: string
  className?: string
}

const VERSION_LABELS: Record<DashboardSchemaVersion, string> = {
  v2: 'V2',
  v1: 'V1 (legacy)',
}

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Falls back to the JSON file name when a doc does not pass `dashboardName`. */
const getFileNameBase = (dashboardName: string, url: string): string => {
  const fromName = slugify(dashboardName)
  if (fromName) return fromName

  const fileName = url.split('?')[0].split('/').pop() || ''
  return slugify(fileName.replace(/\.json$/i, '')) || 'signoz-dashboard'
}

const CARD_CLASS = [
  'not-prose my-6 w-full rounded-[6px] border text-left',
  'border-[var(--l1-border)] bg-[var(--card,var(--l2-background))]',
].join(' ')

const TAB_CLASS = [
  'rounded-[4px] px-2.5 py-1 text-xs font-medium leading-5 transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]',
].join(' ')

// `not-prose` drops the docs anchor styling, so links carry it themselves.
const LINK_CLASS = 'text-[var(--accent-primary)] underline underline-offset-2'

const V1_NOTICE_CLASS = [
  'mb-4 flex gap-2 rounded-[4px] p-3 text-sm leading-6 text-[var(--l2-foreground)]',
  'border border-[color-mix(in_srgb,var(--accent-amber)_35%,transparent)]',
  'bg-[color-mix(in_srgb,var(--accent-amber)_8%,transparent)]',
].join(' ')

const DashboardActions: React.FC<DashboardActionsProps> = ({
  dashboardJsonV2Url,
  dashboardJsonV1Url,
  dashboardJsonUrl,
  dashboardName = '',
  className = '',
}) => {
  const v2Url = dashboardJsonV2Url || dashboardJsonUrl || ''
  const v1Url = dashboardJsonV1Url || ''

  const versions = useMemo<DashboardSchemaVersion[]>(
    () => [...(v2Url ? (['v2'] as const) : []), ...(v1Url ? (['v1'] as const) : [])],
    [v2Url, v1Url]
  )

  const [activeVersion, setActiveVersion] = useState<DashboardSchemaVersion>(v2Url ? 'v2' : 'v1')
  const [pending, setPending] = useState<PendingAction>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Copying after downloading the same version should not refetch.
  const jsonCache = useRef(new Map<string, string>())

  const isV1 = activeVersion === 'v1'
  const activeUrl = isV1 ? v1Url : v2Url
  const shortLabel = activeVersion.toUpperCase()

  const fetchJson = useCallback(async (url: string): Promise<string> => {
    const cached = jsonCache.current.get(url)
    if (cached) return cached

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard JSON: ${response.status}`)
    }

    const formatted = JSON.stringify(await response.json(), null, 2)
    jsonCache.current.set(url, formatted)
    return formatted
  }, [])

  const selectVersion = (version: DashboardSchemaVersion) => {
    setActiveVersion(version)
    setCopied(false)
    setError(null)
  }

  const handleDownload = async () => {
    setPending('download')
    setError(null)
    try {
      const json = await fetchJson(activeUrl)
      const objectUrl = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = `${getFileNameBase(dashboardName, activeUrl)}-${activeVersion}.json`
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      URL.revokeObjectURL(objectUrl)
    } catch (downloadError) {
      console.error('Error downloading dashboard:', downloadError)
      setError('Could not download the dashboard JSON.')
    } finally {
      setPending(null)
    }
  }

  const handleCopy = async () => {
    setPending('copy')
    setError(null)
    try {
      await navigator.clipboard.writeText(await fetchJson(activeUrl))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (copyError) {
      console.error('Error copying dashboard:', copyError)
      setError('Could not copy the dashboard JSON.')
    } finally {
      setPending(null)
    }
  }

  if (!activeUrl) return null

  return (
    <div className={`${CARD_CLASS} ${className}`.trim()}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--l1-border)] px-4 py-3">
        <span className="text-sm font-medium text-[var(--l1-foreground)]">Dashboard JSON</span>

        {versions.length > 1 && (
          <div
            role="tablist"
            aria-label="Dashboard JSON schema version"
            className="flex items-center gap-1 rounded-[6px] bg-[var(--l3-background)] p-1"
          >
            {versions.map((version) => {
              const selected = version === activeVersion
              return (
                <button
                  key={version}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectVersion(version)}
                  className={[
                    TAB_CLASS,
                    selected
                      ? 'bg-[var(--card,var(--l2-background))] text-[var(--l1-foreground)] shadow-sm'
                      : 'text-[var(--l3-foreground)] hover:text-[var(--l1-foreground)]',
                  ].join(' ')}
                >
                  {VERSION_LABELS[version]}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="px-4 py-4">
        {isV1 ? (
          <p className={V1_NOTICE_CLASS}>
            <TriangleAlert
              aria-hidden
              className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-amber)]"
            />
            <span>
              <strong className="font-semibold text-[var(--l1-foreground)]">Deprecated.</strong> Use
              V1 only on SigNoz older than {V2_MIN_SIGNOZ_VERSION}. From {V2_MIN_SIGNOZ_VERSION}{' '}
              onwards, import the V2 JSON — V1 imports still work through a temporary compatibility
              path that will be removed. See the{' '}
              <a className={LINK_CLASS} href={UPGRADE_GUIDE_URL}>
                {V2_MIN_SIGNOZ_VERSION} upgrade guide
              </a>
              .
            </span>
          </p>
        ) : (
          <p className="mb-4 text-sm leading-6 text-[var(--l2-foreground)]">
            Recommended. Uses the{' '}
            <a className={LINK_CLASS} href={DASHBOARDS_V2_DOC_URL}>
              V2 dashboard schema
            </a>{' '}
            and needs SigNoz {V2_MIN_SIGNOZ_VERSION} or newer.
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button
            // The deprecated version should not carry the primary CTA weight.
            variant={isV1 ? 'secondary' : 'default'}
            rounded="default"
            isButton={true}
            onClick={handleDownload}
            disabled={pending !== null}
          >
            <Download aria-hidden className="mr-1.5 h-3.5 w-3.5" />
            {pending === 'download' ? 'Downloading...' : `Download ${shortLabel} JSON`}
          </Button>

          <Button
            variant="tertiary"
            rounded="default"
            isButton={true}
            onClick={handleCopy}
            disabled={pending !== null}
          >
            {copied ? (
              <>
                <Check aria-hidden className="mr-1.5 h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy aria-hidden className="mr-1.5 h-3.5 w-3.5" />
                {pending === 'copy' ? 'Copying...' : `Copy ${shortLabel} JSON`}
              </>
            )}
          </Button>
        </div>

        <p aria-live="polite" className="sr-only">
          {copied ? `${shortLabel} dashboard JSON copied` : ''}
        </p>

        {error && (
          <p className="mt-3 text-sm leading-6 text-[var(--accent-cherry)]">
            {error}{' '}
            <a className="underline underline-offset-2" href={activeUrl}>
              Open the raw JSON
            </a>{' '}
            instead.
          </p>
        )}

        <p className="mt-4 text-xs leading-5 text-[var(--l3-foreground)]">
          Import it in SigNoz with <strong>Dashboards → + New dashboard → Import JSON</strong>.{' '}
          <a className={LINK_CLASS} href={IMPORT_DOC_URL}>
            Import guide
          </a>
        </p>
      </div>
    </div>
  )
}

export default DashboardActions

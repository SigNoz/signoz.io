'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { registerHeadlessComponents } from '@probo/cookie-banner/headless'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getProboSettings, PROBO_PROXY_PATH } from '@/utils/consent/provider'
import { discardExpiredProboVisitor } from '@/utils/consent/providers/probo'

type BannerState = 'loading' | 'banner' | 'panel' | 'privacy_choices' | 'hidden'

type ProboConfig = {
  texts: Record<string, string>
  cookie_policy_url: string
  categories: { name: string; kind: string }[]
  layout?: { presentation?: string }
}

type ProboRoot = HTMLElement & {
  setState: (state: BannerState) => void
  client: { hasConsent: boolean }
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), summary'

// Stamped by Probo once per category and once per cookie, so it is plain HTML.
const CATEGORY_TEMPLATE = `
<div class="border-t border-[var(--l2-border)] py-4">
  <div class="flex items-start justify-between gap-4">
    <div class="min-w-0">
      <p data-slot="name" class="text-sm font-medium text-[var(--l1-foreground)]"></p>
      <p data-slot="description" class="mt-1 text-[13px] leading-[1.55] text-[var(--l2-foreground)]"></p>
    </div>
    <probo-category-toggle class="mt-0.5 shrink-0">
      <input type="checkbox" class="h-4 w-4 cursor-pointer accent-[var(--primary-background)] disabled:cursor-not-allowed disabled:opacity-60" />
    </probo-category-toggle>
  </div>
  <details data-action="toggle-cookies" class="mt-2 text-[13px]">
    <summary class="cursor-pointer text-[var(--l2-foreground)] hover:text-[var(--l1-foreground)]">Cookies and storage</summary>
    <probo-cookie-list class="mt-2 block space-y-2 [&>probo-cookie]:block">
      <template>
        <div class="rounded border border-[var(--l2-border)] px-3 py-2">
          <div class="flex flex-wrap items-baseline justify-between gap-x-3">
            <code data-slot="name" class="break-all text-[12px] text-[var(--l1-foreground)]"></code>
            <span class="text-[12px] text-[var(--l2-foreground)]"><span data-slot="type"></span> · <span data-slot="duration"></span></span>
          </div>
          <p data-slot="description" class="mt-1 text-[12px] leading-[1.5] text-[var(--l2-foreground)]"></p>
        </div>
      </template>
    </probo-cookie-list>
  </details>
</div>`

const withPlaceholder = (text: string, placeholder: string, node: ReactNode) => {
  const token = `{{${placeholder}}}`
  if (!text.includes(token)) return text
  const [before, after] = text.split(token)
  return (
    <>
      {before}
      {node}
      {after}
    </>
  )
}

const ACTION_WRAPPER = 'contents [&[hidden]]:hidden'

export default function ProboBanner() {
  const { bannerId, apiUrl } = getProboSettings()
  const rootRef = useRef<ProboRoot>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [config, setConfig] = useState<ProboConfig | null>(null)
  const [state, setState] = useState<BannerState>('loading')

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onReady = (event: Event) => {
      const next = (event as CustomEvent<{ config: ProboConfig }>).detail.config
      if (next.layout?.presentation !== 'OPT_IN') {
        console.error(
          `[consent] Probo returned a ${next.layout?.presentation} banner; only opt-in is supported`
        )
      }
      setConfig(next)
    }
    const onState = (event: Event) => {
      const { state: next, prev } = (
        event as CustomEvent<{ state: BannerState; prev: BannerState }>
      ).detail
      if (next === 'panel') returnFocusRef.current = document.activeElement as HTMLElement | null
      if (prev === 'panel' && next === 'hidden') returnFocusRef.current?.focus()
      setState(next)
    }

    root.addEventListener('probo-ready', onReady)
    root.addEventListener('probo-state', onState)
    discardExpiredProboVisitor()
    registerHeadlessComponents()

    return () => {
      root.removeEventListener('probo-ready', onReady)
      root.removeEventListener('probo-state', onState)
    }
  }, [])

  useEffect(() => {
    if (state !== 'panel' || !config) return
    const { style } = document.documentElement
    const previous = style.overflow
    style.overflow = 'hidden'
    return () => {
      style.overflow = previous
    }
  }, [state, config])

  if (!bannerId || !apiUrl) return null

  const texts = config?.texts ?? {}
  const necessaryName = config?.categories.find((category) => category.kind === 'NECESSARY')?.name

  const closePanel = () => {
    const root = rootRef.current
    if (!root) return
    let decided = false
    try {
      decided = root.client.hasConsent
    } catch {
      // not loaded
    }
    root.setState(decided ? 'hidden' : 'banner')
  }

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closePanel()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter((element) => element.getClientRects().length > 0)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <probo-cookie-banner-root
      ref={rootRef}
      banner-id={bannerId}
      base-url={`${window.location.origin}${PROBO_PROXY_PATH}`}
      lang="en"
    >
      {/* Without a config (wrong origin, Probo unreachable) there is nothing to show or choose. */}
      {config ? (
        <>
          <probo-banner>
            <div
              role="dialog"
              aria-modal="false"
              aria-labelledby="site-prefs-title"
              aria-describedby="site-prefs-description"
              className="fixed bottom-4 left-4 right-4 z-[2147483000] rounded-md border border-[var(--l2-border)] bg-[var(--popover)] p-5 shadow-[0_12px_32px_color-mix(in_srgb,var(--bg-base-black)_45%,transparent)] sm:right-auto sm:w-[440px]"
            >
              <h2
                id="site-prefs-title"
                className="text-[15px] font-medium text-[var(--l1-foreground)]"
              >
                {texts.banner_title}
              </h2>
              <p
                id="site-prefs-description"
                className="mt-2 text-[13px] leading-[1.55] text-[var(--l2-foreground)]"
              >
                {withPlaceholder(
                  texts.banner_description ?? '',
                  'cookie_policy_link',
                  <a className="content-link" href={config?.cookie_policy_url}>
                    {texts.cookie_policy_link_text}
                  </a>
                )}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <probo-accept-button className={ACTION_WRAPPER}>
                  <Button size="sm">{texts.button_accept_all}</Button>
                </probo-accept-button>
                <probo-reject-button className={ACTION_WRAPPER}>
                  <Button size="sm" variant="secondary">
                    {texts.button_reject_all}
                  </Button>
                </probo-reject-button>
                <probo-customize-button className={ACTION_WRAPPER}>
                  <Button size="sm" variant="secondary">
                    {texts.button_customize}
                  </Button>
                </probo-customize-button>
              </div>
            </div>
          </probo-banner>

          <probo-preference-panel>
            <div className="fixed inset-0 z-[2147483001] flex items-end justify-center bg-black/60 sm:items-center sm:p-4">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="site-prefs-panel-title"
                onKeyDown={onPanelKeyDown}
                className="flex max-h-[100dvh] w-full flex-col border border-[var(--l2-border)] bg-[var(--popover)] shadow-[0_12px_32px_color-mix(in_srgb,var(--bg-base-black)_45%,transparent)] sm:max-h-[85vh] sm:max-w-[560px] sm:rounded-md"
              >
                <div className="flex items-center justify-between gap-4 border-b border-[var(--l2-border)] px-5 py-4">
                  <h2
                    id="site-prefs-panel-title"
                    className="text-[15px] font-medium text-[var(--l1-foreground)]"
                  >
                    {texts.panel_title}
                  </h2>
                  <button
                    type="button"
                    aria-label={texts.aria_close}
                    onClick={closePanel}
                    className="rounded p-1 text-[var(--l2-foreground)] hover:text-[var(--l1-foreground)]"
                  >
                    <X size={16} aria-hidden />
                  </button>
                </div>
                <div className="overflow-y-auto px-5 pt-4">
                  <p className="text-[13px] leading-[1.55] text-[var(--l2-foreground)]">
                    {withPlaceholder(
                      texts.panel_description ?? '',
                      'necessary_category',
                      necessaryName
                    )}
                  </p>
                  <probo-category-list className="mt-4 block [&>probo-category]:block">
                    <template dangerouslySetInnerHTML={{ __html: CATEGORY_TEMPLATE }} />
                  </probo-category-list>
                </div>
                <div className="flex flex-col-reverse gap-2 border-t border-[var(--l2-border)] px-5 py-4 sm:flex-row sm:justify-end">
                  <probo-reject-button className={ACTION_WRAPPER}>
                    <Button size="sm" variant="secondary">
                      {texts.button_reject_all}
                    </Button>
                  </probo-reject-button>
                  <probo-save-button className={ACTION_WRAPPER}>
                    <Button size="sm" variant="secondary">
                      {texts.button_save}
                    </Button>
                  </probo-save-button>
                  <probo-accept-button className={ACTION_WRAPPER}>
                    <Button size="sm">{texts.button_accept_all}</Button>
                  </probo-accept-button>
                </div>
              </div>
            </div>
          </probo-preference-panel>
        </>
      ) : null}
    </probo-cookie-banner-root>
  )
}

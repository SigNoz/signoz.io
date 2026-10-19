'use client'

import React, { Children } from 'react'
import CodeBlock from '@/components/CodeBlock'
import { getTextContent } from '@/components/CodeBlock/utils'
import { useRegion } from './RegionContext'
import { processCodeChildren, type Replacement } from './regionCodeSubstitution'

// CodeBlock copy control uses this aria-label.
const COPY_BUTTON_SELECTOR = '[aria-label="Copy code"]'

// Use Element (not HTMLElement): the button's icon is an <svg>/<path>, which are
// SVGElement, so an HTMLElement check would miss hovers/clicks on the icon itself.
const isCopyButtonTarget = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest(COPY_BUTTON_SELECTOR)

export const RegionAwarePre = (props: any) => {
  const { region, notifyRegionCopy, isOnboarding } = useRegion()

  const replacements = React.useMemo(() => {
    const list: Replacement[] = []
    if (region && region !== 'none') {
      list.push({ search: '<region>', replace: region })
    }
    return list
  }, [region])

  // Only blocks that originally carry a `<region>` placeholder are region-aware.
  // Use the combined text content (not per-node): syntax highlighting tokenizes
  // `<region>` across separate spans, so a per-node check would miss it — the same
  // reason processCodeChildren falls back to combined text for substitution.
  //
  // Do not memoize on props.children identity alone: inside Tabs, MDX children often
  // arrive as fulfilled React.lazy payloads whose `_payload.status` flips without the
  // lazy element reference changing — memoization would keep a stale false forever.
  const isRegionAware = getTextContent(props.children).includes('<region>')

  const modifiedChildren =
    replacements.length === 0 ? props.children : processCodeChildren(props.children, replacements)

  const renderedChildren = Array.isArray(modifiedChildren)
    ? Children.toArray(modifiedChildren)
    : modifiedChildren

  const [hintVisible, setHintVisible] = React.useState(false)

  if (!isRegionAware || isOnboarding) {
    return <CodeBlock {...props}>{renderedChildren}</CodeBlock>
  }

  // What the copy button actually puts on the clipboard (region already substituted).
  const copiedText = getTextContent(modifiedChildren)
  const selectedRegion = region && region !== 'none' ? region : ''

  const handleClickCapture = (e: React.MouseEvent) => {
    if (isCopyButtonTarget(e.target)) {
      notifyRegionCopy(copiedText)
    }
  }

  return (
    <div
      className="relative w-full min-w-0 max-w-full"
      onClickCapture={handleClickCapture}
      onMouseOver={(e) => {
        if (isCopyButtonTarget(e.target)) setHintVisible(true)
      }}
      onMouseOut={(e) => {
        if (isCopyButtonTarget(e.target) && !isCopyButtonTarget(e.relatedTarget)) {
          setHintVisible(false)
        }
      }}
    >
      <CodeBlock {...props}>{renderedChildren}</CodeBlock>
      {hintVisible && (
        <div
          role="tooltip"
          className="absolute right-2 top-10 z-20 w-56 rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)] px-3 py-2 text-xs leading-snug text-[var(--l1-foreground)] shadow-[0_8px_30px_color-mix(in_srgb,var(--base-black)_45%,transparent)]"
        >
          {selectedRegion ? (
            <>
              Heads up: this snippet uses the{' '}
              <code className="rounded bg-[var(--l3-background)] px-1 py-0.5 font-semibold">
                {selectedRegion}
              </code>{' '}
              region. Double-check it matches your workspace region before copying.
            </>
          ) : (
            <>
              Set your workspace region above — this snippet still uses the{' '}
              <code className="rounded bg-[var(--l3-background)] px-1 py-0.5 font-semibold">
                &lt;region&gt;
              </code>{' '}
              placeholder.
            </>
          )}
        </div>
      )}
    </div>
  )
}

export const RegionAwareCode = (props: any) => {
  const { region } = useRegion()

  const replacements = React.useMemo(() => {
    const list: Replacement[] = []
    if (region && region !== 'none') {
      list.push({ search: '<region>', replace: region })
    }
    return list
  }, [region])

  const modifiedChildren =
    replacements.length === 0 ? props.children : processCodeChildren(props.children, replacements)

  return (
    <code {...props}>
      {Array.isArray(modifiedChildren) ? Children.toArray(modifiedChildren) : modifiedChildren}
    </code>
  )
}

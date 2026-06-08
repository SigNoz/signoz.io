'use client'

import React, { Children, isValidElement, cloneElement, ReactNode } from 'react'
import Pre from 'pliny/ui/Pre'
import { useRegion } from './RegionContext'

// pliny's <Pre> renders its copy button with this aria-label.
const COPY_BUTTON_SELECTOR = '[aria-label="Copy code"]'

// Use Element (not HTMLElement): the button's icon is an <svg>/<path>, which are
// SVGElement, so an HTMLElement check would miss hovers/clicks on the icon itself.
const isCopyButtonTarget = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest(COPY_BUTTON_SELECTOR)

type Replacement = {
  search: string
  replace: string
}

const replaceInText = (text: string, replacements: Replacement[]) => {
  let newText = text
  replacements.forEach(({ search, replace }) => {
    newText = newText.split(search).join(replace)
  })
  return newText
}

const hasPlaceholder = (node: ReactNode, placeholders: string[]): boolean => {
  if (typeof node === 'string') {
    return placeholders.some((p) => node.includes(p))
  }
  if (Array.isArray(node)) {
    return node.some((child) => hasPlaceholder(child, placeholders))
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return hasPlaceholder(props.children, placeholders)
  }
  return false
}

const getTextContent = (node: ReactNode): string => {
  if (typeof node === 'string') {
    return node
  }
  if (typeof node === 'number') {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join('')
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return getTextContent(props.children)
  }
  return ''
}

const processCodeChildren = (children: ReactNode, replacements: Replacement[]): ReactNode => {
  const placeholders = replacements.map((r) => r.search)

  if (typeof children === 'string') {
    return replaceInText(children, replacements)
  }

  if (Array.isArray(children)) {
    const combinedText = getTextContent(children)
    const hasAnyPlaceholder = placeholders.some((p) => combinedText.includes(p))

    if (hasAnyPlaceholder && !children.some((child) => hasPlaceholder(child, placeholders))) {
      return replaceInText(combinedText, replacements)
    }

    return Children.toArray(children.map((child) => processCodeChildren(child, replacements)))
  }

  if (isValidElement(children)) {
    const props = children.props as { children?: ReactNode }

    const combinedText = getTextContent(props.children)
    const hasAnyPlaceholder = placeholders.some((p) => combinedText.includes(p))

    if (hasAnyPlaceholder && !hasPlaceholder(props.children, placeholders)) {
      return cloneElement(children as React.ReactElement<any>, {
        children: replaceInText(combinedText, replacements),
      })
    }

    if (props.children) {
      return cloneElement(children as React.ReactElement<any>, {
        children: processCodeChildren(props.children, replacements),
      })
    }
    return children
  }

  return children
}

export const RegionAwarePre = (props: any) => {
  const { region, notifyRegionCopy } = useRegion()

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
  const isRegionAware = React.useMemo(
    () => getTextContent(props.children).includes('<region>'),
    [props.children]
  )

  const modifiedChildren = React.useMemo(() => {
    if (replacements.length === 0) return props.children
    return processCodeChildren(props.children, replacements)
  }, [props.children, replacements])

  const renderedChildren = Array.isArray(modifiedChildren)
    ? Children.toArray(modifiedChildren)
    : modifiedChildren

  const [hintVisible, setHintVisible] = React.useState(false)

  if (!isRegionAware) {
    return <Pre {...props}>{renderedChildren}</Pre>
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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="relative"
      onClickCapture={handleClickCapture}
      onMouseOver={(e) => isCopyButtonTarget(e.target) && setHintVisible(true)}
      onMouseLeave={() => setHintVisible(false)}
    >
      <Pre {...props}>{renderedChildren}</Pre>
      {hintVisible && (
        <div
          role="tooltip"
          className="absolute right-2 top-12 z-20 w-56 rounded-md border border-signoz_slate-500 bg-signoz_ink-400 px-3 py-2 text-xs leading-snug text-signoz_vanilla-100 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
        >
          {selectedRegion ? (
            <>
              Heads up: this snippet uses the{' '}
              <code className="rounded bg-signoz_slate-400 px-1 py-0.5 font-semibold">
                {selectedRegion}
              </code>{' '}
              region. Double-check it matches your workspace region before copying.
            </>
          ) : (
            <>
              Set your workspace region above — this snippet still uses the{' '}
              <code className="rounded bg-signoz_slate-400 px-1 py-0.5 font-semibold">
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

  const modifiedChildren = React.useMemo(() => {
    if (replacements.length === 0) return props.children
    return processCodeChildren(props.children, replacements)
  }, [props.children, replacements])

  return (
    <code {...props}>
      {Array.isArray(modifiedChildren) ? Children.toArray(modifiedChildren) : modifiedChildren}
    </code>
  )
}

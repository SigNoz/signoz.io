'use client'

import React, { isValidElement, cloneElement, ReactNode } from 'react'
import Pre from 'pliny/ui/Pre'
import { useRegion } from './RegionContext'

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

    return children.map((child) => processCodeChildren(child, replacements))
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

  return <Pre {...props}>{modifiedChildren}</Pre>
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

  return <code {...props}>{modifiedChildren}</code>
}

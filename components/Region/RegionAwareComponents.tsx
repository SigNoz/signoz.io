'use client'

import React, { isValidElement, cloneElement, ReactNode } from 'react'
import Pre from 'pliny/ui/Pre'
import { useRegion } from './RegionContext'

const replaceInText = (text: string, replacement: string) => {
  return text.replace(/<region>/g, replacement)
}

const hasRegionPlaceholder = (node: ReactNode): boolean => {
  if (typeof node === 'string') {
    return node.includes('<region>')
  }
  if (Array.isArray(node)) {
    return node.some(hasRegionPlaceholder)
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return hasRegionPlaceholder(props.children)
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

const processCodeChildren = (children: ReactNode, replacement: string): ReactNode => {
  if (typeof children === 'string') {
    return replaceInText(children, replacement)
  }

  if (Array.isArray(children)) {
    const combinedText = getTextContent(children)
    if (
      combinedText.includes('<region>') &&
      !children.some((child) => hasRegionPlaceholder(child))
    ) {
      return replaceInText(combinedText, replacement)
    }

    return children.map((child) => processCodeChildren(child, replacement))
  }

  if (isValidElement(children)) {
    const props = children.props as { children?: ReactNode }

    const combinedText = getTextContent(props.children)
    if (combinedText.includes('<region>') && !hasRegionPlaceholder(props.children)) {
      return cloneElement(children as React.ReactElement<any>, {
        children: replaceInText(combinedText, replacement),
      })
    }

    if (props.children) {
      return cloneElement(children as React.ReactElement<any>, {
        children: processCodeChildren(props.children, replacement),
      })
    }
    return children
  }

  return children
}

export const RegionAwarePre = (props: any) => {
  const { selectedRegion } = useRegion()
  const replacement = selectedRegion && selectedRegion !== 'none' ? selectedRegion : '<region>'

  const modifiedChildren = React.useMemo(() => {
    return processCodeChildren(props.children, replacement)
  }, [props.children, replacement])

  return <Pre {...props}>{modifiedChildren}</Pre>
}

export const RegionAwareCode = (props: any) => {
  const { selectedRegion } = useRegion()
  const replacement = selectedRegion && selectedRegion !== 'none' ? selectedRegion : '<region>'

  const modifiedChildren = React.useMemo(() => {
    return processCodeChildren(props.children, replacement)
  }, [props.children, replacement])

  return <code {...props}>{modifiedChildren}</code>
}

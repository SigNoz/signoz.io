'use client'

import React, { isValidElement, cloneElement, ReactNode } from 'react'
import Pre from 'pliny/ui/Pre'
import { useRegion } from './RegionContext'

const replaceInText = (text: string, replacement: string) => {
  return text.replace(/<region>/g, replacement)
}

const recursiveReplace = (children: ReactNode, replacement: string): ReactNode => {
  if (typeof children === 'string') {
    return replaceInText(children, replacement)
  }

  if (Array.isArray(children)) {
    return children.map((child) => recursiveReplace(child, replacement))
  }

  if (isValidElement(children)) {
    const props = children.props as { children?: ReactNode }
    if (props.children) {
      return cloneElement(children as React.ReactElement<any>, {
        children: recursiveReplace(props.children, replacement),
      })
    }
    return children
  }

  return children
}

export const RegionAwarePre = (props: any) => {
  const { selectedRegion } = useRegion()
  const replacement = `${selectedRegion}` || '<region>'

  const modifiedChildren = React.useMemo(() => {
    return recursiveReplace(props.children, replacement)
  }, [props.children, replacement])

  return <Pre {...props}>{modifiedChildren}</Pre>
}

export const RegionAwareCode = (props: any) => {
  const { selectedRegion } = useRegion()
  const replacement = `${selectedRegion}` || '<region>'

  const modifiedChildren = React.useMemo(() => {
    return recursiveReplace(props.children, replacement)
  }, [props.children, replacement])

  return <code {...props}>{modifiedChildren}</code>
}

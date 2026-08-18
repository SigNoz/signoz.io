import React from 'react'
import { describe, expect, it } from 'vitest'
import { getTextContent } from '@/components/CodeBlock/utils'
import { processCodeChildren } from './regionCodeSubstitution'

const regionReplace = [{ search: '<region>', replace: 'us' }]

describe('processCodeChildren', () => {
  it('replaces a plain string placeholder', () => {
    const result = processCodeChildren('https://ingest.<region>.signoz.cloud:443', regionReplace)
    expect(result).toBe('https://ingest.us.signoz.cloud:443')
  })

  it('replaces a placeholder split across Shiki spans without flattening siblings', () => {
    const children = React.createElement(
      'code',
      null,
      React.createElement('span', { 'data-line': '', className: 'line' }, [
        React.createElement('span', { style: { color: '#fff' } }, 'https://ingest.'),
        React.createElement('span', { style: { color: '#f00' } }, '<'),
        React.createElement('span', { style: { color: '#0f0' } }, 'region'),
        React.createElement('span', { style: { color: '#00f' } }, '>'),
        React.createElement('span', { style: { color: '#fff' } }, '.signoz.cloud:443'),
      ])
    )

    const result = processCodeChildren(children, regionReplace)
    expect(getTextContent(result)).toBe('https://ingest.us.signoz.cloud:443')

    // Structure preserved: still a <code> with a line span and multiple token spans
    expect(React.isValidElement(result)).toBe(true)
    const codeProps = (result as React.ReactElement).props as { children?: React.ReactNode }
    const line = React.Children.toArray(codeProps.children)[0] as React.ReactElement
    expect(line.type).toBe('span')
    expect((line.props as { 'data-line'?: string })['data-line']).toBe('')
    const tokens = React.Children.toArray((line.props as { children?: React.ReactNode }).children)
    expect(tokens.length).toBeGreaterThan(1)
  })

  it('is a no-op when the placeholder is absent', () => {
    const input = 'echo hello'
    expect(processCodeChildren(input, regionReplace)).toBe(input)

    const tree = React.createElement('span', null, 'no placeholder here')
    expect(processCodeChildren(tree, regionReplace)).toBe(tree)
  })

  it('replaces multiple occurrences', () => {
    const input = 'ingest.<region>.a / ingest.<region>.b'
    expect(processCodeChildren(input, regionReplace)).toBe('ingest.us.a / ingest.us.b')
  })

  it('returns children unchanged when replacements are empty', () => {
    const input = 'ingest.<region>.signoz.cloud'
    expect(processCodeChildren(input, [])).toBe(input)
  })
})

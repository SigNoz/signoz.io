import React from 'react'
import { Source, useOf } from '@storybook/addon-docs/blocks'

/**
 * "Usage in MDX" docs section, rendered on every autodocs page (see
 * docs.page in preview.tsx). Reads the `mdxUsage` parameter from the
 * component meta: a string with the exact markup to paste into a
 * data/docs or data/blog .mdx file. The Source block provides the
 * copy-to-clipboard button.
 */
export const MdxUsage = () => {
  const resolved = useOf<'meta'>('meta')
  const parameters =
    resolved && resolved.type === 'meta' ? resolved.preparedMeta?.parameters : undefined
  const code = parameters?.mdxUsage as string | undefined
  if (!code) return null

  return (
    <>
      <h2 className="sbdocs sbdocs-h2">Usage in MDX</h2>
      <p className="sbdocs sbdocs-p">
        Components are registered globally in <code>components/MDXComponents.tsx</code>.{' '}
        <strong>Do not import any component inside an MDX file.</strong> Paste this into any{' '}
        <code>data/docs/**</code> or <code>data/blog/**</code> MDX file:
      </p>
      <Source code={code.trim()} language="jsx" dark />
    </>
  )
}

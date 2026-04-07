'use client'

import { useMDXComponent } from 'pliny/mdx-components'
import Admonition from '@/components/Admonition/Admonition'

const MDX_GLOBALS = { AdmonitionGlobal: Admonition }

export default function MDXRenderer({
  code,
  components,
  ...rest
}: {
  code: string
  components: Record<string, any>
  [key: string]: any
}) {
  const Mdx = useMDXComponent(code, MDX_GLOBALS)
  return <Mdx components={components} {...rest} />
}

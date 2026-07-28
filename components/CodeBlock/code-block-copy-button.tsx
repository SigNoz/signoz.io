'use client'

import { useCallback, useState } from 'react'
import { CheckIcon, CopyIcon } from './icons'

const COPY_LABEL_WIDTH_PX = 68
const COPIED_LABEL_WIDTH_PX = 80

export function CodeBlockCopyButton({
  text,
  className,
  withLabel = false,
}: {
  text: string
  className?: string
  withLabel?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can fail in insecure contexts; fail silently.
    }
  }, [text])

  return (
    <button
      type="button"
      aria-label="Copy code"
      className={className}
      onClick={onCopy}
      style={
        withLabel ? { width: copied ? COPIED_LABEL_WIDTH_PX : COPY_LABEL_WIDTH_PX } : undefined
      }
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {withLabel ? <span>{copied ? 'Copied' : 'Copy'}</span> : null}
    </button>
  )
}

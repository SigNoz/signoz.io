'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import Button from '@/components/ui/Button'

interface CopyAsMarkdownProps {
  /**
   * The raw markdown content to copy
   */
  markdownContent: string
  /**
   * Additional CSS classes
   */
  className?: string
}

const CopyAsMarkdown: React.FC<CopyAsMarkdownProps> = ({ markdownContent, className = '' }) => {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCopy = async () => {
    if (!markdownContent || isLoading) return

    setIsLoading(true)
    try {
      await navigator.clipboard.writeText(markdownContent)
      setCopied(true)
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy markdown content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      disabled={isLoading || !markdownContent}
      className={`gap-1 ${className}`}
      isButton={true}
    >
      {copied ? (
        <>
          <Check size={16} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          {isLoading ? 'Copying...' : 'Copy as Markdown'}
        </>
      )}
    </Button>
  )
}

export default CopyAsMarkdown

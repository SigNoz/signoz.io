'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import Button, { type ButtonProps } from '@/components/ui/Button'

interface CopyAsMarkdownProps {
  /**
   * The raw markdown content to copy
   */
  markdownContent: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Optional label override (defaults to a subtle 'Copy markdown')
   */
  label?: string
  /**
   * Button variant to use. Defaults to a subtle ghost button.
   */
  buttonVariant?: ButtonProps['variant']
  /**
   * Button size to use. Defaults to `sm`.
   */
  buttonSize?: ButtonProps['size']
}

const CopyAsMarkdown: React.FC<CopyAsMarkdownProps> = ({
  markdownContent,
  className = '',
  label = 'Copy markdown',
  buttonVariant = 'ghost',
  buttonSize = 'sm',
}) => {
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
      variant={buttonVariant}
      size={buttonSize}
      onClick={handleCopy}
      disabled={isLoading || !markdownContent}
      className={`gap-1 ${className}`}
      isButton={true}
      aria-label={label}
      title={label}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span className="hidden lg:inline">{isLoading ? 'Copying...' : label}</span>
    </Button>
  )
}

export default CopyAsMarkdown

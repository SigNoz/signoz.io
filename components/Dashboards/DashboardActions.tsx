'use client'

import React, { useState } from 'react'
import { Download, Copy, CheckCircle } from 'lucide-react'
import { Button } from '@signozhq/ui/button'
import { Typography } from '@signozhq/ui/typography'
import { toast } from '@signozhq/ui/sonner'

interface DashboardActionsProps {
  dashboardJsonUrl: string
  dashboardName: string
  className?: string
}

const DashboardActions: React.FC<DashboardActionsProps> = ({
  dashboardJsonUrl,
  dashboardName,
  className = '',
}) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(dashboardJsonUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard JSON')
      }

      const dashboardData = await response.json()
      const blob = new Blob([JSON.stringify(dashboardData, null, 2)], {
        type: 'application/json',
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${dashboardName.toLowerCase().replace(/\s+/g, '-')}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading dashboard:', error)
      toast.error('Failed to download dashboard. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCopy = async () => {
    setIsCopying(true)
    try {
      const response = await fetch(dashboardJsonUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard JSON')
      }

      const dashboardData = await response.json()
      await navigator.clipboard.writeText(JSON.stringify(dashboardData, null, 2))

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying dashboard:', error)
      toast.error('Failed to copy dashboard. Please try again.')
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="my-6 flex gap-3">
        <Button
          variant="solid"
          color="primary"
          onClick={handleDownload}
          disabled={isDownloading}
          prefix={<Download className="h-3.5 w-3.5" />}
        >
          {isDownloading ? 'Downloading...' : 'Download JSON'}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCopy}
          disabled={isCopying}
          prefix={
            copied ? (
              <CheckCircle className="h-3.5 w-3.5 text-[var(--success-foreground)]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )
          }
        >
          {copied ? (
            <span className="text-[var(--success-foreground)]">Copied!</span>
          ) : isCopying ? (
            'Copying...'
          ) : (
            'Copy JSON'
          )}
        </Button>
      </div>

      <Typography.Text color="muted" className="mt-2 text-center text-sm">
        <span className="font-bold italic">Dashboards → + New dashboard → Import JSON</span>
      </Typography.Text>
    </div>
  )
}

export default DashboardActions

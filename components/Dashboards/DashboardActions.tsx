'use client'

import React, { useState } from 'react'
import { Download, Copy, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'

interface DashboardActionsProps {
  dashboardJsonUrl: string
  dashboardName: string
  className?: string
}

const DashboardActions: React.FC<DashboardActionsProps> = ({ 
  dashboardJsonUrl, 
  dashboardName,
  className = ""
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
        type: 'application/json' 
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
      alert('Failed to download dashboard. Please try again.')
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
      alert('Failed to copy dashboard. Please try again.')
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex gap-3 my-6">
        <Button
          variant="default"
          rounded='default'
          isButton={true}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          {isDownloading ? 'Downloading...' : 'Download JSON'}
        </Button>
        
        <Button 
          variant={"tertiary"} 
          rounded={"default"} 
          isButton={true}
          onClick={handleCopy}
          disabled={isCopying}
        >
          {copied ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              {isCopying ? 'Copying...' : 'Copy JSON'}
            </>
          )}
        </Button>
      </div>
      
      <div className="text-sm text-gray-600 mt-2">
        <p className="text-center">
          <span className="font-bold italic">Dashboards → + New dashboard → Import JSON</span>
        </p>
      </div>
    </div>
  )
}

export default DashboardActions
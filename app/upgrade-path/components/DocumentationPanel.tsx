import React, { useState } from 'react'
import { UpgradePath } from '../types/upgrade'
import DocRenderer from './DocRender'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import type { Doc } from 'contentlayer/generated'

interface DocumentationPanelProps {
  currentStep: UpgradePath
  className?: string
  docUrl: string
  version: string
  docsBySlug: Record<string, Doc>
}

const DocumentationPanel: React.FC<DocumentationPanelProps> = ({
  version,
  className,
  docUrl,
  docsBySlug,
}) => {
  const [hasError, setHasError] = useState(false)

  return (
    <Card className={`h-full ${className}`}>
      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="m-0 text-lg font-semibold text-white">{version} - Full Documentation</h3>
          <Link
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-signoz_robin-500 hover:text-signoz_robin-400"
            prefetch={false}
          >
            Open in new tab
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>

        <Card className="relative min-h-[20vh] flex-1 overflow-auto">
          <div className="prose prose-slate relative relative flex h-full min-h-[20vh] max-w-none flex-1 flex-col overflow-auto p-2 dark:prose-invert">
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-signoz_slate-400">
                <div className="text-center">
                  <div className="mb-3">
                    <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                  </div>
                  <span className="mb-2 text-gray-300">Unable to load documentation</span>
                  <br />
                  <Link
                    href={docUrl}
                    target="_blank"
                    className="text-sm text-signoz_robin-500 hover:text-signoz_robin-400"
                  >
                    View in new tab instead
                  </Link>
                </div>
              </div>
            ) : (
              <DocRenderer docUrl={docUrl} docsBySlug={docsBySlug} setHasError={setHasError} />
            )}
          </div>
        </Card>

        <div className="mt-4 text-xs text-gray-400">
          <span>
            Documentation URL:{' '}
            <Link
              href={docUrl}
              target="_blank"
              className="text-signoz_robin-500 hover:text-signoz_robin-400"
            >
              {docUrl}
            </Link>
          </span>
        </div>
      </div>
    </Card>
  )
}

export default DocumentationPanel

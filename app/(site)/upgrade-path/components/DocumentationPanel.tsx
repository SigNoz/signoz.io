import React from 'react'
import { UpgradePath } from '../types/upgrade'
import DocRenderer from './DocRender'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

interface DocumentationPanelProps {
  currentStep: UpgradePath
  className?: string
  docUrl: string
  version: string
  docMetaBySlug: Record<string, { title: string }>
  compiledDocsBySlug: Record<string, React.ReactNode>
}

const DocumentationPanel: React.FC<DocumentationPanelProps> = ({
  version,
  className,
  docUrl,
  docMetaBySlug,
  compiledDocsBySlug,
}) => {
  const slug = decodeURI(docUrl.replace('https://signoz.io/docs/', '').replace(/^\/+/, ''))
  const hasError = !compiledDocsBySlug[slug]

  return (
    <Card className={`h-full ${className}`}>
      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="m-0 text-lg font-semibold text-white">{version} - Full Documentation</h3>
          <Link
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent-primary flex items-center gap-1 text-sm"
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
          <div className="prose prose-slate dark:prose-invert relative flex h-full min-h-[20vh] max-w-none flex-1 flex-col overflow-auto p-2">
            {hasError ? (
              <div className="bg-muted absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-3">
                    <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                  </div>
                  <span className="mb-2 text-gray-300">Unable to load documentation</span>
                  <br />
                  <Link
                    href={docUrl}
                    target="_blank"
                    className="text-primary hover:text-accent-primary text-sm"
                  >
                    View in new tab instead
                  </Link>
                </div>
              </div>
            ) : (
              <DocRenderer
                docUrl={docUrl}
                docMetaBySlug={docMetaBySlug}
                compiledDocsBySlug={compiledDocsBySlug}
              />
            )}
          </div>
        </Card>

        <div className="mt-4 text-xs text-gray-400">
          <span>
            Documentation URL:{' '}
            <Link href={docUrl} target="_blank" className="text-primary hover:text-accent-primary">
              {docUrl}
            </Link>
          </span>
        </div>
      </div>
    </Card>
  )
}

export default DocumentationPanel

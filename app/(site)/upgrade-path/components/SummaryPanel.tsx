import React from 'react'
import { UpgradePath } from '../types/upgrade'
import { formatDate } from '../utils/upgradeUtils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

interface SummaryPanelProps {
  currentStep: UpgradePath
  targetVersion: string
  onMarkComplete: () => void
  className?: string
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ currentStep, onMarkComplete, className }) => {
  const { version, releaseInfo, isCompleted } = currentStep

  return (
    <Card className={`w-full ${className}`}>
      <div className={`relative h-full overflow-auto p-6`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="m-0 text-lg font-semibold text-white">{version ?? ''} - Summary</h3>
          {isCompleted && (
            <div className="text-callout-success-title flex items-center gap-2 text-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Completed
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Version Info */}
          <div className="bg-muted flex flex-col rounded-lg p-3">
            <span className="text-sm text-gray-300">
              <span className="font-medium text-white">Release Date:</span>{' '}
              {formatDate(releaseInfo?.releaseDate ?? '')}
            </span>
            <span className="text-sm text-gray-300">
              <span className="font-medium text-white">Mandatory Stop:</span>{' '}
              {(releaseInfo?.isMandatoryStop ?? false) ? 'Yes' : 'No'}
            </span>
            {releaseInfo?.patchRelease && (
              <span className="mt-1 text-sm text-gray-300">
                <span className="font-medium text-white">Patch Release:</span>{' '}
                <Button variant={'outline'} size={null} className="px-2" asChild>
                  <Link href={releaseInfo?.patchRelease?.href ?? ''}>
                    {releaseInfo?.patchRelease?.label ?? ''}
                  </Link>
                </Button>
              </span>
            )}
          </div>

          {/* Instructions */}
          <div>
            <h4 className="mb-2 font-medium text-white">Instructions</h4>
            <ul className="space-y-1">
              {releaseInfo?.instructions?.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-primary mt-1">•</span>
                  {instruction ?? ''}
                </li>
              ))}
            </ul>
          </div>

          {/* Warnings */}
          {releaseInfo?.warnings?.length > 0 && (
            <div>
              <h4 className="mb-2 font-medium text-white">Warnings</h4>
              <div className="space-y-2">
                {releaseInfo?.warnings?.map((warning, index) => (
                  <div
                    key={index}
                    className="bg-danger-background/10 border-cherry-400/20 rounded-lg border p-3"
                  >
                    <h5 className="text-danger-foreground mb-1 font-medium">
                      {warning?.title ?? ''}
                    </h5>
                    <span className="text-sm text-gray-300">{warning?.details ?? ''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deprecations */}
          {releaseInfo?.deprecations?.length > 0 && (
            <div>
              <h4 className="mb-2 font-medium text-white">Deprecations</h4>
              <div className="space-y-2">
                {releaseInfo?.deprecations?.map((deprecation, index) => (
                  <div
                    key={index}
                    className="border-callout-warning-border bg-callout-warning-background rounded-lg border p-3"
                  >
                    <h5 className="text-callout-warning-title mb-1 font-medium">
                      {deprecation?.title ?? ''}
                    </h5>
                    <span className="text-sm text-gray-300">{deprecation?.details ?? ''}</span>
                    {deprecation?.timeline && (
                      <span className="mt-1 text-xs text-gray-400">
                        Timeline: {deprecation?.timeline ?? ''}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completion Button */}
          <div className="border-l2-border/50 border-t-2 border-dashed pt-4">
            <Button
              isButton={true}
              onClick={onMarkComplete}
              disabled={isCompleted}
              rounded="full"
              variant={isCompleted ? 'secondary' : 'default'}
              className={`w-full ${isCompleted ? 'text-callout-success-title' : ''}`}
            >
              {isCompleted ? 'Step Completed' : 'Mark as Complete'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SummaryPanel

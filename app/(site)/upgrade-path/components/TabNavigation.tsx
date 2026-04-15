// components/TabNavigation.tsx
import React from 'react'
import { UpgradePath } from '../types/upgrade'
import { formatDate } from '../utils/upgradeUtils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface TabNavigationProps {
  upgradePath: UpgradePath[]
  currentStep: number
  onStepChange: (stepIndex: number) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  upgradePath,
  currentStep,
  onStepChange,
}) => {
  if (!upgradePath || upgradePath?.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <div className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Upgrade Path</h3>

        <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
          {upgradePath?.map((step, index) => (
            <React.Fragment key={step?.version}>
              <Button
                isButton={true}
                onClick={() => onStepChange(index)}
                rounded="default"
                variant={'secondary'}
                className={`relative min-w-0 border-2 py-8 transition-all duration-200 ${currentStep === index ? 'border-signoz_robin-500 bg-signoz_robin-500/10 text-signoz_robin-500' : 'border-primary-600 bg-signoz_slate-400 text-gray-300 hover:border-signoz_robin-400 hover:bg-signoz_slate-300'}`}
              >
                <div className="flex items-center gap-2">
                  {step?.isCompleted && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-signoz_forest-500">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-semibold">{step?.version ?? ''}</div>
                    <div className="text-xs text-gray-400">
                      {formatDate(step?.releaseInfo?.releaseDate ?? '')}
                    </div>
                  </div>
                </div>
              </Button>

              {index < upgradePath?.length - 1 && (
                <div className="flex flex-shrink-0 items-center px-2">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-300">
          <span className="font-medium">Current Step:</span>{' '}
          {upgradePath?.[currentStep]?.version ?? 'None selected'}
        </div>
      </div>
    </Card>
  )
}

export default TabNavigation

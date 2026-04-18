import React from 'react'
import { Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

interface VersionSelectorProps {
  availableVersions: string[]
  currentVersion: string
  targetVersion: string
  onCurrentVersionChange: (version: string) => void
  onTargetVersionChange: (version: string) => void
  onCalculatePath: () => void
  error?: string
  isLoading?: boolean
  releasesIncomplete?: boolean
}

const VersionSelector: React.FC<VersionSelectorProps> = ({
  availableVersions,
  currentVersion,
  targetVersion,
  onCurrentVersionChange,
  onTargetVersionChange,
  onCalculatePath,
  error,
  isLoading,
  releasesIncomplete,
}) => {
  return (
    <Card className="w-full">
      <div className="p-6">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Current Version</label>
            <Select value={currentVersion} onValueChange={onCurrentVersionChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select current version" />
              </SelectTrigger>
              <SelectContent
                className="transform-gpu border border-primary-600 bg-signoz_slate-400 text-white"
                position="popper"
                align="center"
                side="bottom"
                avoidCollisions={false}
              >
                {availableVersions?.map((version) => (
                  <SelectItem
                    key={version}
                    value={version}
                    className="transition-colors duration-200 hover:bg-signoz_slate-500 focus:bg-signoz_slate-500"
                  >
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Target Version</label>
            <Select value={targetVersion} onValueChange={onTargetVersionChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target version" />
              </SelectTrigger>
              <SelectContent
                className="transform-gpu border border-primary-600 bg-signoz_slate-400 text-white"
                position="popper"
                align="center"
                side="bottom"
                avoidCollisions={false}
              >
                {availableVersions?.map((version) => (
                  <SelectItem
                    key={version}
                    value={version}
                    className="transition-colors duration-200 hover:bg-signoz_slate-500 focus:bg-signoz_slate-500"
                  >
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="mb-4 flex items-center gap-2 text-sm text-signoz_vanilla-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Fetching latest releases...
          </div>
        )}

        {releasesIncomplete && !isLoading && (
          <div className="mb-4 rounded-md border border-signoz_amber-400/20 bg-signoz_amber-400/10 p-3">
            <span className="text-sm text-signoz_amber-400">
              Release list may be incomplete. Refresh later for the full list.
            </span>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-md border border-signoz_cherry-400/20 bg-signoz_cherry-400/10 p-3">
            <span className="text-sm text-signoz_cherry-400">{error}</span>
          </div>
        )}

        <div className="flex items-center justify-center">
          <Button
            isButton={true}
            onClick={onCalculatePath}
            disabled={!currentVersion || !targetVersion || Boolean(isLoading)}
            rounded="full"
          >
            Calculate Upgrade Path
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default VersionSelector

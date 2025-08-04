import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

interface VersionSelectorProps {
  availableVersions: string[];
  currentVersion: string;
  targetVersion: string;
  onCurrentVersionChange: (version: string) => void;
  onTargetVersionChange: (version: string) => void;
  onCalculatePath: () => void;
  error?: string;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({
  availableVersions,
  currentVersion,
  targetVersion,
  onCurrentVersionChange,
  onTargetVersionChange,
  onCalculatePath,
  error
}) => {
  return (
    <Card className='w-full'>
      <div className='p-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Version
            </label>
            <Select value={currentVersion} onValueChange={onCurrentVersionChange}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Select current version" />
              </SelectTrigger>
              <SelectContent 
                className="bg-signoz_slate-400 border border-primary-600 text-white transform-gpu" 
                position="popper" 
                align="center"
                side="bottom"
                avoidCollisions={false}
                >
                {availableVersions?.map(version => (
                  <SelectItem key={version} value={version} className="hover:bg-signoz_slate-500 focus:bg-signoz_slate-500 transition-colors duration-200">
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Version
            </label>
            <Select value={targetVersion} onValueChange={onTargetVersionChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target version" />
              </SelectTrigger>
              <SelectContent 
                className="bg-signoz_slate-400 border border-primary-600 text-white transform-gpu" 
                position="popper" 
                align="center"
                side="bottom"
                avoidCollisions={false}
                >
                {availableVersions?.map(version => (
                  <SelectItem key={version} value={version} className="hover:bg-signoz_slate-500 focus:bg-signoz_slate-500 transition-colors duration-200">
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-signoz_cherry-400/10 border border-signoz_cherry-400/20 rounded-md">
            <span className="text-signoz_cherry-400 text-sm">{error}</span>
          </div>
        )}

        <div className='flex items-center justify-center'>
          <Button
            isButton={true}
            onClick={onCalculatePath}
            disabled={!currentVersion || !targetVersion}
            rounded="full"
          >
            Calculate Upgrade Path
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VersionSelector;
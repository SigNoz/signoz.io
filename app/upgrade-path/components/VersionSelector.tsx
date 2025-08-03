import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    <Card variant={"gradient"} className='w-full'>
      <div className='p-6'>
        <h2 className="text-xl font-semibold text-white mb-4">
          Configure Upgrade Path
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Version
            </label>
            <select
              value={currentVersion}
              onChange={(e) => onCurrentVersionChange(e.target.value)}
              className="w-full px-3 py-2 bg-signoz_slate-400 border border-primary-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-signoz_robin-500 focus:border-signoz_robin-500"
            >
              <option value="" className="bg-signoz_slate-400 text-white">Select current version</option>
              {availableVersions?.map(version => (
                <option key={version} value={version} className="bg-signoz_slate-400 text-white">
                  {version}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Version
            </label>
            <select
              value={targetVersion}
              onChange={(e) => onTargetVersionChange(e.target.value)}
              className="w-full px-3 py-2 bg-signoz_slate-400 border border-primary-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-signoz_robin-500 focus:border-signoz_robin-500"
            >
              <option value="" className="bg-signoz_slate-400 text-white">Select target version</option>
              {availableVersions?.map(version => (
                <option key={version} value={version} className="bg-signoz_slate-400 text-white">
                  {version}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-signoz_cherry-400/10 border border-signoz_cherry-400/20 rounded-md">
            <span className="text-signoz_cherry-400 text-sm">{error}</span>
          </div>
        )}

        <Button
          isButton={true}
          onClick={onCalculatePath}
          disabled={!currentVersion || !targetVersion}
          rounded="full"
        >
          Calculate Upgrade Path
        </Button>
      </div>
    </Card>
  );
};

export default VersionSelector;
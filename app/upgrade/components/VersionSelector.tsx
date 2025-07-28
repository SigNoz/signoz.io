import React from 'react';
import { DeploymentType } from '../types/upgrade';

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
    <div className='relative w-full p-4'>
    <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-signoz_robin-500/20 to-signoz_cherry-500/20 blur-xl' />
    <div className="w-full pricing-card relative flex h-full flex-col rounded-md border border-dashed border-signoz_slate-400 bg-signoz_ink-400 px-6 py-8 transition-all duration-300">

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
            {availableVersions.map(version => (
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
            {availableVersions.map(version => (
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

      <button
        onClick={onCalculatePath}
        disabled={!currentVersion || !targetVersion}
        className='start-free-trial-btn flex h-8 items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white'
        // className="w-full md:w-auto bg-signoz_robin-500 text-white px-6 py-2 rounded-md hover:bg-signoz_robin-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Calculate Upgrade Path
      </button>
    </div>
    </div>
  );
};

export default VersionSelector;
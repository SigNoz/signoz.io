import React from 'react';
import { UpgradePath } from '../types/upgrade';
import { calculateProgress } from '../utils/upgradeUtils';
import { Card } from '@/components/ui/Card';

interface ProgressTrackerProps {
  upgradePath: UpgradePath[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ upgradePath }) => {
  const { completed, total, percentage } = calculateProgress(upgradePath);

  if (!upgradePath || upgradePath?.length === 0) {
    return null;
  }

  return (
    <Card className='w-full'>
      <div className='p-6'>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Upgrade Progress
          </h3>
          <span className="text-sm text-gray-300">
            Step {completed ?? "-"} of {total ?? "-"} completed
          </span>
        </div>
        
        <div className="w-full bg-signoz_slate-400 rounded-full h-3 mb-4">
          <div
            className="bg-signoz_robin-500 h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-300">
          <span>{percentage ?? "-"} % Complete</span>
          <span>{total - completed} steps remaining</span>
        </div>
      </div>
    </Card>
  );
};

export default ProgressTracker;
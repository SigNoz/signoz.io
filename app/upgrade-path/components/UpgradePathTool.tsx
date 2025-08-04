import React, { useState, useEffect } from 'react';
import { UpgradePathState, DeploymentType, UpgradePath } from '../types/upgrade';
import upgradeSchema from '@/constants/upgradeSchema.json';
import { calculateUpgradePath, getAvailableVersions } from '../utils/upgradeUtils';
import { storeUpgradeProgress, getUpgradeProgress, clearExpiredUpgrades } from '../utils/localStorageUtils';
import VersionSelector from './VersionSelector';
import ProgressTracker from './ProgressTracker';
import TabNavigation from './TabNavigation';
import SummaryPanel from './SummaryPanel';
import DocumentationPanel from './DocumentationPanel';
import SectionContainer from '@/components/SectionContainer';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

const UpgradePathTool: React.FC = () => {
  const [state, setState] = useState<UpgradePathState>({
    currentVersion: '',
    targetVersion: '',
    upgradePath: [],
    currentStep: 0,
    completedSteps: new Set<string>()
  });
  
  const [error, setError] = useState<string>('');
  const [isPathGenerated, setIsPathGenerated] = useState(false);
  
  const availableVersions = getAvailableVersions(upgradeSchema);

  // Clear expired entries on mount
  useEffect(() => {
    clearExpiredUpgrades();
  }, []);

  const handleCalculatePath = () => {
    try {
      setError('');
      const path = calculateUpgradePath(
        state.currentVersion,
        state.targetVersion,
        upgradeSchema
      );
      
      // Check for stored progress for this path
      const storedProgress = getUpgradeProgress(state.currentVersion, state.targetVersion);
      const completedSteps = storedProgress || new Set<string>();
      
      // Apply stored progress to the path
      const pathWithProgress = path.map(step => ({
        ...step,
        isCompleted: completedSteps.has(step.version)
      }));
      
      setState(prev => ({
        ...prev,
        upgradePath: pathWithProgress,
        currentStep: 0,
        completedSteps
      }));
      
      setIsPathGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsPathGenerated(false);
    }
  };

  const handleStepChange = (stepIndex: number) => {
    setState(prev => ({
      ...prev,
      currentStep: stepIndex
    }));
  };

  const handleMarkComplete = () => {
    if (state.upgradePath.length === 0) return;
    
    const currentStepVersion = state.upgradePath[state.currentStep].version;
    
    setState(prev => {
      const newCompletedSteps = new Set(prev.completedSteps);
      newCompletedSteps.add(currentStepVersion);
      
      // Store progress immediately when a step is completed
      storeUpgradeProgress(
        state.currentVersion,
        state.targetVersion,
        newCompletedSteps
      );
      
      const updatedPath = prev.upgradePath.map(step => ({
        ...step,
        isCompleted: newCompletedSteps.has(step.version)
      }));
      
      return {
        ...prev,
        upgradePath: updatedPath,
        completedSteps: newCompletedSteps
      };
    });
  };

  const handleVersionChange = (field: 'currentVersion' | 'targetVersion', value: string) => {
    setState(prev => ({
      ...prev,
      [field]: value,
      // Reset progress when versions change
      completedSteps: new Set(),
      upgradePath: []
    }));
    setIsPathGenerated(false);
  };

  const currentStepData = state.upgradePath?.[state.currentStep];

  return (
    <SectionContainer>
      <div className="py-8 w-full">
        <div className="relative">
          <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:h-[450px] sm:bg-[center_-500px] md:h-[956px]" />
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
            <div className="text-center">
              <h1 className="font-bold mb-2 text-gradient">
                SigNoz Upgrade Path Tool
              </h1>
              <span className="text-signoz_vanilla-400">
                Plan and execute your SigNoz upgrade with confidence. This tool will guide you through 
                each mandatory step to ensure a safe and successful upgrade.
              </span>
            </div>

            {/* Version Selection */}
            <VersionSelector
              availableVersions={availableVersions}
              currentVersion={state.currentVersion}
              targetVersion={state.targetVersion}
              onCurrentVersionChange={(version) => handleVersionChange('currentVersion', version)}
              onTargetVersionChange={(version) => handleVersionChange('targetVersion', version)}
              onCalculatePath={handleCalculatePath}
              error={error}
            />

            {/* General Information */}
            {isPathGenerated && (
              <Card className='w-full'>
                <div className='p-6'>
                  <h3 className="text-lg font-semibold mb-4 text-signoz_vanilla-100">
                    Important Information
                  </h3>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 text-signoz_vanilla-100">Pre-Upgrade Checklist</h4>
                      <ul className="space-y-1 text-sm text-signoz_vanilla-400">
                        {upgradeSchema?.general?.checklist?.preUpgrade?.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  
                    <div>
                      <h4 className="font-medium mb-2 text-signoz_vanilla-100">Post-Upgrade Checklist</h4>
                      <ul className="space-y-1 text-sm text-signoz_vanilla-400">
                        {upgradeSchema?.general?.checklist?.postUpgrade?.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {upgradeSchema?.general?.commonWarnings?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2 text-signoz_vanilla-100">Common Warnings</h4>
                      <div className="space-y-2">
                        {upgradeSchema?.general?.commonWarnings?.map((warning, index) => (
                          <div key={index} className="p-3 bg-signoz_amber-400/10 border border-signoz_amber-400/20 rounded-lg">
                            <h5 className="font-medium text-signoz_amber-400 mb-1">{warning?.title ?? ""}</h5>
                            <span className="text-sm text-signoz_vanilla-400">{warning?.details ?? ""}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-signoz_slate-100">
                    <span className="text-sm text-signoz_vanilla-400">
                      Need help? Check out our{' '}
                      <Link
                        href={upgradeSchema?.general?.troubleshootingUrl ?? ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-signoz_robin-500 hover:text-signoz_robin-400 rounded-lg"
                      >
                        troubleshooting guide
                      </Link>
                      .
                    </span>
                  </div>
                </div>
              </Card>
            )}

            {/* Progress Tracker */}
            {isPathGenerated && (
              <ProgressTracker upgradePath={state.upgradePath} />
            )}

            {/* Tab Navigation */}
            {isPathGenerated && (
              <TabNavigation
                upgradePath={state.upgradePath}
                currentStep={state.currentStep}
                onStepChange={handleStepChange}
              />
            )}

            {/* Main Content Panels */}
            {isPathGenerated && currentStepData && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary Panel */}
                <SummaryPanel className="max-h-screen overflow-auto w-full max-lg:col-span-2 col-span-1"
                  currentStep={currentStepData}
                  targetVersion={state.targetVersion}
                  onMarkComplete={handleMarkComplete}
                />

                {/* Documentation Panel */}
                <DocumentationPanel version={currentStepData?.version} className="max-h-screen w-full col-span-2" currentStep={currentStepData} docUrl={currentStepData?.releaseInfo?.guideUrl ?? ""} />
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default UpgradePathTool;
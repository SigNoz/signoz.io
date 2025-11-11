import { UpgradeSchema, UpgradePath, ReleaseInfo } from '../types/upgrade';

export function calculateUpgradePath(
  currentVersion: string,
  targetVersion: string,
  schema: UpgradeSchema
): UpgradePath[] {
  const releases = schema.releases;
  const versions = Object.keys(releases).sort((a, b) => {
    // Simple version sorting - in real implementation, use semver
    return a.localeCompare(b, undefined, { numeric: true });
  });

  const currentIndex = versions.indexOf(currentVersion);
  const targetIndex = versions.indexOf(targetVersion);

  if (currentIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid version specified');
  }

  if (currentIndex >= targetIndex) {
    throw new Error('Target version must be newer than current version');
  }

  const path: UpgradePath[] = [];
  let stepNumber = 1;

  // Find all mandatory stops between current and target
  for (let i = currentIndex + 1; i <= targetIndex; i++) {
    const version = versions[i];
    const releaseInfo = releases[version];
    
    if (releaseInfo.isMandatoryStop || i === targetIndex) {
      path.push({
        version,
        releaseInfo,
        isCompleted: false,
        stepNumber: stepNumber++
      });
    }
  }

  return path;
}

export function getAvailableVersions(schema: UpgradeSchema): string[] {
  return Object.keys(schema.releases).sort((a, b) => {
    return b.localeCompare(a, undefined, { numeric: true });
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateProgress(upgradePath: UpgradePath[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  const total = upgradePath?.length ?? 0;
  const completed = upgradePath?.filter(step => step.isCompleted).length ?? 0;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
}
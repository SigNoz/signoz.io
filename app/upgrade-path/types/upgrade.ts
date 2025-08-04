export interface UpgradeWarning {
  title: string;
  details: string;
}

export interface UpgradeDeprecation {
  title: string;
  details: string;
  timeline?: string;
}

export interface PatchRelease {
  label: string;
  href: string;
}

export interface ReleaseInfo {
  isMandatoryStop: boolean;
  nextMandatoryStop: string | null;
  releaseDate: string;
  guideUrl: string;
  instructions: string[];
  deprecations: UpgradeDeprecation[];
  warnings: UpgradeWarning[];
  patchRelease?: PatchRelease;
}

export interface UpgradeSchema {
  schemaVersion: string;
  pathHead: string;
  general: {
    upgradeSummary: string[];
    checklist: {
      preUpgrade: string[];
      postUpgrade: string[];
    };
    commonWarnings: UpgradeWarning[];
    troubleshootingUrl: string;
  };
  releases: Record<string, ReleaseInfo>;
}

export interface UpgradePath {
  version: string;
  releaseInfo: ReleaseInfo;
  isCompleted: boolean;
  stepNumber: number;
}

export interface UpgradePathState {
  currentVersion: string;
  targetVersion: string;
  upgradePath: UpgradePath[];
  currentStep: number;
  completedSteps: Set<string>;
}

export type DeploymentType = 'docker' | 'kubernetes' | 'self-hosted';
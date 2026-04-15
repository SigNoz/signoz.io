import {
  UpgradeSchema,
  UpgradePath,
  ReleaseInfo,
  GitHubReleasesResponse,
  PatchRelease,
} from '../types/upgrade'
import { compareSemverTags } from '@/utils/semverTags'

const STANDARD_GUIDE_URL = 'https://signoz.io/docs/operate/migration/upgrade-standard'

export function mergeReleasesWithSchema(
  githubData: GitHubReleasesResponse,
  schema: UpgradeSchema
): UpgradeSchema {
  const merged: Record<string, ReleaseInfo> = {}

  for (const entry of githubData.releases) {
    if (entry.isPatch) continue

    const version = entry.version
    const schemaEntry = schema.releases[version]

    if (schemaEntry) {
      const patchRelease = schemaEntry.patchRelease ?? githubData.patches[version] ?? undefined
      merged[version] = { ...schemaEntry, patchRelease }
    } else {
      const patchRelease: PatchRelease | undefined = githubData.patches[version]
      merged[version] = {
        isMandatoryStop: false,
        nextMandatoryStop: null,
        releaseDate: entry.publishedAt.split('T')[0],
        guideUrl: STANDARD_GUIDE_URL,
        instructions: ['This is not a breaking change release. No special actions are needed.'],
        deprecations: [],
        warnings: [],
        patchRelease,
      }
    }
  }

  for (const [version, info] of Object.entries(schema.releases)) {
    if (!merged[version]) {
      merged[version] = info
    }
  }

  return {
    ...schema,
    releases: merged,
  }
}

export function calculateUpgradePath(
  currentVersion: string,
  targetVersion: string,
  schema: UpgradeSchema
): UpgradePath[] {
  const releases = schema.releases
  const versions = Object.keys(releases).sort(compareSemverTags)

  const currentIndex = versions.indexOf(currentVersion)
  const targetIndex = versions.indexOf(targetVersion)

  if (currentIndex === -1 || targetIndex === -1) {
    throw new Error('Invalid version specified')
  }

  if (currentIndex >= targetIndex) {
    throw new Error('Target version must be newer than current version')
  }

  const path: UpgradePath[] = []
  let stepNumber = 1

  // Find all mandatory stops between current and target
  for (let i = currentIndex + 1; i <= targetIndex; i++) {
    const version = versions[i]
    const releaseInfo = releases[version]

    if (releaseInfo.isMandatoryStop || i === targetIndex) {
      path.push({
        version,
        releaseInfo,
        isCompleted: false,
        stepNumber: stepNumber++,
      })
    }
  }

  return path
}

export function getAvailableVersions(schema: UpgradeSchema): string[] {
  return Object.keys(schema.releases).sort((a, b) => compareSemverTags(b, a))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateProgress(upgradePath: UpgradePath[]): {
  completed: number
  total: number
  percentage: number
} {
  const total = upgradePath?.length ?? 0
  const completed = upgradePath?.filter((step) => step.isCompleted).length ?? 0
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return { completed, total, percentage }
}

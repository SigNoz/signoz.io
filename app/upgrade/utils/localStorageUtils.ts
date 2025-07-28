import { UpgradePath } from '../types/upgrade';

const STORAGE_PREFIX = 'signoz_upgrade_path_';
const EXPIRY_DAYS = 7;

interface StoredUpgradeData {
  completedSteps: string[];  // Array of completed version steps
  fromVersion: string;      // User selected current version
  toVersion: string;        // User selected target version
  expiresAt: number;
  lastUpdated: number;
}

export const generateUpgradeKey = (fromVersion: string, toVersion: string): string => {
  return `${STORAGE_PREFIX}${fromVersion}_to_${toVersion}`;
};

export const storeUpgradeProgress = (
  fromVersion: string,
  toVersion: string,
  completedSteps: Set<string>
): void => {
  try {
    const key = generateUpgradeKey(fromVersion, toVersion);
    const now = Date.now();
    const expiresAt = now + (EXPIRY_DAYS * 24 * 60 * 60 * 1000); // 7 days from now

    const data: StoredUpgradeData = {
      completedSteps: Array.from(completedSteps),
      fromVersion,
      toVersion,
      expiresAt,
      lastUpdated: now
    };

    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store upgrade progress:', error);
  }
};

export const getUpgradeProgress = (
  fromVersion: string,
  toVersion: string
): Set<string> | null => {
  try {
    const key = generateUpgradeKey(fromVersion, toVersion);
    const data = localStorage.getItem(key);

    if (!data) return null;

    const parsedData: StoredUpgradeData = JSON.parse(data);
    const now = Date.now();

    // Check if data has expired
    if (now > parsedData.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    // Verify the versions match
    if (parsedData.fromVersion !== fromVersion || parsedData.toVersion !== toVersion) {
      return null;
    }

    return new Set(parsedData.completedSteps);
  } catch (error) {
    console.error('Failed to get upgrade progress:', error);
    return null;
  }
};

export const clearExpiredUpgrades = (): void => {
  try {
    const now = Date.now();
    
    // Get all keys with our prefix
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(STORAGE_PREFIX)
    );

    // Check each key and remove if expired
    keys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        const parsedData: StoredUpgradeData = JSON.parse(data);
        if (now > parsedData.expiresAt) {
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.error('Failed to clear expired upgrades:', error);
  }
}; 
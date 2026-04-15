/**
 * Centralized configuration for all feature flag experiments
 *
 * This file serves as a single source of truth for all experiments and variants
 * across the application. When adding a new experiment, add it to this object.
 */

export const EXPERIMENTS = {
  TEAMS_PAGE_VALUE_PROPS: {
    id: 'teams-page-value-props',
    variants: {
      CONTROL: 'current-layout',
      VARIANT: 'value-props-social-proof',
    },
    flagName: 'teams-page-value-props',
  },
  // Add more experiments here as needed
} as const

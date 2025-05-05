/**
 * Centralized configuration for all feature flag experiments
 *
 * This file serves as a single source of truth for all experiments and variants
 * across the application. When adding a new experiment, add it to this object.
 */

export const EXPERIMENTS = {
  DOCS_HEADER: {
    id: 'docs-header-with-only-quick-start',
    variants: {
      QUICK_START_ONLY: 'only-quick-start',
      DUAL_BUTTONS: 'quick-start-with-install-locally',
    },
    flagName: 'docs-header-with-only-quick-start',
  },
  HOME_HEADER: {
    id: 'home-header-cta',
    variants: {
      SINGLE_CTA: 'single-cta',
      DUAL_CTA: 'dual-cta',
    },
    flagName: 'single-cta-on-home-header',
  },
  // Add more experiments here as needed
} as const

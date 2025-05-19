/**
 * Centralized configuration for all feature flag experiments
 *
 * This file serves as a single source of truth for all experiments and variants
 * across the application. When adding a new experiment, add it to this object.
 */

export const EXPERIMENTS = {
  DOCS_HEADER_PART_TWO: {
    id: 'docs-header-experiment-part-two',
    variants: {
      BOTH_BUTTONS: 'both-quickstart-and-install-locally',
      ONLY_QUICKSTART: 'only-quickstart',
      NO_QUICKSTART: 'no-quickstart',
    },
    flagName: 'docs-header-experiment-part-two',
    concluded: true,
    defaultVariant: 'no-quickstart',
  },
  DOCS_HEADER: {
    id: 'docs-header-with-only-quick-start',
    variants: {
      QUICK_START_ONLY: 'only-quick-start',
      DUAL_BUTTONS: 'quick-start-with-install-locally',
    },
    flagName: 'docs-header-with-only-quick-start',
    concluded: true,
    defaultVariant: 'none',
  },
  DOCS_QUICK_START_LINK: {
    id: 'docs-quick-start-link',
    variants: {
      TEAMS_LINK: 'teams-link',
      QUICKSTART_DOC_LINK: 'quickstart-doc-link',
    },
    flagName: 'docs-quick-start-link',
    concluded: true,
    defaultVariant: 'quickstart-doc-link',
  },
  HOME_HEADER: {
    id: 'home-header-cta',
    variants: {
      SINGLE_CTA: 'single-cta',
      DUAL_CTA: 'dual-cta',
    },
    flagName: 'single-cta-on-home-header',
    concluded: true,
    defaultVariant: 'single-cta',
  },
  HOME_HEADER_CTA_COPY: {
    id: 'home-header-cta-copy',
    variants: {
      GET_STARTED_FREE: 'get-started-free-copy',
      START_SENDING_DATA: 'start-sending-data-free-copy',
    },
    flagName: 'home-header-cta-copy',
    concluded: true,
    defaultVariant: 'get-started-free-copy',
  },
  TEAMS_PAGE: {
    id: 'teams-page-focused-layout-experiment',
    variants: {
      CONTROL: 'with-nav-bar-and-footer',
      VARIANT: 'without-nav-bar-and-footer',
    },
    flagName: 'teams-page-focused-layout-experiment',
  },
  CLOUD_FIRST_PRICING_PAGE: {
    id: 'cloud-first-pricing-page',
    variants: {
      CONTROL: 'with-self-host-tab',
      VARIANT: 'without-self-host-tab',
    },
    flagName: 'cloud-first-pricing-page',
  },
  // Add more experiments here as needed
} as const

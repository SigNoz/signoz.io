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
  HOMEPAGE_HEADER_COPY: {
    id: 'homepage-header-copy-experiment',
    variants: {
      CONTROL: 'existing-homepage-header-copy',
      VARIANT: 'observability-on-your-terms-copy',
    },
    flagName: 'homepage-header-copy-experiment',
    concluded: true,
    defaultVariant: 'observability-on-your-terms-copy',
  },
  TEAMS_PAGE: {
    id: 'teams-page-focused-layout-experiment',
    variants: {
      CONTROL: 'with-nav-bar-and-footer',
      VARIANT: 'without-nav-bar-and-footer',
    },
    flagName: 'teams-page-focused-layout-experiment',
  },
  TEAMS_PAGE_VALUE_PROPS: {
    id: 'teams-page-value-props',
    variants: {
      CONTROL: 'current-layout',
      VARIANT: 'value-props-social-proof',
    },
    flagName: 'teams-page-value-props',
  },
  CLOUD_FIRST_PRICING_PAGE: {
    id: 'cloud-first-pricing-page',
    variants: {
      CONTROL: 'with-self-host-tab',
      VARIANT: 'without-self-host-tab',
    },
    flagName: 'cloud-first-pricing-page',
    concluded: true,
    defaultVariant: 'without-self-host-tab',
  },
  CHATBASE_BUBBLE: {
    id: 'chatbase-bubble-experiment',
    variants: {
      CONTROL: 'no-chatbase-bubble',
      VARIANT: 'with-chatbase-bubble',
    },
    flagName: 'chatbase-bubble-experiment',
    concluded: true,
    defaultVariant: 'with-chatbase-bubble',
  },
  HOMEPAGE_EMAIL_SIGNUP: {
    id: 'homepage-email-signup',
    variants: {
      CONTROL: 'existing-cta-buttons',
      VARIANT: 'email-input-with-modal',
    },
    flagName: 'homepage-email-signup',
    concluded: true,
    defaultVariant: 'existing-cta-buttons',
  },
  // Add more experiments here as needed
} as const

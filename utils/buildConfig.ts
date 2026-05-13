/**
 * Build configuration utilities for Vercel deployments.
 *
 * On preview/development: skip static generation → faster builds
 * On production: full static generation → optimal performance
 *
 * Override with FORCE_STATIC_BUILD env var:
 *   - "true" or "1" → always build static pages
 *   - "false" or "0" → never build static pages (always dynamic)
 */

/**
 * Returns true if we should generate all static pages.
 * False for preview/development environments to speed up builds.
 *
 * Can be overridden with FORCE_STATIC_BUILD env var.
 */
export function shouldBuildStaticPages(): boolean {
  const forceStatic = process.env.FORCE_STATIC_BUILD

  // Check override first
  if (forceStatic === 'true' || forceStatic === '1') {
    return true
  }
  if (forceStatic === 'false' || forceStatic === '0') {
    return false
  }

  const vercelEnv = process.env.VERCEL_ENV

  // Not on Vercel (local dev) or production → build all pages
  if (!vercelEnv || vercelEnv === 'production') {
    return true
  }

  // Preview or development → skip static generation
  return false
}

/**
 * Dynamic params setting based on environment.
 * true = render unknown paths on-demand (for preview/dev)
 * false = 404 for unknown paths (for production with full static gen)
 */
export const dynamicParamsForEnv = shouldBuildStaticPages() ? false : true

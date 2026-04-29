import * as path from 'path'

/**
 * Content output directory - stored in .vercel/cache for Vercel build caching.
 * Vercel explicitly preserves .vercel/cache/ between builds.
 */
export const CONTENT_OUTPUT_DIR = path.resolve(process.cwd(), '.vercel/cache/content')

/**
 * Refresh trigger file path - touched after content rebuilds to trigger Next.js recompilation.
 */
export const REFRESH_TRIGGER_FILE = path.resolve(CONTENT_OUTPUT_DIR, '.refresh-trigger')

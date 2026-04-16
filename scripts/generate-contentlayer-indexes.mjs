#!/usr/bin/env node
/**
 * Generates lightweight metadata-only indexes from contentlayer output.
 * These indexes exclude body/code fields to reduce bundle size.
 *
 * Run: node scripts/generate-contentlayer-indexes.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONTENTLAYER_DIR = join(ROOT, '.contentlayer', 'generated')

/**
 * Fields to KEEP in lightweight indexes.
 * Explicitly exclude: body, code, _raw (contains raw content)
 */
const BLOG_KEEP_FIELDS = [
  'title', 'date', 'tags', 'lastmod', 'draft', 'summary', 'description',
  'image', 'images', 'authors', 'slug', 'path', 'filePath', 'readingTime',
  'keywords', 'canonicalUrl', 'layout', 'relatedArticles', 'structuredData',
  'hide_table_of_contents', 'toc_min_heading_level', 'toc_max_heading_level',
  'excludeFromSitemap', 'is_newsroom', 'cta_title', 'cta_text', 'toc'
]

const GUIDE_KEEP_FIELDS = [
  'title', 'date', 'tags', 'lastmod', 'draft', 'summary', 'description',
  'image', 'images', 'authors', 'slug', 'path', 'filePath', 'readingTime',
  'keywords', 'canonicalUrl', 'layout', 'relatedArticles', 'structuredData'
]

const DOC_KEEP_FIELDS = [
  'title', 'id', 'slug', 'date', 'tags', 'lastmod', 'draft', 'summary',
  'description', 'doc_type', 'image', 'images', 'authors', 'layout',
  'canonicalUrl', 'sidebar_label', 'hide_table_of_contents', 'path',
  'filePath', 'readingTime', 'docTags', 'structuredData', 'toc'
]

function pickFields(obj, fields) {
  const result = {}
  for (const field of fields) {
    if (field in obj) {
      result[field] = obj[field]
    }
  }
  return result
}

function generateLightweightIndex(contentType, keepFields) {
  const indexPath = join(CONTENTLAYER_DIR, contentType, '_index.json')
  const metaPath = join(CONTENTLAYER_DIR, contentType, '_index-meta.json')

  if (!existsSync(indexPath)) {
    console.log(`Skipping ${contentType}: _index.json not found`)
    return
  }

  console.log(`Processing ${contentType}...`)
  const fullIndex = JSON.parse(readFileSync(indexPath, 'utf-8'))

  const lightweightIndex = fullIndex.map(item => pickFields(item, keepFields))

  const fullSize = Buffer.byteLength(JSON.stringify(fullIndex))
  const lightSize = Buffer.byteLength(JSON.stringify(lightweightIndex))

  writeFileSync(metaPath, JSON.stringify(lightweightIndex, null, 2))

  console.log(`  ${contentType}: ${(fullSize / 1024 / 1024).toFixed(2)}MB -> ${(lightSize / 1024 / 1024).toFixed(2)}MB (${((1 - lightSize/fullSize) * 100).toFixed(1)}% reduction)`)
}

console.log('Generating lightweight contentlayer indexes...\n')

generateLightweightIndex('Blog', BLOG_KEEP_FIELDS)
generateLightweightIndex('Guide', GUIDE_KEEP_FIELDS)
generateLightweightIndex('Doc', DOC_KEEP_FIELDS)

console.log('\nDone! Lightweight indexes generated.')

import { promises as fs } from 'fs'
import path from 'path'
import { cacheLife, cacheTag } from 'next/cache'
import type {
  ListicleConfig,
  ListicleItem,
  SectionConfig,
  SubsectionConfig,
  IconSpec,
} from '@/components/Listicle/types'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { cmsFetch } from '@/utils/cmsFetch'
import { hasCMSContentConfig, isLocalContentOverlayEnabled } from '@/utils/contentRepository'

async function readLocalListicle(name: string): Promise<ListicleConfig | null> {
  const filePath = path.join(process.cwd(), 'constants/listicles', `${name}.json`)
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw) as ListicleConfig
  } catch {
    return null
  }
}

function transformIcon(raw: Record<string, unknown>): IconSpec | undefined {
  if (raw.icon_badge && raw.icon_color) {
    return { badge: String(raw.icon_badge), color: String(raw.icon_color) }
  }
  if (raw.icon_path) {
    return String(raw.icon_path)
  }
  return undefined
}

function transformItem(raw: Record<string, unknown>): ListicleItem {
  const item: ListicleItem = {
    name: String(raw.name ?? ''),
    href: String(raw.href ?? ''),
  }
  if (raw.click_name != null) item.clickName = String(raw.click_name)
  const icon = transformIcon(raw)
  if (icon != null) item.icon = icon
  return item
}

function transformItems(raw: unknown): ListicleItem[] | undefined {
  if (!Array.isArray(raw) || raw.length === 0) return undefined
  return raw.map((entry: Record<string, unknown>) => transformItem(entry))
}

function transformSubsection(raw: Record<string, unknown>): SubsectionConfig {
  const sub: SubsectionConfig = {
    id: String(raw.section_id ?? raw.id ?? ''),
    title: String(raw.title ?? ''),
    sectionName: String(raw.section_name ?? ''),
    items: transformItems(raw.items) ?? [],
  }
  if (raw.grid_cols != null) sub.gridCols = String(raw.grid_cols)
  return sub
}

function transformSection(raw: Record<string, unknown>): SectionConfig {
  const section: SectionConfig = {
    id: String(raw.section_id ?? raw.id ?? ''),
    label: String(raw.label ?? ''),
    title: String(raw.title ?? ''),
    sectionName: String(raw.section_name ?? ''),
  }
  if (raw.grid_cols != null) section.gridCols = String(raw.grid_cols)
  const items = transformItems(raw.items)
  if (items) section.items = items
  if (Array.isArray(raw.subsections) && raw.subsections.length > 0) {
    section.subsections = raw.subsections.map((s: Record<string, unknown>) =>
      transformSubsection(s)
    )
  }
  return section
}

function transformCmsData(raw: Record<string, unknown>): ListicleConfig {
  const config: ListicleConfig = {
    id: String(raw.key ?? raw.id ?? ''),
    pattern: (raw.pattern as ListicleConfig['pattern']) ?? 'flat',
    markdownTitle: String(raw.markdown_title ?? ''),
    sectionName: String(raw.section_name ?? ''),
  }

  if (raw.title != null) config.title = String(raw.title)
  if (raw.description != null) config.description = String(raw.description)
  if (raw.grid_cols != null) config.gridCols = String(raw.grid_cols)
  if (raw.view_all_href != null) config.viewAllHref = String(raw.view_all_href)
  if (raw.view_all_text != null) config.viewAllText = String(raw.view_all_text)
  if (raw.search_placeholder != null) config.searchPlaceholder = String(raw.search_placeholder)
  if (raw.wrapper_title != null) config.wrapperTitle = String(raw.wrapper_title)

  const items = transformItems(raw.items)
  if (items) config.items = items

  if (Array.isArray(raw.sections) && raw.sections.length > 0) {
    config.sections = raw.sections.map((s: Record<string, unknown>) => transformSection(s))
  }

  if (Array.isArray(raw.static_sections) && raw.static_sections.length > 0) {
    config.staticSections = raw.static_sections.map((s: Record<string, unknown>) => ({
      title: String(s.title ?? ''),
      sectionName: String(s.section_name ?? ''),
      ...(s.grid_cols != null ? { gridCols: String(s.grid_cols) } : {}),
      items: transformItems(s.items) ?? [],
    }))
  }

  return config
}

async function fetchCmsListicle(name: string): Promise<ListicleConfig | null> {
  const CMS_API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL
  if (!CMS_API_URL) {
    throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
  }

  const params = new URLSearchParams({
    'filters[key][$eq]': name,
    'populate[items]': '*',
    'populate[sections][populate][items]': '*',
    'populate[sections][populate][subsections][populate][items]': '*',
    'populate[static_sections][populate][items]': '*',
  })

  const res = await cmsFetch(`${CMS_API_URL}/api/listicles?${params.toString()}`, {
    cache: 'force-cache',
    next: {
      tags: ['listicles', `listicle-${name}`],
    },
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  const entries = json?.data
  if (!Array.isArray(entries) || entries.length === 0) {
    return null
  }

  return transformCmsData(entries[0] as Record<string, unknown>)
}

async function resolveListicle(name: string): Promise<ListicleConfig | null> {
  if (hasCMSContentConfig()) {
    return fetchCmsListicle(name)
  }
  return readLocalListicle(name)
}

async function cachedResolveListicle(name: string): Promise<ListicleConfig> {
  'use cache'
  cacheLife({ revalidate: CMS_REVALIDATE_INTERVAL })
  cacheTag('listicles', `listicle-${name}`)
  const result = await resolveListicle(name)
  if (!result) {
    throw new Error(`Empty listicle received for "${name}", skipping cache`)
  }
  return result
}

async function getCachedListicle(name: string): Promise<ListicleConfig | null> {
  if (isLocalContentOverlayEnabled()) {
    return resolveListicle(name)
  }
  return cachedResolveListicle(name)
}

export async function getListicleConfigFromCms(name: string): Promise<ListicleConfig | null> {
  try {
    return await getCachedListicle(name)
  } catch (cacheError) {
    console.warn(`Cached listicle fetch failed for "${name}", retrying without cache:`, cacheError)
    try {
      return await resolveListicle(name)
    } catch (directError) {
      console.error(`Direct listicle fetch also failed for "${name}":`, directError)
      return null
    }
  }
}

import type { HubNavItem, SidebarCategory, SidebarDoc, SidebarItem } from './types'

export function normalizeRoute(route: string) {
  if (!route) return ''
  if (route.endsWith('/')) {
    return route.slice(0, -1)
  }
  return route
}

export function normalizeLanguage(lang?: string | null) {
  return (lang || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function filterByLanguage(items: HubNavItem[], language: string | null): SidebarItem[] {
  if (language === 'ALL') {
    return items as SidebarItem[]
  }
  return items
    .map((item) => {
      if (item.type === 'doc') {
        if (
          item.language &&
          language &&
          normalizeLanguage(item.language) !== normalizeLanguage(language)
        ) {
          return null
        }
        return item
      }

      const filteredChildren = filterByLanguage(item.items, language)
      if (!filteredChildren.length) {
        return null
      }
      return {
        ...item,
        items: filteredChildren,
      }
    })
    .filter(Boolean) as SidebarItem[]
}

export function findFirstDoc(items: SidebarItem[]): SidebarDoc | undefined {
  for (const item of items) {
    if (item.type === 'doc') return item
    const child = findFirstDoc(item.items)
    if (child) return child
  }
  return undefined
}

export function categoryContainsRoute(category: SidebarCategory, route: string) {
  for (const item of category.items) {
    if (item.type === 'doc' && normalizeRoute(item.route) === route) return true
    if (item.type === 'category' && categoryContainsRoute(item, route)) return true
  }
  return false
}

export function findDocByRoute(items: SidebarItem[], route: string): SidebarDoc | null {
  for (const item of items) {
    if (item.type === 'doc' && normalizeRoute(item.route) === route) return item
    if (item.type === 'category') {
      const found = findDocByRoute(item.items, route)
      if (found) return found
    }
  }
  return null
}

export function findFirstDocWithLanguage(
  items: SidebarItem[],
  language: string | null
): SidebarDoc | undefined {
  const target = normalizeLanguage(language)
  for (const item of items) {
    if (item.type === 'doc' && normalizeLanguage(item.language) === target) return item
    if (item.type === 'category') {
      const found = findFirstDocWithLanguage(item.items, language)
      if (found) return found
    }
  }
  return undefined
}

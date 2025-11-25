import type { ReactNode } from 'react'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors, Blog, Comparison, Guide, Opentelemetry } from 'contentlayer/generated'

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

export type HubPathMeta = {
  key: string
  label: string
  firstRoute?: string
}

export type HubNavDoc = {
  type: 'doc'
  route: string
  label: string
  language?: string
}

export type HubNavCategory = {
  type: 'category'
  label: string
  route?: string
  items: HubNavItem[]
}

export type HubNavItem = HubNavDoc | HubNavCategory

export type SidebarCategory = {
  type: 'category'
  label: string
  route?: string
  items: SidebarItem[]
}

export type SidebarDoc = {
  type: 'doc'
  route: string
  label: string
  language?: string
}

export type SidebarItem = SidebarCategory | SidebarDoc

export interface LayoutProps {
  content: CoreContent<Blog | Comparison | Guide | Opentelemetry>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  navItems: HubNavItem[]
  currentHubPath: string
  pathMeta: HubPathMeta[]
  defaultLanguage: string | null
  availableLanguages: string[]
  currentRoute: string
}

export type LanguageOption = { value: string; label: string }

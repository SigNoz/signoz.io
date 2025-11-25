import hubConfig from '@/constants/opentelemetry_hub.json'
import { LEARN_CHAPTER_ORDER } from '@/utils/opentelemetryHub'
import {
  allBlogs,
  allComparisons,
  allGuides,
  allOpentelemetries,
  type Blog,
  type Comparison,
  type Guide,
  type Opentelemetry,
} from 'contentlayer/generated'
import { coreContent, type CoreContent } from 'pliny/utils/contentlayer'
import BlogPostCard from '../Shared/BlogPostCard'
import SearchInput from '../Shared/Search'
import React from 'react'
import { filterData } from 'app/utils/common'
import { Frown } from 'lucide-react'

type HubDoc = CoreContent<Blog | Comparison | Guide | Opentelemetry>

type HubChapterGroup = {
  key: string
  label: string
  docs: HubDoc[]
}

type HubChapterContent = {
  key: string
  label: string
  groups: HubChapterGroup[]
}

type HubConfigArticle = {
  url: string
  language?: string
}

type HubConfigGroup = {
  key: string
  label: string
  articles?: HubConfigArticle[]
  sections?: HubConfigGroup[]
}

type HubConfigPath = {
  key: string
  label: string
  chapters?: HubConfigGroup[]
  sections?: HubConfigGroup[]
  articles?: HubConfigArticle[]
}

const docCollections = [
  ...allBlogs,
  ...allComparisons,
  ...allGuides,
  ...allOpentelemetries,
] as Array<Blog | Comparison | Guide | Opentelemetry>

const normalizedDocMap = new Map<string, HubDoc>()
const docLanguageMap = new Map<string, string>()

docCollections.forEach((doc) => {
  const content = coreContent(doc) as HubDoc
  const normalizedPath = normalizeRoute(`/${content.path}`)
  normalizedDocMap.set(normalizedPath, content)
})

function normalizeRoute(route: string) {
  if (!route) return '/'
  const withoutDomain = route.replace(/^https?:\/\/[^/]+/i, '')
  const withLeadingSlash = withoutDomain.startsWith('/') ? withoutDomain : `/${withoutDomain}`
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')) {
    return withLeadingSlash.slice(0, -1)
  }
  return withLeadingSlash
}

function setDocLanguage(doc: HubDoc | null, language?: string) {
  if (!doc || !language) return
  docLanguageMap.set(doc.path, language)
}

function getDocLanguage(doc: HubDoc): string | undefined {
  return docLanguageMap.get(doc.path)
}

function findDocByUrl(url: string, language?: string): HubDoc | null {
  const normalized = normalizeRoute(url)
  const doc = normalizedDocMap.get(normalized) ?? null
  if (doc) {
    setDocLanguage(doc, language)
  }
  return doc
}

function flattenGroups(group: HubConfigGroup): HubChapterGroup[] {
  const groups: HubChapterGroup[] = []

  if (group.articles?.length) {
    const docs = group.articles
      .map((article) => findDocByUrl(article.url, article.language))
      .filter(Boolean) as HubDoc[]
    if (docs.length) {
      groups.push({
        key: group.key,
        label: group.label,
        docs,
      })
    }
  }

  if (group.sections?.length) {
    group.sections.forEach((section) => {
      groups.push(...flattenGroups(section))
    })
  }

  return groups
}

function buildHubContent() {
  const docRegistry = new Map<string, HubDoc>()
  const chapters: HubChapterContent[] = []

  const paths = hubConfig.paths as HubConfigPath[]
  const learnPath = paths.find((path) => path.key === 'learn')

  const sortedChapters = (learnPath?.chapters ?? [])
    .filter((chapter) => chapter.key !== 'comparisons')
    .sort((a, b) => {
      const aIdx = LEARN_CHAPTER_ORDER.indexOf(a.key)
      const bIdx = LEARN_CHAPTER_ORDER.indexOf(b.key)
      return (
        (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
        (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx)
      )
    })

  sortedChapters.forEach((chapter) => {
    const groups = flattenGroups(chapter).filter((group) => group.docs.length)
    if (!groups.length) return

    groups.forEach((group) => {
      group.docs.forEach((doc) => docRegistry.set(doc.path, doc))
    })

    chapters.push({
      key: chapter.key,
      label: chapter.label,
      groups,
    })
  })

  const quickStartPath = paths.find((path) => path.key === 'quick-start')
  const quickStartDocs = (quickStartPath?.articles
    ?.map((article) => findDocByUrl(article.url, article.language))
    .filter(Boolean) ?? []) as HubDoc[]

  quickStartDocs.forEach((doc) => docRegistry.set(doc.path, doc))

  return {
    chapters,
    quickStartDocs,
    searchableDocs: Array.from(docRegistry.values()),
  }
}

const {
  chapters: HUB_CHAPTERS,
  quickStartDocs: QUICK_START_DOCS,
  searchableDocs: HUB_DOCS,
} = buildHubContent()

type LanguageOption = {
  key: string
  label: string
}

const AVAILABLE_LANGUAGES: LanguageOption[] = (() => {
  const map = new Map<string, string>()
  Array.from(docLanguageMap.values()).forEach((lang) => {
    const key = normalizeLanguageKey(lang)
    if (!key) return
    if (!map.has(key)) {
      map.set(key, formatLanguageLabel(lang))
    }
  })
  return Array.from(map.entries())
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([key, label]) => ({ key, label }))
})()

interface OpenTelemetryPageHeaderProps {
  onSearch: (e) => void
}

const OpenTelemetryPageHeader: React.FC<OpenTelemetryPageHeaderProps> = ({ onSearch }) => {
  return (
    <section className="mb-[72px] flex max-w-[697px] flex-col leading-[143%]">
      <h2 className="mb-0 self-start text-sm font-medium uppercase tracking-wider text-signoz_sakura-500 dark:text-signoz_sakura-400">
        resources
      </h2>
      <h1 className="my-0 mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        OpenTelemetry
      </h1>
      <p className="my-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
        Articles on OpenTelemetry concepts, implementation, and its use cases.
      </p>

      <SearchInput placeholder={'Search for a blog...'} onSearch={onSearch} />
    </section>
  )
}

export default function OpenTelemetry() {
  const [searchValue, setSearchValue] = React.useState('')
  const [activeLanguageKey, setActiveLanguageKey] = React.useState('ALL')
  const trimmedSearch = searchValue.trim()
  const hasSearchValue = trimmedSearch.length > 0

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const searchResults = React.useMemo<HubDoc[]>(() => {
    if (!hasSearchValue) return []
    return filterData(HUB_DOCS, trimmedSearch) as HubDoc[]
  }, [hasSearchValue, trimmedSearch])

  const matchesLanguage = React.useCallback(
    (doc: HubDoc) => {
      if (activeLanguageKey === 'ALL') return true
      const docLanguage = getDocLanguage(doc)
      if (!docLanguage) return false
      return normalizeLanguageKey(docLanguage) === activeLanguageKey
    },
    [activeLanguageKey]
  )

  const renderChapterGroups = (chapter: HubChapterContent) => {
    return chapter.groups.map((group) => {
      const showGroupTitle =
        chapter.groups.length > 1 || (group.label && group.label !== chapter.label)
      const docs = group.docs.filter(matchesLanguage)
      if (!docs.length) {
        return null
      }

      return (
        <div key={`${chapter.key}-${group.key}`} className="mt-6">
          {showGroupTitle && (
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-stone-200">
              {group.label}
            </h3>
          )}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <BlogPostCard blog={doc} key={doc.path} />
            ))}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="comparisons">
      <OpenTelemetryPageHeader onSearch={handleSearch} />

      {AVAILABLE_LANGUAGES.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          <LanguagePill
            label="All"
            active={activeLanguageKey === 'ALL'}
            onClick={() => setActiveLanguageKey('ALL')}
          />
          {AVAILABLE_LANGUAGES.map((language) => (
            <LanguagePill
              key={language.key}
              label={language.label}
              active={activeLanguageKey === language.key}
              onClick={() => setActiveLanguageKey(language.key)}
            />
          ))}
        </div>
      )}

      {hasSearchValue ? (
        <>
          {searchResults.filter(matchesLanguage).length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.filter(matchesLanguage).map((post) => (
                <BlogPostCard blog={post} key={post.path} />
              ))}
            </div>
          ) : (
            <div className="no-blogs my-8 flex items-center gap-4 font-mono font-bold">
              <Frown size={16} /> No Articles found
            </div>
          )}
        </>
      ) : (
        <>
          {QUICK_START_DOCS.filter(matchesLanguage).length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-stone-100">
                  OpenTelemetry Quick Start
                </h2>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {QUICK_START_DOCS.filter(matchesLanguage).map((doc) => (
                  <BlogPostCard blog={doc} key={doc.path} />
                ))}
              </div>
            </section>
          )}

          {HUB_CHAPTERS.map((chapter) => {
            const hasDocs =
              chapter.groups.flatMap((group) => group.docs).filter(matchesLanguage).length > 0
            if (!hasDocs) return null
            return (
              <section key={chapter.key} className="mb-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-stone-100">
                    {chapter.label}
                  </h2>
                </div>
                {renderChapterGroups(chapter)}
              </section>
            )
          })}
        </>
      )}

      {!hasSearchValue && HUB_CHAPTERS.length === 0 && QUICK_START_DOCS.length === 0 && (
        <div className="no-blogs my-8 flex items-center gap-4 font-mono font-bold">
          <Frown size={16} /> No Articles found
        </div>
      )}
    </div>
  )
}

function normalizeLanguageKey(label: string) {
  return label.trim().toLowerCase()
}

function formatLanguageLabel(label: string) {
  if (!label) return ''
  return label
}

type LanguagePillProps = {
  label: string
  active: boolean
  onClick: () => void
}

function LanguagePill({ label, active, onClick }: LanguagePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
        active
          ? 'bg-indigo-500 text-white'
          : 'bg-signoz_ink-400/30 text-gray-700 hover:bg-signoz_ink-400/60 dark:text-gray-200'
      }`}
    >
      {label}
    </button>
  )
}

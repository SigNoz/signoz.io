import type { SuggestedDoc } from './types'

const STOP_WORDS = new Set(['docs', 'doc', 'the', 'and', 'for', 'with', 'to', 'from', 'page'])
const MIGRATION_TERMS = new Set([
  'migrate',
  'migration',
  'datadog',
  'newrelic',
  'elk',
  'grafana',
  'honeycomb',
])

const tokenize = (value: string): string[] => {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.replace(/\d+$/g, ''))
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
}

export const tokenizePathForSuggestions = (pathname: string): string[] => tokenize(pathname)

const scoreSuggestion = (doc: SuggestedDoc, queryTokens: string[]): number => {
  if (queryTokens.length === 0) return 0

  const haystack = `${doc.title} ${doc.href}`.toLowerCase()
  const docTokens = tokenize(haystack)
  const docTokenSet = new Set(docTokens)
  let score = 0

  for (const token of queryTokens) {
    if (docTokenSet.has(token)) {
      score += 8
      continue
    }

    if (docTokens.some((docToken) => docToken.startsWith(token) || token.startsWith(docToken))) {
      score += 4
      continue
    }

    if (haystack.includes(token)) {
      score += 2
    }
  }

  const hasMigrationIntent = queryTokens.some((token) => MIGRATION_TERMS.has(token))
  const isMigrationDoc = Array.from(MIGRATION_TERMS).some((term) => haystack.includes(term))
  if (!hasMigrationIntent && isMigrationDoc) {
    score -= 8
  }

  return score
}

export const rerankSuggestions = (docs: SuggestedDoc[], queryTokens: string[]): SuggestedDoc[] => {
  return docs
    .map((doc) => ({ doc, score: scoreSuggestion(doc, queryTokens) }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.doc)
}

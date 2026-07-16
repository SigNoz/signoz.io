const { COLLECTION_SCHEMAS, RELATED_ARTICLE_TYPE_MAP } = require('./schemas')

// Pure helper — exported for unit testing and reuse by cms-adapter prefetch
function parseRelatedArticleUrl(url) {
  const cleaned = url.replace(/^\/+|\/+$/g, '')
  const slashIdx = cleaned.indexOf('/')
  if (slashIdx === -1) return null

  const prefix = cleaned.substring(0, slashIdx)
  const slug = cleaned.substring(slashIdx + 1)
  const articlePath = `/${slug.replace(/\/+$/, '')}`

  return { prefix, path: articlePath }
}

function createRelationResolver(cmsAdapter) {
  async function resolveRelations(folderName, frontmatter, entityCache) {
    const schema = COLLECTION_SCHEMAS[folderName]
    if (!schema.relations) return { relations: {}, warnings: [] }

    const relations = {}
    const warnings = []

    for (const [relationName, relationConfig] of Object.entries(schema.relations)) {
      const frontmatterValues = frontmatter[relationConfig.frontmatterField]

      if (
        !frontmatterValues ||
        !Array.isArray(frontmatterValues) ||
        frontmatterValues.length === 0
      ) {
        continue
      }

      const isTagsOrKeywords = relationName === 'tags' || relationName === 'keywords'

      let entities
      if (entityCache && entityCache[relationConfig.endpoint]) {
        entities = entityCache[relationConfig.endpoint]
      } else {
        const valuesToFind = frontmatterValues
        const filterField = relationConfig.filterKey ? 'value' : relationConfig.matchField
        entities = await cmsAdapter.fetchEntitiesByFilter(
          relationConfig.endpoint,
          filterField,
          valuesToFind
        )
        entities = cmsAdapter.filterEntitiesByDeploymentStatus(entities)
      }

      if (entities.length === 0 && !isTagsOrKeywords) {
        console.warn(`  ⚠️ No entities found in ${relationConfig.endpoint}`)
        continue
      }

      const matchedIds = []
      const unmatchedValues = []

      for (const value of frontmatterValues) {
        let matched = null

        if (relationConfig.filterKey && relationConfig.matchValue) {
          matched = entities.find((entity) => {
            const keyMatch = entity?.key && entity?.key.includes(folderName)
            const valueMatch = entity?.value && entity?.value === value
            return keyMatch && valueMatch
          })
        } else if (relationConfig.matchValue) {
          matched = entities.find((entity) => entity?.value && entity?.value === value)
        } else {
          matched = entities.find((entity) => entity?.[relationConfig.matchField] === value)
        }

        if (matched && matched?.documentId) {
          matchedIds.push(matched.documentId)
        } else if (matched && !matched?.documentId) {
          unmatchedValues.push(value)
          console.warn(
            `    ⚠️ Entity found for "${value}" but no documentId in ${relationConfig.endpoint}`
          )
        } else {
          console.warn(`    ⚠️ No match found for "${value}" in ${relationConfig.endpoint}`)

          if (isTagsOrKeywords) {
            try {
              const newEntry = await cmsAdapter.createTagOrKeyword(
                relationConfig.endpoint,
                value,
                folderName
              )

              if (newEntry && newEntry.documentId) {
                matchedIds.push(newEntry.documentId)
                entities.push(newEntry)
              } else {
                unmatchedValues.push(value)
                console.error(`    ❌ Created entry but no documentId returned for "${value}"`)
              }
            } catch (createError) {
              unmatchedValues.push(value)
              console.error(
                `    ❌ Failed to auto-create ${relationName} for "${value}": ${createError.message}`
              )
            }
          } else {
            unmatchedValues.push(value)
          }
        }
      }

      if (unmatchedValues.length > 0) {
        console.warn(
          `  ⚠️ ${relationName}: ${unmatchedValues.length} unmatched value(s): ${unmatchedValues.join(', ')}`
        )
        warnings.push({ relationName, unmatchedValues })
      }

      if (matchedIds.length > 0) {
        relations[relationName] = matchedIds
      } else {
        console.warn(`  ⚠️ ${relationName}: No valid relations found, key will be omitted`)
      }
    }

    return { relations, warnings }
  }

  async function resolveRelatedArticles(frontmatter, relatedArticleCache) {
    const urls = frontmatter.related_articles
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return { components: [], warnings: [] }
    }

    const components = []
    const warnings = []

    const typesToFetch = new Set()
    const parsedUrls = []

    for (const url of urls) {
      const parsed = parseRelatedArticleUrl(url)
      if (!parsed) {
        warnings.push({ url, reason: 'Could not parse URL' })
        parsedUrls.push(null)
        continue
      }

      const typeInfo = RELATED_ARTICLE_TYPE_MAP[parsed.prefix]
      if (!typeInfo) {
        warnings.push({ url, reason: `Unknown content type prefix: ${parsed.prefix}` })
        parsedUrls.push(null)
        continue
      }

      typesToFetch.add(parsed.prefix)
      parsedUrls.push({ ...parsed, typeInfo, originalUrl: url })
    }

    // Use provided cache or fetch on-demand
    const cache = relatedArticleCache || {}

    for (const prefix of typesToFetch) {
      if (!cache[prefix]) {
        const typeInfo = RELATED_ARTICLE_TYPE_MAP[prefix]
        const pathsNeeded = parsedUrls.filter((p) => p && p.prefix === prefix).map((p) => p.path)
        try {
          let entities = await cmsAdapter.fetchEntitiesByFilter(
            typeInfo.endpoint,
            'path',
            pathsNeeded
          )
          entities = cmsAdapter.filterEntitiesByDeploymentStatus(entities)
          cache[prefix] = entities
        } catch (err) {
          console.warn(`    Could not fetch ${prefix} from Strapi: ${err.message}`)
          cache[prefix] = []
        }
      }
    }

    for (const parsed of parsedUrls) {
      if (!parsed) continue

      const { prefix, path: articlePath, typeInfo, originalUrl } = parsed
      const entities = cache[prefix] || []

      const match = entities.find((e) => e.path === articlePath)

      if (!match || !match.documentId) {
        warnings.push({
          url: originalUrl,
          reason: `Document not found in Strapi (${typeInfo.endpoint}). Will be resolved after content is migrated.`,
        })
        continue
      }

      const relationFieldName = typeInfo.content_type.replace(/-/g, '_')
      const entry = {
        content_type: typeInfo.content_type,
        [relationFieldName]: match.documentId,
      }

      components.push(entry)
    }

    return { components, warnings }
  }

  return { resolveRelations, resolveRelatedArticles }
}

module.exports = { createRelationResolver, parseRelatedArticleUrl }

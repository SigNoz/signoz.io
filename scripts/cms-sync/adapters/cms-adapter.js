const axios = require('axios')

function createCmsAdapter({ apiUrl, apiToken, retryFn, deploymentStatus }) {
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
  }

  function filterEntitiesByDeploymentStatus(entities) {
    if (!Array.isArray(entities) || entities.length === 0) {
      return entities
    }

    return entities.filter((entity) => {
      if (!Object.prototype.hasOwnProperty.call(entity, 'deployment_status')) {
        return true
      }
      if (entity.deployment_status === null || entity.deployment_status === undefined) {
        return true
      }
      return entity.deployment_status === deploymentStatus
    })
  }

  async function fetchEntitiesByFilter(endpoint, filterField, values) {
    if (!values || values.length === 0) return []

    const batchSize = 100
    const allEntities = []

    for (let i = 0; i < values.length; i += batchSize) {
      const batch = values.slice(i, i + batchSize)
      const filterParams = {}
      batch.forEach((val, idx) => {
        filterParams[`filters[${filterField}][$in][${idx}]`] = val
      })

      let page = 1
      let pageCount = 1

      do {
        const currentPage = page
        const response = await retryFn(
          () =>
            axios.get(`${apiUrl}/api/${endpoint}`, {
              params: {
                ...filterParams,
                'pagination[page]': currentPage,
                'pagination[pageSize]': 100,
              },
              headers,
            }),
          `fetchFiltered(${endpoint}, ${filterField}, page=${currentPage})`
        )

        const data = response.data.data || []
        allEntities.push(...data)

        const meta = response.data.meta || {}
        const pagination = meta.pagination || {}
        pageCount = pagination.pageCount || 1
        page++
      } while (page <= pageCount)
    }

    return allEntities
  }

  async function createEntry(endpoint, data) {
    try {
      const response = await retryFn(
        () => axios.post(`${apiUrl}/api/${endpoint}`, { data }, { headers }),
        `createEntry(${endpoint})`
      )
      return response.data
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message
      const errorDetails = error.response?.data?.error?.details || {}
      console.error(`  ❌ Create failed: ${errorMsg}`)
      if (Object.keys(errorDetails).length > 0) {
        console.error(`  Error details:`, JSON.stringify(errorDetails, null, 2))
      }
      if (error.response) {
        console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
      }
      throw error
    }
  }

  async function updateEntry(endpoint, documentId, data) {
    try {
      const response = await retryFn(
        () => axios.put(`${apiUrl}/api/${endpoint}/${documentId}`, { data }, { headers }),
        `updateEntry(${endpoint}, ${documentId})`
      )
      return response.data
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message
      const errorDetails = error.response?.data?.error?.details || {}
      console.error(`  ❌ Update failed: ${errorMsg}`)
      if (Object.keys(errorDetails).length > 0) {
        console.error(`  Error details:`, JSON.stringify(errorDetails, null, 2))
      }
      if (error.response) {
        console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
      }
      throw error
    }
  }

  async function deleteEntry(endpoint, documentId) {
    try {
      const response = await retryFn(
        () => axios.delete(`${apiUrl}/api/${endpoint}/${documentId}`, { headers }),
        `deleteEntry(${endpoint}, ${documentId})`
      )
      return response.data
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message
      console.error(`  ❌ Delete failed: ${errorMsg}`)
      if (error.response) {
        console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
      }
      throw new Error(`Failed to delete entry: ${errorMsg}`)
    }
  }

  async function createTagOrKeyword(endpoint, value, folderName) {
    try {
      const key = `${folderName}-${value}`
      const data = { key, value }

      const response = await retryFn(
        () => axios.post(`${apiUrl}/api/${endpoint}`, { data }, { headers }),
        `createTagOrKeyword(${endpoint}, ${value})`
      )

      return response.data.data
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message
      console.error(`    ❌ Failed to create ${endpoint} entry: ${errorMsg}`)
      throw error
    }
  }

  async function prefetchRelationEntities(pendingOperations, schemas) {
    const endpointValues = {}

    for (const op of pendingOperations) {
      if (op.type === 'delete') continue
      const schema = schemas[op.folderName]
      if (!schema?.relations) continue

      for (const [, relationConfig] of Object.entries(schema.relations)) {
        const { endpoint, matchField, frontmatterField, filterKey } = relationConfig
        const fmValues = op.frontmatter?.[frontmatterField]
        if (!fmValues || !Array.isArray(fmValues) || fmValues.length === 0) continue

        if (!endpointValues[endpoint]) {
          endpointValues[endpoint] = {
            matchField: filterKey ? 'value' : matchField,
            values: new Set(),
          }
        }
        for (const v of fmValues) endpointValues[endpoint].values.add(v)
      }
    }

    const entityCache = {}
    const endpointNames = Object.keys(endpointValues)
    console.log(
      `\n📦 Prefetching relation entities for ${endpointNames.length} endpoint(s): ${endpointNames.join(', ')}`
    )

    for (const [endpoint, { matchField, values }] of Object.entries(endpointValues)) {
      try {
        const entities = await fetchEntitiesByFilter(endpoint, matchField, [...values])
        entityCache[endpoint] = filterEntitiesByDeploymentStatus(entities)
        console.log(
          `  ✅ ${endpoint}: ${entityCache[endpoint].length} entities (filtered from ${values.size} values)`
        )
      } catch (err) {
        console.warn(`  ⚠️ Failed to prefetch ${endpoint}: ${err.message}`)
        entityCache[endpoint] = []
      }
    }

    // Prefetch related_articles paths
    const { RELATED_ARTICLE_TYPE_MAP } = require('../schemas')
    const { parseRelatedArticleUrl } = require('../relation-resolver')
    const relatedArticleCache = {}

    const relatedPathsByPrefix = {}
    for (const op of pendingOperations) {
      if (op.type === 'delete') continue
      const urls = op.frontmatter?.related_articles
      if (!urls || !Array.isArray(urls)) continue

      for (const url of urls) {
        const parsed = parseRelatedArticleUrl(url)
        if (!parsed) continue
        const typeInfo = RELATED_ARTICLE_TYPE_MAP[parsed.prefix]
        if (!typeInfo) continue

        if (!relatedPathsByPrefix[parsed.prefix]) {
          relatedPathsByPrefix[parsed.prefix] = new Set()
        }
        relatedPathsByPrefix[parsed.prefix].add(parsed.path)
      }
    }

    for (const [prefix, paths] of Object.entries(relatedPathsByPrefix)) {
      const typeInfo = RELATED_ARTICLE_TYPE_MAP[prefix]
      try {
        let entities = await fetchEntitiesByFilter(typeInfo.endpoint, 'path', [...paths])
        entities = filterEntitiesByDeploymentStatus(entities)
        relatedArticleCache[prefix] = entities
        console.log(
          `  ✅ related_articles/${prefix}: ${entities.length} entities (filtered from ${paths.size} paths)`
        )
      } catch (err) {
        console.warn(`  ⚠️ Failed to prefetch related_articles/${prefix}: ${err.message}`)
        relatedArticleCache[prefix] = []
      }
    }

    return { entityCache, relatedArticleCache }
  }

  async function prefetchExistingEntries(pendingOperations, schemas) {
    const pathsByFolder = {}

    for (const op of pendingOperations) {
      if (!pathsByFolder[op.folderName]) {
        pathsByFolder[op.folderName] = []
      }
      pathsByFolder[op.folderName].push(op.pathField)
    }

    const entriesCache = {}
    const folderNames = Object.keys(pathsByFolder)
    console.log(
      `\n📦 Prefetching existing entries for ${folderNames.length} content type(s): ${folderNames.join(', ')}`
    )

    for (const folderName of folderNames) {
      const schema = schemas[folderName]
      if (!schema) continue

      const paths = pathsByFolder[folderName]

      try {
        const entities = await fetchEntitiesByFilter(schema.endpoint, 'path', paths)
        const filtered = filterEntitiesByDeploymentStatus(entities)
        const entryMap = new Map()
        for (const entity of filtered) {
          if (entity.path) {
            entryMap.set(entity.path, entity)
          }
        }
        entriesCache[folderName] = entryMap
        console.log(
          `  ✅ ${schema.endpoint}: ${entryMap.size} entries cached (queried ${paths.length} paths)`
        )
      } catch (err) {
        console.warn(`  ⚠️ Failed to prefetch ${schema.endpoint}: ${err.message}`)
        entriesCache[folderName] = new Map()
      }
    }

    return entriesCache
  }

  async function putSidenav(items) {
    const url = `${apiUrl}/api/docs-side-nav`
    const body = { data: { items } }

    await retryFn(async () => {
      const response = await axios.put(url, body, { headers })
      return response.data
    }, 'sync-sidenav')
  }

  async function fetchListicle(key) {
    const response = await retryFn(
      () =>
        axios.get(`${apiUrl}/api/listicles`, {
          params: { 'filters[key][$eq]': key },
          headers,
        }),
      `fetchListicle(${key})`
    )
    return response.data.data || []
  }

  async function createListicle(data) {
    return retryFn(
      () => axios.post(`${apiUrl}/api/listicles`, { data }, { headers }),
      `createListicle`
    )
  }

  async function updateListicle(documentId, data) {
    return retryFn(
      () => axios.put(`${apiUrl}/api/listicles/${documentId}`, { data }, { headers }),
      `updateListicle(${documentId})`
    )
  }

  async function deleteListicle(documentId) {
    return retryFn(
      () => axios.delete(`${apiUrl}/api/listicles/${documentId}`, { headers }),
      `deleteListicle(${documentId})`
    )
  }

  return {
    fetchEntitiesByFilter,
    filterEntitiesByDeploymentStatus,
    createEntry,
    updateEntry,
    deleteEntry,
    createTagOrKeyword,
    prefetchRelationEntities,
    prefetchExistingEntries,
    putSidenav,
    fetchListicle,
    createListicle,
    updateListicle,
    deleteListicle,
  }
}

module.exports = { createCmsAdapter }

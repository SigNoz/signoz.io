const fs = require('fs')
const matter = require('gray-matter')
const axios = require('axios')

// Configuration
const CMS_API_URL = process.env.CMS_API_URL
const CMS_API_TOKEN = process.env.CMS_API_TOKEN
const SYNC_FOLDERS = JSON.parse(process.env.SYNC_FOLDERS)
const DEPLOYMENT_STATUS = process.env.DEPLOYMENT_STATUS
const CHANGED_FILES = JSON.parse(process.env.CHANGED_FILES || '[]')
const DELETED_FILES = JSON.parse(process.env.DELETED_FILES || '[]')

// Strapi Collection Type Schemas
const COLLECTION_SCHEMAS = {
  faqs: {
    apiPath: 'api::faq.faq',
    endpoint: 'faqs',
    fields: ['title', 'description', 'date', 'path', 'content', 'deployment_status'],
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key', // Match against author.key
        frontmatterField: 'authors', // Array of author keys in frontmatter
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key', // Match against tag.key
        frontmatterField: 'tags', // Array of tag values in frontmatter
        filterKey: true, // Also check if tag.key contains 'faq' or 'faqs'
        matchValue: true, // Match against tag.value (case insensitive)
      },
      related_faqs: {
        endpoint: 'faqs',
        matchField: 'path', // Match against faq.path
        frontmatterField: 'related_faqs', // Array of FAQ paths in frontmatter
      },
    },
  },
  'case-study': {
    apiPath: 'api::case-study.case-study',
    endpoint: 'case-studies',
    fields: ['title', 'description', 'image', 'path', 'content', 'deployment_status'],
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key', // Match against author.key
        frontmatterField: 'authors', // Array of author keys in frontmatter
      },
    },
  },
  comparisons: {
    apiPath: 'api::comparison.comparison',
    endpoint: 'comparisons',
    fields: ['title', 'description', 'image', 'path', 'content', 'deployment_status'],
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key', // Match against author.key
        frontmatterField: 'authors', // Array of author keys in frontmatter
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key', // Match against tag.key
        frontmatterField: 'tags', // Array of tag values in frontmatter
        filterKey: true, // Also check if tag.key contains 'faq' or 'faqs'
        matchValue: true, // Match against tag.value (case insensitive)
      },
      related_comparisons: {
        endpoint: 'comparisons',
        matchField: 'path', // Match against comparison.path
        frontmatterField: 'related_comparisons', // Array of comparison paths in frontmatter
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key', // Match against keyword.key
        frontmatterField: 'keywords', // Array of keyword values in frontmatter
        filterKey: true, // Also check if keyword.key contains 'comparison' or 'comparisons'
        matchValue: true, // Match against keyword.value (case insensitive)
      },
    },
  },
  guides: {
    apiPath: 'api::guide.guide',
    endpoint: 'guides',
    fields: ['title', 'description', 'image', 'path', 'content', 'deployment_status', 'date'],
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key', // Match against author.key
        frontmatterField: 'authors', // Array of author keys in frontmatter
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key', // Match against keyword.key
        frontmatterField: 'keywords', // Array of keyword values in frontmatter
        filterKey: true, // Also check if keyword.key contains 'comparison' or 'comparisons'
        matchValue: true, // Match against keyword.value (case insensitive)
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key', // Match against tag.key
        frontmatterField: 'tags', // Array of tag values in frontmatter
        filterKey: true, // Also check if tag.key contains 'faq' or 'faqs'
        matchValue: true, // Match against tag.value (case insensitive)
      },
      related_guides: {
        endpoint: 'guides',
        matchField: 'path', // Match against guide.path
        frontmatterField: 'related_guides', // Array of guide paths in frontmatter
      },
    },
  },
  authors: {
    apiPath: 'api::author.author',
    endpoint: 'authors',
    fields: ['key', 'name', 'title', 'url', 'image_url'],
  },
  tags: {
    apiPath: 'api::tag.tag',
    endpoint: 'tags',
    fields: ['value', 'key', 'description'],
  },
  keywords: {
    apiPath: 'api::keyword.keyword',
    endpoint: 'keywords',
    fields: ['value', 'key', 'description'],
  },
}

// Helper: Extract folder name from file path
function getFolderName(filePath) {
  const parts = filePath.split('/')
  if (parts[0] === 'data' && parts.length > 1) {
    return parts[1]
  }
  return null
}

// Helper: Generate path field from file path
function generatePathField(filePath, folderName) {
  const parts = filePath.split('/')
  const folderIndex = parts.indexOf(folderName)
  if (folderIndex === -1) return null

  const pathParts = parts.slice(folderIndex + 1)
  const fileName = pathParts[pathParts.length - 1]
  const fileNameWithoutExt = fileName.replace(/\.(mdx?|md)$/, '')

  pathParts[pathParts.length - 1] = fileNameWithoutExt
  return '/' + pathParts.join('/')
}

// Helper: Parse MDX file
function parseMDXFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)
    return { frontmatter, content }
  } catch (error) {
    throw new Error(`Failed to parse file ${filePath}: ${error.message}`)
  }
}

// Helper: Fetch all entities from Strapi endpoint
async function fetchAllEntities(endpoint) {
  try {
    const response = await axios.get(`${CMS_API_URL}/api/${endpoint}`, {
      params: {
        pagination: { pageSize: 100 }, // Adjust if you have more
      },
      headers: {
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data.data || []
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}: ${error.message}`)
    return []
  }
}

// Helper: Filter entities by deployment_status when available
function filterEntitiesByDeploymentStatus(entities) {
  console.log(
    `  🔍 [DEBUG] Filtering entities by deployment_status: ${DEPLOYMENT_STATUS} ${entities.length} entities`
  )
  if (!Array.isArray(entities) || entities.length === 0) {
    return entities
  }

  const filteredEntities = entities.filter((entity) => {
    if (!Object.prototype.hasOwnProperty.call(entity, 'deployment_status')) {
      return true
    }

    if (entity.deployment_status === null || entity.deployment_status === undefined) {
      return true
    }

    return entity.deployment_status === DEPLOYMENT_STATUS
  })

  if (filteredEntities.length !== entities.length) {
    console.log(
      `  🔒 Filtered ${entities.length - filteredEntities.length} relation candidate(s) by deployment_status=${DEPLOYMENT_STATUS}`
    )
  }

  return filteredEntities
}

// Helper: Create a tag or keyword entry
async function createTagOrKeyword(endpoint, value, folderName) {
  try {
    // Generate key by appending folder name to the value (lowercase, hyphenated)
    const key = `${folderName}-${value}`

    const data = {
      key: key,
      value: value,
      // description is optional, so we don't include it
    }

    console.log(`    🆕 Creating new ${endpoint} entry:`)
    console.log(`       • key: "${key}"`)
    console.log(`       • value: "${value}"`)

    const response = await axios.post(
      `${CMS_API_URL}/api/${endpoint}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(
      `    ✅ Successfully created ${endpoint} entry with documentId: ${response.data.data.documentId}`
    )
    return response.data.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    console.error(`    ❌ Failed to create ${endpoint} entry: ${errorMsg}`)
    throw error
  }
}

// Helper: Resolve relation IDs
async function resolveRelations(folderName, frontmatter) {
  const schema = COLLECTION_SCHEMAS[folderName]
  if (!schema.relations) return { relations: {}, warnings: [] }

  const relations = {}
  const warnings = []

  for (const [relationName, relationConfig] of Object.entries(schema.relations)) {
    const frontmatterValues = frontmatter[relationConfig.frontmatterField]

    // Skip if no values in frontmatter
    if (!frontmatterValues || !Array.isArray(frontmatterValues) || frontmatterValues.length === 0) {
      console.log(`  ⏭️ Skipping ${relationName}: No values in frontmatter`)
      continue
    }

    console.log(`  🔗 Resolving ${relationName}: ${frontmatterValues.join(', ')}`)

    // Check if this is tags or keywords relation
    const isTagsOrKeywords = relationName === 'tags' || relationName === 'keywords'

    // Fetch all entities from the relation endpoint
    let entities = await fetchAllEntities(relationConfig.endpoint)
    entities = filterEntitiesByDeploymentStatus(entities)

    if (entities.length === 0 && !isTagsOrKeywords) {
      console.warn(`  ⚠️ No entities found in ${relationConfig.endpoint}`)
      continue
    }

    // Match entities based on configuration
    const matchedIds = []
    const unmatchedValues = []

    for (const value of frontmatterValues) {
      let matched = null

      if (relationConfig.filterKey && relationConfig.matchValue) {
        // Special case for tags: check key contains 'faq'/'faqs' AND value matches
        matched = entities.find((entity) => {
          const keyMatch =
            entity?.key && entity?.key.toLowerCase().includes(folderName.toLowerCase())

          const valueMatch = entity?.value && entity?.value.toLowerCase() === value.toLowerCase()

          return keyMatch && valueMatch
        })
      } else if (relationConfig.matchValue) {
        // Match against value field (case insensitive)
        matched = entities.find(
          (entity) => entity?.value && entity?.value.toLowerCase() === value.toLowerCase()
        )
      } else {
        // Match against specified field (exact match)
        matched = entities.find((entity) => entity?.[relationConfig.matchField] === value)
      }

      // Check if matched and has documentId
      if (matched && matched?.documentId) {
        matchedIds.push(matched.documentId)
        console.log(
          `    ✅ Matched "${value}" → ID: ${matched.documentId} with deployment_status: ${matched.deployment_status}`
        )
      } else if (matched && !matched?.documentId) {
        // Matched entity but no documentId
        unmatchedValues.push(value)
        console.warn(
          `    ⚠️ Entity found for "${value}" but no documentId in ${relationConfig.endpoint}`
        )
      } else {
        // No match found
        console.warn(`    ⚠️ No match found for "${value}" in ${relationConfig.endpoint}`)

        // Auto-create tags or keywords if not found
        if (isTagsOrKeywords) {
          try {
            console.log(`    🔧 Auto-creating missing ${relationName} entry for: "${value}"`)
            const newEntry = await createTagOrKeyword(relationConfig.endpoint, value, folderName)

            if (newEntry && newEntry.documentId) {
              matchedIds.push(newEntry.documentId)
              // Add to entities array so it's available for subsequent matches
              entities.push(newEntry)
              console.log(`    ✅ Auto-created and matched "${value}" → ID: ${newEntry.documentId}`)
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

    // Log unmatched values for this field
    if (unmatchedValues.length > 0) {
      console.warn(
        `  ⚠️ ${relationName}: ${unmatchedValues.length} unmatched value(s): ${unmatchedValues.join(', ')}`
      )
      warnings.push({
        relationName,
        unmatchedValues,
      })
    }

    // Only add relation if at least one valid documentId was found
    if (matchedIds.length > 0) {
      relations[relationName] = matchedIds
      console.log(`  ✅ ${relationName}: Resolved ${matchedIds.length} relation(s)`)
    } else {
      console.warn(`  ⚠️ ${relationName}: No valid relations found, key will be omitted`)
    }
  }

  return { relations, warnings }
}

// Helper: Map MDX data to Strapi schema
async function mapToStrapiSchema(folderName, frontmatter, content, pathField) {
  const schema = COLLECTION_SCHEMAS[folderName]
  if (!schema) {
    throw new Error(`No schema defined for folder: ${folderName}`)
  }

  // Base data
  const data = {
    path: pathField,
    content: content,
    deployment_status: DEPLOYMENT_STATUS,
    ...frontmatter,
  }

  // Resolve relations
  console.log(`  🔍 Resolving relations...`)
  const { relations, warnings } = await resolveRelations(folderName, frontmatter)

  // Remove raw frontmatter relation fields
  if (schema.relations) {
    console.log(`  🧹 [DEBUG] Cleaning up relation fields from frontmatter...`)
    for (const [relationName, relationConfig] of Object.entries(schema.relations)) {
      const fieldName = relationConfig.frontmatterField
      if (data[fieldName]) {
        console.log(
          `    🗑️ [DEBUG] Removing raw frontmatter field: ${fieldName} = ${JSON.stringify(data[fieldName])}`
        )
        delete data[fieldName]
      }
    }
  }

  if (Object.keys(relations).length > 0) {
    console.log(
      `  ➕ [DEBUG] Adding resolved relations to data:`,
      Object.keys(relations).join(', ')
    )
    Object.assign(data, relations)
  } else {
    console.log(`  ℹ️ [DEBUG] No relations were successfully resolved, none will be added`)
  }

  // Check for missing required fields
  const missingFields = schema.fields.filter(
    (field) => field !== 'deployment_status' && !(field in data)
  )

  if (missingFields.length > 0) {
    console.warn(`  ⚠️ Missing fields: ${missingFields.join(', ')}`)
  }

  return { data, warnings }
}

// Helper: Check if file exists in Strapi by path
async function findEntryByPath(folderName, pathField) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    console.log(
      `  🔍 [DEBUG] Searching for entry: endpoint=${schema.endpoint}, path=${pathField}, deployment_status=${DEPLOYMENT_STATUS}`
    )

    const response = await axios.get(`${CMS_API_URL}/api/${schema.endpoint}`, {
      params: {
        filters: { path: { $eq: pathField }, deployment_status: { $eq: DEPLOYMENT_STATUS } },
        pagination: { limit: 1 },
      },
      headers: {
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    console.log(`  🔍 [DEBUG] Response status: ${response.status}`)
    console.log(`  🔍 [DEBUG] Response data:`, JSON.stringify(response.data, null, 2))

    if (response.data.data && response.data.data.length > 0) {
      const entry = response.data.data[0]
      console.log(`  ✅ [DEBUG] Entry found:`, JSON.stringify(entry, null, 2))
      return entry
    }

    console.log(`  ℹ️ [DEBUG] No entry found`)
    return null
  } catch (error) {
    console.error(`  ❌ [DEBUG] Error in findEntryByPath:`, error.message)
    if (error.response) {
      console.error(`  ❌ [DEBUG] Response status:`, error.response.status)
      console.error(`  ❌ [DEBUG] Response data:`, JSON.stringify(error.response.data, null, 2))
    }
    throw new Error(`Failed to find entry by path: ${error.message}`)
  }
}

// Helper: Create entry in Strapi
async function createEntry(folderName, data) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    console.log(`  📝 [DEBUG] Creating entry in ${schema.endpoint}`)
    console.log(`  📝 [DEBUG] Data keys:`, Object.keys(data).join(', '))
    console.log(`  📝 [DEBUG] Full data:`, JSON.stringify(data, null, 2))

    const response = await axios.post(
      `${CMS_API_URL}/api/${schema.endpoint}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(`  ✅ [DEBUG] Create response:`, JSON.stringify(response.data, null, 2))
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    const errorDetails = error.response?.data?.error?.details || {}
    console.error(`  ❌ [DEBUG] Create failed: ${errorMsg}`)
    if (Object.keys(errorDetails).length > 0) {
      console.error(`  ❌ [DEBUG] Error details:`, JSON.stringify(errorDetails, null, 2))
    }
    if (error.response) {
      console.error(`  ❌ [DEBUG] Response status:`, error.response.status)
      console.error(`  ❌ [DEBUG] Response data:`, JSON.stringify(error.response.data, null, 2))
    }
    throw error
  }
}

// Helper: Update entry in Strapi
async function updateEntry(folderName, documentId, data) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    console.log(`  🔄 [DEBUG] Updating entry in ${schema.endpoint}`)
    console.log(`  🔄 [DEBUG] Document ID: ${documentId}`)
    console.log(`  🔄 [DEBUG] Update URL: ${CMS_API_URL}/api/${schema.endpoint}/${documentId}`)
    console.log(`  🔄 [DEBUG] Data keys:`, Object.keys(data).join(', '))
    console.log(`  🔄 [DEBUG] Full data:`, JSON.stringify(data, null, 2))

    const response = await axios.put(
      `${CMS_API_URL}/api/${schema.endpoint}/${documentId}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(`  ✅ [DEBUG] Update response:`, JSON.stringify(response.data, null, 2))
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    const errorDetails = error.response?.data?.error?.details || {}
    console.error(`  ❌ [DEBUG] Update failed: ${errorMsg}`)
    if (Object.keys(errorDetails).length > 0) {
      console.error(`  ❌ [DEBUG] Error details:`, JSON.stringify(errorDetails, null, 2))
    }
    if (error.response) {
      console.error(`  ❌ [DEBUG] Response status:`, error.response.status)
      console.error(`  ❌ [DEBUG] Response data:`, JSON.stringify(error.response.data, null, 2))
    }
    throw error
  }
}

// Helper: Delete entry in Strapi
async function deleteEntry(folderName, documentId) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    console.log(`  🗑️ [DEBUG] Deleting entry from ${schema.endpoint}`)
    console.log(`  🗑️ [DEBUG] Document ID: ${documentId}`)
    console.log(`  🗑️ [DEBUG] Delete URL: ${CMS_API_URL}/api/${schema.endpoint}/${documentId}`)

    const response = await axios.delete(`${CMS_API_URL}/api/${schema.endpoint}/${documentId}`, {
      headers: {
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    console.log(`  ✅ [DEBUG] Delete response status: ${response.status}`)
    console.log(`  ✅ [DEBUG] Delete response:`, JSON.stringify(response.data, null, 2))
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    console.error(`  ❌ [DEBUG] Delete failed: ${errorMsg}`)
    if (error.response) {
      console.error(`  ❌ [DEBUG] Response status:`, error.response.status)
      console.error(`  ❌ [DEBUG] Response data:`, JSON.stringify(error.response.data, null, 2))
    }
    throw new Error(`Failed to delete entry: ${errorMsg}`)
  }
}

// Helper: Detect operation type
function detectOperationType(filePath, isDeletedFile = false) {
  console.log(`  🔍 [DEBUG] detectOperationType called for: ${filePath}`)
  console.log(`  🔍 [DEBUG] isDeletedFile flag: ${isDeletedFile}`)

  if (isDeletedFile) {
    console.log(`  🔍 [DEBUG] File is marked as deleted by GitHub`)
    return 'delete'
  }

  const exists = fs.existsSync(filePath)
  console.log(`  🔍 [DEBUG] File exists on disk: ${exists}`)

  if (!exists) {
    console.log(`  🔍 [DEBUG] File does not exist, operation: delete`)
    return 'delete'
  }

  console.log(`  🔍 [DEBUG] File exists, operation: create_or_update`)
  return 'create_or_update'
}

// Main sync logic
async function syncToStrapi() {
  console.log('🚀 Starting sync to Strapi CMS...\n')
  console.log(`📦 Deployment Status: ${DEPLOYMENT_STATUS}`)
  console.log(`🔗 CMS API URL: ${CMS_API_URL}`)
  console.log(`📁 Sync Folders: ${SYNC_FOLDERS.join(', ')}`)
  console.log(`\n📄 Changed Files (${CHANGED_FILES.length}):`)
  CHANGED_FILES.forEach((file, idx) => {
    console.log(`   ${idx + 1}. ${file}`)
  })
  console.log(`\n🗑️ Deleted Files (${DELETED_FILES.length}):`)
  DELETED_FILES.forEach((file, idx) => {
    console.log(`   ${idx + 1}. ${file}`)
  })
  console.log('')

  const results = {
    created: [],
    updated: [],
    deleted: [],
    skipped: [],
    errors: [],
    relationWarnings: [], // Track unmatched relations
  }

  // Combine changed and deleted files with a flag to indicate deletion
  const allFiles = [
    ...CHANGED_FILES.map((file) => ({ path: file, isDeleted: false })),
    ...DELETED_FILES.map((file) => ({ path: file, isDeleted: true })),
  ]

  console.log(`\n📊 [DEBUG] Total files to process: ${allFiles.length}`)
  console.log(`  - Changed/Modified: ${CHANGED_FILES.length}`)
  console.log(`  - Deleted: ${DELETED_FILES.length}`)
  console.log('')

  for (const { path: filePath, isDeleted } of allFiles) {
    console.log(`\n${'='.repeat(80)}`)
    console.log(`📄 Processing: ${filePath}`)
    console.log(`  🏷️ [DEBUG] File marked as deleted: ${isDeleted}`)
    console.log(`${'='.repeat(80)}`)

    try {
      console.log(`  🔍 [DEBUG] Extracting folder name...`)
      const folderName = getFolderName(filePath)
      console.log(`  🔍 [DEBUG] Folder name: ${folderName}`)

      if (!folderName || !SYNC_FOLDERS.includes(folderName)) {
        console.log(`⏭️ Skipped: Folder '${folderName}' not in sync list`)
        console.log(`  ℹ️ [DEBUG] Sync folders: ${SYNC_FOLDERS.join(', ')}`)
        results.skipped.push(filePath)
        continue
      }

      console.log(`  🛣️ [DEBUG] Generating path field...`)
      const pathField = generatePathField(filePath, folderName)
      console.log(`  🛣️ [DEBUG] Path field: ${pathField}`)

      if (!pathField) {
        throw new Error('Could not generate path field')
      }

      const operationType = detectOperationType(filePath, isDeleted)
      console.log(`  🔧 [DEBUG] Operation type: ${operationType}`)

      if (operationType === 'delete') {
        console.log(`🗑️ Deleting from CMS: ${pathField}`)
        const existingEntry = await findEntryByPath(folderName, pathField)

        if (existingEntry) {
          await deleteEntry(folderName, existingEntry.documentId)
          console.log(`✅ Deleted successfully`)
          results.deleted.push({ file: filePath, path: pathField })
        } else {
          console.log(`⚠️ Entry not found in CMS, skipping deletion`)
          results.skipped.push(filePath)
        }
      } else {
        console.log(`  📖 [DEBUG] Parsing MDX file...`)
        const { frontmatter, content } = parseMDXFile(filePath)
        console.log(`  📖 [DEBUG] Frontmatter keys:`, Object.keys(frontmatter).join(', '))

        console.log(`  🗺️ [DEBUG] Mapping to Strapi schema...`)
        const { data: strapiData, warnings } = await mapToStrapiSchema(
          folderName,
          frontmatter,
          content,
          pathField
        )
        console.log(`  🗺️ [DEBUG] Mapped data keys:`, Object.keys(strapiData).join(', '))

        // Track relation warnings
        if (warnings && warnings.length > 0) {
          results.relationWarnings.push({
            file: filePath,
            path: pathField,
            warnings,
          })
        }

        console.log(`  🔎 [DEBUG] Checking if entry exists in CMS...`)
        const existingEntry = await findEntryByPath(folderName, pathField)
        console.log(`  🔎 [DEBUG] Existing entry result:`, existingEntry ? 'FOUND' : 'NOT FOUND')

        if (existingEntry) {
          console.log(`🔄 Updating in CMS: ${pathField}`)
          console.log(
            `  📋 [DEBUG] Entry details: id=${existingEntry.id}, documentId=${existingEntry.documentId}`
          )

          if (!existingEntry.documentId) {
            throw new Error(
              `Entry found but has no documentId. Entry keys: ${Object.keys(existingEntry).join(', ')}`
            )
          }

          await updateEntry(folderName, existingEntry.documentId, strapiData)
          console.log(`✅ Updated successfully`)
          results.updated.push({ file: filePath, path: pathField })
        } else {
          console.log(`➕ Creating in CMS: ${pathField}`)
          await createEntry(folderName, strapiData)
          console.log(`✅ Created successfully`)
          results.created.push({ file: filePath, path: pathField })
        }
      }
    } catch (error) {
      console.error(`\n❌ [DEBUG] ============ ERROR DETAILS ============`)
      console.error(`❌ [DEBUG] File: ${filePath}`)
      console.error(`❌ [DEBUG] Error message: ${error.message}`)
      console.error(`❌ [DEBUG] Error name: ${error.name}`)
      console.error(`❌ [DEBUG] Error stack:`, error.stack)

      if (error.response) {
        console.error(`❌ [DEBUG] HTTP Response status: ${error.response.status}`)
        console.error(
          `❌ [DEBUG] HTTP Response headers:`,
          JSON.stringify(error.response.headers, null, 2)
        )
        console.error(
          `❌ [DEBUG] HTTP Response data:`,
          JSON.stringify(error.response.data, null, 2)
        )
      }

      if (error.config) {
        console.error(`❌ [DEBUG] Request config:`)
        console.error(`  - URL: ${error.config.url}`)
        console.error(`  - Method: ${error.config.method}`)
        console.error(`  - Data: ${error.config.data}`)
      }

      console.error(`❌ [DEBUG] =========================================\n`)

      console.error(`❌ Error processing ${filePath}: ${error.message}`)
      results.errors.push({ file: filePath, error: error.message })
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 SYNC SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Created: ${results.created.length}`)
  console.log(`🔄 Updated: ${results.updated.length}`)
  console.log(`🗑️ Deleted: ${results.deleted.length}`)
  console.log(`⏭️ Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)
  console.log(`⚠️ Relation Warnings: ${results.relationWarnings.length}`)
  console.log('='.repeat(60) + '\n')

  if (results.errors.length > 0) {
    console.error('\n❌ SYNC FAILED - The following errors occurred:\n')
    results.errors.forEach(({ file, error }) => {
      console.error(`  • ${file}: ${error}`)
    })

    // Extract relation types even on error for PR comment
    const usedSchemas = new Set()
    const allRelationNames = new Set()

    ;[...results.created, ...results.updated].forEach((item) => {
      const folderName = getFolderName(item.file)
      if (folderName && COLLECTION_SCHEMAS[folderName]) {
        usedSchemas.add(folderName)
        const schema = COLLECTION_SCHEMAS[folderName]
        if (schema.relations) {
          Object.keys(schema.relations).forEach((relationName) => {
            allRelationNames.add(relationName)
          })
        }
      }
    })

    results.relationTypes = Array.from(allRelationNames)
    results.deploymentStatus = DEPLOYMENT_STATUS

    // Save results to file even on error for PR comment
    try {
      fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
      console.log('📝 Results saved to sync-results.json')
    } catch (writeError) {
      console.error('Failed to save results:', writeError.message)
    }

    process.exit(1)
  }

  // Extract all unique relation names from schemas used
  const usedSchemas = new Set()
  const allRelationNames = new Set()

  // Get schemas from processed files
  ;[...results.created, ...results.updated].forEach((item) => {
    const folderName = getFolderName(item.file)
    if (folderName && COLLECTION_SCHEMAS[folderName]) {
      usedSchemas.add(folderName)
      const schema = COLLECTION_SCHEMAS[folderName]
      if (schema.relations) {
        Object.keys(schema.relations).forEach((relationName) => {
          allRelationNames.add(relationName)
        })
      }
    }
  })

  // Add relation info to results
  results.relationTypes = Array.from(allRelationNames)
  results.deploymentStatus = DEPLOYMENT_STATUS

  // Save results to file for PR comment script
  try {
    fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
    console.log('📝 Results saved to sync-results.json')
  } catch (writeError) {
    console.error('Failed to save results:', writeError.message)
  }

  return results
}

// Validate environment variables
if (!CMS_API_URL || !CMS_API_TOKEN) {
  console.error('❌ ERROR: Missing required environment variables')
  console.error('   Required: CMS_API_URL, CMS_API_TOKEN')
  process.exit(1)
}

// Run sync
syncToStrapi()
  .then(() => {
    console.log('✅ Sync completed successfully!')
  })
  .catch((error) => {
    console.error('❌ SYNC FAILED:', error.message)
    process.exit(1)
  })

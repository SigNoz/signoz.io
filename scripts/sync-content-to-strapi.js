const fs = require('fs')
const matter = require('gray-matter')
const axios = require('axios')

// Configuration
const CMS_API_URL = process.env.CMS_API_URL
const CMS_API_TOKEN = process.env.CMS_API_TOKEN
const SYNC_FOLDERS = JSON.parse(process.env.SYNC_FOLDERS)
const DEPLOYMENT_STATUS = process.env.DEPLOYMENT_STATUS
const CHANGED_FILES = JSON.parse(process.env.CHANGED_FILES)

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

// Helper: Resolve relation IDs
async function resolveRelations(folderName, frontmatter) {
  const schema = COLLECTION_SCHEMAS[folderName]
  if (!schema.relations) return {}

  const relations = {}

  for (const [relationName, relationConfig] of Object.entries(schema.relations)) {
    const frontmatterValues = frontmatter[relationConfig.frontmatterField]

    // Skip if no values in frontmatter
    if (!frontmatterValues || !Array.isArray(frontmatterValues) || frontmatterValues.length === 0) {
      console.log(`  ⏭️ Skipping ${relationName}: No values in frontmatter`)
      continue
    }

    console.log(`  🔗 Resolving ${relationName}: ${frontmatterValues.join(', ')}`)

    // Fetch all entities from the relation endpoint
    const entities = await fetchAllEntities(relationConfig.endpoint)

    if (entities.length === 0) {
      console.warn(`  ⚠️ No entities found in ${relationConfig.endpoint}`)
      continue
    }

    // Match entities based on configuration
    const matchedIds = []

    for (const value of frontmatterValues) {
      let matched = null

      if (relationConfig.filterKey && relationConfig.matchValue) {
        // Special case for tags: check key contains 'faq'/'faqs' AND value matches
        matched = entities.find((entity) => {
          const keyMatch =
            entity?.key &&
            (entity?.key.toLowerCase().includes('faq') ||
              entity?.key.toLowerCase().includes('faqs'))

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

      if (matched) {
        matchedIds.push(matched.documentId)
        console.log(`    ✅ Matched "${value}" → ID: ${matched.documentId}`)
      } else {
        console.warn(`    ⚠️ No match found for "${value}" in ${relationConfig.endpoint}`)
      }
    }

    if (matchedIds.length > 0) {
      relations[relationName] = matchedIds
      console.log(`  ✅ ${relationName}: Resolved ${matchedIds.length} relation(s)`)
    }
  }

  return relations
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
  const relations = await resolveRelations(folderName, frontmatter)

  // Add relations to data
  Object.assign(data, relations)

  // Remove relation fields from frontmatter (they're now IDs)
  // if (schema.relations) {
  //   for (const relationConfig of Object.values(schema.relations)) {
  //     delete data[relationConfig.frontmatterField];
  //   }
  // }

  // Check for missing required fields
  const missingFields = schema.fields.filter(
    (field) => field !== 'deployment_status' && !(field in data)
  )

  if (missingFields.length > 0) {
    console.warn(`  ⚠️ Missing fields: ${missingFields.join(', ')}`)
  }

  return data
}

// Helper: Check if file exists in Strapi by path
async function findEntryByPath(folderName, pathField) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
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

    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0]
    }
    return null
  } catch (error) {
    throw new Error(`Failed to find entry by path: ${error.message}`)
  }
}

// Helper: Create entry in Strapi
async function createEntry(folderName, data) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
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
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    const errorDetails = error.response?.data?.error?.details || {}
    console.error(`  ❌ Create failed: ${errorMsg}`)
    if (Object.keys(errorDetails).length > 0) {
      console.error(`  Details:`, JSON.stringify(errorDetails, null, 2))
    }
    throw new Error(`Failed to create entry: ${errorMsg}`)
  }
}

// Helper: Update entry in Strapi
async function updateEntry(folderName, documentId, data) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
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
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    const errorDetails = error.response?.data?.error?.details || {}
    console.error(`  ❌ Update failed: ${errorMsg}`)
    if (Object.keys(errorDetails).length > 0) {
      console.error(`  Details:`, JSON.stringify(errorDetails, null, 2))
    }
    throw new Error(`Failed to update entry: ${errorMsg}`)
  }
}

// Helper: Delete entry in Strapi
async function deleteEntry(folderName, entryId) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    const response = await axios.delete(`${CMS_API_URL}/api/${schema.endpoint}/${entryId}`, {
      headers: {
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    throw new Error(`Failed to delete entry: ${errorMsg}`)
  }
}

// Helper: Detect operation type
function detectOperationType(filePath) {
  if (!fs.existsSync(filePath)) {
    return 'delete'
  }
  return 'create_or_update'
}

// Main sync logic
async function syncToStrapi() {
  console.log('🚀 Starting sync to Strapi CMS...\n')
  console.log(`📦 Deployment Status: ${DEPLOYMENT_STATUS}\n`)

  const results = {
    created: [],
    updated: [],
    deleted: [],
    skipped: [],
    errors: [],
  }

  for (const filePath of CHANGED_FILES) {
    console.log(`\n📄 Processing: ${filePath}`)

    try {
      const folderName = getFolderName(filePath)

      if (!folderName || !SYNC_FOLDERS.includes(folderName)) {
        console.log(`⏭️ Skipped: Folder '${folderName}' not in sync list`)
        results.skipped.push(filePath)
        continue
      }

      const pathField = generatePathField(filePath, folderName)
      if (!pathField) {
        throw new Error('Could not generate path field')
      }

      const operationType = detectOperationType(filePath)

      if (operationType === 'delete') {
        console.log(`🗑️ Deleting from CMS: ${pathField}`)
        const existingEntry = await findEntryByPath(folderName, pathField)

        if (existingEntry) {
          await deleteEntry(folderName, existingEntry.id)
          console.log(`✅ Deleted successfully`)
          results.deleted.push(filePath)
        } else {
          console.log(`⚠️ Entry not found in CMS, skipping deletion`)
          results.skipped.push(filePath)
        }
      } else {
        const { frontmatter, content } = parseMDXFile(filePath)
        const strapiData = await mapToStrapiSchema(folderName, frontmatter, content, pathField)

        const existingEntry = await findEntryByPath(folderName, pathField)

        if (existingEntry) {
          console.log(`🔄 Updating in CMS: ${pathField}`)
          await updateEntry(folderName, existingEntry.documentId, strapiData)
          console.log(`✅ Updated successfully`)
          results.updated.push(filePath)
        } else {
          console.log(`➕ Creating in CMS: ${pathField}`)
          await createEntry(folderName, strapiData)
          console.log(`✅ Created successfully`)
          results.created.push(filePath)
        }
      }
    } catch (error) {
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
  console.log('='.repeat(60) + '\n')

  if (results.errors.length > 0) {
    console.error('\n❌ SYNC FAILED - The following errors occurred:\n')
    results.errors.forEach(({ file, error }) => {
      console.error(`  • ${file}: ${error}`)
    })
    process.exit(1)
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

const { COLLECTION_SCHEMAS } = require('./schemas')

// Pure transform: maps frontmatter + content + pre-resolved relations to Strapi payload.
// All relation resolution must be done BEFORE calling this function.
function mapToStrapiPayload(
  folderName,
  frontmatter,
  content,
  pathField,
  deploymentStatus,
  resolvedRelations
) {
  const schema = COLLECTION_SCHEMAS[folderName]
  if (!schema) {
    throw new Error(`No schema defined for folder: ${folderName}`)
  }

  const { relations = {}, relatedArticles = [] } = resolvedRelations || {}

  const data = {
    path: pathField,
    content: content,
    deployment_status: deploymentStatus,
    ...frontmatter,
  }

  // Remove raw frontmatter relation fields
  if (schema.relations) {
    for (const [, relationConfig] of Object.entries(schema.relations)) {
      const fieldName = relationConfig.frontmatterField
      if (data[fieldName]) {
        delete data[fieldName]
      }
    }
  }

  // Clean up legacy related_* frontmatter fields
  const legacyRelatedFields = [
    'related_guides',
    'related_comparisons',
    'related_blogs',
    'related_faqs',
  ]
  for (const field of legacyRelatedFields) {
    if (data[field]) {
      delete data[field]
    }
  }

  if (Object.keys(relations).length > 0) {
    Object.assign(data, relations)
  }

  // Attach related_articles component data
  if (schema.hasRelatedArticles) {
    data.related_articles = relatedArticles.length > 0 ? relatedArticles : []
    delete data.related_articles_raw
  }

  const warnings = []

  // Check for missing required fields
  const missingFields = schema.fields.filter(
    (field) => field !== 'deployment_status' && !(field in data)
  )

  if (missingFields.length > 0) {
    warnings.push({ type: 'missing_fields', fields: missingFields })
  }

  return { data, warnings }
}

module.exports = { mapToStrapiPayload }

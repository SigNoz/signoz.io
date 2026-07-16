const fs = require('fs')
const path = require('path')

const RELATED_ARTICLE_TYPE_MAP = require('./related-article-type-map.json')

// Build COLLECTION_SCHEMAS by reading all JSON files in this directory
// (excluding the related-article-type-map which has a different structure)
const SCHEMA_DIR = __dirname
const EXCLUDE = new Set(['related-article-type-map.json'])

const COLLECTION_SCHEMAS = {}

const files = fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.json') && !EXCLUDE.has(f))

for (const file of files) {
  const key = path.basename(file, '.json')
  COLLECTION_SCHEMAS[key] = require(path.join(SCHEMA_DIR, file))
}

function getSchemaForFolder(name) {
  return COLLECTION_SCHEMAS[name] || null
}

module.exports = { COLLECTION_SCHEMAS, RELATED_ARTICLE_TYPE_MAP, getSchemaForFolder }

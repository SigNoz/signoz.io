const fs = require('fs')
const matter = require('gray-matter')

function getFolderName(filePath) {
  const parts = filePath.split('/')
  if (parts[0] === 'data' && parts.length > 1) {
    return parts[1]
  }
  return null
}

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

function parseMDXFile(filePath, { readFile = fs.readFileSync } = {}) {
  try {
    const fileContent = readFile(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)
    return { frontmatter, content }
  } catch (error) {
    throw new Error(`Failed to parse file ${filePath}: ${error.message}`)
  }
}

function detectOperationType(filePath, isDeleted = false, { existsSync = fs.existsSync } = {}) {
  if (isDeleted) {
    return 'delete'
  }

  if (!existsSync(filePath)) {
    return 'delete'
  }

  return 'create_or_update'
}

function parseMDXContent(filePath, fileContent) {
  const { data: frontmatter, content } = matter(fileContent)
  return { frontmatter, content }
}

module.exports = {
  getFolderName,
  generatePathField,
  parseMDXFile,
  parseMDXContent,
  detectOperationType,
}

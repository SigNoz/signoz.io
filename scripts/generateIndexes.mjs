import { writeFileSync } from 'fs'
import siteMetadata from '../data/siteMetadata.js'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { loadLocalDocs } from './localDocs.mjs'

function createSearchIndex(content) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    const indexJSON = allCoreContent(sortPosts(content))

    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(indexJSON, null, 2),
      { flag: 'w', encoding: 'utf-8' }
    )
    console.log('Local search index generated...')
  }
}

const searchIndexes = () => {
  createSearchIndex(loadLocalDocs())
  console.log('Search Indexes generated...')
}

export default searchIndexes

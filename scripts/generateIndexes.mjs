import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import {
    allBlogs,
    allDocs,
    allComparisons,
    allGuides,
    allOpentelemetries,
} from '../.contentlayer/generated/index.mjs'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'



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
    createSearchIndex([...allBlogs, ...allComparisons, ...allGuides, ...allOpentelemetries, ...allDocs]);
    console.log('Search Indexes generated...')
}

export default searchIndexes
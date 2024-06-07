import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import {
    allBlogs,
    allDocs,
    allComparisons,
    allGuides,
    allOpentelemetries,
} from '../.contentlayer/generated/index.mjs'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
async function generateTags(allBlogs) {
    const tags = {}
    allBlogs.forEach((file) => {
        if (file.tags && (!isProduction || file.draft !== true)) {
            file.tags.forEach((tag) => {
                const formattedTag = slug(tag)
                if (formattedTag in tags) {
                    tags[formattedTag] += 1
                } else {
                    tags[formattedTag] = 1
                }
            })
        }
    })
    writeFileSync('./app/tag-data.json', JSON.stringify(tags, null, 2), {
        flag: 'w',
        encoding: 'utf-8',
    })
}


const tags = () => {
    generateTags([...allBlogs, ...allComparisons, ...allGuides, ...allOpentelemetries, ...allDocs]);
    console.log('Tags generated...')
}

export default tags

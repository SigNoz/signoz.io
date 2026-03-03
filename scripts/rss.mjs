import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import {
  allBlogs,
  allDocs,
  allGuides,
} from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { filterPostsByTag, generateRss } from './rssFeed.mjs';

const FEED_FILENAME = 'feed.xml'

function generateRSS(config, allCollections) {
  const publishedPosts = sortPosts(allCollections.filter((post) => post.draft !== true))

  if (publishedPosts.length > 0) {
    const rss = generateRss(config, publishedPosts, {
      channelPath: 'blog',
      feedPath: FEED_FILENAME,
    })
    writeFileSync(`./public/${FEED_FILENAME}`, rss)
  }

  if (publishedPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = filterPostsByTag(publishedPosts, tag)
      if (filteredPosts.length === 0) continue
      const rss = generateRss(config, filteredPosts, {
        channelPath: `tags/${tag}`,
        feedPath: `tags/${tag}/${FEED_FILENAME}`,
        title: `${config.title} - ${tag}`,
      })
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, FEED_FILENAME), rss)
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, [
    ...allBlogs,
    ...allGuides,
    ...allDocs,
  ])
  console.log('RSS feed generated...')
}

export default rss

import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import siteMetadata from '../data/siteMetadata.js'
import {
  allDocs,
} from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { generateRss } from './rssFeed.mjs';

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
}

const rss = () => {
  generateRSS(siteMetadata, [
    ...allDocs,
  ])
  console.log('RSS feed generated...')
}

export default rss

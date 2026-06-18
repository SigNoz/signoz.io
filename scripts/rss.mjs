import { writeFileSync } from 'fs'
import siteMetadata from '../data/siteMetadata.js'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { generateRss } from './rssFeed.mjs'
import { loadLocalDocs } from './localDocs.mjs'

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
  generateRSS(siteMetadata, loadLocalDocs())
  console.log('RSS feed generated...')
}

export default rss

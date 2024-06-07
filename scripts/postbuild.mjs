import searchIndexes from './generateIndexes.mjs'
import tags from './generateTags.mjs'
import rss from './rss.mjs'

async function postbuild() {
  await searchIndexes();
  await tags();
  await rss()
}

postbuild()

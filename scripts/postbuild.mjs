import searchIndexes from './generateIndexes.mjs'
import rss from './rss.mjs'

async function postbuild() {
  await searchIndexes()
  await rss()
}

postbuild()

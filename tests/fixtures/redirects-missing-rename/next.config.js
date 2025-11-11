// Fixture next.config.js missing redirect for a renamed doc
module.exports = {
  async redirects() {
    return [
      // Intentionally missing mapping from '/docs/guide/' to new slug
      { source: '/docs/another/', destination: '/docs/another-new/' },
    ]
  },
}


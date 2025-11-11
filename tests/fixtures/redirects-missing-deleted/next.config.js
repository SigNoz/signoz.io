// Fixture next.config.js missing redirect for a deleted doc
module.exports = {
  async redirects() {
    return [
      // No redirect for '/docs/old-deleted/' on purpose
      { source: '/docs/some/', destination: '/docs/somewhere/' },
    ]
  },
}


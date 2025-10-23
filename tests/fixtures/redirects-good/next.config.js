// Fixture next.config.js with correct redirects
module.exports = {
  async redirects() {
    return [
      { source: '/docs/guide/', destination: '/docs/guides/getting-started/' },
      { source: '/blogs/keep-me/', destination: '/blogs/keep-me-new/' }, // unrelated
    ]
  },
}

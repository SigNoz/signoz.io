// Fixture next.config.js with correct redirects
module.exports = {
  async redirects() {
    return [
      { source: '/docs/guide/', destination: '/docs/guides/getting-started/' },
      { source: '/docs/keep-me/', destination: '/docs/keep-me/' }, // unrelated
    ]
  },
}


++tests / fixtures / redirects - missing - destination / next.config.js
// Fixture with redirect pointing to a missing doc route
module.exports = {
  async redirects() {
    return [
      {
        source: '/docs/broken/',
        destination: '/docs/missing-target/',
      },
    ]
  },
}

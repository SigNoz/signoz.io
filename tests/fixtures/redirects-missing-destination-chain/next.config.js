++tests / fixtures / redirects - missing - destination - chain / next.config.js
// Fixture with chained redirects ending in a missing doc
module.exports = {
  async redirects() {
    return [
      {
        source: '/docs/chain-source/',
        destination: '/docs/intermediate/',
      },
      {
        source: '/docs/intermediate/',
        destination: '/docs/ultimate-missing/',
      },
    ]
  },
}

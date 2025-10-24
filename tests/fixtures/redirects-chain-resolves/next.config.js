++tests / fixtures / redirects - chain - resolves / next.config.js
// Fixture with redirect chain that resolves to an existing doc
module.exports = {
  async redirects() {
    return [
      {
        source: '/docs/chain-source/',
        destination: '/docs/intermediate/',
      },
      {
        source: '/docs/intermediate/',
        destination: '/docs/final-destination/',
      },
    ]
  },
}

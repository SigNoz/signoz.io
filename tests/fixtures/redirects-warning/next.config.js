module.exports = {
  async redirects() {
    return [
      {
        source: '/docs/guide/',
        destination: '/docs/legacy/getting-started/',
      },
    ]
  },
}


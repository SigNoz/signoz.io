// Fixture next.config.js for stale URL tests
module.exports = {
  async redirects() {
    return [
      { source: '/old-page/', destination: '/new-page/', permanent: true },
      { source: '/chain-a/', destination: '/chain-b/', permanent: true },
      { source: '/chain-b/', destination: '/chain-final/', permanent: true },
      {
        source: '/product-comparison/signoz-vs-datadog/',
        destination: '/datadog-alternative/',
        permanent: true,
      },
      { source: '/blog/renamed-post/', destination: '/blog/current-post/', permanent: true },
      { source: '/blog/retired-post/', destination: '/product-hub/', permanent: true },
      { source: '/blog/shadowed-post/', destination: '/product-hub/', permanent: true },
    ]
  },
}

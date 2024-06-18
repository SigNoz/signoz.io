/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'SigNoz',
  author: 'SigNoz Inc',
  headerTitle: 'SigNoz',
  description:
    'SigNoz is an open-source observability tool to help you find issues in your deployed applications & solve them quickly. It provides logs, metrics, and traces under a single pane of glass. Built with ClickHouse as datastore, it is designed to handle enterprise scale.',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://signoz.io',
  siteRepo: 'https://github.com/signoz/',
  siteLogo: '/img/logo.svg',
  socialBanner: '/img/signoz-landing.png',
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'address@yoursite.com',
  github: 'https://github.com/SigNoz',
  x: 'https://x.com/SigNozHQ',
  youtube: 'https://www.youtube.com/@signoz',
  linkedin: 'https://www.linkedin.com/company/signozio',
  locale: 'en-US',
  analytics: {},
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'dark',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'algolia', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
    algoliaConfig: {
      appId: 'E88QYIQ6K4',
      apiKey: '1061c173ae001d5f5aaa4f0354e373a0',
      indexName: 'signoz',
    },
  },
}

module.exports = siteMetadata

// utils/getPageType.ts

// Get page type based on URL path
export const getPageType = (pathname: string): string => {
  // Strip trailing slash for consistency, but only if it's not the root path
  const normalizedPath =
    pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  // Home page
  if (normalizedPath === '/') return 'Home Page'

  // Docs pages
  if (normalizedPath.startsWith('/docs')) return 'Docs Page' // Match /docs and /docs/*

  // Feature pages
  const featurePages = [
    '/application-performance-monitoring',
    '/distributed-tracing',
    '/log-management',
    '/metrics-and-dashboards',
    '/exceptions-monitoring',
    '/alerts-management',
    '/trace-funnels',
    '/external-apis',
  ]
  if (featurePages.includes(normalizedPath)) return 'Feature Page'

  // Listing pages (including pagination)
  // Blog listing pages
  if (normalizedPath === '/resource-center/blog' || normalizedPath === '/blog')
    return 'Blog Listing Page'
  if (normalizedPath.match(/^\/resource-center\/blog\/page\/\d+$/)) return 'Blog Listing Page'
  if (normalizedPath.match(/^\/blog\/page\/\d+$/)) return 'Blog Listing Page'

  // Comparison listing pages
  if (normalizedPath === '/resource-center/comparisons' || normalizedPath === '/comparisons')
    return 'Comparison Listing Page'
  if (normalizedPath.match(/^\/resource-center\/comparisons\/page\/\d+$/))
    return 'Comparison Listing Page'
  if (normalizedPath.match(/^\/comparisons\/page\/\d+$/)) return 'Comparison Listing Page'

  // Guide listing pages
  if (normalizedPath === '/resource-center/guides' || normalizedPath === '/guides')
    return 'Guide Listing Page'
  if (normalizedPath.match(/^\/resource-center\/guides\/page\/\d+$/)) return 'Guide Listing Page'
  if (normalizedPath.match(/^\/guides\/page\/\d+$/)) return 'Guide Listing Page'

  // OTel listing pages
  if (normalizedPath === '/resource-center/opentelemetry') return 'OTel Listing Page'
  if (normalizedPath.match(/^\/resource-center\/opentelemetry\/page\/\d+$/))
    return 'OTel Listing Page'
  if (normalizedPath.match(/^\/opentelemetry\/page\/\d+$/)) return 'OTel Listing Page'

  if (normalizedPath === '/opentelemetry') return 'Blog Page'

  // Content pages (ensure they are not listing pages)
  if (normalizedPath.startsWith('/blog/') && !normalizedPath.match(/^\/blog\/page\/\d+$/))
    return 'Blog Page'
  if (
    normalizedPath.startsWith('/comparisons/') &&
    !normalizedPath.match(/^\/comparisons\/page\/\d+$/)
  )
    return 'Comparison Page'
  if (normalizedPath.startsWith('/guides/') && !normalizedPath.match(/^\/guides\/page\/\d+$/))
    return 'Guide Page'
  if (
    normalizedPath.startsWith('/opentelemetry/') &&
    !normalizedPath.match(/^\/opentelemetry\/page\/\d+$/)
  )
    return 'OTel Page'

  // FAQ pages
  if (normalizedPath === '/faqs') return 'Product FAQ Listing Page'
  if (normalizedPath.startsWith('/faqs/')) return 'Product FAQ Page' // Match /faqs/*

  // Other specific pages
  if (normalizedPath === '/dashboards') return 'Dashboard Listing Page'
  if (normalizedPath === '/pricing') return 'Pricing Page'
  if (normalizedPath === '/case-study') return 'Case Study Listing Page'
  if (normalizedPath.startsWith('/case-study/')) return 'Case Study Page' // Match /case-study/*
  if (normalizedPath === '/login') return 'Sign In Page'
  if (normalizedPath === '/teams') return 'Teams Page'
  if (normalizedPath === '/api-reference') return 'API Reference Page'
  if (normalizedPath === '/support') return 'Support Page'
  if (normalizedPath === '/launch-week') return 'Launch Week Listing Page'
  if (normalizedPath === '/changelog') return 'Change Log Listing Page'
  if (normalizedPath.startsWith('/changelog/')) return 'Changelog Page'
  if (normalizedPath === '/product-comparison') return 'Product Comparison Listing Page'
  if (normalizedPath.startsWith('/product-comparison/')) {
    if (normalizedPath === '/product-comparison/datadog-savings') return 'DataDog Saving Form Page'
    if (normalizedPath === '/product-comparison/migrate-from-datadog')
      return 'DataDog Migration Form Page'
    if (normalizedPath === '/product-comparison/newrelic-savings')
      return 'New Relic Saving Form Page'
    if (normalizedPath === '/product-comparison/migrate-from-newrelic')
      return 'New Relic Migration Form Page'
    return 'Product Comparison Page' // Match /product-comparison/*
  }

  // About and legal pages
  if (normalizedPath === '/about-us') return 'About Page'
  if (normalizedPath === '/terms-of-service') return 'Terms Page'
  if (normalizedPath === '/privacy') return 'Privacy Page'

  // Enterprise pages
  if (normalizedPath === '/enterprise') return 'Enterprise Page'
  if (normalizedPath === '/enterprise-cloud') return 'Enterprise Cloud Form Page'
  if (normalizedPath === '/enterprise-self-hosted') return 'Enterprise Self Hosted Form Page'

  // Default for any other page
  return 'Other'
}

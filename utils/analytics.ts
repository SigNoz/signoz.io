import { track } from '../lib/mixpanelClient'

// Helper to check if current path is a content page (blog, comparisons, guides, opentelemetry)
export const isContentPage = (pathname: string): boolean => {
  // Normalize path first to work with either form (with or without trailing slash)
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  
  // For each content type, check if it's a content page (has a slug) and not a listing page
  // Content pages should match /type/slug/ pattern
  if (normalizedPath.startsWith('/blog/')) {
    return normalizedPath.match(/^\/blog\/(?!page\/)[^\/]+\//) !== null
  }
  
  if (normalizedPath.startsWith('/comparisons/')) {
    return normalizedPath.match(/^\/comparisons\/[^\/]+\//) !== null
  }
  
  if (normalizedPath.startsWith('/guides/')) {
    return normalizedPath.match(/^\/guides\/[^\/]+\//) !== null
  }
  
  if (normalizedPath.startsWith('/opentelemetry/')) {
    return normalizedPath.match(/^\/opentelemetry\/[^\/]+\//) !== null
  }
  
  return false
}

// Get page type based on URL path
export const getPageType = (pathname: string): string => {
  // Strip trailing slash for consistency
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  
  // Home page
  if (normalizedPath === '/') return 'Home Page'
  
  // Docs pages
  if (normalizedPath.startsWith('/docs/')) return 'Docs Page'
  
  // Feature pages
  const featurePages = [
    '/application-performance-monitoring/',
    '/distributed-tracing/',
    '/log-management/',
    '/metrics-and-dashboards/',
    '/exceptions-monitoring/',
    '/alerts-management/'
  ]
  if (featurePages.includes(normalizedPath)) return 'Feature Page'
  
  // Listing pages (including pagination)
  // Blog listing pages
  if (normalizedPath === '/resource-center/blog/' || normalizedPath === '/blog/') return 'Blog Listing Page'
  if (normalizedPath.match(/^\/resource-center\/blog\/page\/\d+\//)) return 'Blog Listing Page'
  if (normalizedPath.match(/^\/blog\/page\/\d+\//)) return 'Blog Listing Page'
  
  // Comparison listing pages
  if (normalizedPath === '/resource-center/comparisons/' || normalizedPath === '/comparisons/') return 'Comparison Listing Page'
  if (normalizedPath.match(/^\/resource-center\/comparisons\/page\/\d+\//)) return 'Comparison Listing Page'
  if (normalizedPath.match(/^\/comparisons\/page\/\d+\//)) return 'Comparison Listing Page'
  
  // Guide listing pages
  if (normalizedPath === '/resource-center/guides/' || normalizedPath === '/guides/') return 'Guide Listing Page'
  if (normalizedPath.match(/^\/resource-center\/guides\/page\/\d+\//)) return 'Guide Listing Page'
  if (normalizedPath.match(/^\/guides\/page\/\d+\//)) return 'Guide Listing Page'
  
  // OTel listing pages
  if (normalizedPath === '/resource-center/opentelemetry/' || normalizedPath === '/opentelemetry/') return 'OTel Listing Page'
  if (normalizedPath.match(/^\/resource-center\/opentelemetry\/page\/\d+\//)) return 'OTel Listing Page'
  if (normalizedPath.match(/^\/opentelemetry\/page\/\d+\//)) return 'OTel Listing Page'
  
  // Content pages
  if (normalizedPath.match(/^\/blog\/(?!page\/)[^\/]+\//)) return 'Blog Page'
  if (normalizedPath.match(/^\/comparisons\/[^\/]+\//)) return 'Comparison Page'
  if (normalizedPath.match(/^\/guides\/[^\/]+\//)) return 'Guide Page'
  if (normalizedPath.match(/^\/opentelemetry\/[^\/]+\//)) return 'OTel Page'
  
  // FAQ pages
  if (normalizedPath === '/faqs/') return 'Product FAQ Listing Page'
  if (normalizedPath.match(/^\/faqs\/[^/]+\//)) return 'Product FAQ Page'
  
  // Other specific pages
  if (normalizedPath === '/dashboards/') return 'Dashboard Listing Page'
  if (normalizedPath === '/pricing/') return 'Pricing Page'
  if (normalizedPath === '/case-study/') return 'Case Study Listing Page'
  if (normalizedPath.match(/^\/case-study\/[^/]+\//)) return 'Case Study Page'
  if (normalizedPath === '/login/') return 'Sign In Page'
  if (normalizedPath === '/teams/') return 'Teams Page'
  if (normalizedPath === '/api-reference/') return 'API Reference Page'
  if (normalizedPath === '/support/') return 'Support Page'
  if (normalizedPath === '/launch-week/') return 'Launch Week Listing Page'
  if (normalizedPath === '/changelog/') return 'Change Log Listing Page'
  if (normalizedPath === '/product-comparison/') return 'Product Comparison Listing Page'
  if (normalizedPath.match(/^\/product-comparison\/[^/]+\/$/)) {
    if (normalizedPath === '/product-comparison/datadog-savings/') return 'DataDog Saving Form Page'
    if (normalizedPath === '/product-comparison/migrate-from-datadog/') return 'DataDog Migration Form Page'
    if (normalizedPath === '/product-comparison/newrelic-savings/') return 'New Relic Saving Form Page'
    if (normalizedPath === '/product-comparison/migrate-from-newrelic/') return 'New Relic Migration Form Page'
    return 'Product Comparison Page'
  }
  
  // About and legal pages
  if (normalizedPath === '/about-us/') return 'About Page'
  if (normalizedPath === '/terms-of-service/') return 'Terms Page'
  if (normalizedPath === '/privacy/') return 'Privacy Page'
  
  // Enterprise pages
  if (normalizedPath === '/enterprise/') return 'Enterprise Page'
  if (normalizedPath === '/enterprise-cloud/') return 'Enterprise Cloud Form Page'
  if (normalizedPath === '/enterprise-self-hosted/') return 'Enterprise Self Hosted Form Page'
  
  // Default for any other page
  return 'Other'
}

/**
 * Track a click event with Mixpanel
 */
export const trackClick = (
  clickType: string,
  clickName: string,
  clickText: string,
  clickLocation: string,
  pathname: string
): void => {
  track('Website Click', {
    clickType,
    clickName,
    clickText,
    clickLocation,
    pageLocation: pathname
  });
}

// Function to track page views
export const trackPageView = (
  pathname: string, 
  contentMetadata?: {
    tags?: string[];
    authors?: string[];
    title?: string;
    slug?: string;
    lastmod?: string;
    pathname?: string; // Added for verification
  } | null
): void => {
  // Base event properties
  const eventProps: Record<string, any> = {
    pageLocation: pathname,
    pageType: getPageType(pathname)
  }
  
  // Add content metadata for content pages, but only if it matches the current page
  if (isContentPage(pathname) && contentMetadata) {
    // Verify metadata is for this page (if pathname is included)
    const metadataMatchesPage = !contentMetadata.pathname || contentMetadata.pathname === pathname;
    
    // Verify slug matches path (extracted from pathname)
    const pathSlug = pathname.split('/').filter(Boolean)[1]; // Extract slug from path
    const slugMatchesPath = !contentMetadata.slug || contentMetadata.slug === pathSlug;
    
    // Only attach metadata if both checks pass
    if (metadataMatchesPage && slugMatchesPath) {
      if (contentMetadata.tags) eventProps.tags = contentMetadata.tags;
      if (contentMetadata.authors) eventProps.authors = contentMetadata.authors;
      if (contentMetadata.title) eventProps.title = contentMetadata.title;
      if (contentMetadata.slug) eventProps.slug = contentMetadata.slug;
      if (contentMetadata.lastmod) eventProps.lastUpdateDate = contentMetadata.lastmod;
    } else {
      // Log error in development to help debug
      if (process.env.NODE_ENV === 'development') {
        console.error('Content metadata mismatch:', {
          pathname,
          contentMetadataPathname: contentMetadata.pathname,
          contentMetadataSlug: contentMetadata.slug,
          pathSlug
        });
      }
    }
  }
  
  // Track page view with the updated event name
  track('Website Page View', eventProps)
} 
import { useEffect, useState } from 'react'
import { allBlogs, allComparisons, allGuides, allOpentelemetries, Blog, Comparison, Guide, Opentelemetry } from 'contentlayer/generated'

type ContentMetadata = {
  tags?: string[];
  authors?: string[];
  title?: string;
  slug?: string;
  lastmod?: string;
  pathname?: string; // Add pathname for verification
}

/**
 * Custom hook to get content metadata based on the pathname
 */
export function useContentMetadata(pathname: string): ContentMetadata | null {
  const [metadata, setMetadata] = useState<ContentMetadata | null>(null)

  useEffect(() => {
    // Reset metadata when pathname changes to avoid stale data
    setMetadata(null);
    
    // Skip processing if no pathname provided
    if (!pathname) return;
    
    // Helper to extract the slug from the pathname
    const extractSlug = (path: string): string => {
      // First normalize the path (handle trailing slash consistently)
      const normalizedPath = path.endsWith('/') ? path : `${path}/`
      
      // Extract the slug from paths like /blog/some-slug/
      const match = normalizedPath.match(/\/([^\/]+)\/([^\/]+)\//)
      return match ? match[2] : ''
    }

    const contentType = pathname.split('/')[1]; // Extract content type (blog, guides, etc.)
    const slug = extractSlug(pathname);
    
    if (!slug) return;

    // Determine content type based on path
    let content: Blog | Comparison | Guide | Opentelemetry | undefined = undefined;
    
    if (contentType === 'blog') {
      content = allBlogs.find(blog => blog.slug === slug)
    } else if (contentType === 'comparisons') {
      content = allComparisons.find(comparison => comparison.slug === slug)
    } else if (contentType === 'guides') {
      content = allGuides.find(guide => guide.slug === slug)
    } else if (contentType === 'opentelemetry') {
      content = allOpentelemetries.find(otel => otel.slug === slug)
    }

    if (content) {
      // Include the pathname to verify that the metadata matches the current page
      setMetadata({
        tags: content.tags,
        authors: content.authors,
        title: content.title,
        slug: content.slug,
        lastmod: content.lastmod || content.date,
        pathname // Store the pathname that this metadata belongs to
      })
    }
  }, [pathname]) // Only run when pathname changes

  // Only return metadata if it matches the current pathname
  return metadata && metadata.pathname === pathname ? metadata : null;
} 
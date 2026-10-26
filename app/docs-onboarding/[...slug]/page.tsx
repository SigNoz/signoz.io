// Inlined as literal because Next 15's segment-config static analyzer doesn't
// follow re-exports. Keep in sync with ../../(site)/docs/(main-docs)/[...slug]/page.tsx
export const revalidate = 86400
export const dynamicParams = true

// generateMetadata is re-exported: main docs already emits absolute
// https://signoz.io/docs/${slug}/ canonical + og:url (not relative to /docs-onboarding).
export {
  default,
  generateStaticParams,
  generateMetadata,
} from '../../(site)/docs/(main-docs)/[...slug]/page'

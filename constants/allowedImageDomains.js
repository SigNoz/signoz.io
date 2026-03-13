const DEFAULT_ALLOWED_DOMAINS =
  'picsum.photos,signoz.io,avatars.githubusercontent.com,storage.googleapis.com'

function parseDomains(str) {
  return str
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean)
}

function getAllowedImageDomains() {
  const defaultDomains = parseDomains(DEFAULT_ALLOWED_DOMAINS)
  const envDomains = parseDomains(process.env.NEXT_PUBLIC_ALLOWED_EXTERNAL_IMAGE_DOMAINS || '')
  return Array.from(new Set([...defaultDomains, ...envDomains]))
}

module.exports = { DEFAULT_ALLOWED_DOMAINS, getAllowedImageDomains }

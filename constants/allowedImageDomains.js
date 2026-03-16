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

function isSrcAllowedForNextImage(src) {
  const trimmed = src.trim()

  if (trimmed.startsWith('/') || trimmed.startsWith('./')) {
    return true
  }

  if (trimmed.startsWith('data:')) {
    return true
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const url = new URL(trimmed)
      const hostname = url.hostname.toLowerCase()
      const allowedDomains = getAllowedImageDomains()

      return allowedDomains.some((domain) => hostname === domain.toLowerCase())
    } catch {
      return false
    }
  }

  return false
}

module.exports = { DEFAULT_ALLOWED_DOMAINS, getAllowedImageDomains, isSrcAllowedForNextImage }

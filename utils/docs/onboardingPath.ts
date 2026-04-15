const DOCS_ONBOARDING_PATH_PREFIX = '/docs-onboarding'

const isDocsOnboardingPathname = (pathname: string | null | undefined) => {
  if (!pathname) {
    return false
  }

  return (
    pathname === DOCS_ONBOARDING_PATH_PREFIX ||
    pathname.startsWith(`${DOCS_ONBOARDING_PATH_PREFIX}/`)
  )
}

const isDocsPathname = (pathname: string | null | undefined) => {
  if (!pathname) {
    return false
  }

  return pathname === '/docs' || pathname.startsWith('/docs/')
}

const buildDocsOnboardingPath = (pathname: string) => {
  if (!isDocsPathname(pathname)) {
    return pathname
  }

  if (pathname === '/docs') {
    return `${DOCS_ONBOARDING_PATH_PREFIX}/introduction`
  }

  return pathname.replace(/^\/docs(?=\/|$)/, DOCS_ONBOARDING_PATH_PREFIX)
}

export {
  DOCS_ONBOARDING_PATH_PREFIX,
  isDocsOnboardingPathname,
  isDocsPathname,
  buildDocsOnboardingPath,
}

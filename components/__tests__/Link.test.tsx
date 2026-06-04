import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CustomLink, { SITE_BASE_URL } from '../Link'

// Mock next/link to render a plain anchor so we can inspect props
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={typeof href === 'string' ? href : ''} data-testid="next-link" {...props}>
      {children}
    </a>
  ),
}))

// Mock next/navigation
const mockPathname = vi.fn(() => '/docs/install/')
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

// Mock useBrowserSearch to control search params
const mockSearch = vi.fn(() => '')
vi.mock('@/hooks/useBrowserSearch', () => ({
  useBrowserSearch: () => mockSearch(),
}))

beforeEach(() => {
  mockPathname.mockReturnValue('/docs/install/')
  mockSearch.mockReturnValue('')
})

describe('SITE_BASE_URL constant', () => {
  it('defaults to empty string when not on production', () => {
    expect(SITE_BASE_URL).toBe('')
  })
})

// ---------------------------------------------------------------------------
// Link classification
// ---------------------------------------------------------------------------

describe('link classification', () => {
  it('renders internal link for relative path starting with /', () => {
    render(<CustomLink href="/blog/post/">Blog</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/blog/post/')
    expect(link).not.toHaveAttribute('target')
  })

  it('renders internal link for relative path starting with .', () => {
    render(<CustomLink href="./sibling">Sibling</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', './sibling')
  })

  it('renders internal signoz.io link with target="_blank"', () => {
    render(<CustomLink href="https://signoz.io/pricing/">Pricing</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', 'https://signoz.io/pricing/')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders anchor link as plain <a>', () => {
    render(<CustomLink href="#section">Section</CustomLink>)
    const link = screen.getByText('Section')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '#section')
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('data-testid', 'next-link')
  })

  it('renders external link with target="_blank" and rel attributes', () => {
    render(<CustomLink href="https://google.com/">Google</CustomLink>)
    const link = screen.getByText('Google')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', 'https://google.com/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer nofollow')
  })

  it('renders mailto as external link', () => {
    render(<CustomLink href="mailto:hello@signoz.io">Email</CustomLink>)
    const link = screen.getByText('Email')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer nofollow')
  })
})

describe('full URL prepending', () => {
  it('uses relative path on non-production (SITE_BASE_URL is empty)', () => {
    render(<CustomLink href="/blog/post/">Blog</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/blog/post/')
  })

  it('uses relative path for docs URLs without region param', () => {
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/')
  })

  it('does NOT prepend to already-absolute signoz.io URLs', () => {
    render(<CustomLink href="https://signoz.io/pricing/">Pricing</CustomLink>)
    const link = screen.getByTestId('next-link')
    // Should NOT become https://signoz.iohttps://signoz.io/pricing/
    expect(link).toHaveAttribute('href', 'https://signoz.io/pricing/')
  })

  it('does NOT prepend to relative paths starting with .', () => {
    render(<CustomLink href="./sibling">Sibling</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', './sibling')
  })

  it('does NOT prepend to anchor links', () => {
    render(<CustomLink href="#section">Section</CustomLink>)
    const link = screen.getByText('Section')
    expect(link).toHaveAttribute('href', '#section')
  })

  it('does NOT prepend to external links', () => {
    render(<CustomLink href="https://google.com/">Google</CustomLink>)
    const link = screen.getByText('Google')
    expect(link).toHaveAttribute('href', 'https://google.com/')
  })

  it('relative URLs do NOT get target="_blank"', () => {
    render(<CustomLink href="/blog/post/">Blog</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/blog/post/')
    expect(link).not.toHaveAttribute('target')
  })

  it('already-absolute signoz.io URLs get target="_blank"', () => {
    render(<CustomLink href="https://signoz.io/blog/post/">Blog</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('target', '_blank')
  })
})

// ---------------------------------------------------------------------------
// Onboarding rewriting
// ---------------------------------------------------------------------------

describe('onboarding rewriting', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/docs-onboarding/install/')
  })

  it('rewrites /docs/ href to /docs-onboarding/', () => {
    render(<CustomLink href="/docs/install/kubernetes/">K8s</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs-onboarding/install/kubernetes/')
  })

  it('rewrites /docs to /docs-onboarding/introduction', () => {
    render(<CustomLink href="/docs">Docs</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs-onboarding/introduction')
  })

  it('rewrites absolute signoz.io/docs/ URL to onboarding', () => {
    render(<CustomLink href="https://signoz.io/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs-onboarding/install/')
  })

  it('rewrites absolute signoz.io/docs (no trailing slash)', () => {
    render(<CustomLink href="https://signoz.io/docs">Docs</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs-onboarding/introduction')
  })

  it('does NOT double-rewrite /docs-onboarding/ links', () => {
    render(<CustomLink href="/docs-onboarding/install/kubernetes/">K8s</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs-onboarding/install/kubernetes/')
  })

  it('does NOT rewrite non-docs links', () => {
    render(<CustomLink href="/blog/post/">Blog</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/blog/post/')
  })

  it('does NOT rewrite external links', () => {
    render(<CustomLink href="https://opentelemetry.io/docs/">OTel</CustomLink>)
    const link = screen.getByText('OTel')
    expect(link).toHaveAttribute('href', 'https://opentelemetry.io/docs/')
  })

  it('does NOT rewrite anchor links', () => {
    render(<CustomLink href="#overview">Overview</CustomLink>)
    const link = screen.getByText('Overview')
    expect(link).toHaveAttribute('href', '#overview')
  })

  it('does NOT rewrite /docs-extra (not a docs path)', () => {
    render(<CustomLink href="/docs-extra/page/">Extra</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs-extra/page/')
  })
})

describe('no rewriting outside onboarding', () => {
  it('leaves /docs/ links unchanged on normal docs pages', () => {
    mockPathname.mockReturnValue('/docs/install/')
    render(<CustomLink href="/docs/install/kubernetes/">K8s</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/kubernetes/')
  })

  it('leaves /docs/ links unchanged on non-docs pages', () => {
    mockPathname.mockReturnValue('/blog/')
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/')
  })
})

// ---------------------------------------------------------------------------
// Region parameter propagation
// ---------------------------------------------------------------------------

describe('region parameter propagation', () => {
  it('appends region param to /docs/ URL', () => {
    mockSearch.mockReturnValue('?region=us')
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/?region=us')
  })

  it('appends region + cloud_region params', () => {
    mockSearch.mockReturnValue('?region=us&cloud_region=eu')
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/?region=us&cloud_region=eu')
  })

  it('uses & separator when href already has query params', () => {
    mockSearch.mockReturnValue('?region=us')
    render(<CustomLink href="/docs/install/?tab=docker">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/?tab=docker&region=us')
  })

  it('does NOT append region to non-docs internal link', () => {
    mockSearch.mockReturnValue('?region=us')
    render(<CustomLink href="/blog/post/">Blog</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/blog/post/')
  })

  it('appends region to /docs-onboarding/ URL (bug fix)', () => {
    mockPathname.mockReturnValue('/docs-onboarding/install/')
    mockSearch.mockReturnValue('?region=us')
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link.getAttribute('href')).toContain('/docs-onboarding/install/')
    expect(link.getAttribute('href')).toContain('region=us')
  })

  it('appends region + cloud_region in onboarding context', () => {
    mockPathname.mockReturnValue('/docs-onboarding/install/')
    mockSearch.mockReturnValue('?region=us&cloud_region=in')
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs-onboarding/install/?region=us&cloud_region=in')
  })

  it('no region param means no appending even for docs URL', () => {
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/')
  })

  it('appends region to signoz.io/docs link in non-onboarding', () => {
    mockSearch.mockReturnValue('?region=us')
    render(<CustomLink href="https://signoz.io/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', 'https://signoz.io/docs/install/?region=us')
  })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('edge cases', () => {
  it('null pathname does not trigger onboarding rewrite', () => {
    mockPathname.mockReturnValue(null)
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('href', '/docs/install/')
  })

  it('docs link with region opens in new tab', () => {
    mockSearch.mockReturnValue('?region=us')
    render(<CustomLink href="/docs/install/">Install</CustomLink>)
    const link = screen.getByTestId('next-link')
    expect(link).toHaveAttribute('target', '_blank')
  })
})

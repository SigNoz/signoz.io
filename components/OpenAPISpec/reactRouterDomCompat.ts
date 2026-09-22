// Stands in for react-router-dom (aliased in next.config.js). @stoplight/elements targets
// react-router-dom@6, but react-router is pinned to 7 to clear CVE-2026-53666 and
// CVE-2026-53669, neither of which has a 6.x fix. v7 made relative splat-route resolution
// unconditional (https://github.com/remix-run/react-router/pull/11695), so Stoplight's
// sidebar links — relative paths rendered inside its <Route path="/*"> — resolve against the
// whole current pathname and compound on every click. Anchoring them to the route base
// restores v6 behaviour. Exports cover only what @stoplight/elements imports.
import React from 'react'
import { Link as RouterLink, Navigate as RouterNavigate, type To } from 'react-router'

export {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Route,
  Routes,
  StaticRouter,
  useInRouterContext,
  useLocation,
} from 'react-router'

const anchorToBase = (to: To): To => {
  if (typeof to !== 'string') return to
  if (to === '.' || to === './') return '/'
  if (/^[/#?]/.test(to) || /^[a-z][a-z0-9+.-]*:/i.test(to)) return to
  return `/${to}`
}

export const Link = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof RouterLink>>(
  function Link({ to, ...rest }, ref) {
    return React.createElement(RouterLink, { ...rest, to: anchorToBase(to), ref })
  }
)

export const Navigate = ({ to, ...rest }: React.ComponentProps<typeof RouterNavigate>) =>
  React.createElement(RouterNavigate, { ...rest, to: anchorToBase(to) })

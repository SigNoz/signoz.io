interface RoutesProps {
  route: string
  label: string
}
function flattenRoutes(navItems) {
  let routes: RoutesProps[] = []

  navItems.forEach((item) => {
    if (item.route) {
      routes.push({ route: item.route, label: item.label })
    }
    if (item.items) {
      routes = routes.concat(flattenRoutes(item.items))
    }
  })

  return routes
}

export function getPrevAndNextRoutes(navItems, currentRoute) {
  // Normalize the currentRoute by stripping the trailing slash if it exists
  const normalizedRoute = currentRoute.endsWith('/') ? currentRoute.slice(0, -1) : currentRoute

  // Flatten the nested navItems structure
  const routeValues = flattenRoutes(navItems)

  // Find the index of the current route in the flattened list
  const currentIndex = routeValues.findIndex((item) => item.route === normalizedRoute)

  if (currentIndex === -1) {
    return { prev: null, next: null } // Current route not found in routes
  }

  const prevRoute = currentIndex > 0 ? routeValues[currentIndex - 1] : null
  const nextRoute = currentIndex < routeValues.length - 1 ? routeValues[currentIndex + 1] : null

  return {
    prev: prevRoute ? { route: prevRoute.route, label: prevRoute.label } : null,
    next: nextRoute ? { route: nextRoute.route, label: nextRoute.label } : null,
  }
}

export function sluggify(str: string) {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove any leading or trailing whitespace
    .replace(/[^\w\s-]/g, '') // Remove non-word characters except for spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

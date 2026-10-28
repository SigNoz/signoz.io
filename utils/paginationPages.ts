export function getVisiblePageNumbers(currentPage: number, totalPages: number): number[] {
  const pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
  if (currentPage === 1) pages.push(3)
  if (currentPage === totalPages) pages.push(totalPages - 2)

  return [...new Set(pages)].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
}

export function getListingPageNumber(
  param: string,
  totalItems: number,
  perPage: number
): number | null {
  if (!/^[1-9]\d*$/.test(param)) return null

  const page = Number(param)
  // An empty list means the CMS fetch failed, so render as before instead of caching a 404.
  if (totalItems === 0) return page

  const totalPages = Math.ceil(totalItems / perPage)
  return totalPages > 1 && page <= totalPages ? page : null
}

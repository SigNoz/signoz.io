export function getVisiblePageNumbers(currentPage: number, totalPages: number): number[] {
  const pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
  if (currentPage === 1) pages.push(3)
  if (currentPage === totalPages) pages.push(totalPages - 2)

  return [...new Set(pages)].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
}

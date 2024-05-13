// Function to filter based on search value
export function filterData(array, searchValue) {
  return array.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
    )
  )
}

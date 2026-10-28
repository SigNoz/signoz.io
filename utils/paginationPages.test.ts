import { describe, expect, it } from 'vitest'
import { getVisiblePageNumbers } from './paginationPages'

describe('getVisiblePageNumbers', () => {
  it.each([
    [1, 2, [1, 2]],
    [2, 2, [1, 2]],
    [1, 3, [1, 2, 3]],
    [2, 3, [1, 2, 3]],
    [3, 3, [1, 2, 3]],
    [1, 4, [1, 2, 3, 4]],
    [4, 4, [1, 2, 3, 4]],
  ])('page %i of %i shows %j with no gaps or out-of-range pages', (current, total, expected) => {
    expect(getVisiblePageNumbers(current, total)).toEqual(expected)
  })

  it.each([
    [1, 10, [1, 2, 3, 10]],
    [2, 10, [1, 2, 3, 10]],
    [5, 10, [1, 4, 5, 6, 10]],
    [9, 10, [1, 8, 9, 10]],
    [10, 10, [1, 8, 9, 10]],
  ])('page %i of %i keeps the existing window %j', (current, total, expected) => {
    expect(getVisiblePageNumbers(current, total)).toEqual(expected)
  })

  it('drops pages outside the range for an out-of-range current page', () => {
    expect(getVisiblePageNumbers(5, 2)).toEqual([1, 2])
  })
})

import { describe, expect, it } from 'vitest'
import { getListingPageNumber, getVisiblePageNumbers } from './paginationPages'

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

describe('getListingPageNumber', () => {
  it.each([
    ['1', 13, 1],
    ['2', 13, 2],
    ['2', 24, 2],
    ['3', 25, 3],
    ['30', 360, 30],
  ])('page %s of %i items is valid', (param, totalItems, expected) => {
    expect(getListingPageNumber(param, totalItems, 12)).toBe(expected)
  })

  it.each([
    ['1', 1],
    ['1', 8],
    ['1', 12],
    ['2', 12],
  ])('page %s does not exist when %i items fit on one page', (param, totalItems) => {
    expect(getListingPageNumber(param, totalItems, 12)).toBeNull()
  })

  it.each([
    ['3', 13],
    ['3', 24],
    ['31', 360],
    ['999', 25],
  ])('page %s is past the last page of %i items', (param, totalItems) => {
    expect(getListingPageNumber(param, totalItems, 12)).toBeNull()
  })

  it.each(['0', '-1', '02', '2abc', 'abc', '1.0', '1e1', ' 2', ''])(
    'rejects the non-canonical page param %j',
    (param) => {
      expect(getListingPageNumber(param, 360, 12)).toBeNull()
    }
  )

  it('keeps rendering a valid page number when the list is empty', () => {
    expect(getListingPageNumber('2', 0, 12)).toBe(2)
    expect(getListingPageNumber('abc', 0, 12)).toBeNull()
  })
})

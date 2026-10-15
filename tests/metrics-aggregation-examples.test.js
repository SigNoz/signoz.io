const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const content = fs.readFileSync(
  path.join(__dirname, '../data/docs/metrics-management/types-and-aggregation.mdx'),
  'utf8'
)

function readTable(header) {
  const lines = content.split(/\r?\n/)
  const start = lines.findIndex((line) => line.trim() === header)
  assert.notEqual(start, -1, `Missing example table: ${header}`)

  const rows = []
  for (const line of lines.slice(start + 2)) {
    if (!line.trim().startsWith('|')) break
    rows.push(
      line
        .trim()
        .slice(1, -1)
        .split('|')
        .map((cell) => cell.trim())
    )
  }
  assert.ok(rows.length > 0, `Empty example table: ${header}`)
  return rows
}

function numbers(cells) {
  return cells.map((cell) => {
    assert.match(cell, /^-?\d+(\.\d+)?$/)
    return Number(cell)
  })
}

const intervals = readTable('| Interval | checkout | payments | Sum without grouping |').map(
  ([interval, ...values]) => ({ interval, values: numbers(values) })
)
const reductions = readTable(
  '| Reduce To | Number, no grouping | Table, checkout | Table, payments |'
)

test('spatial sums in the metrics aggregation example match each interval', () => {
  for (const {
    interval,
    values: [checkout, payments, total],
  } of intervals) {
    assert.equal(total, checkout + payments, interval)
  }
})

const reducers = {
  Latest: (values) => values.at(-1),
  Sum: (values) => values.reduce((total, value) => total + value, 0),
  Avg: (values) => values.reduce((total, value) => total + value, 0) / values.length,
  Min: (values) => Math.min(...values),
  Max: (values) => Math.max(...values),
}

for (const [name, ...values] of reductions) {
  test(`${name} results in the metrics aggregation example match the returned points`, () => {
    const reduce = reducers[name]
    assert.equal(typeof reduce, 'function', `Unknown Reduce To option: ${name}`)
    const expected = numbers(values)
    const checkout = intervals.map(({ values }) => values[0])
    const payments = intervals.map(({ values }) => values[1])
    const totals = intervals.map(({ values }) => values[2])
    assert.deepEqual([reduce(totals), reduce(checkout), reduce(payments)], expected)
  })
}

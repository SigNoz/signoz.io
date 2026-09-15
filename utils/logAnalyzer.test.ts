import { describe, expect, it } from 'vitest'
import {
  aggregateLogs,
  createHistogram,
  createTimeSeries,
  filterLogs,
  getNumericAttributeKeys,
  normalizeLevel,
  parseLogs,
  sortLogsByTimestamp,
  serializeLogs,
} from '../app/(site)/log-analyzer/logAnalyzer.utils'

describe('log analyzer parser', () => {
  it('parses a JSON array and detects common fields', () => {
    const logs = parseLogs(
      JSON.stringify([
        {
          '@timestamp': '2026-08-31T10:14:21Z',
          level: 'error',
          message: 'Request failed',
          'service.name': 'api',
        },
      ])
    )

    expect(logs).toHaveLength(1)
    expect(logs[0]).toMatchObject({
      timestamp: '2026-08-31T10:14:21Z',
      level: 'ERROR',
      message: 'Request failed',
      attributes: { 'service.name': 'api' },
      isJson: true,
    })
  })

  it('parses mixed NDJSON and plain-text lines', () => {
    const logs = parseLogs(
      '{"timestamp":"2026-08-31T10:14:21Z","severity_text":"WARN","body":"Slow query"}\n' +
        '2026-08-31T10:14:22Z INFO service.name=worker Job finished'
    )

    expect(logs).toHaveLength(2)
    expect(logs[0].level).toBe('WARN')
    expect(logs[1].level).toBe('INFO')
    expect(logs[1].attributes['service.name']).toBe('worker')
    expect(logs[1].message).toContain('Job finished')
  })

  it('parses CSV with common log fields and quoted values', () => {
    const logs = parseLogs(
      'timestamp,severity_text,service.name,body\n' +
        '2026-08-31T10:14:21Z,ERROR,checkout,"Payment failed, retrying"'
    )

    expect(logs).toHaveLength(1)
    expect(logs[0]).toMatchObject({
      timestamp: '2026-08-31T10:14:21Z',
      level: 'ERROR',
      message: 'Payment failed, retrying',
      attributes: { 'service.name': 'checkout' },
      isJson: false,
    })
  })

  it('parses TSV files and case-insensitive field names', () => {
    const logs = parseLogs(
      'TimeGenerated\tLevel\tService\tMessage\n2026-08-31T10:14:22Z\twarning\tworker\tQueue is slow',
      'tsv'
    )

    expect(logs).toHaveLength(1)
    expect(logs[0]).toMatchObject({
      timestamp: '2026-08-31T10:14:22Z',
      level: 'WARN',
      message: 'Queue is slow',
      attributes: { Service: 'worker' },
      isJson: false,
    })
  })

  it('parses SigNoz JSONL timestamps and nested resource attributes', () => {
    const logs = parseLogs(
      JSON.stringify({
        timestamp: 1788240657667000000,
        severity_text: 'info',
        body: 'Request completed',
        attributes_number: { duration_ms: 24 },
        resources_string: { 'service.name': 'checkout', 'cloud.provider': 'cloudflare' },
        trace_id: 'abc123',
      })
    )

    expect(logs).toHaveLength(1)
    expect(logs[0]).toMatchObject({
      timestamp: '2026-09-01T05:30:57.667Z',
      level: 'INFO',
      message: 'Request completed',
      attributes: {
        duration_ms: 24,
        'service.name': 'checkout',
        'cloud.provider': 'cloudflare',
        trace_id: 'abc123',
      },
    })
  })

  it('normalizes common severity names', () => {
    expect(normalizeLevel('fatal')).toBe('ERROR')
    expect(normalizeLevel('warning')).toBe('WARN')
    expect(normalizeLevel('notice')).toBe('INFO')
    expect(normalizeLevel('trace')).toBe('DEBUG')
  })

  it('filters by an attribute and severity', () => {
    const logs = parseLogs(
      '[{"level":"error","message":"Failed","service":"api"},{"level":"info","message":"Done","service":"worker"}]'
    )

    expect(
      filterLogs(logs, { field: 'service', operator: '=', value: 'api' }, new Set(['ERROR']))
    ).toHaveLength(1)
    expect(
      filterLogs(logs, { field: 'body', operator: 'contains', value: 'done' }, new Set())
    ).toHaveLength(1)
  })

  it('builds grouped aggregation rows with order, limit, and having', () => {
    const logs = parseLogs(
      '[{"level":"error","message":"Failed","service":"api","duration_ms":20},{"level":"info","message":"Done","service":"api","duration_ms":10},{"level":"info","message":"Done","service":"worker","duration_ms":5}]'
    )

    expect(aggregateLogs(logs, 'avg', 'duration_ms', 'service', 'desc', 10)).toEqual([
      { group: 'api', value: 15 },
      { group: 'worker', value: 5 },
    ])
    expect(
      aggregateLogs(logs, 'count', '', 'service', 'desc', 1, { operator: '>=', value: 2 })
    ).toEqual([{ group: 'api', value: 2 }])
    expect(getNumericAttributeKeys(logs)).toEqual(['duration_ms'])
  })

  it('builds grouped time series points from timestamps', () => {
    const logs = parseLogs(
      '[{"timestamp":"2026-08-31T10:14:21Z","message":"A","service":"api"},{"timestamp":"2026-08-31T10:14:22Z","message":"B","service":"worker"}]'
    )
    const timeSeries = createTimeSeries(logs, 'count', '', 'service', 2)

    expect(timeSeries.series).toEqual(['api', 'worker'])
    expect(timeSeries.points).toHaveLength(2)
    expect(timeSeries.points[0].values.api).toBe(1)
    expect(timeSeries.points[1].values.worker).toBe(1)
  })

  it('charts 200,000 timestamped records without exceeding the call stack', () => {
    const logs = parseLogs(
      '{"timestamp":"2026-08-31T10:14:21Z","body":"A","service":"api"}\n'.repeat(200_000)
    )
    const result = createTimeSeries(logs, 'count', '', 'service')

    expect(result.series).toEqual(['api'])
    expect(result.points.reduce((total, point) => total + point.values.api, 0)).toBe(200_000)
  })

  it('aggregates a large single group within an interactive time budget', () => {
    const logs = parseLogs('{"body":"A","duration_ms":42}\n'.repeat(50_000))
    const started = performance.now()
    expect(aggregateLogs(logs, 'avg', 'duration_ms', '')).toEqual([
      { group: 'All logs', value: 42 },
    ])
    // A generous budget catches quadratic copying without requiring a microbenchmark.
    expect(performance.now() - started).toBeLessThan(1_000)
  })

  it.each(['min', 'max'] as const)('computes %s for 200,000 numeric records', (aggregation) => {
    const logs = parseLogs(
      '{"timestamp":"2026-08-31T10:14:21Z","duration_ms":42}\n'.repeat(200_000)
    )
    expect(aggregateLogs(logs, aggregation, 'duration_ms', '')[0].value).toBe(42)
    expect(createTimeSeries(logs, aggregation, 'duration_ms', '').points[0].values.A).toBe(42)
  })

  it('places events in time buckets rather than dividing the input rows evenly', () => {
    const logs = parseLogs(
      JSON.stringify([
        { timestamp: '2026-08-31T10:00:00Z' },
        { timestamp: '2026-08-31T10:00:00Z' },
        { timestamp: '2026-08-31T10:00:00Z' },
        { timestamp: '2026-08-31T10:03:00Z' },
      ])
    )
    expect(createHistogram(logs, 4)).toEqual([3, 0, 0, 1])
    expect(createHistogram([...logs].reverse(), 4)).toEqual([3, 0, 0, 1])
  })

  it('excludes missing and invalid timestamps from time charts without inventing dates', () => {
    const undated = parseLogs('[{"body":"missing"},{"timestamp":"invalid"}]')
    expect(createTimeSeries(undated, 'count', '', '')).toEqual({ points: [], series: [] })
    expect(createHistogram(undated)).toEqual([])
    const logs = [...undated, ...parseLogs('{"timestamp":"2026-08-31T10:00:00Z"}')]
    const result = createTimeSeries(logs, 'count', '', '')
    expect(result.points[0].timestamp).toBe(Date.parse('2026-08-31T10:00:00Z'))
    expect(createHistogram(logs).reduce((sum, value) => sum + value, 0)).toBe(1)
    expect(aggregateLogs(logs, 'count', '', '')[0].value).toBe(3)
  })

  it('sorts newest first, preserves ties, and keeps undated records last without changing the input', () => {
    const logs = parseLogs(
      JSON.stringify([
        { body: 'missing' },
        { timestamp: '2026-08-31T10:00:00Z', body: 'old' },
        { timestamp: '2026-08-31T10:01:00Z', body: 'new' },
        { timestamp: 'invalid', body: 'invalid' },
        { timestamp: '2026-08-31T11:01:00+01:00', body: 'tie' },
      ])
    )
    expect(sortLogsByTimestamp(logs).map((log) => log.message)).toEqual([
      'new',
      'tie',
      'old',
      'missing',
      'invalid',
    ])
    expect(logs[0].message).toBe('missing')
  })

  it('only builds requested chart series while keeping the full time range', () => {
    const logs = parseLogs(
      JSON.stringify([
        { timestamp: '2026-08-31T10:00:00Z', service: 'hidden' },
        { timestamp: '2026-08-31T10:01:00Z', service: 'api.v1' },
        { timestamp: '2026-08-31T10:02:00Z', service: 'api.v1' },
      ])
    )
    const result = createTimeSeries(logs, 'count', '', 'service', 3, ['api.v1'])
    expect(result.series).toEqual(['api.v1'])
    expect(result.points.map((point) => point.values)).toEqual([
      { 'api.v1': 0 },
      { 'api.v1': 1 },
      { 'api.v1': 1 },
    ])
    expect(createTimeSeries(logs, 'count', '', 'service', 3, []).series).toEqual([])
  })

  it('exports filtered rows in order without losing nested fields, quotes, or newlines', () => {
    const logs = parseLogs(
      JSON.stringify([
        { timestamp: '2026-08-31T10:00:00Z', body: 'old', details: { retry: 1 } },
        {
          timestamp: '2026-08-31T10:01:00Z',
          body: 'new, "quoted"\nnext line',
          details: { retry: 2 },
        },
      ])
    )
    const filtered = filterLogs(
      sortLogsByTimestamp(logs),
      { field: 'body', operator: 'contains', value: 'new' },
      new Set()
    )
    const jsonl = serializeLogs(filtered, 'jsonl')
    expect(JSON.parse(jsonl).details).toEqual({ retry: 2 })
    const csv = parseLogs(serializeLogs(filtered, 'csv'), 'csv')
    expect(csv).toHaveLength(1)
    expect(csv[0].message).toBe(filtered[0].message)
    expect(JSON.parse(csv[0].attributes.details as string)).toEqual({ retry: 2 })
    expect(serializeLogs(filtered, 'txt')).toBe(filtered[0].raw)
  })
})

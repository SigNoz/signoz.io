export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'UNKNOWN'

export type ParsedLog = {
  id: string
  lineNumber: number
  timestamp: string
  level: LogLevel
  message: string
  attributes: Record<string, unknown>
  raw: string
  isJson: boolean
}

export type LogFilter = {
  field: string
  operator: 'contains' | '=' | '!='
  value: string
}

export type LogInputFormat = 'auto' | 'csv' | 'tsv'
export type LogExportFormat = 'jsonl' | 'csv' | 'txt'

export type LogAggregation = 'count' | 'sum' | 'avg' | 'min' | 'max'
export type LogAggregationOrder = 'desc' | 'asc'

export type AggregatedLogRow = {
  group: string
  value: number
}

export type TimeSeriesPoint = {
  timestamp: number
  label: string
  values: Record<string, number>
}

const TIMESTAMP_KEYS = [
  'timestamp',
  'time',
  '@timestamp',
  'ts',
  'datetime',
  'date',
  'timegenerated',
  '_time',
]
const LEVEL_KEYS = ['severity_text', 'severity', 'level', 'log.level']
const MESSAGE_KEYS = ['body', 'message', 'msg', 'event', 'log', '_raw', 'content']
const RESERVED_KEYS = new Set([...TIMESTAMP_KEYS, ...LEVEL_KEYS, ...MESSAGE_KEYS])
const FLATTENED_ATTRIBUTE_CONTAINERS = new Set([
  'attributes_bool',
  'attributes_number',
  'attributes_string',
  'resources_bool',
  'resources_number',
  'resources_string',
  'scope_bool',
  'scope_number',
  'scope_string',
])

const toDisplayString = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (value === undefined || value === null) return ''

  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

const findValue = (record: Record<string, unknown>, keys: string[]): unknown => {
  for (const [recordKey, value] of Object.entries(record)) {
    if (keys.includes(recordKey.toLowerCase()) && value !== undefined && value !== null) {
      return value
    }
  }

  return undefined
}

export const normalizeLevel = (value: unknown): LogLevel => {
  const level = String(value ?? '').toUpperCase()

  if (/ERROR|ERR|FATAL|CRITICAL|PANIC/.test(level)) return 'ERROR'
  if (/WARN|WARNING/.test(level)) return 'WARN'
  if (/INFO|NOTICE/.test(level)) return 'INFO'
  if (/DEBUG|TRACE/.test(level)) return 'DEBUG'

  return 'UNKNOWN'
}

const normalizeTimestamp = (value: unknown): string => {
  if (value === undefined || value === null || value === '') return ''

  if (typeof value === 'number') {
    const magnitude = Math.abs(value)
    const milliseconds =
      magnitude < 100_000_000_000
        ? value * 1000
        : magnitude >= 100_000_000_000_000_000
          ? value / 1_000_000
          : magnitude >= 100_000_000_000_000
            ? value / 1000
            : value
    const date = new Date(milliseconds)
    return Number.isNaN(date.getTime()) ? String(value) : date.toISOString()
  }

  return String(value)
}

const parseLogfmtAttributes = (line: string): Record<string, unknown> => {
  const attributes: Record<string, unknown> = {}
  const matcher = /([\w.@/-]+)=("(?:[^"\\]|\\.)*"|'[^']*'|\S+)/g

  for (const match of line.matchAll(matcher)) {
    const rawValue = match[2]
    attributes[match[1]] = rawValue.replace(/^("|')|("|')$/g, '')
  }

  return attributes
}

const recordToLog = (
  value: unknown,
  lineNumber: number,
  rawOverride?: string,
  isJson = true
): ParsedLog => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    const raw = rawOverride ?? toDisplayString(value)
    return plainLineToLog(raw, lineNumber)
  }

  const record = value as Record<string, unknown>
  const raw = rawOverride ?? JSON.stringify(record)
  const attributes: Record<string, unknown> = {}

  Object.entries(record).forEach(([key, entryValue]) => {
    const normalizedKey = key.toLowerCase()
    if (RESERVED_KEYS.has(normalizedKey)) return

    if (
      FLATTENED_ATTRIBUTE_CONTAINERS.has(normalizedKey) &&
      entryValue &&
      typeof entryValue === 'object' &&
      !Array.isArray(entryValue)
    ) {
      Object.assign(attributes, entryValue)
      return
    }

    attributes[key] = entryValue
  })

  return {
    id: `log-${lineNumber}`,
    lineNumber,
    timestamp: normalizeTimestamp(findValue(record, TIMESTAMP_KEYS)),
    level: normalizeLevel(findValue(record, LEVEL_KEYS)),
    message: toDisplayString(findValue(record, MESSAGE_KEYS)) || raw,
    attributes,
    raw,
    isJson,
  }
}

const parseDelimitedRows = (input: string, delimiter: ',' | '\t'): string[][] => {
  const rows: string[][] = []
  let row: string[] = []
  let value = ''
  let inQuotes = false

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]
    const nextCharacter = input[index + 1]

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        value += '"'
        index += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (character === delimiter && !inQuotes) {
      row.push(value)
      value = ''
      continue
    }

    if ((character === '\n' || character === '\r') && !inQuotes) {
      if (character === '\r' && nextCharacter === '\n') index += 1
      row.push(value)
      if (row.some((cell) => cell.trim().length > 0)) rows.push(row)
      row = []
      value = ''
      continue
    }

    value += character
  }

  row.push(value)
  if (row.some((cell) => cell.trim().length > 0)) rows.push(row)

  return rows
}

const parseDelimitedLogs = (input: string, delimiter: ',' | '\t'): ParsedLog[] => {
  const rows = parseDelimitedRows(input, delimiter)
  if (rows.length < 2) return []

  const headers = rows[0].map((header, index) => header.trim() || `column_${index + 1}`)

  return rows.slice(1).map((row, index) => {
    const record = Object.fromEntries(headers.map((header, column) => [header, row[column] ?? '']))
    return recordToLog(record, index + 2, JSON.stringify(record), false)
  })
}

const detectDelimitedFormat = (input: string): LogInputFormat => {
  const firstLine = input.split(/\r?\n/, 1)[0].toLowerCase()
  const knownHeader = [...TIMESTAMP_KEYS, ...LEVEL_KEYS, ...MESSAGE_KEYS, 'service', 'service.name']

  if (firstLine.includes('\t')) {
    const headers = firstLine.split('\t').map((header) => header.trim().replace(/^"|"$/g, ''))
    if (headers.length > 1 && headers.some((header) => knownHeader.includes(header))) return 'tsv'
  }

  if (firstLine.includes(',')) {
    const headers = parseDelimitedRows(firstLine, ',')[0]?.map((header) =>
      header.trim().toLowerCase()
    )
    if (headers?.length > 1 && headers.some((header) => knownHeader.includes(header))) return 'csv'
  }

  return 'auto'
}

const plainLineToLog = (line: string, lineNumber: number): ParsedLog => {
  const timestampMatch = line.match(
    /^\[?(\d{4}-\d{2}-\d{2}[T ][0-9:.+-]+(?:Z|[+-]\d{2}:?\d{2})?)\]?/
  )
  const levelMatch = line.match(
    /\b(TRACE|DEBUG|INFO|NOTICE|WARN(?:ING)?|ERROR|ERR|CRITICAL|FATAL|PANIC)\b/i
  )
  const attributes = parseLogfmtAttributes(line)
  const timestamp = timestampMatch?.[1] ?? toDisplayString(findValue(attributes, TIMESTAMP_KEYS))
  const level = normalizeLevel(levelMatch?.[1] ?? findValue(attributes, LEVEL_KEYS))
  const messageStart = levelMatch?.index === undefined ? 0 : levelMatch.index + levelMatch[0].length
  const message =
    line
      .slice(messageStart)
      .replace(/^\s*(?:-|:|\|)\s*/, '')
      .trim() || line

  return {
    id: `log-${lineNumber}`,
    lineNumber,
    timestamp,
    level,
    message,
    attributes,
    raw: line,
    isJson: false,
  }
}

export const parseLogs = (input: string, format: LogInputFormat = 'auto'): ParsedLog[] => {
  const trimmed = input.trim()
  if (!trimmed) return []

  const detectedFormat = format === 'auto' ? detectDelimitedFormat(trimmed) : format
  if (detectedFormat === 'csv') return parseDelimitedLogs(trimmed, ',')
  if (detectedFormat === 'tsv') return parseDelimitedLogs(trimmed, '\t')

  try {
    const parsed = JSON.parse(trimmed) as unknown
    const records = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === 'object' && Array.isArray((parsed as { logs?: unknown[] }).logs)
        ? (parsed as { logs: unknown[] }).logs
        : [parsed]

    return records.map((record, index) => recordToLog(record, index + 1))
  } catch {
    return trimmed
      .split(/\r?\n/)
      .map((line, index) => ({ line: line.trim(), lineNumber: index + 1 }))
      .filter(({ line }) => line.length > 0)
      .map(({ line, lineNumber }) => {
        try {
          return recordToLog(JSON.parse(line), lineNumber, line)
        } catch {
          return plainLineToLog(line, lineNumber)
        }
      })
  }
}

export const sortLogsByTimestamp = (logs: ParsedLog[]): ParsedLog[] =>
  logs
    .map((log) => {
      const timestamp = Date.parse(log.timestamp)
      return { log, timestamp: Number.isFinite(timestamp) ? timestamp : -Infinity }
    })
    .sort((left, right) => right.timestamp - left.timestamp || 0)
    .map(({ log }) => log)

export const getLogFieldValue = (log: ParsedLog, field: string): string => {
  if (field === 'body') return log.message
  if (field === 'severity_text') return log.level
  if (field === 'timestamp') return log.timestamp
  if (field === 'raw') return log.raw

  return toDisplayString(log.attributes[field])
}

export const filterLogs = (
  logs: ParsedLog[],
  filter: LogFilter,
  levels: Set<LogLevel>
): ParsedLog[] => {
  const expected = filter.value.trim().toLowerCase()

  return logs.filter((log) => {
    if (levels.size > 0 && !levels.has(log.level)) return false
    if (!expected) return true

    const actual = getLogFieldValue(log, filter.field).toLowerCase()

    if (filter.operator === '=') return actual === expected
    if (filter.operator === '!=') return actual !== expected
    return actual.includes(expected)
  })
}

export const getAttributeKeys = (logs: ParsedLog[]): string[] => {
  const keys = new Set<string>()
  logs.forEach((log) => Object.keys(log.attributes).forEach((key) => keys.add(key)))
  return [...keys].sort((a, b) => a.localeCompare(b))
}

export const createHistogram = (logs: ParsedLog[], bucketCount = 28): number[] => {
  return createTimeSeries(logs, 'count', '', '', bucketCount).points.map((point) => point.values.A)
}

export const serializeLogs = (logs: ParsedLog[], format: LogExportFormat): string => {
  if (format === 'txt') return logs.map((log) => log.raw).join('\n')

  const records = logs.map((log) => ({
    ...log.attributes,
    timestamp: log.timestamp,
    severity_text: log.level,
    body: log.message,
  }))
  if (format === 'jsonl') return records.map((record) => JSON.stringify(record)).join('\n')

  const keys = [...new Set(['timestamp', 'severity_text', 'body', ...getAttributeKeys(logs)])]
  const escapeCsv = (value: unknown) => `"${toDisplayString(value).replaceAll('"', '""')}"`
  return [
    keys.map(escapeCsv).join(','),
    ...records.map((record: Record<string, unknown>) =>
      keys.map((key) => escapeCsv(record[key])).join(',')
    ),
  ].join('\n')
}

const numericValue = (log: ParsedLog, field: string): number | null => {
  const rawValue = getLogFieldValue(log, field).trim()
  if (!rawValue) return null
  const value = Number(rawValue)
  return Number.isFinite(value) ? value : null
}

const aggregateValues = (logs: ParsedLog[], aggregation: LogAggregation, field: string): number => {
  if (aggregation === 'count') return logs.length

  const values = logs
    .map((log) => numericValue(log, field))
    .filter((value): value is number => value !== null)
  if (values.length === 0) return 0
  if (aggregation === 'sum') return values.reduce((total, value) => total + value, 0)
  if (aggregation === 'avg') {
    return values.reduce((total, value) => total + value, 0) / values.length
  }
  if (aggregation === 'min')
    return values.reduce((minimum, value) => Math.min(minimum, value), Infinity)
  return values.reduce((maximum, value) => Math.max(maximum, value), -Infinity)
}

export const aggregateLogs = (
  logs: ParsedLog[],
  aggregation: LogAggregation,
  field: string,
  groupBy: string,
  order: LogAggregationOrder = 'desc',
  limit = 20,
  having?: { operator: '>' | '>=' | '<' | '<='; value: number } | null
): AggregatedLogRow[] => {
  const grouped = new Map<string, ParsedLog[]>()

  logs.forEach((log) => {
    const group = groupBy ? getLogFieldValue(log, groupBy) || '(empty)' : 'All logs'
    const groupLogs = grouped.get(group)
    if (groupLogs) groupLogs.push(log)
    else grouped.set(group, [log])
  })

  const matchesHaving = (value: number): boolean => {
    if (!having) return true
    if (having.operator === '>') return value > having.value
    if (having.operator === '>=') return value >= having.value
    if (having.operator === '<') return value < having.value
    return value <= having.value
  }

  return [...grouped.entries()]
    .map(([group, groupLogs]) => ({
      group,
      value: aggregateValues(groupLogs, aggregation, field),
    }))
    .filter((row) => matchesHaving(row.value))
    .sort((left, right) => (order === 'desc' ? right.value - left.value : left.value - right.value))
    .slice(0, Math.max(1, limit))
}

export const getNumericAttributeKeys = (logs: ParsedLog[]): string[] =>
  getAttributeKeys(logs).filter((field) => logs.some((log) => numericValue(log, field) !== null))

export const createTimeSeries = (
  logs: ParsedLog[],
  aggregation: LogAggregation,
  field: string,
  groupBy: string,
  bucketCount = 18,
  allowedSeries?: string[]
): { points: TimeSeriesPoint[]; series: string[] } => {
  if (logs.length === 0) return { points: [], series: [] }

  const datedLogs = logs
    .map((log) => ({ log, timestamp: Date.parse(log.timestamp) }))
    .filter(({ timestamp }) => Number.isFinite(timestamp))
  if (datedLogs.length === 0) return { points: [], series: [] }
  let minimum = Infinity
  let maximum = -Infinity
  for (const { timestamp } of datedLogs) {
    minimum = Math.min(minimum, timestamp)
    maximum = Math.max(maximum, timestamp)
  }
  const count = Math.min(Math.max(1, bucketCount), datedLogs.length)
  const width = Math.max(1, (maximum - minimum + 1) / count)
  const buckets = Array.from({ length: count }, () => new Map<string, ParsedLog[]>())
  const allowed = allowedSeries ? new Set(allowedSeries) : null
  const seriesNames = new Set<string>()

  datedLogs.forEach(({ log, timestamp }) => {
    const bucketIndex = Math.min(count - 1, Math.floor((timestamp - minimum) / width))
    const seriesName = groupBy ? getLogFieldValue(log, groupBy) || '(empty)' : 'A'
    if (allowed && !allowed.has(seriesName)) return
    seriesNames.add(seriesName)
    const bucket = buckets[bucketIndex]
    const group = bucket.get(seriesName)
    if (group) group.push(log)
    else bucket.set(seriesName, [log])
  })

  const series = [...seriesNames].sort((left, right) => left.localeCompare(right))

  const points = buckets.map((bucket, index) => {
    const timestamp = minimum + width * index
    const date = new Date(timestamp)
    const label = Number.isFinite(date.getTime())
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      : `Bucket ${index + 1}`
    const values = Object.fromEntries(
      series.map((seriesName) => [
        seriesName,
        aggregateValues(bucket.get(seriesName) ?? [], aggregation, field),
      ])
    )
    return { timestamp, label, values }
  })

  return { points, series }
}

export const SAMPLE_LOGS = `{"timestamp":"2026-08-31T10:14:21.114Z","severity_text":"INFO","service.name":"checkout","body":"Checkout request received","http.method":"POST","http.route":"/api/checkout","trace_id":"6f8f4438fe5e016a47b8744cbf278a3c"}
{"timestamp":"2026-08-31T10:14:21.246Z","severity_text":"DEBUG","service.name":"checkout","body":"Inventory reservation completed","cart.items":3,"duration_ms":118,"trace_id":"6f8f4438fe5e016a47b8744cbf278a3c"}
{"timestamp":"2026-08-31T10:14:21.407Z","severity_text":"WARN","service.name":"payments","body":"Payment provider response was slow","provider":"stripe","duration_ms":1840,"trace_id":"6f8f4438fe5e016a47b8744cbf278a3c"}
{"timestamp":"2026-08-31T10:14:21.622Z","severity_text":"ERROR","service.name":"payments","body":"Payment authorization failed","error.type":"card_declined","http.status_code":402,"trace_id":"6f8f4438fe5e016a47b8744cbf278a3c"}
{"timestamp":"2026-08-31T10:14:22.018Z","severity_text":"INFO","service.name":"checkout","body":"Checkout request completed","http.status_code":402,"duration_ms":904,"trace_id":"6f8f4438fe5e016a47b8744cbf278a3c"}
2026-08-31T10:14:23.051Z INFO service.name=frontend route=/checkout User returned to payment step
2026-08-31T10:14:24.902Z WARN service.name=frontend route=/checkout Retry button clicked`

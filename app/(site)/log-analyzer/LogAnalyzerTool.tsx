'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Braces,
  Bug,
  ChartNoAxesColumn,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Copy,
  Download,
  FileText,
  Filter,
  Info,
  List,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  RefreshCw,
  Search,
  ShieldCheck,
  Table2,
  Upload,
  X,
} from 'lucide-react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { useLogEvent } from '@/hooks/useLogEvent'
import SigNozLogo from '@/public/img/SigNozLogo-orange.svg'
import {
  aggregateLogs,
  createHistogram,
  createTimeSeries,
  filterLogs,
  getAttributeKeys,
  getLogFieldValue,
  getNumericAttributeKeys,
  LogAggregation,
  LogAggregationOrder,
  LogFilter,
  LogInputFormat,
  LogLevel,
  ParsedLog,
  SAMPLE_LOGS,
  serializeLogs,
} from './logAnalyzer.utils'
import type { ParseWorkerRequest, ParseWorkerResponse } from './logAnalyzer.worker'

const MAX_FILE_SIZE_MB = 50
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024
const MAX_PASTED_INPUT_SIZE_MB = 20
const MAX_PASTED_INPUT_SIZE = MAX_PASTED_INPUT_SIZE_MB * 1024 * 1024
const VIRTUAL_OVERSCAN = 8

type ExportFormat = 'jsonl' | 'csv' | 'txt'
type ExplorerView = 'list' | 'timeseries' | 'table'
type DetailTab = 'overview' | 'json' | 'context' | 'metrics'
type AttributeSelections = Record<string, string[]>
type HavingOperator = '>' | '>=' | '<' | '<='

const LEVELS: Array<{
  level: LogLevel
  label: string
  icon: React.ReactNode
  indicatorClassName: string
}> = [
  {
    level: 'ERROR',
    label: 'error',
    icon: <AlertTriangle size={13} />,
    indicatorClassName: 'bg-signoz_cherry-500',
  },
  {
    level: 'WARN',
    label: 'warn',
    icon: <CircleHelp size={13} />,
    indicatorClassName: 'bg-amber-400',
  },
  {
    level: 'INFO',
    label: 'info',
    icon: <Info size={13} />,
    indicatorClassName: 'bg-signoz_robin-500',
  },
  { level: 'DEBUG', label: 'debug', icon: <Bug size={13} />, indicatorClassName: 'bg-violet-400' },
  {
    level: 'UNKNOWN',
    label: 'unknown',
    icon: <CircleHelp size={13} />,
    indicatorClassName: 'bg-signoz_slate-200',
  },
]
const ALL_LEVELS = new Set<LogLevel>(LEVELS.map(({ level }) => level))
const FILTER_GROUPS = [
  { label: 'Deployment Environment', keys: ['deployment.environment', 'deployment_environment'] },
  { label: 'Service Name', keys: ['service.name', 'service'] },
  { label: 'Host Name', keys: ['host.name', 'hostname', 'host'] },
  { label: 'K8s Cluster Name', keys: ['k8s.cluster.name'] },
  { label: 'K8s Deployment Name', keys: ['k8s.deployment.name'] },
  { label: 'K8s Namespace Name', keys: ['k8s.namespace.name'] },
  { label: 'K8s Pod Name', keys: ['k8s.pod.name'] },
]
const formatTimestamp = (value: string): string => {
  if (!value) return 'No timestamp'
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toISOString().replace('T', ' ').replace('Z', '')
}
const displayValue = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (value === undefined || value === null) return ''
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
const prettyJson = (value: string): string => {
  try {
    return JSON.stringify(JSON.parse(value), null, 2)
  } catch {
    return value
  }
}

const Toggle: React.FC<{
  checked: boolean
  onChange: () => void
  label: string
  visibleLabel?: string
  description?: string
}> = ({ checked, onChange, label, visibleLabel, description }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`${visibleLabel ? 'flex min-h-11 w-full items-center justify-between gap-4 rounded-sm border border-signoz_slate-400 bg-signoz_ink-500/40 px-3 py-2 text-left hover:bg-signoz_slate-400/20' : 'flex h-7 w-11 shrink-0 items-center justify-center rounded'} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signoz_robin-400`}
  >
    {visibleLabel && (
      <span className="flex min-w-0 flex-col">
        <span className="text-xs font-medium text-signoz_vanilla-200">{visibleLabel}</span>
        {description && (
          <span className="mt-0.5 text-[11px] text-signoz_vanilla-400">{description}</span>
        )}
      </span>
    )}
    <span
      className={`relative h-[18px] w-8 shrink-0 rounded-full border transition-colors ${checked ? 'border-signoz_robin-500 bg-signoz_robin-500' : 'border-signoz_slate-200 bg-signoz_slate-400'}`}
      aria-hidden="true"
    >
      <span
        className={`absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-signoz_vanilla-100 shadow-sm transition-transform ${checked ? 'translate-x-3.5' : 'translate-x-0'}`}
      />
    </span>
  </button>
)

const FilterGroup: React.FC<{
  label: string
  values: string[]
  selected: string[]
  onToggle: (value: string) => void
  onClear: () => void
  defaultOpen?: boolean
}> = ({ label, values, selected, onToggle, onClear, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [search, setSearch] = useState('')
  const visibleValues = values.filter((value) => value.toLowerCase().includes(search.toLowerCase()))
  return (
    <section className="border-b border-signoz_slate-400">
      <div className="flex min-h-10 items-center justify-between gap-2 px-3 py-2">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex min-w-0 items-center gap-1.5 text-left text-xs text-signoz_vanilla-300"
          aria-expanded={isOpen}
        >
          <ChevronRight
            size={13}
            className={`shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          />
          <span className="truncate">{label}</span>
        </button>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 text-[10px] text-signoz_robin-400"
          >
            Clear All
          </button>
        )}
      </div>
      {isOpen && (
        <div className="px-3 pb-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Filter values"
            aria-label={`Filter ${label} values`}
            className="mb-2 h-8 w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 px-2 text-xs text-signoz_vanilla-200 placeholder:text-signoz_vanilla-400/60 focus:border-signoz_robin-500 focus:ring-0"
          />
          {visibleValues.length > 0 ? (
            <div className="max-h-36 space-y-1 overflow-y-auto">
              {visibleValues.slice(0, 20).map((value) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-xs text-signoz_vanilla-300 hover:bg-signoz_slate-400/20"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(value)}
                    onChange={() => onToggle(value)}
                    className="rounded-sm border-signoz_slate-200 bg-signoz_ink-400 text-signoz_robin-500 focus:ring-signoz_robin-500"
                  />
                  <span className="truncate">{value}</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="m-0 py-1 text-[11px] text-signoz_vanilla-400">
              {values.length === 0 ? 'No values detected' : 'No matching values'}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

const LogDetailDrawer: React.FC<{
  log: ParsedLog
  contextLogs: ParsedLog[]
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  onClose: () => void
}> = ({ log, contextLogs, canGoPrevious, canGoNext, onPrevious, onNext, onClose }) => {
  const [tab, setTab] = useState<DetailTab>('overview')
  const [wrapText, setWrapText] = useState(true)
  const [fieldSearch, setFieldSearch] = useState('')
  const fields: Array<[string, unknown]> = [
    ['timestamp', log.timestamp || 'Not detected'],
    ['body', log.message],
    ['severity_text', log.level],
    ...Object.entries(log.attributes),
  ]
  const filteredFields = fields.filter(([key]) =>
    key.toLowerCase().includes(fieldSearch.trim().toLowerCase())
  )
  const numericFields = fields.filter(([, value]) => typeof value === 'number')
  useEffect(() => {
    setTab('overview')
    setFieldSearch('')
  }, [log.id])
  const tabs: Array<{ value: DetailTab; label: string; icon: React.ReactNode }> = [
    { value: 'overview', label: 'Overview', icon: <Table2 size={13} /> },
    { value: 'json', label: 'JSON', icon: <Braces size={13} /> },
    { value: 'context', label: 'Context', icon: <List size={13} /> },
    { value: 'metrics', label: 'Metrics', icon: <BarChart3 size={13} /> },
  ]
  return (
    <aside
      className="absolute inset-y-0 right-0 z-40 flex w-full flex-col border-l border-signoz_slate-400 bg-signoz_ink-400 shadow-2xl shadow-black/40 sm:w-[78%] lg:w-[60%]"
      aria-label="Log details"
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-signoz_slate-400 px-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded text-signoz_vanilla-400 hover:bg-signoz_slate-400/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signoz_robin-400"
            aria-label="Close log details"
          >
            <X size={15} />
          </button>
          <span className="h-5 border-l border-signoz_slate-400" />
          <p className="m-0 truncate text-sm font-medium text-signoz_vanilla-200">Log details</p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-signoz_slate-400 text-signoz_vanilla-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signoz_robin-400 disabled:opacity-30"
            aria-label="Previous log"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-signoz_slate-400 text-signoz_vanilla-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signoz_robin-400 disabled:opacity-30"
            aria-label="Next log"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
      <div className="shrink-0 border-b border-signoz_slate-400 px-4 py-3">
        <p className="m-0 truncate font-mono text-xs text-signoz_vanilla-400">{log.message}</p>
      </div>
      <div
        className="flex shrink-0 overflow-x-auto border-b border-signoz_slate-400 bg-signoz_ink-500/40 px-2 pt-3 sm:px-4"
        role="tablist"
        aria-label="Log detail views"
      >
        {tabs.map((item) => (
          <button
            key={item.value}
            id={`log-detail-tab-${item.value}`}
            type="button"
            onClick={() => setTab(item.value)}
            role="tab"
            aria-selected={tab === item.value}
            aria-controls="log-detail-panel"
            className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 border border-b-0 px-2 py-2 text-xs focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-signoz_robin-400 sm:min-w-28 sm:flex-none sm:gap-2 sm:px-4 ${tab === item.value ? 'border-signoz_slate-200 bg-signoz_slate-400/50 text-signoz_vanilla-100' : 'border-signoz_slate-400 text-signoz_vanilla-400'}`}
          >
            <span className="hidden sm:inline-flex" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="log-detail-panel"
        className="min-h-0 flex-1 overflow-y-auto"
        role="tabpanel"
        aria-labelledby={`log-detail-tab-${tab}`}
      >
        {tab === 'overview' && (
          <>
            <section className="border-b border-signoz_slate-400 p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="m-0 text-xs font-medium text-signoz_robin-400">body</p>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(log.raw)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded text-signoz_vanilla-400 hover:bg-signoz_slate-400/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signoz_robin-400"
                  aria-label="Copy raw log"
                >
                  <Copy size={13} />
                </button>
              </div>
              <div className="min-h-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-500 p-3">
                <pre
                  className={`m-0 !bg-transparent !p-0 font-mono text-xs leading-5 text-signoz_vanilla-200 ${wrapText ? 'whitespace-pre-wrap break-all' : 'overflow-x-auto whitespace-pre'}`}
                >
                  {prettyJson(log.message)}
                </pre>
              </div>
              <div className="mt-2">
                <Toggle
                  checked={wrapText}
                  onChange={() => setWrapText((current) => !current)}
                  label="Wrap log body text"
                  visibleLabel="Wrap text"
                  description="Keep long lines inside the panel"
                />
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between border-b border-signoz_slate-400 bg-signoz_slate-400/30 px-4 py-3">
                <p className="m-0 text-xs font-medium text-signoz_robin-400">Attributes</p>
              </div>
              <div className="relative border-b border-signoz_slate-400">
                <Search
                  size={13}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-signoz_vanilla-400"
                  aria-hidden="true"
                />
                <input
                  value={fieldSearch}
                  onChange={(event) => setFieldSearch(event.target.value)}
                  placeholder="Search for a field..."
                  aria-label="Search log attributes"
                  className="h-11 w-full border-0 bg-signoz_ink-400 pl-10 pr-4 text-xs text-signoz_vanilla-200 placeholder:text-signoz_vanilla-400/60 focus:ring-1 focus:ring-inset focus:ring-signoz_robin-400"
                />
              </div>
              <dl className="m-0">
                {filteredFields.map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-[minmax(120px,38%)_minmax(0,1fr)] border-b border-signoz_slate-400"
                  >
                    <dt className="m-0 break-all border-r border-signoz_slate-400 px-4 py-3 font-mono text-xs text-signoz_robin-400">
                      {key}
                    </dt>
                    <dd className="m-0 break-all px-4 py-3 font-mono text-xs text-signoz_vanilla-300">
                      {displayValue(value) || '—'}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </>
        )}
        {tab === 'json' && (
          <div className="p-4">
            <pre className="m-0 min-h-72 overflow-x-auto whitespace-pre rounded-sm border border-signoz_slate-400 !bg-signoz_ink-500 p-4 font-mono text-xs leading-5 text-signoz_vanilla-200">
              {prettyJson(log.raw)}
            </pre>
          </div>
        )}
        {tab === 'context' && (
          <div className="p-4">
            <p className="mb-3 text-xs text-signoz_vanilla-400">
              Nearby records from this local file
            </p>
            <div className="overflow-hidden rounded-sm border border-signoz_slate-400">
              {contextLogs.map((item) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-[160px_minmax(0,1fr)] gap-3 border-b border-signoz_slate-400 px-3 py-2 font-mono text-xs last:border-b-0 ${item.id === log.id ? 'bg-signoz_robin-500/10' : 'bg-signoz_ink-500'}`}
                >
                  <span className="truncate text-signoz_vanilla-400">
                    {formatTimestamp(item.timestamp)}
                  </span>
                  <span className="truncate text-signoz_vanilla-200">{item.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'metrics' && (
          <div className="p-4">
            <p className="mb-3 text-xs text-signoz_vanilla-400">
              Numeric attributes detected in this record
            </p>
            {numericFields.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {numericFields.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-sm border border-signoz_slate-400 bg-signoz_ink-500 p-4"
                  >
                    <p className="mb-2 break-all font-mono text-[11px] text-signoz_vanilla-400">
                      {key}
                    </p>
                    <p className="m-0 font-mono text-lg text-signoz_vanilla-100">
                      {displayValue(value)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-sm border border-dashed border-signoz_slate-400 text-center">
                <BarChart3 size={20} className="mb-3 text-signoz_vanilla-400" />
                <p className="m-0 text-xs text-signoz_vanilla-400">No numeric attributes found.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="shrink-0 border-t border-signoz_slate-400 px-4 py-2 text-[11px] text-signoz_vanilla-400">
        Use ↑ / ↓ to view the previous or next log
      </div>
    </aside>
  )
}

const EmptyLogs: React.FC<{ hasInput: boolean; onUseSample: () => void }> = ({
  hasInput,
  onUseSample,
}) => (
  <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
    <div className="mb-4 rounded-md border border-signoz_slate-400 bg-signoz_ink-400 p-3 text-signoz_robin-400">
      <FileText size={20} />
    </div>
    <h3 className="mb-1 text-sm font-medium text-signoz_vanilla-100">
      {hasInput ? 'No logs match this query' : 'Import logs to start exploring'}
    </h3>
    <p className="m-0 max-w-sm text-xs leading-5 text-signoz_vanilla-400">
      {hasInput
        ? 'Change the query or clear one of the active filters.'
        : 'Upload JSONL, NDJSON, JSON, CSV, TSV, log, out, or text files. The logs stay in this browser.'}
    </p>
    {!hasInput && (
      <button
        type="button"
        onClick={onUseSample}
        className="mt-4 rounded-sm border border-signoz_slate-400 px-3 py-2 text-xs text-signoz_vanilla-200 hover:bg-signoz_slate-400/30"
      >
        Load sample logs
      </button>
    )}
  </div>
)

const Histogram: React.FC<{ values: number[]; large?: boolean }> = ({ values, large = false }) => {
  const maximum = Math.max(...values, 1)
  return (
    <div
      className={`flex items-end gap-1 ${large ? 'h-64' : 'h-20'}`}
      aria-label="Log frequency chart"
    >
      {values.map((count, index) => (
        <div
          key={`${index}-${count}`}
          className="min-h-px flex-1 rounded-t-sm bg-signoz_robin-500/70"
          style={{ height: `${Math.max((count / maximum) * 100, count > 0 ? 6 : 1)}%` }}
          title={`${count} logs`}
        />
      ))}
    </div>
  )
}

const VirtualLogRows: React.FC<{
  logs: ParsedLog[]
  activeLogId: string | null
  onSelect: (logId: string) => void
  fillHeight: boolean
}> = ({ logs, activeLogId, onSelect, fillHeight }) => {
  const rowHeight = 38
  const maxViewportHeight = fillHeight ? 640 : 480
  const viewportHeight = Math.min(Math.max(logs.length * rowHeight, 220), maxViewportHeight)
  const [scrollTop, setScrollTop] = useState(0)
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - VIRTUAL_OVERSCAN)
  const visibleCount = Math.ceil(maxViewportHeight / rowHeight) + VIRTUAL_OVERSCAN * 2
  const visibleLogs = logs.slice(startIndex, Math.min(logs.length, startIndex + visibleCount))
  const gridClass = 'grid-cols-[190px_minmax(360px,1fr)] min-w-[620px]'
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[620px]">
        <div
          className={`grid h-9 items-center border-b border-signoz_slate-400 bg-signoz_slate-400/20 px-3 font-mono text-[10px] text-signoz_vanilla-400 ${gridClass}`}
        >
          <span>⋮⋮&nbsp; Timestamp</span>
          <span>⋮⋮&nbsp; Body</span>
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: viewportHeight }}
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        >
          <div className="relative" style={{ height: logs.length * rowHeight }}>
            {visibleLogs.map((log, visibleIndex) => {
              const index = startIndex + visibleIndex
              return (
                <button
                  key={log.id}
                  type="button"
                  onClick={() => onSelect(log.id)}
                  className={`absolute left-0 top-0 grid w-full items-center border-b border-signoz_slate-400 px-3 text-left font-mono text-[11px] hover:bg-signoz_robin-500/[0.04] ${gridClass} ${activeLogId === log.id ? 'bg-signoz_robin-500/[0.08]' : ''}`}
                  style={{ height: rowHeight, transform: `translateY(${index * rowHeight}px)` }}
                >
                  <span className="flex min-w-0 items-center gap-3 whitespace-nowrap text-signoz_vanilla-400">
                    <span
                      className={`h-4 w-0.5 ${LEVELS.find((item) => item.level === log.level)?.indicatorClassName}`}
                    />
                    <span className="truncate">{formatTimestamp(log.timestamp)}</span>
                  </span>
                  <span className="truncate text-signoz_vanilla-200">{log.message}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const AGGREGATION_COLORS = ['#7190f9', '#f59e0b', '#a78bfa', '#34d399', '#fb7185', '#22d3ee']

const BuilderSelect: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & { wrapperClassName?: string }
> = ({ children, className = '', wrapperClassName = '', ...props }) => (
  <span className={`relative inline-flex min-w-0 ${wrapperClassName}`}>
    <select
      {...props}
      className={`h-9 w-full min-w-0 appearance-none rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-0 pl-3 pr-8 text-[11px] text-signoz_vanilla-300 focus:border-signoz_robin-500 focus:ring-1 focus:ring-signoz_robin-400 ${className}`}
    >
      {children}
    </select>
    <ChevronDown
      size={13}
      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-signoz_vanilla-400"
      aria-hidden="true"
    />
  </span>
)

const BuilderField: React.FC<{
  label: string
  className?: string
  children: React.ReactNode
}> = ({ label, className = '', children }) => (
  <label className={`min-w-0 ${className}`}>
    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.08em] text-signoz_vanilla-400">
      {label}
    </span>
    {children}
  </label>
)

const AggregationQueryBuilder: React.FC<{
  view: Exclude<ExplorerView, 'list'>
  aggregation: LogAggregation
  aggregationField: string
  numericFields: string[]
  groupBy: string
  groupByFields: string[]
  havingOperator: HavingOperator | ''
  havingValue: string
  order: LogAggregationOrder
  limit: number
  bucketCount: number
  legendFormat: string
  filter: LogFilter
  onAggregationChange: (value: LogAggregation) => void
  onAggregationFieldChange: (value: string) => void
  onGroupByChange: (value: string) => void
  onHavingOperatorChange: (value: HavingOperator | '') => void
  onHavingValueChange: (value: string) => void
  onOrderChange: (value: LogAggregationOrder) => void
  onLimitChange: (value: number) => void
  onBucketCountChange: (value: number) => void
  onLegendFormatChange: (value: string) => void
}> = ({
  view,
  aggregation,
  aggregationField,
  numericFields,
  groupBy,
  groupByFields,
  havingOperator,
  havingValue,
  order,
  limit,
  bucketCount,
  legendFormat,
  filter,
  onAggregationChange,
  onAggregationFieldChange,
  onGroupByChange,
  onHavingOperatorChange,
  onHavingValueChange,
  onOrderChange,
  onLimitChange,
  onBucketCountChange,
  onLegendFormatChange,
}) => {
  const inputClassName =
    'h-9 w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 px-3 text-[11px] text-signoz_vanilla-300 placeholder:text-signoz_vanilla-400/60 focus:border-signoz_robin-500 focus:ring-1 focus:ring-signoz_robin-400'

  return (
    <section
      className="border-b border-signoz_slate-400 bg-signoz_ink-500"
      aria-label="Aggregation query A"
    >
      <div className="flex min-h-10 items-center gap-2 border-b border-signoz_slate-400 px-3">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-signoz_robin-500 font-mono text-xs font-semibold text-white">
          A
        </span>
        <span className="text-xs font-medium text-signoz_vanilla-200">Logs aggregation</span>
        <span className="ml-auto text-[10px] text-signoz_vanilla-400">Local query</span>
      </div>
      <div className="grid items-end gap-2 border-b border-signoz_slate-400 p-2 lg:grid-cols-[minmax(260px,1fr)_auto]">
        <div className="flex h-9 min-w-0 items-center gap-2 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 px-3 font-mono text-[11px] text-signoz_vanilla-400">
          <Filter size={12} className="shrink-0" />
          <span className="truncate">
            {filter.value
              ? `${filter.field} ${filter.operator} ${filter.value}`
              : 'Enter your filter query above'}
          </span>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <BuilderField label="Aggregation" className="w-28">
            <BuilderSelect
              aria-label="Aggregation function"
              value={aggregation}
              onChange={(event) => onAggregationChange(event.target.value as LogAggregation)}
            >
              <option value="count">count()</option>
              <option value="sum">sum</option>
              <option value="avg">avg</option>
              <option value="min">min</option>
              <option value="max">max</option>
            </BuilderSelect>
          </BuilderField>
          {aggregation !== 'count' && (
            <BuilderField label="Field" className="w-44">
              <BuilderSelect
                aria-label="Numeric aggregation field"
                value={aggregationField}
                onChange={(event) => onAggregationFieldChange(event.target.value)}
              >
                {numericFields.map((field) => (
                  <option key={field}>{field}</option>
                ))}
              </BuilderSelect>
            </BuilderField>
          )}
          {view === 'timeseries' && (
            <BuilderField label="Interval" className="w-32">
              <BuilderSelect
                aria-label="Time series resolution"
                value={bucketCount}
                onChange={(event) => onBucketCountChange(Number(event.target.value))}
              >
                <option value={18}>Auto</option>
                <option value={8}>8 buckets</option>
                <option value={30}>30 buckets</option>
              </BuilderSelect>
            </BuilderField>
          )}
        </div>
      </div>
      <div className="overflow-x-auto p-2">
        <div className="grid min-w-[720px] grid-cols-[minmax(150px,1.2fr)_minmax(118px,.8fr)_minmax(132px,.9fr)_88px_minmax(190px,1.5fr)] items-end gap-2">
          <BuilderField label="Group by">
            <BuilderSelect
              aria-label="Group logs by"
              value={groupBy}
              onChange={(event) => onGroupByChange(event.target.value)}
            >
              <option value="">None</option>
              {groupByFields.map((field) => (
                <option key={field}>{field}</option>
              ))}
            </BuilderSelect>
          </BuilderField>
          <BuilderField label="Having">
            <div className="flex gap-2">
              <BuilderSelect
                aria-label="Having operator"
                value={havingOperator}
                onChange={(event) =>
                  onHavingOperatorChange(event.target.value as HavingOperator | '')
                }
                wrapperClassName="flex-1"
              >
                <option value="">None</option>
                <option value=">">&gt;</option>
                <option value=">=">≥</option>
                <option value="<">&lt;</option>
                <option value="<=">≤</option>
              </BuilderSelect>
              {havingOperator && (
                <input
                  type="number"
                  value={havingValue}
                  onChange={(event) => onHavingValueChange(event.target.value)}
                  aria-label="Having value"
                  className={`${inputClassName} w-20`}
                />
              )}
            </div>
          </BuilderField>
          <BuilderField label="Order by">
            <BuilderSelect
              aria-label="Aggregation order"
              value={order}
              onChange={(event) => onOrderChange(event.target.value as LogAggregationOrder)}
            >
              <option value="desc">Value desc</option>
              <option value="asc">Value asc</option>
            </BuilderSelect>
          </BuilderField>
          <BuilderField label="Limit">
            <BuilderSelect
              aria-label="Aggregation result limit"
              value={limit}
              onChange={(event) => onLimitChange(Number(event.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </BuilderSelect>
          </BuilderField>
          <BuilderField label="Legend format">
            <input
              value={legendFormat}
              onChange={(event) => onLegendFormatChange(event.target.value)}
              placeholder={groupBy ? '{{group}}' : 'A'}
              aria-label="Legend format"
              className={inputClassName}
            />
          </BuilderField>
        </div>
      </div>
    </section>
  )
}

const AggregationTable: React.FC<{
  rows: Array<{ group: string; value: number }>
  groupBy: string
  aggregationLabel: string
  legendFormat: string
}> = ({ rows, groupBy, aggregationLabel, legendFormat }) => (
  <div className="w-full overflow-x-auto">
    <table
      className="min-w-[520px] table-fixed border-collapse font-mono text-[11px]"
      style={{ width: '100%' }}
    >
      <colgroup>
        {groupBy && <col style={{ width: '55%' }} />}
        <col />
      </colgroup>
      <thead>
        <tr className="h-10 bg-signoz_slate-400/20 text-left text-signoz_vanilla-400">
          {groupBy && (
            <th className="border-b border-signoz_slate-400 px-4 font-normal">{groupBy}</th>
          )}
          <th className="border-b border-signoz_slate-400 px-4 font-normal">{aggregationLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.group}
            className="h-10 text-signoz_vanilla-200 hover:bg-signoz_robin-500/[0.04]"
          >
            {groupBy && (
              <td className="border-b border-signoz_slate-400 px-4 text-signoz_robin-400">
                {(legendFormat || '{{group}}').replaceAll('{{group}}', row.group)}
              </td>
            )}
            <td className="border-b border-signoz_slate-400 px-4">
              {Number(row.value.toFixed(3)).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const LogAnalyzerTool: React.FC = () => {
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState<ParsedLog[]>([])
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const [draftFilter, setDraftFilter] = useState<LogFilter>({
    field: 'body',
    operator: 'contains',
    value: '',
  })
  const [appliedFilter, setAppliedFilter] = useState<LogFilter>(draftFilter)
  const [levels, setLevels] = useState<Set<LogLevel>>(() => new Set(ALL_LEVELS))
  const [attributeSelections, setAttributeSelections] = useState<AttributeSelections>({})
  const [activeLogId, setActiveLogId] = useState<string | null>(null)
  const [view, setView] = useState<ExplorerView>('list')
  const [isDragging, setIsDragging] = useState(false)
  const [isFullView, setIsFullView] = useState(false)
  const [isInputOpen, setIsInputOpen] = useState(true)
  const [showFilters, setShowFilters] = useState(true)
  const [showFrequencyChart, setShowFrequencyChart] = useState(false)
  const [aggregation, setAggregation] = useState<LogAggregation>('count')
  const [aggregationField, setAggregationField] = useState('')
  const [groupBy, setGroupBy] = useState('')
  const [havingOperator, setHavingOperator] = useState<HavingOperator | ''>('')
  const [havingValue, setHavingValue] = useState('0')
  const [aggregationOrder, setAggregationOrder] = useState<LogAggregationOrder>('desc')
  const [aggregationLimit, setAggregationLimit] = useState(20)
  const [bucketCount, setBucketCount] = useState(18)
  const [legendFormat, setLegendFormat] = useState('')
  const [isParsing, setIsParsing] = useState(false)
  const [parseProgress, setParseProgress] = useState(0)
  const workerRef = useRef<Worker | null>(null)
  const logEvent = useLogEvent()

  const attributeKeys = useMemo(() => getAttributeKeys(logs), [logs])
  const numericFields = useMemo(
    () => (view === 'list' ? [] : getNumericAttributeKeys(logs)),
    [logs, view]
  )
  const baseFilteredLogs = useMemo(
    () => (levels.size === 0 ? [] : filterLogs(logs, appliedFilter, levels)),
    [appliedFilter, levels, logs]
  )
  const filteredLogs = useMemo(
    () =>
      baseFilteredLogs.filter((log) =>
        Object.entries(attributeSelections).every(
          ([field, selected]) =>
            selected.length === 0 || selected.includes(getLogFieldValue(log, field))
        )
      ),
    [attributeSelections, baseFilteredLogs]
  )
  const activeLogIndex = useMemo(
    () => filteredLogs.findIndex((log) => log.id === activeLogId),
    [activeLogId, filteredLogs]
  )
  const activeLog = activeLogIndex >= 0 ? filteredLogs[activeLogIndex] : null
  const contextLogs = useMemo(
    () =>
      activeLogIndex < 0
        ? []
        : filteredLogs.slice(Math.max(0, activeLogIndex - 2), activeLogIndex + 3),
    [activeLogIndex, filteredLogs]
  )
  const histogram = useMemo(
    () => (showFrequencyChart && view === 'list' ? createHistogram(filteredLogs) : []),
    [filteredLogs, showFrequencyChart, view]
  )
  const timeRange = useMemo(() => {
    let count = 0
    let start = Infinity
    let end = -Infinity
    if (view === 'timeseries' || (view === 'list' && showFrequencyChart)) {
      for (const log of filteredLogs) {
        const timestamp = Date.parse(log.timestamp)
        if (!Number.isFinite(timestamp)) continue
        count += 1
        start = Math.min(start, timestamp)
        end = Math.max(end, timestamp)
      }
    }
    return { count, start, end }
  }, [filteredLogs, showFrequencyChart, view])
  const effectiveAggregationField = aggregationField || numericFields[0] || ''
  const having = useMemo(
    () =>
      havingOperator && Number.isFinite(Number(havingValue))
        ? { operator: havingOperator, value: Number(havingValue) }
        : null,
    [havingOperator, havingValue]
  )
  const aggregationRows = useMemo(
    () =>
      view === 'list'
        ? []
        : aggregateLogs(
            filteredLogs,
            aggregation,
            effectiveAggregationField,
            groupBy,
            aggregationOrder,
            aggregationLimit,
            having
          ),
    [
      aggregation,
      aggregationLimit,
      aggregationOrder,
      effectiveAggregationField,
      filteredLogs,
      groupBy,
      having,
      view,
    ]
  )
  const timeSeries = useMemo(
    () =>
      view === 'timeseries'
        ? createTimeSeries(
            filteredLogs,
            aggregation,
            effectiveAggregationField,
            groupBy,
            bucketCount,
            groupBy ? aggregationRows.map((row) => row.group) : undefined
          )
        : { points: [], series: [] },
    [
      aggregation,
      aggregationRows,
      bucketCount,
      effectiveAggregationField,
      filteredLogs,
      groupBy,
      view,
    ]
  )
  const visibleTimeSeries = useMemo(() => {
    const allowedSeries = new Set(
      groupBy ? aggregationRows.map((row) => row.group) : timeSeries.series
    )
    return {
      series: timeSeries.series.filter((series) => allowedSeries.has(series)),
      points: timeSeries.points.map((point) => ({
        timestamp: point.timestamp,
        label: point.label,
        values: Object.fromEntries(
          Object.entries(point.values).filter(([series]) => allowedSeries.has(series))
        ),
      })),
    }
  }, [aggregationRows, groupBy, timeSeries])
  const aggregationLabel =
    aggregation === 'count' ? 'count()' : `${aggregation}(${effectiveAggregationField})`
  const filterGroupData = useMemo(
    () =>
      FILTER_GROUPS.map((group) => {
        const field = group.keys.find((key) => attributeKeys.includes(key)) ?? group.keys[0]
        const values = [
          ...new Set(logs.map((log) => getLogFieldValue(log, field)).filter(Boolean)),
        ].sort((a, b) => a.localeCompare(b))
        return { ...group, field, values }
      }),
    [attributeKeys, logs]
  )
  const levelCounts = useMemo(
    () =>
      LEVELS.reduce<Record<LogLevel, number>>(
        (counts, item) => {
          counts[item.level] = logs.filter((log) => log.level === item.level).length
          return counts
        },
        { ERROR: 0, WARN: 0, INFO: 0, DEBUG: 0, UNKNOWN: 0 }
      ),
    [logs]
  )

  useEffect(() => () => workerRef.current?.terminate(), [])
  useEffect(() => {
    if (!isFullView) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isFullView])
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (activeLog) {
        if (event.key === 'Escape') setActiveLogId(null)
        if (event.key === 'ArrowUp' && activeLogIndex > 0) {
          event.preventDefault()
          setActiveLogId(filteredLogs[activeLogIndex - 1].id)
        }
        if (event.key === 'ArrowDown' && activeLogIndex < filteredLogs.length - 1) {
          event.preventDefault()
          setActiveLogId(filteredLogs[activeLogIndex + 1].id)
        }
      } else if (event.key === 'Escape' && isFullView) setIsFullView(false)
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [activeLog, activeLogIndex, filteredLogs, isFullView])

  const emptyFilter = (): LogFilter => ({ field: 'body', operator: 'contains', value: '' })
  const resetFilters = () => {
    setActiveLogId(null)
    setAppliedFilter(emptyFilter())
    setDraftFilter(emptyFilter())
    setLevels(new Set(ALL_LEVELS))
    setAttributeSelections({})
  }
  const trackToolUse = (action: string, parsedLogs: ParsedLog[]) =>
    logEvent({
      eventName: 'Log Analyzer Used',
      eventType: 'track',
      attributes: {
        action,
        parsedLogCount: parsedLogs.length,
        jsonLogCount: parsedLogs.filter((log) => log.isJson).length,
      },
    })
  const finishAnalysis = (parsedLogs: ParsedLog[], action: string) => {
    setLogs(parsedLogs)
    setError(parsedLogs.length === 0 ? 'No log records were found.' : '')
    setIsInputOpen(parsedLogs.length === 0)
    resetFilters()
    trackToolUse(action, parsedLogs)
  }
  const cancelParsing = (showMessage = true) => {
    workerRef.current?.terminate()
    workerRef.current = null
    setIsParsing(false)
    setParseProgress(0)
    if (showMessage) setError('Analysis canceled. Your file stayed in this browser.')
  }
  const startWorker = (request: ParseWorkerRequest, action: string) => {
    cancelParsing(false)
    setLogs([])
    setError('')
    setIsParsing(true)
    setParseProgress(1)
    resetFilters()
    const worker = new Worker(new URL('./logAnalyzer.worker.ts', import.meta.url), {
      type: 'module',
    })
    workerRef.current = worker
    worker.onmessage = (event: MessageEvent<ParseWorkerResponse>) => {
      if (workerRef.current !== worker) return
      if (event.data.type === 'progress') {
        setParseProgress(event.data.progress)
        return
      }
      worker.terminate()
      workerRef.current = null
      setIsParsing(false)
      setParseProgress(0)
      if (event.data.type === 'error') {
        setError(event.data.message)
        return
      }
      finishAnalysis(event.data.logs, action)
    }
    worker.onerror = () => {
      if (workerRef.current !== worker) return
      worker.terminate()
      workerRef.current = null
      setIsParsing(false)
      setParseProgress(0)
      setError('The browser could not parse these logs in the background.')
    }
    worker.postMessage(request)
  }
  const analyze = (nextInput = input, action = 'paste', inputFormat: LogInputFormat = 'auto') => {
    if (!nextInput.trim()) {
      setError('Paste logs or upload a file before you run the analysis.')
      setLogs([])
      return
    }
    if (new Blob([nextInput]).size > MAX_PASTED_INPUT_SIZE) {
      setError(
        `Pasted input is limited to ${MAX_PASTED_INPUT_SIZE_MB} MB. Upload larger files instead.`
      )
      setLogs([])
      return
    }
    startWorker({ type: 'parse-text', input: nextInput, format: inputFormat }, action)
  }
  const loadFile = (file?: File) => {
    if (!file) return
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `The file is larger than ${MAX_FILE_SIZE_MB} MB. Use a smaller sample for this browser tool.`
      )
      return
    }
    const lowerName = file.name.toLowerCase()
    const inputFormat: LogInputFormat = lowerName.endsWith('.csv')
      ? 'csv'
      : lowerName.endsWith('.tsv')
        ? 'tsv'
        : 'auto'
    setInput('')
    setFileName(file.name)
    startWorker({ type: 'parse-file', file, format: inputFormat }, 'upload')
  }
  const useSample = () => {
    setInput(SAMPLE_LOGS)
    setFileName('sample-checkout.ndjson')
    analyze(SAMPLE_LOGS, 'sample')
  }
  const clear = () => {
    cancelParsing(false)
    setInput('')
    setLogs([])
    setFileName('')
    setError('')
    setIsInputOpen(true)
    resetFilters()
  }
  const toggleLevel = (level: LogLevel) => {
    setLevels((current) => {
      const next = new Set(current)
      if (next.has(level)) next.delete(level)
      else next.add(level)
      return next
    })
    setActiveLogId(null)
  }
  const toggleAttribute = (field: string, value: string) => {
    setAttributeSelections((current) => {
      const selected = new Set(current[field] ?? [])
      if (selected.has(value)) selected.delete(value)
      else selected.add(value)
      return { ...current, [field]: [...selected] }
    })
    setActiveLogId(null)
  }
  const runQuery = () => {
    setAppliedFilter(draftFilter)
    setActiveLogId(null)
  }
  const downloadFiltered = (format: ExportFormat) => {
    const content = serializeLogs(filteredLogs, format)
    const url = URL.createObjectURL(
      new Blob([content], { type: `${format === 'csv' ? 'text/csv' : 'text/plain'};charset=utf-8` })
    )
    const link = document.createElement('a')
    link.href = url
    link.download = `filtered-logs.${format}`
    link.click()
    URL.revokeObjectURL(url)
  }

  const fieldOptions = ['body', 'severity_text', 'timestamp', ...attributeKeys]
  const shell = (
    <div
      className={`overflow-hidden border border-signoz_slate-400 bg-signoz_ink-500 text-left shadow-2xl shadow-black/20 ${isFullView ? 'fixed inset-0 z-[100] h-screen w-screen rounded-none border-0' : 'relative z-[1] min-h-screen w-full rounded-none'}`}
    >
      <header className="flex min-h-12 items-center justify-between gap-3 border-b border-signoz_slate-400 bg-signoz_ink-500">
        <nav
          className="flex min-w-0 items-center gap-1 overflow-x-auto"
          aria-label="Log explorer navigation"
        >
          <TrackingLink
            href="/"
            className="-m-1.5 flex shrink-0 items-center gap-2 p-1.5 text-signoz_vanilla-100"
            clickType="Nav Click"
            clickName="SigNoz Logo"
            clickText="SigNoz"
            clickLocation="Log Analyzer Product Header"
          >
            <SigNozLogo className="h-5 w-auto shrink-0" aria-hidden="true" />
            <span className="text-[17.111px] font-medium">SigNoz</span>
          </TrackingLink>
          <button
            type="button"
            className="flex h-12 shrink-0 items-center gap-2 border-b-2 border-signoz_robin-500 px-3 text-xs text-signoz_vanilla-100"
          >
            <Search size={14} /> Explorer
          </button>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-2.5 py-1 text-[11px] text-emerald-300 sm:inline-flex">
            <ShieldCheck size={12} /> Runs locally
          </span>
          <button
            type="button"
            onClick={() => setIsInputOpen((current) => !current)}
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-signoz_slate-400 px-2.5 text-xs text-signoz_vanilla-300 hover:bg-signoz_slate-400/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signoz_robin-400"
            aria-expanded={isInputOpen}
            aria-controls="log-import-panel"
          >
            <Upload size={13} />
            <span className="hidden sm:inline">Import logs</span>
          </button>
          <button
            type="button"
            onClick={() => setIsFullView((current) => !current)}
            className="inline-flex items-center gap-1.5 rounded-sm border border-signoz_slate-400 px-2.5 py-1.5 text-xs text-signoz_vanilla-300 hover:bg-signoz_slate-400/30"
            aria-label={isFullView ? 'Exit full view' : 'Open in full view'}
          >
            {isFullView ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span className="hidden md:inline">{isFullView ? 'Exit full view' : 'Full view'}</span>
          </button>
          <TrackingLink
            href="/teams/"
            className="inline-flex h-8 items-center overflow-hidden whitespace-nowrap rounded bg-signoz_robin-500 text-sm font-medium text-white transition-colors hover:bg-signoz_robin-400 hover:text-white"
            clickType="Primary CTA"
            clickName="Log Analyzer Product Header Sign Up"
            clickText="Get Started - Free"
            clickLocation="Log Analyzer Product Header"
          >
            <span className="flex h-full items-center gap-1.5 px-3">
              <span className="md:hidden">Start free</span>
              <span className="hidden md:inline">Get Started - Free</span>
            </span>
            <span
              className="flex h-full w-8 shrink-0 items-center justify-center bg-signoz_robin-400"
              aria-hidden="true"
            >
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </TrackingLink>
        </div>
      </header>

      {isInputOpen && (
        <section
          id="log-import-panel"
          role="dialog"
          aria-labelledby="log-import-panel-title"
          className="absolute left-3 right-3 top-14 z-30 max-h-[calc(100%-68px)] overflow-y-auto rounded-md border border-signoz_slate-200 bg-signoz_ink-400 shadow-2xl shadow-black/50 sm:left-auto sm:w-[560px]"
        >
          <div className="flex items-center justify-between border-b border-signoz_slate-400 px-4 py-3">
            <div>
              <p
                id="log-import-panel-title"
                className="m-0 text-sm font-medium text-signoz_vanilla-100"
              >
                Import local logs
              </p>
              <p className="m-0 mt-0.5 text-[11px] text-signoz_vanilla-400">
                JSONL, NDJSON, JSON, CSV, TSV, log, out, or text · up to {MAX_FILE_SIZE_MB} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsInputOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded text-signoz_vanilla-400 hover:bg-signoz_slate-400/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signoz_robin-400"
              aria-label="Close import panel"
            >
              <X size={15} />
            </button>
          </div>
          <div
            className={`m-4 overflow-hidden rounded-sm border bg-signoz_ink-500 ${isDragging ? 'border-signoz_robin-500' : 'border-signoz_slate-400'}`}
            onDragEnter={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setIsDragging(false)
              void loadFile(event.dataTransfer.files[0])
            }}
          >
            <textarea
              id="log-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value)
                setFileName('')
                setError('')
              }}
              rows={7}
              spellCheck={false}
              disabled={isParsing}
              placeholder={
                'Paste logs here…\n2026-08-31T10:14:21Z ERROR payment authorization failed'
              }
              aria-label="Paste or upload logs"
              className="block w-full resize-y border-0 bg-transparent px-4 py-3 font-mono text-xs leading-5 text-signoz_vanilla-200 placeholder:text-signoz_vanilla-400/60 focus:ring-0"
            />
            <div className="flex flex-col gap-2 border-t border-signoz_slate-400 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-1.5 text-[11px] text-signoz_vanilla-400">
                <ShieldCheck size={12} className="text-emerald-300" /> Your logs do not leave this
                browser.
              </span>
              <div className="flex items-center gap-2">
                <input
                  id="log-file-input"
                  type="file"
                  accept=".log,.txt,.out,.json,.jsonl,.ndjson,.csv,.tsv,application/json,application/x-ndjson,text/plain,text/csv,text/tab-separated-values"
                  className="sr-only"
                  disabled={isParsing}
                  onChange={(event) => {
                    loadFile(event.target.files?.[0])
                    event.currentTarget.value = ''
                  }}
                />
                <label
                  htmlFor="log-file-input"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-signoz_slate-400 px-3 py-2 text-xs text-signoz_vanilla-300"
                >
                  <Upload size={13} /> Upload file
                </label>
                <Button
                  type="button"
                  isButton
                  variant="default"
                  onClick={() => analyze()}
                  disabled={isParsing}
                  className="h-8 gap-1.5 rounded-sm px-3 text-xs"
                >
                  <Play size={13} fill="currentColor" /> Analyze
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-signoz_slate-400 px-4 py-3">
            <span className="truncate pr-3 text-[11px] text-signoz_vanilla-400">
              {fileName || 'No file selected'}
            </span>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={useSample}
                disabled={isParsing}
                className="rounded-sm px-2 py-1.5 text-xs text-signoz_vanilla-300"
              >
                Use sample
              </button>
              <button
                type="button"
                onClick={clear}
                className="rounded-sm px-2 py-1.5 text-xs text-signoz_vanilla-300"
              >
                Clear
              </button>
            </div>
          </div>
          {isParsing && (
            <div className="border-t border-signoz_slate-400 px-4 py-3" aria-live="polite">
              <div className="mb-2 flex items-center justify-between text-xs text-signoz_vanilla-300">
                <span>Parsing in a Web Worker · {parseProgress}%</span>
                <button
                  type="button"
                  onClick={() => cancelParsing()}
                  className="text-signoz_robin-400"
                >
                  Cancel
                </button>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-signoz_slate-400/50">
                <div
                  className="h-full bg-signoz_robin-500"
                  style={{ width: `${parseProgress}%` }}
                />
              </div>
            </div>
          )}
          {error && (
            <p className="m-0 flex items-center gap-2 border-t border-signoz_slate-400 px-4 py-3 text-xs text-signoz_cherry-400">
              <AlertTriangle size={13} /> {error}
            </p>
          )}
        </section>
      )}

      <div
        className={`grid min-h-0 ${isFullView ? 'h-[calc(100vh-49px)]' : 'min-h-[calc(100vh-49px)]'} ${showFilters ? 'lg:grid-cols-[230px_minmax(0,1fr)]' : 'grid-cols-1'}`}
      >
        {showFilters && (
          <aside className="hidden min-h-0 overflow-y-auto border-r border-signoz_slate-400 bg-signoz_ink-500 lg:block">
            <div className="flex h-11 items-center justify-between border-b border-signoz_slate-400 px-3">
              <div className="flex items-center gap-2 text-xs text-signoz_vanilla-200">
                <Filter size={13} /> Filters for{' '}
                <span className="rounded-sm bg-signoz_robin-500 px-2 py-1 text-signoz_vanilla-100">
                  A
                </span>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded p-1.5 text-signoz_vanilla-400"
                  aria-label="Reset all filters"
                >
                  <RefreshCw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="rounded p-1.5 text-signoz_vanilla-400"
                  aria-label="Hide filters"
                >
                  <PanelLeftClose size={13} />
                </button>
              </div>
            </div>
            <section className="border-b border-signoz_slate-400 px-3 py-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="m-0 flex items-center gap-1.5 text-xs text-signoz_vanilla-300">
                  <ChevronDown size={13} /> Severity Text
                </p>
                <button
                  type="button"
                  onClick={() => setLevels(new Set(ALL_LEVELS))}
                  className="text-[10px] text-signoz_robin-400"
                >
                  Clear All
                </button>
              </div>
              <input
                placeholder="Filter values"
                aria-label="Filter severity values"
                className="mb-2 h-8 w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 px-2 text-xs text-signoz_vanilla-200 placeholder:text-signoz_vanilla-400/60 focus:ring-0"
              />
              <div className="space-y-1">
                {LEVELS.map((item) => (
                  <label
                    key={item.level}
                    className="flex cursor-pointer items-center justify-between rounded px-1 py-1 text-xs text-signoz_vanilla-300 hover:bg-signoz_slate-400/20"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={levels.has(item.level)}
                        onChange={() => toggleLevel(item.level)}
                        className="rounded-sm border-signoz_slate-200 bg-signoz_ink-400 text-signoz_robin-500"
                      />
                      <span className="flex items-center gap-1.5">
                        {item.icon}
                        {item.label}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] text-signoz_vanilla-400">
                      {levelCounts[item.level]}
                    </span>
                  </label>
                ))}
              </div>
            </section>
            {filterGroupData.map((group, index) => (
              <FilterGroup
                key={group.label}
                label={group.label}
                values={group.values}
                selected={attributeSelections[group.field] ?? []}
                onToggle={(value) => toggleAttribute(group.field, value)}
                onClear={() =>
                  setAttributeSelections((current) => ({ ...current, [group.field]: [] }))
                }
                defaultOpen={index === 0 && group.values.length > 0}
              />
            ))}
          </aside>
        )}

        <main className="relative flex min-h-0 min-w-0 flex-col bg-signoz_ink-500">
          <div className="flex shrink-0 flex-col border-b border-signoz_slate-400">
            <div className="flex min-h-11 flex-col justify-between gap-2 px-2 py-2 sm:flex-row sm:items-center sm:px-3 sm:py-0">
              <div
                className="flex items-center overflow-x-auto"
                role="tablist"
                aria-label="Log result view"
              >
                {!showFilters && (
                  <button
                    type="button"
                    onClick={() => setShowFilters(true)}
                    className="mr-2 rounded-sm border border-signoz_slate-400 p-2 text-signoz_vanilla-400"
                    aria-label="Show filters"
                  >
                    <PanelLeftOpen size={13} />
                  </button>
                )}
                {(
                  [
                    ['list', 'List View', <List size={13} key="list" />],
                    ['timeseries', 'Time Series', <ChartNoAxesColumn size={13} key="chart" />],
                    ['table', 'Table', <Table2 size={13} key="table" />],
                  ] as Array<[ExplorerView, string, React.ReactNode]>
                ).map(([value, label, icon]) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={view === value}
                    onClick={() => {
                      setView(value)
                      setActiveLogId(null)
                    }}
                    className={`flex h-9 shrink-0 items-center gap-2 border px-3 text-xs ${view === value ? 'border-signoz_robin-500 bg-signoz_robin-500 text-signoz_vanilla-100' : 'border-signoz_slate-400 text-signoz_vanilla-300'}`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2">
                <div className="hidden h-8 items-center gap-2 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 px-3 text-[11px] text-signoz_vanilla-300 md:flex">
                  <FileText size={12} />
                  <span className="max-w-40 truncate">{fileName || 'Local browser session'}</span>
                </div>
                <Button
                  type="button"
                  isButton
                  variant="default"
                  onClick={runQuery}
                  className="h-8 gap-1.5 rounded-sm px-4 text-xs"
                >
                  <Play size={12} fill="currentColor" /> Run Query
                </Button>
              </div>
            </div>
            <div className="flex gap-2 border-t border-signoz_slate-400 p-2">
              <select
                aria-label="Log field"
                value={draftFilter.field}
                onChange={(event) =>
                  setDraftFilter((current) => ({ ...current, field: event.target.value }))
                }
                className="h-9 w-24 shrink-0 rounded-sm border-signoz_slate-400 bg-signoz_ink-400 px-2 font-mono text-[11px] text-signoz_vanilla-300 focus:ring-0 sm:w-36"
              >
                {fieldOptions.map((field) => (
                  <option key={field}>{field}</option>
                ))}
              </select>
              <select
                aria-label="Filter operator"
                value={draftFilter.operator}
                onChange={(event) =>
                  setDraftFilter((current) => ({
                    ...current,
                    operator: event.target.value as LogFilter['operator'],
                  }))
                }
                className="h-9 w-20 shrink-0 rounded-sm border-signoz_slate-400 bg-signoz_ink-400 px-2 text-[11px] text-signoz_vanilla-300 focus:ring-0"
              >
                <option value="contains">contains</option>
                <option value="=">=</option>
                <option value="!=">!=</option>
              </select>
              <div className="relative min-w-0 flex-1">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-signoz_vanilla-400"
                />
                <input
                  value={draftFilter.value}
                  onChange={(event) =>
                    setDraftFilter((current) => ({ ...current, value: event.target.value }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') runQuery()
                  }}
                  placeholder="Enter your filter value"
                  aria-label="Filter value"
                  className="h-9 w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 pl-8 pr-3 font-mono text-xs text-signoz_vanilla-200 placeholder:text-signoz_vanilla-400/60 focus:ring-0"
                />
              </div>
            </div>
            {view === 'list' ? (
              <div className="flex min-h-10 items-center justify-between gap-3 border-t border-signoz_slate-400 px-3 py-2">
                <div className="flex items-center gap-2 text-xs text-signoz_vanilla-300">
                  <span>Frequency chart</span>
                  <Toggle
                    checked={showFrequencyChart}
                    onChange={() => setShowFrequencyChart((current) => !current)}
                    label="Show frequency chart"
                  />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-signoz_vanilla-400">
                  <span className="hidden sm:inline">Order by</span>
                  <span className="rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 px-3 py-1.5 text-signoz_vanilla-300">
                    timestamp (desc)
                  </span>
                  <label
                    className={`relative flex items-center gap-1.5 ${filteredLogs.length === 0 ? 'opacity-40' : ''}`}
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">Export</span>
                    <select
                      aria-label="Export filtered logs"
                      value=""
                      onChange={(event) => downloadFiltered(event.target.value as ExportFormat)}
                      disabled={filteredLogs.length === 0}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    >
                      <option value="" disabled>
                        Export format
                      </option>
                      <option value="jsonl">JSONL</option>
                      <option value="csv">CSV</option>
                      <option value="txt">Plain text</option>
                    </select>
                  </label>
                </div>
              </div>
            ) : (
              <AggregationQueryBuilder
                view={view}
                aggregation={aggregation}
                aggregationField={effectiveAggregationField}
                numericFields={numericFields}
                groupBy={groupBy}
                groupByFields={['severity_text', ...attributeKeys]}
                havingOperator={havingOperator}
                havingValue={havingValue}
                order={aggregationOrder}
                limit={aggregationLimit}
                bucketCount={bucketCount}
                legendFormat={legendFormat}
                filter={appliedFilter}
                onAggregationChange={setAggregation}
                onAggregationFieldChange={setAggregationField}
                onGroupByChange={setGroupBy}
                onHavingOperatorChange={setHavingOperator}
                onHavingValueChange={setHavingValue}
                onOrderChange={setAggregationOrder}
                onLimitChange={setAggregationLimit}
                onBucketCountChange={setBucketCount}
                onLegendFormatChange={setLegendFormat}
              />
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {showFrequencyChart && view === 'list' && (
              <div className="border-b border-signoz_slate-400 px-4 py-3">
                <div className="mb-2 flex items-center justify-between text-[11px] text-signoz_vanilla-400">
                  <span>Log frequency</span>
                  <span>{timeRange.count.toLocaleString()} timestamped events</span>
                </div>
                <Histogram values={histogram} />
                {timeRange.count > 0 && (
                  <div className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10px] text-signoz_vanilla-400">
                    <span>{new Date(timeRange.start).toISOString()}</span>
                    <span>{new Date(timeRange.end).toISOString()}</span>
                  </div>
                )}
                {timeRange.count < filteredLogs.length && (
                  <p className="m-0 mt-2 text-xs text-signoz_vanilla-400">
                    {filteredLogs.length - timeRange.count} logs without a valid timestamp are
                    excluded from this chart.
                  </p>
                )}
              </div>
            )}
            {filteredLogs.length === 0 ? (
              <EmptyLogs hasInput={logs.length > 0} onUseSample={useSample} />
            ) : view === 'timeseries' ? (
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="m-0 text-sm font-medium text-signoz_vanilla-100">
                      {aggregationLabel}
                    </p>
                    {timeRange.count < filteredLogs.length && (
                      <p className="m-0 mt-1 text-xs text-signoz_vanilla-400">
                        {filteredLogs.length - timeRange.count} logs without a valid timestamp are
                        excluded from this chart.
                      </p>
                    )}
                    <p className="m-0 mt-1 text-xs text-signoz_vanilla-400">
                      {filteredLogs.length.toLocaleString()} logs ·{' '}
                      {visibleTimeSeries.series.length} series
                    </p>
                  </div>
                  <BarChart3 size={18} className="text-signoz_robin-400" />
                </div>
                <div
                  className="h-72 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400/30 px-2 py-4"
                  aria-label="Aggregated log time series chart"
                >
                  {visibleTimeSeries.series.length === 0 ? (
                    <p className="p-4 text-xs text-signoz_vanilla-400">
                      {timeRange.count === 0
                        ? 'No valid timestamps to chart.'
                        : 'No series match the Having condition.'}
                    </p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={visibleTimeSeries.points}
                        margin={{ top: 8, right: 16, left: -12, bottom: 4 }}
                      >
                        <CartesianGrid stroke="#1d2230" vertical={false} />
                        <XAxis
                          dataKey="label"
                          stroke="#8f98aa"
                          tick={{ fontSize: 10 }}
                          minTickGap={30}
                        />
                        <YAxis
                          stroke="#8f98aa"
                          tick={{ fontSize: 10 }}
                          allowDecimals={aggregation !== 'count'}
                        />
                        <ChartTooltip
                          labelFormatter={(_, payload) => {
                            const timestamp = payload[0]?.payload?.timestamp
                            return typeof timestamp === 'number'
                              ? new Date(timestamp).toISOString()
                              : ''
                          }}
                          contentStyle={{
                            background: '#141821',
                            border: '1px solid #2a3040',
                            fontSize: 11,
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        {visibleTimeSeries.series.map((series, index) => (
                          <Line
                            key={series}
                            type="monotone"
                            dataKey={(point) => point.values[series]}
                            name={(legendFormat || '{{group}}').replaceAll('{{group}}', series)}
                            stroke={AGGREGATION_COLORS[index % AGGREGATION_COLORS.length]}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 3 }}
                            connectNulls
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            ) : view === 'table' ? (
              aggregationRows.length > 0 ? (
                <AggregationTable
                  rows={aggregationRows}
                  groupBy={groupBy}
                  aggregationLabel={aggregationLabel}
                  legendFormat={legendFormat}
                />
              ) : (
                <div className="flex min-h-56 items-center justify-center text-xs text-signoz_vanilla-400">
                  No groups match the Having condition.
                </div>
              )
            ) : (
              <VirtualLogRows
                logs={filteredLogs}
                activeLogId={activeLogId}
                onSelect={setActiveLogId}
                fillHeight={isFullView}
              />
            )}
          </div>
          <footer className="flex min-h-10 shrink-0 items-center justify-between gap-3 border-t border-signoz_slate-400 px-3 text-[11px] text-signoz_vanilla-400">
            <span className="truncate">
              {fileName || 'Local browser session'} · {logs.length.toLocaleString()} loaded
            </span>
            <span className="shrink-0">
              {view === 'timeseries'
                ? `${visibleTimeSeries.series.length.toLocaleString()} series`
                : view === 'table'
                  ? `${aggregationRows.length.toLocaleString()} result rows`
                  : `Showing ${filteredLogs.length.toLocaleString()} logs`}
            </span>
          </footer>
          {activeLog && (
            <LogDetailDrawer
              log={activeLog}
              contextLogs={contextLogs}
              canGoPrevious={activeLogIndex > 0}
              canGoNext={activeLogIndex < filteredLogs.length - 1}
              onPrevious={() =>
                setActiveLogId(filteredLogs[activeLogIndex - 1]?.id ?? activeLog.id)
              }
              onNext={() => setActiveLogId(filteredLogs[activeLogIndex + 1]?.id ?? activeLog.id)}
              onClose={() => setActiveLogId(null)}
            />
          )}
        </main>
      </div>
    </div>
  )

  return isFullView && typeof document !== 'undefined' ? createPortal(shell, document.body) : shell
}

export default LogAnalyzerTool

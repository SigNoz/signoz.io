'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ALL_SECTIONS,
  MAX_VALUE,
  METRICS_PRICES,
  RETENTION_PERIOD,
  TRACES_AND_LOGS_PRICES,
} from './constants'
import { linearToLog, logToLinear } from './math'
import type { Section } from './types'

export interface SectionState {
  sliderValue: number
  inputValue: string
  retentionPeriod: number
  setRetentionPeriod: (value: number) => void
  handleChange: (value: number | number[]) => void
  handleInputChange: (value: string) => void
  subtotal: number
}

export interface UsePricingCalculatorReturn {
  isMounted: boolean
  isMobile: boolean
  activeTab: string
  setActiveTab: (tab: string) => void
  showCopiedToast: boolean
  isSectionVisible: (section: Section) => boolean
  traces: SectionState
  logs: SectionState
  metrics: SectionState
  totalEstimate: number
  isHighVolume: boolean
  copyLinkToClipboard: () => void
  shareWithTeam: () => Promise<void>
}

export function usePricingCalculator({
  show,
  embedded,
}: {
  show?: Section[]
  embedded: boolean
}): UsePricingCalculatorReturn {
  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  )

  const [tracesValue, setTracesValue] = useState(0)
  const [inputTracesValue, setInputTracesValue] = useState('0')

  const [logsValue, setLogsValue] = useState(0)
  const [inputLogsValue, setInputLogsValue] = useState('0')

  const [metricsValue, setMetricsValue] = useState(0)
  const [inputMetricsValue, setInputMetricsValue] = useState('0')

  // Derive enabled sections based on `show` prop and keep helper
  const enabledSections = useMemo(() => {
    return show === undefined ? new Set<Section>(ALL_SECTIONS) : new Set<Section>(show)
  }, [show])
  const isSectionVisible = (s: Section) => enabledSections.has(s)
  const firstVisible = useMemo<Section | null>(() => {
    for (const s of ALL_SECTIONS) if (enabledSections.has(s)) return s
    return null
  }, [enabledSections])

  const [activeTab, setActiveTab] = useState('traces')

  // Ensure active tab is valid for the current visible sections
  useEffect(() => {
    const desired = (firstVisible ?? 'traces') as string
    if (!isSectionVisible(activeTab as Section) && activeTab !== desired) {
      setActiveTab(desired)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstVisible, show])

  const [isMounted, setIsMounted] = useState(false)
  const [showCopiedToast, setShowCopiedToast] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Load configuration from URL parameters on mount
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tracesParam = urlParams.get('traces')
      const logsParam = urlParams.get('logs')
      const metricsParam = urlParams.get('metrics')
      const tracesRetentionParam = urlParams.get('tracesRetention')
      const logsRetentionParam = urlParams.get('logsRetention')
      const metricsRetentionParam = urlParams.get('metricsRetention')

      if (tracesParam) {
        const value = Number.parseInt(tracesParam)
        if (!isNaN(value) && value >= 0) {
          setInputTracesValue(value.toString())
          setTracesValue(value === 0 ? 0 : logToLinear(Math.min(value, MAX_VALUE), MAX_VALUE))
        }
      }

      if (logsParam) {
        const value = Number.parseInt(logsParam)
        if (!isNaN(value) && value >= 0) {
          setInputLogsValue(value.toString())
          setLogsValue(value === 0 ? 0 : logToLinear(Math.min(value, MAX_VALUE), MAX_VALUE))
        }
      }

      if (metricsParam) {
        const value = Number.parseInt(metricsParam)
        if (!isNaN(value) && value >= 0) {
          setInputMetricsValue(value.toString())
          setMetricsValue(value === 0 ? 0 : logToLinear(Math.min(value, MAX_VALUE), MAX_VALUE))
        }
      }

      if (tracesRetentionParam) {
        const value = Number.parseInt(tracesRetentionParam)
        if (!isNaN(value) && TRACES_AND_LOGS_PRICES[value]) {
          setTracesRetentionPeriod(value)
        }
      }

      if (logsRetentionParam) {
        const value = Number.parseInt(logsRetentionParam)
        if (!isNaN(value) && TRACES_AND_LOGS_PRICES[value]) {
          setLogsRetentionPeriod(value)
        }
      }

      if (metricsRetentionParam) {
        const value = Number.parseInt(metricsRetentionParam)
        if (!isNaN(value) && METRICS_PRICES[value]) {
          setMetricsRetentionPeriod(value)
        }
      }
    }
  }, [])

  const handleChangeTraces = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setTracesValue(numValue)
    setInputTracesValue(linearToLog(numValue, MAX_VALUE).toString())
  }

  const handleChangeLogs = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setLogsValue(numValue)
    setInputLogsValue(linearToLog(numValue, MAX_VALUE).toString())
  }

  const handleChangeMetrics = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setMetricsValue(numValue)
    setInputMetricsValue(linearToLog(numValue, MAX_VALUE).toString())
  }

  const handleInputTracesChange = (value: string) => {
    setInputTracesValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue = numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MAX_VALUE)
    setTracesValue(linearValue)
  }

  const handleInputLogsChange = (value: string) => {
    setInputLogsValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue = numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MAX_VALUE)
    setLogsValue(linearValue)
  }

  const handleInputMetricsChange = (value: string) => {
    setInputMetricsValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue = numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MAX_VALUE)
    setMetricsValue(linearValue)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText('https://signoz.io/pricing/pricingv1/#estimate-your-monthly-bill')
  }

  const generateShareableURL = () => {
    const currentURL = new URL(window.location.href)
    const params = new URLSearchParams()

    if (inputTracesValue !== '0') {
      params.set('traces', inputTracesValue)
      params.set('tracesRetention', tracesRetentionPeriod.toString())
    }
    if (inputLogsValue !== '0') {
      params.set('logs', inputLogsValue)
      params.set('logsRetention', logsRetentionPeriod.toString())
    }
    if (inputMetricsValue !== '0') {
      params.set('metrics', inputMetricsValue)
      params.set('metricsRetention', metricsRetentionPeriod.toString())
    }

    currentURL.search = params.toString()
    currentURL.hash = 'estimate-your-monthly-bill'
    return currentURL.toString()
  }

  const shareWithTeam = async () => {
    try {
      const shareableURL = generateShareableURL()
      await navigator.clipboard.writeText(shareableURL)
      setShowCopiedToast(true)
      setTimeout(() => setShowCopiedToast(false), 3000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const getPricePerUnit = (type: string, retentionPeriod: number) => {
    if (type === 'metrics') {
      return METRICS_PRICES[retentionPeriod]
    } else {
      return TRACES_AND_LOGS_PRICES[retentionPeriod]
    }
  }

  const calculateSubtotal = (type: string, value: number, retentionPeriod: number) => {
    if (value === 0) return 0
    const pricePerUnit = getPricePerUnit(type, retentionPeriod)
    const estimatedUsage = linearToLog(value, MAX_VALUE)
    return Number(pricePerUnit) * Number(estimatedUsage)
  }

  const tracesSubtotal = calculateSubtotal('traces', tracesValue, tracesRetentionPeriod)
  const logsSubtotal = calculateSubtotal('logs', logsValue, logsRetentionPeriod)
  const metricsSubtotal = calculateSubtotal('metrics', metricsValue, metricsRetentionPeriod)

  // Total includes only visible sections (fallback min $49 unchanged)
  const totalEstimate = Math.max(
    49,
    (isSectionVisible('traces') ? tracesSubtotal : 0) +
      (isSectionVisible('logs') ? logsSubtotal : 0) +
      (isSectionVisible('metrics') ? metricsSubtotal : 0)
  )

  const isHighVolume = totalEstimate >= 2500

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const query = embedded ? '(max-width: 1280px)' : '(max-width: 768px)'
    const mql = window.matchMedia(query)
    const sync = () => setIsMobile(mql.matches)

    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [embedded])

  return {
    isMounted,
    isMobile,
    activeTab,
    setActiveTab,
    showCopiedToast,
    isSectionVisible,
    traces: {
      sliderValue: tracesValue,
      inputValue: inputTracesValue,
      retentionPeriod: tracesRetentionPeriod,
      setRetentionPeriod: setTracesRetentionPeriod,
      handleChange: handleChangeTraces,
      handleInputChange: handleInputTracesChange,
      subtotal: tracesSubtotal,
    },
    logs: {
      sliderValue: logsValue,
      inputValue: inputLogsValue,
      retentionPeriod: logsRetentionPeriod,
      setRetentionPeriod: setLogsRetentionPeriod,
      handleChange: handleChangeLogs,
      handleInputChange: handleInputLogsChange,
      subtotal: logsSubtotal,
    },
    metrics: {
      sliderValue: metricsValue,
      inputValue: inputMetricsValue,
      retentionPeriod: metricsRetentionPeriod,
      setRetentionPeriod: setMetricsRetentionPeriod,
      handleChange: handleChangeMetrics,
      handleInputChange: handleInputMetricsChange,
      subtotal: metricsSubtotal,
    },
    totalEstimate,
    isHighVolume,
    copyLinkToClipboard,
    shareWithTeam,
  }
}

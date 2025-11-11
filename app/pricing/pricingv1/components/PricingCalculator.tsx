"use client"

// TODO: file too large
import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Slider } from "@nextui-org/react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import Button from "@/components/ui/Button"
import TrackingLink from "../../../../components/TrackingLink"
import TrackingButton from "../../../../components/TrackingButton"
import { Card } from "@/components/ui/Card"
import { cn } from "app/lib/utils"

export type Section = "traces" | "logs" | "metrics"
interface PricingCalculatorProps {
  // If undefined, show all sections (to ensure backward compatibility). If [], show none.
  show?: Section[]
  showHeader?: boolean
  showFooter?: boolean
  embedded?: boolean
}
const ALL_SECTIONS: Section[] = ["traces", "logs", "metrics"]

const DraftingCompass = ({ isActive }: { isActive: boolean }) => {
  return (
    <img
      src="/img/index_features/drafting-compass.svg"
      alt="Traces Icon"
      className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-50"}`}
    />
  )
}

const LogsIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <img
      src="/img/index_features/logs.svg"
      alt="Logs Icon"
      className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-50"}`}
    />
  )
}

const MetricsIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <img
      src="/img/index_features/bar-chart-2.svg"
      alt="Metrics Icon"
      className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-50"}`}
    />
  )
}

// Format numbers for display
const formatNumber = (number: number) =>
  number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

// Format bytes (GB, TB) for display
const formatBytes = (size: number) => {
  if (size < 1000) {
    return `${formatNumber(size)} GB`
  }
  return `${formatNumber(size / 1000)} TB`
}

// Format metrics (million, billion) for display
const formatMetrics = (size: number) => {
  if (size < 1000) {
    return `${formatNumber(size)} mn`
  }
  return `${formatNumber(size / 1000)} bn`
}

// Constants for slider ranges
const MIN_VALUE = 0
const MAX_VALUE = 100000
const MIN_LOG_VALUE = 0.1 // Small positive number for logarithmic calculations

// Transform linear slider value to logarithmic scale
const linearToLog = (value: number, minLog: number, maxLog: number) => {
  if (value === 0) return 0
  const minValue = Math.log(MIN_LOG_VALUE)
  const maxValue = Math.log(maxLog)
  const scale = (maxValue - minValue) / (maxLog - MIN_LOG_VALUE)
  return Math.round(Math.exp(minValue + scale * (value - MIN_LOG_VALUE)))
}

// Transform logarithmic value back to linear scale for slider
const logToLinear = (value: number, minLog: number, maxLog: number) => {
  if (value === 0) return 0
  const minValue = Math.log(MIN_LOG_VALUE)
  const maxValue = Math.log(maxLog)
  const scale = (maxLog - MIN_LOG_VALUE) / (maxValue - minValue)
  return Math.round(MIN_LOG_VALUE + scale * (Math.log(value) - minValue))
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ show, showHeader = true, showFooter = true, embedded = false }) => {
  // Constants for pricing and retention periods
  const TRACES_AND_LOGS_PRICES = {
    15: 0.3,
    30: 0.4,
    90: 0.6,
    180: 0.8,
  }

  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  }

  const RETENTION_PERIOD = {
    TRACES_AND_LOGS: [
      { days: 15, price: 0.3 },
      { days: 30, price: 0.4 },
      { days: 90, price: 0.6 },
      { days: 180, price: 0.8 },
    ],
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 },
    ],
  }

  // State for retention periods
  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(RETENTION_PERIOD.TRACES_AND_LOGS[0].days)
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(RETENTION_PERIOD.TRACES_AND_LOGS[0].days)
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(RETENTION_PERIOD.METRICS[0].months)

  // State for slider values
  const [tracesValue, setTracesValue] = useState(0)
  const [inputTracesValue, setInputTracesValue] = useState("0")

  const [logsValue, setLogsValue] = useState(0)
  const [inputLogsValue, setInputLogsValue] = useState("0")

  const [metricsValue, setMetricsValue] = useState(0)
  const [inputMetricsValue, setInputMetricsValue] = useState("0")

  // Derive enabled sections based on `show` prop and keep helper
  const enabledSections = useMemo(() => {
    return show === undefined ? new Set<Section>(ALL_SECTIONS) : new Set<Section>(show)
  }, [show])
  const isSectionVisible = (s: Section) => enabledSections.has(s)
  const firstVisible = useMemo<Section | null>(() => {
    for (const s of ALL_SECTIONS) if (enabledSections.has(s)) return s
    return null
  }, [enabledSections])

  // State for active tab in mobile view
  const [activeTab, setActiveTab] = useState("traces")

  // Ensure active tab is valid for the current visible sections
  useEffect(() => {
    const desired = (firstVisible ?? "traces") as string
    if (!isSectionVisible(activeTab as Section) && activeTab !== desired) {
      setActiveTab(desired)
    }
  }, [firstVisible, show]) // react to visibility changes

  // Used to track whether we're client-side rendered
  const [isMounted, setIsMounted] = useState(false)
  const [showCopiedToast, setShowCopiedToast] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Load configuration from URL parameters on mount
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const tracesParam = urlParams.get("traces")
      const logsParam = urlParams.get("logs")
      const metricsParam = urlParams.get("metrics")
      const tracesRetentionParam = urlParams.get("tracesRetention")
      const logsRetentionParam = urlParams.get("logsRetention")
      const metricsRetentionParam = urlParams.get("metricsRetention")

      if (tracesParam) {
        const value = Number.parseInt(tracesParam)
        if (!isNaN(value) && value >= 0) {
          setInputTracesValue(value.toString())
          setTracesValue(value === 0 ? 0 : logToLinear(Math.min(value, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE))
        }
      }

      if (logsParam) {
        const value = Number.parseInt(logsParam)
        if (!isNaN(value) && value >= 0) {
          setInputLogsValue(value.toString())
          setLogsValue(value === 0 ? 0 : logToLinear(Math.min(value, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE))
        }
      }

      if (metricsParam) {
        const value = Number.parseInt(metricsParam)
        if (!isNaN(value) && value >= 0) {
          setInputMetricsValue(value.toString())
          setMetricsValue(value === 0 ? 0 : logToLinear(Math.min(value, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE))
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

  // Handle slider changes
  const handleChangeTraces = (value: number | number[]) => {
    const numValue = typeof value === "number" ? value : value[0]
    if (isNaN(numValue)) return
    setTracesValue(numValue)
    setInputTracesValue(linearToLog(numValue, MIN_LOG_VALUE, MAX_VALUE).toString())
  }

  const handleChangeLogs = (value: number | number[]) => {
    const numValue = typeof value === "number" ? value : value[0]
    if (isNaN(numValue)) return
    setLogsValue(numValue)
    setInputLogsValue(linearToLog(numValue, MIN_LOG_VALUE, MAX_VALUE).toString())
  }

  const handleChangeMetrics = (value: number | number[]) => {
    const numValue = typeof value === "number" ? value : value[0]
    if (isNaN(numValue)) return
    setMetricsValue(numValue)
    setInputMetricsValue(linearToLog(numValue, MIN_VALUE, MAX_VALUE).toString())
  }

  // Handle direct input changes
  const handleInputTracesChange = (value: string) => {
    setInputTracesValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue = numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE)
    setTracesValue(linearValue)
  }

  const handleInputLogsChange = (value: string) => {
    setInputLogsValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue = numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE)
    setLogsValue(linearValue)
  }

  const handleInputMetricsChange = (value: string) => {
    setInputMetricsValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue = numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE)
    setMetricsValue(linearValue)
  }

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText("https://signoz.io/pricing/pricingv1/#estimate-your-monthly-bill")
  }

  // Generate shareable URL with current calculator settings
  const generateShareableURL = () => {
    const currentURL = new URL(window.location.href)
    const params = new URLSearchParams()

    if (inputTracesValue !== "0") {
      params.set("traces", inputTracesValue)
      params.set("tracesRetention", tracesRetentionPeriod.toString())
    }
    if (inputLogsValue !== "0") {
      params.set("logs", inputLogsValue)
      params.set("logsRetention", logsRetentionPeriod.toString())
    }
    if (inputMetricsValue !== "0") {
      params.set("metrics", inputMetricsValue)
      params.set("metricsRetention", metricsRetentionPeriod.toString())
    }

    currentURL.search = params.toString()
    currentURL.hash = "estimate-your-monthly-bill"
    return currentURL.toString()
  }

  // Share calculator configuration with team
  const shareWithTeam = async () => {
    try {
      const shareableURL = generateShareableURL()
      await navigator.clipboard.writeText(shareableURL)
      setShowCopiedToast(true)
      setTimeout(() => setShowCopiedToast(false), 3000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  // Get price per unit based on type and retention period
  const getPricePerUnit = (type: string, retentionPeriod: number) => {
    if (type === "metrics") {
      return METRICS_PRICES[retentionPeriod]
    } else {
      return TRACES_AND_LOGS_PRICES[retentionPeriod]
    }
  }

  // Calculate subtotal for each data type
  const calculateSubtotal = (type: string, value: number, retentionPeriod: number) => {
    if (value === 0) return 0
    const pricePerUnit = getPricePerUnit(type, retentionPeriod)
    const estimatedUsage = linearToLog(value, MIN_LOG_VALUE, MAX_VALUE)
    return Number(pricePerUnit) * Number(estimatedUsage)
  }

  // Calculate subtotals and total estimate
  const tracesSubtotal = calculateSubtotal("traces", tracesValue, tracesRetentionPeriod)
  const logsSubtotal = calculateSubtotal("logs", logsValue, logsRetentionPeriod)
  const metricsSubtotal = calculateSubtotal("metrics", metricsValue, metricsRetentionPeriod)

  // Total includes only visible sections (fallback min $49 unchanged)
  const totalEstimate = Math.max(
    49,
    (isSectionVisible("traces") ? tracesSubtotal : 0) +
      (isSectionVisible("logs") ? logsSubtotal : 0) +
      (isSectionVisible("metrics") ? metricsSubtotal : 0),
  )

  // Check if high volume for custom pricing suggestion
  const isHighVolume = totalEstimate >= 2500

  // Detect if on mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (!embedded) setIsMobile(window.innerWidth <= 768)
      else setIsMobile(window.innerWidth <= 1280)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Render a slider with consistent styling
  const renderSlider = (
    value: number,
    onChange: (val: number | number[]) => void,
    color: "secondary" | "danger" | "warning",
    minLabel: string,
    maxLabel: string,
    formatFunc: (val: number) => string,
    thumbColor: string,
    ariaLabel: string,
    inputValue: string,
  ) => (
    <Slider
      size="sm"
      step={0.01}
      maxValue={MAX_VALUE}
      minValue={MIN_VALUE}
      showTooltip={true}
      tooltipProps={{
        content: value === 0 ? "0" : formatFunc(Number(inputValue)),
      }}
      color={color}
      marks={[
        { value: MIN_VALUE, label: minLabel },
        { value: MAX_VALUE, label: maxLabel },
      ]}
      classNames={{
        base: "max-w-full",
        label: "text-medium",
      }}
      aria-label={ariaLabel}
      renderThumb={(props) => (
        <div
          {...props}
          className="group top-1/2 cursor-grab rounded-full border-small border-signoz_vanilla-100 bg-background shadow-medium data-[dragging=true]:cursor-grabbing"
          aria-valuetext={value === 0 ? "0" : formatFunc(Number(inputValue))}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-${thumbColor} transition-transform group-data-[dragging=true]:scale-80`}
          />
        </div>
      )}
      value={value}
      onChange={onChange}
    />
  )

  return (
    <Card className={`${show?.length === 1 || embedded ? `p-0 md:p-0 [&>div]:border-0` : ""}`}>
      <div id="estimate-your-monthly-bill" className={`p-3 md:p-4 ${show?.length === 1 || embedded ? "!p-0 md:!p-0" : ""}`}>
        {showHeader && (
          <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <span className="group relative text-lg font-semibold text-signoz_vanilla-100/90 md:text-2xl">
              Estimate your monthly bill
              {isMounted && (
                <a
                  href="#estimate-your-monthly-bill"
                  onClick={copyLinkToClipboard}
                  className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-label="Copy link to this section"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#4E74F8"
                    className="linkicon h-6 w-6"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                  </svg>
                </a>
              )}
            </span>
            {isMounted && (
              <p className="mt-1 text-sm text-signoz_vanilla-400">
                You can also set data ingestion limits so you never get a surprise bill.
                <Link
                  href="https://signoz.io/docs/ingestion/signoz-cloud/keys/"
                  className="ml-1 font-medium text-signoz_robin-400"
                >
                  Learn more
                  <ArrowUpRight className="inline" size={16} />
                </Link>
              </p>
            )}
          </div>

          {isMounted && (
            <div className="relative ml-4">
              <TrackingButton
                onClick={shareWithTeam}
                clickType="Copy to Clipboard"
                clickName="Share Pricing Calculator Configuration"
                clickLocation="Pricing Calculator Header"
                clickText="Share with your team"
                className="flex items-center gap-2 rounded-md border border-signoz_slate-400 bg-signoz_ink-400 px-3 py-2 text-sm text-signoz_vanilla-100 transition-colors hover:bg-signoz_ink-300"
                aria-label="Share calculator configuration with your team"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16,6 12,2 8,6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share with your team
              </TrackingButton>

              {/* Toast notification positioned near the button */}
              {showCopiedToast && (
                <div className="absolute right-0 top-full mt-2 w-max rounded-md bg-signoz_robin-500 px-3 py-2 text-sm text-white shadow-lg">
                  <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-signoz_robin-500"></div>
                  Configuration copied to clipboard!
                </div>
              )}
            </div>
          )}
        </div>
        )}

        {isMobile ? (
          // Mobile view with tabs
          <div>
            {/* Tab navigation */}
            <div className="tabs mb-4 flex justify-between gap-2">
              {isSectionVisible("traces") && (
                <Button
                  isButton={true}
                  variant={"secondary"}
                  rounded={"default"}
                  className={`w-full bg-transparent hover:bg-transparent ${activeTab === "traces" ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActiveTab("traces")}
                >
                  <DraftingCompass isActive={activeTab === "traces"} />
                  Traces
                </Button>
              )}

              {isSectionVisible("logs") && (
                <Button
                  isButton={true}
                  variant={"secondary"}
                  rounded={"default"}
                  className={`w-full bg-transparent hover:bg-transparent ${activeTab === "logs" ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActiveTab("logs")}
                >
                  <LogsIcon isActive={activeTab === "logs"} />
                  Logs
                </Button>
              )}

              {isSectionVisible("metrics") && (
                <Button
                  variant={"secondary"}
                  rounded={"default"}
                  isButton={true}
                  className={`w-full bg-transparent hover:bg-transparent ${activeTab === "metrics" ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActiveTab("metrics")}
                >
                  <MetricsIcon isActive={activeTab === "metrics"} />
                  Metrics
                </Button>
              )}
            </div>

            {isSectionVisible("traces") && activeTab === "traces" && (
              <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 px-3 pb-4 pt-6">
                <div className="mb-4 flex justify-between">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">Price per unit</span>
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">Retention</span>
                </div>

                <div className="mb-6 flex justify-between">
                  <div className="text-signoz_robin-400">${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}/GB</div>
                  <select
                    className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
                    value={tracesRetentionPeriod}
                    onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                  >
                    {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                      <option key={`traces-${option.days}-${idx}`} value={option.days}>
                        {`${option.days} days`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Scale of ingestion (per month)
                  </span>
                  <div className="mt-4">
                    {renderSlider(
                      tracesValue,
                      handleChangeTraces,
                      "secondary",
                      "0GB",
                      "100TB",
                      formatBytes,
                      "signoz_robin-500",
                      "Adjust traces ingestion volume",
                      inputTracesValue,
                    )}
                  </div>
                </div>

                <div className="mb-4 mt-10 flex justify-between uppercase">
                  <span className="text-xs font-semibold text-signoz_vanilla-400">Estimated usage</span>
                  <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={inputTracesValue}
                      onChange={(e) => handleInputTracesChange(e.target.value)}
                      className=" w-full border-0 border-b border-signoz_robin-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                      min="0"
                      max={MAX_VALUE.toString()}
                    />
                    <span className="text-base text-signoz_vanilla-400">GB</span>
                  </div>
                  <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
                  <span className="text-base font-medium text-signoz_vanilla-100">${formatNumber(tracesSubtotal)}</span>
                </div>
              </div>
            )}

            {isSectionVisible("logs") && activeTab === "logs" && (
              <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 px-3 pb-4 pt-6">
                <div className="mb-4 flex justify-between">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">Price per unit</span>
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">Retention</span>
                </div>

                <div className="mb-6 flex justify-between">
                  <div className="text-signoz_sakura-400">${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}/GB</div>
                  <select
                    className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
                    value={logsRetentionPeriod}
                    onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                  >
                    {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                      <option key={`logs-${option.days}-${idx}`} value={option.days}>
                        {`${option.days} days`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Scale of ingestion (per month)
                  </span>
                  <div className="mt-4">
                    {renderSlider(
                      logsValue,
                      handleChangeLogs,
                      "danger",
                      "0GB",
                      "100TB",
                      formatBytes,
                      "signoz_sakura-500",
                      "Adjust logs ingestion volume",
                      inputLogsValue,
                    )}
                  </div>
                </div>

                <div className="mb-4 mt-10 flex justify-between uppercase">
                  <span className="text-xs font-semibold text-signoz_vanilla-400">Estimated usage</span>
                  <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={inputLogsValue}
                      onChange={(e) => handleInputLogsChange(e.target.value)}
                      className=" w-full border-0 border-b border-signoz_sakura-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                      min="0"
                      max={MAX_VALUE.toString()}
                    />
                    <span className="text-base text-signoz_vanilla-400">GB</span>
                  </div>
                  <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
                  <span className="text-base font-medium text-signoz_vanilla-100">${formatNumber(logsSubtotal)}</span>
                </div>
              </div>
            )}

            {isSectionVisible("metrics") && activeTab === "metrics" && (
              <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 px-3 pb-4 pt-6">
                <div className="mb-4 flex justify-between">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">Price per unit</span>
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">Retention</span>
                </div>

                <div className="mb-6 flex justify-between">
                  <div className="text-signoz_amber-400">${METRICS_PRICES[metricsRetentionPeriod]}/mn samples</div>
                  <select
                    className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
                    value={metricsRetentionPeriod}
                    onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                  >
                    {RETENTION_PERIOD.METRICS.map((option, idx) => (
                      <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                        {`${option.months} ${option.months === 1 ? "month" : "months"}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Scale of ingestion (per month)
                  </span>
                  <div className="mt-4">
                    {renderSlider(
                      metricsValue,
                      handleChangeMetrics,
                      "warning",
                      "0M",
                      "100B",
                      formatMetrics,
                      "signoz_amber-500",
                      "Adjust metrics ingestion volume",
                      inputMetricsValue,
                    )}
                  </div>
                </div>

                <div className="mb-4 mt-10 flex justify-between uppercase">
                  <span className="text-xs font-semibold text-signoz_vanilla-400">Estimated usage</span>
                  <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={inputMetricsValue}
                      onChange={(e) => handleInputMetricsChange(e.target.value)}
                      className="w-full border-0 border-b border-signoz_amber-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                      min="0"
                      max={MAX_VALUE.toString()}
                    />
                    <span className="text-base text-signoz_vanilla-400">mn</span>
                  </div>
                  <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
                  <span className="text-base font-medium text-signoz_vanilla-100">
                    ${formatNumber(metricsSubtotal)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Desktop view - Grid Layout
          <>
            {show?.length === 1 ? (
              // Single section layout - Show pricing estimated usage and subtotal in one section
              <div className="space-y-6">
                {/* Header section with icon, pricing, estimated usage, and subtotal */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isSectionVisible("traces") && (
                      <>
                        {/* <img src="/img/index_features/drafting-compass.svg" alt="Traces Icon" className="h-5 w-5" /> */}
                        <DraftingCompass isActive={true} />
                        <span className="text-md font-medium text-signoz_vanilla-100">Traces</span>
                      </>
                    )}
                    {isSectionVisible("logs") && (
                      <>
                        {/* <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-5 w-5" /> */}
                        <LogsIcon isActive={true} />
                        <span className="text-md font-medium text-signoz_vanilla-100">Logs</span>
                      </>
                    )}
                    {isSectionVisible("metrics") && (
                      <>
                        {/* <img src="/img/index_features/bar-chart-2.svg" alt="Metrics Icon" className="h-5 w-5" /> */}
                        <MetricsIcon isActive={true} />
                        <span className="text-md font-medium text-signoz_vanilla-100">Metrics</span>
                      </>
                    )}
                    <span className="text-md font-medium text-signoz_robin-400">
                      ${isSectionVisible("metrics") ? METRICS_PRICES[metricsRetentionPeriod] : TRACES_AND_LOGS_PRICES[isSectionVisible("traces") ? tracesRetentionPeriod : logsRetentionPeriod]} / {isSectionVisible("metrics") ? "mn samples" : "GB"}
                    </span>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-xs font-semibold uppercase text-signoz_vanilla-400">ESTIMATED USAGE</div>
                      <div className="text-md font-medium text-signoz_vanilla-100">
                        {isSectionVisible("traces") && `${formatNumber(Number(inputTracesValue))} GB`}
                        {isSectionVisible("logs") && `${formatNumber(Number(inputLogsValue))} GB`}
                        {isSectionVisible("metrics") && `${formatNumber(Number(inputMetricsValue))} mn`}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold uppercase text-signoz_vanilla-400">SUBTOTAL</div>
                      <div className="text-md font-medium text-signoz_vanilla-100">
                        ${formatNumber(isSectionVisible("traces") ? tracesSubtotal : isSectionVisible("logs") ? logsSubtotal : metricsSubtotal)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configuration section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase text-signoz_vanilla-400 mb-2">RETENTION</div>
                      <select
                        className="block h-8 w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-sm text-signoz_vanilla-100"
                        value={isSectionVisible("traces") ? tracesRetentionPeriod : isSectionVisible("logs") ? logsRetentionPeriod : metricsRetentionPeriod}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          if (isSectionVisible("traces")) setTracesRetentionPeriod(value)
                          else if (isSectionVisible("logs")) setLogsRetentionPeriod(value)
                          else setMetricsRetentionPeriod(value)
                        }}
                      >
                        {(isSectionVisible("traces") || isSectionVisible("logs")) ? (
                          RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                            <option key={`${isSectionVisible("traces") ? "traces" : "logs"}-${option.days}-${idx}`} value={option.days}>
                              {`${option.days} days`}
                            </option>
                          ))
                        ) : (
                          RETENTION_PERIOD.METRICS.map((option, idx) => (
                            <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                              {`${option.months} ${option.months === 1 ? "month" : "months"}`}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex-1 max-w-md ml-8">
                    <div className="text-xs font-semibold uppercase text-signoz_vanilla-400 mb-2">SCALE OF INGESTION</div>
                    {isSectionVisible("traces") && renderSlider(
                      tracesValue,
                      handleChangeTraces,
                      "secondary",
                      "0 GB",
                      "500TB",
                      formatBytes,
                      "signoz_robin-500",
                      "Adjust traces ingestion volume",
                      inputTracesValue,
                    )}
                    {isSectionVisible("logs") && renderSlider(
                      logsValue,
                      handleChangeLogs,
                      "danger",
                      "0 GB",
                      "500TB",
                      formatBytes,
                      "signoz_sakura-500",
                      "Adjust logs ingestion volume",
                      inputLogsValue,
                    )}
                    {isSectionVisible("metrics") && renderSlider(
                      metricsValue,
                      handleChangeMetrics,
                      "warning",
                      "0M",
                      "500B",
                      formatMetrics,
                      "signoz_amber-500",
                      "Adjust metrics ingestion volume",
                      inputMetricsValue,
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Multi-section grid layout
              <div className={cn(`grid grid-cols-6 gap-y-3`, 
                show?.length === 0 && "hidden", 
                show?.length === 2 && "grid-rows-3", 
                (show?.length === 3 || show?.length === undefined) && "grid-rows-4"
              )}>
                {/* Header Row */}
                <div className="col-start-1 p-2"></div>
                <div className="col-start-2 py-2 pr-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Pricing per unit
                </div>
                <div className="col-start-3 py-2 pr-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Retention
                </div>
                <div className="col-start-4 py-2 pr-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Scale of ingestion (per month)
                </div>
                <div className="col-start-5 py-2 pr-2 text-right text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Estimated usage
                </div>
                <div className="col-start-6 py-2 pr-2 text-right text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Subtotal
                </div>

            {isSectionVisible("traces") && (
              <>
                {/* Traces Row */}
                <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
                  <img src="/img/index_features/drafting-compass.svg" alt="Traces Icon" className="h-5 w-5" />
                  <span>Traces</span>
                </div>
                <div className="metrics-background col-start-2 flex items-center gap-1">
                  <span className="text-base font-medium text-signoz_robin-400">
                    ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
                  </span>
                  /GB
                </div>
                <div className="metrics-background col-start-3 flex items-center">
                  <select
                    className="block h-[28px] w-20 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
                    value={tracesRetentionPeriod}
                    onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                  >
                    {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                      <option key={`traces-${option.days}-${idx}`} value={option.days}>
                        {`${option.days} days`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="metrics-background col-start-4 flex items-center">
                  {renderSlider(
                    tracesValue,
                    handleChangeTraces,
                    "secondary",
                    "0GB",
                    "100TB",
                    formatBytes,
                    "signoz_robin-500",
                    "Adjust traces ingestion volume",
                    inputTracesValue,
                  )}
                </div>
                <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
                  <div className="flex items-center justify-end">
                    <input
                      type="number"
                      value={inputTracesValue}
                      onChange={(e) => handleInputTracesChange(e.target.value)}
                      className="w-full ml-1 border-0 border-b border-signoz_robin-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                      min="0"
                    />
                    <span>GB</span>
                  </div>
                </div>
                <div className="metrics-background col-start-6 p-2 text-right">${formatNumber(tracesSubtotal)}</div>
              </>
            )}

            {isSectionVisible("logs") && (
              <>
                {/* Logs Row */}
                <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
                  <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-5 w-5" />
                  <span>Logs</span>
                </div>
                <div className="metrics-background col-start-2 flex items-center gap-1">
                  <span className="text-base font-medium text-signoz_sakura-400">
                    ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
                  </span>
                  /GB
                </div>
                <div className="metrics-background col-start-3 flex items-center">
                  <select
                    className="block h-[28px] w-20 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
                    value={logsRetentionPeriod}
                    onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                  >
                    {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                      <option key={`logs-${option.days}-${idx}`} value={option.days}>
                        {`${option.days} days`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="metrics-background col-start-4 flex items-center">
                  {renderSlider(
                    logsValue,
                    handleChangeLogs,
                    "danger",
                    "0GB",
                    "100TB",
                    formatBytes,
                    "signoz_sakura-500",
                    "Adjust logs ingestion volume",
                    inputLogsValue,
                  )}
                </div>
                <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
                  <div className="flex items-center justify-end">
                    <input
                      type="number"
                      value={inputLogsValue}
                      onChange={(e) => handleInputLogsChange(e.target.value)}
                      className="w-full ml-1 border-0 border-b border-signoz_sakura-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                      min="0"
                    />
                    <span>GB</span>
                  </div>
                </div>
                <div className="metrics-background col-start-6 p-2 text-right">${formatNumber(logsSubtotal)}</div>
              </>
            )}

            {isSectionVisible("metrics") && (
              <>
                {/* Metrics Row */}
                <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
                  <img src="/img/index_features/bar-chart-2.svg" alt="Metrics Icon" className="h-5 w-5" />
                  <span>Metrics</span>
                </div>
                <div className="metrics-background col-start-2 flex items-center gap-1">
                  <span className="text-base font-medium text-signoz_amber-400">
                    ${METRICS_PRICES[metricsRetentionPeriod]}
                  </span>
                  /mn samples
                </div>
                <div className="metrics-background col-start-3 flex items-center">
                  <select
                    className="block h-[28px] w-20 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
                    value={metricsRetentionPeriod}
                    onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                  >
                    {RETENTION_PERIOD.METRICS.map((option, idx) => (
                      <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                        {`${option.months} ${option.months === 1 ? "month" : "months"}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="metrics-background col-start-4 flex items-center">
                  {renderSlider(
                    metricsValue,
                    handleChangeMetrics,
                    "warning",
                    "0M",
                    "100B",
                    formatMetrics,
                    "signoz_amber-500",
                    "Adjust metrics ingestion volume",
                    inputMetricsValue,
                  )}
                </div>
                <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
                  <div className="flex items-center justify-end">
                    <input
                      type="number"
                      value={inputMetricsValue}
                      onChange={(e) => handleInputMetricsChange(e.target.value)}
                      className="w-full ml-1 border-0 border-b border-signoz_amber-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                      min="0"
                    />
                    <span>mn</span>
                  </div>
                </div>
                <div className="metrics-background col-start-6 p-2 text-right">${formatNumber(metricsSubtotal)}</div>
              </>
            )}
              </div>
            )}
          </>
        )}

        {/* Total estimate - always shown */}
        <div className={cn(
          "mt-6 flex items-center justify-between rounded-md px-3 py-4",
          show?.length === 1 ? "bg-signoz_slate-400/40" : "button-background"
        )}>
          <span className="text-base font-medium text-signoz_vanilla-100">
            {show?.length === 1 ? "Monthly estimate for usage-based plan" : "Monthly estimate"}
          </span>
          <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
          <div className="text-xl font-bold text-signoz_vanilla-100">${formatNumber(totalEstimate)}</div>
        </div>

        {/* Actions section */}
        {showFooter && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {/* Cost comparison link */}
          <div className="mb-4 hidden md:block">
            <a
              href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
              target="_blank"
              className="inline-flex items-center justify-center rounded-md bg-signoz_ink-400 px-5 py-2.5 text-sm text-white transition-colors hover:bg-signoz_ink-300"
              rel="noreferrer"
            >
              SigNoz saves you up to 80% on datadog bills.
              <ArrowUpRight size={18} className="ml-1 inline" />
            </a>
          </div>

          <TrackingLink
            href="/teams"
            clickType="Primary CTA"
            clickName="Sign Up Button"
            clickText="Get Started - Free"
            clickLocation="Pricing Calculator"
          >
            <Button isButton={true} variant={"default"} rounded={"full"} className="w-full">
              Get Started - Free
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </TrackingLink>
        </div>
        )}

        {/* High volume message when applicable */}
        {isHighVolume && (
          <div className="mt-4 rounded-md border border-dashed border-signoz_robin-500 bg-signoz_robin-500/10 p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="mb-2 text-sm font-medium text-signoz_robin-400 sm:mb-0">
                For high volume usage, reach out to us for custom pricing and retention options
              </span>
              <TrackingLink
                href="https://share.hsforms.com/1AZy88ajlRsCPZUP0kSMb2gda5af"
                clickType="Secondary CTA"
                clickName="Volume Discount Form Link"
                clickText="Contact Us"
                clickLocation="Pricing Calculator"
              >
                <Button isButton={true} variant={"secondary"} className="w-full">
                  Contact us
                </Button>
              </TrackingLink>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default PricingCalculator

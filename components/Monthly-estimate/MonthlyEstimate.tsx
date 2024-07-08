import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Slider, Tooltip, SliderValue } from "@nextui-org/react";
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button/Button';

const formatNumber = (number: Number) => number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

const formatBytes = (size) => {
  if (size < 1024) {
    return `${size} GB`
  }

  return `${formatNumber(size / 1024)} TB`
}

const formatMetrics = (size) => {
  if (size < 1000) {
    return `${size} mn`
  }

  return `${formatNumber(size / 1000)} bn`
}

const MonthlyEstimate = () => {
  const TRACES_AND_LOGS_PRICES = {
    15: 0.3,
    30: 0.4,
    90: 0.6,
    180: 0.8,
  };
  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  };
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
  };

  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  );
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  );
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  );

  const [tracesValue, setTracesValue] = React.useState<SliderValue>(0.2);
  const [inputTracesValue, setinputTracesValue] = React.useState<string>("0.2");

  const [logsValue, setLogsValue] = React.useState<SliderValue>(0.2);
  const [inputLogsValue, setinputLogsValue] = React.useState<string>("0.2");

  const [metricsValue, setMetricsValue] = React.useState<SliderValue>(0.2);
  const [inputMetricsValue, setinputMetricsValue] = React.useState<string>("0.2");


  const handleChangeTraces = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setTracesValue(value);
    setinputTracesValue(value.toString());

  };


  const handleChangeLogs = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setLogsValue(value);
    setinputLogsValue(value.toString());

  };

  const handleChangeMetrics = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setMetricsValue(value);
    setinputMetricsValue(value.toString());
  };



  const getPricePerUnit = (type: string, retentionPeriod: number) => {
    if (type === 'metrics') {
      return METRICS_PRICES[retentionPeriod];
    } else {
      return TRACES_AND_LOGS_PRICES[retentionPeriod];
    }
  };

  const calculateSubtotal = (type: string, value: SliderValue, retentionPeriod: number) => {
    const pricePerUnit = getPricePerUnit(type, retentionPeriod);
    const estimatedUsage = value;
    return Number(pricePerUnit) * Number(estimatedUsage);
  };

  const tracesSubtotal = calculateSubtotal('traces', tracesValue, tracesRetentionPeriod);
  const logsSubtotal = calculateSubtotal('logs', logsValue, logsRetentionPeriod);
  const metricsSubtotal = calculateSubtotal('metrics', metricsValue, metricsRetentionPeriod);

  const totalEstimate = Math.max(199, tracesSubtotal + logsSubtotal + metricsSubtotal);


  const myRef = useRef<HTMLElement | null>(null);

  const isHighVolume = tracesValue === 200 * 1024 || logsValue === 200 * 1024 || metricsValue === 200 * 1000;


  return (
    <section ref={myRef} id="monthly-estimate">
      <div className="container !w-[80vw] border border-signoz_slate-400 border-dashed !border-t-0">
        <div className="flex flex-col gap-2 pt-5">
          <span className="text-signoz_vanilla-100 text-2xl font-semibold pl-1">
            Estimate your monthly bill
          </span>
          <span className="mb-16 text-signoz_vanilla-400 font-normal text-base pl-1">
            You can also set data ingestion limits so you never get a surprise bill.
            <span className="text-signoz_robin-400 font-medium">
              &nbsp;Learn more
              <ArrowUpRight className="inline" size={16} />
            </span>
          </span>
        </div>
        <div className="grid grid-cols-6 grid-rows-4 gap-y-4">
          <div className="p-2"></div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">
            Pricing per unit
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">
            Retention
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">
            Scale of ingestion
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400 text-right">
            Estimated usage
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400 text-right">
            Subtotal
          </div>

          <div className="flex p-2 gap-2 metrics-background items-center">
            <img src="/img/index_features/drafting-compass.svg" alt="Logs Icon" className="w-6 h-6" />
            Traces
          </div>
          <div className="flex items-center justify-left gap-1 metrics-background">
            <span className="text-base font-medium text-signoz_robin-400">
              ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
            </span>
            /GB
          </div>
          <div className="flex metrics-background items-center">
            <select
              className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
              value={tracesRetentionPeriod}
              onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`${option.days}-${idx}`} value={option.days}>
                  {`${option.days} days`}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center metrics-background'>
            <Slider
              size="sm"
              step={0.01}
              maxValue={200 * 1024}
              minValue={0}
              color="secondary"
              marks={[
                {
                  value: 0,
                  label: "0GB",
                },
                {
                  value: 204800,
                  label: "200TB",
                },
              ]}
              classNames={{
                base: "max-w-md",
                label: "text-medium",
                // filler: "bg-signoz_robin-500",
                // startContent: "bg-signoz_robin-500"
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-signoz_robin-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
              renderValue={({ children, ...props }) => (
                <output {...props}>
                  <Tooltip
                    className="text-tiny text-default-500 rounded-md"
                  >
                    <input
                      className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                      type="text"
                      value={inputTracesValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = e.target.value;
                        setinputTracesValue(v);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && !isNaN(Number(inputTracesValue))) {
                          setTracesValue(Number(inputTracesValue));
                        }
                      }}
                    />
                  </Tooltip>
                </output>
              )}
              value={tracesValue}
              onChange={handleChangeTraces}
            />

          </div>

          <div className="p-2 metrics-background text-right text-signoz_vanilla-400">{formatBytes(tracesValue)}</div>
          <div className="p-2 metrics-background text-right">${formatNumber(tracesSubtotal)}</div>

          <div className="flex p-2 gap-2 metrics-background items-center">
            <img src="/img/index_features/logs.svg" alt="Logs Icon" className="w-6 h-6" />
            Logs
          </div>
          <span className="flex items-center justify-left gap-1 metrics-background">
            <span className="text-base font-medium text-signoz_sakura-400">
              ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
            </span>
            /GB
          </span>
          <div className="flex metrics-background items-center">
            <select
              className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
              value={logsRetentionPeriod}
              onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`${option.days}-${idx}`} value={option.days}>
                  {`${option.days} days`}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center metrics-background'>
            <Slider
              size="sm"
              step={0.01}
              maxValue={200 * 1024}
              minValue={0}
              color="danger"
              marks={[
                {
                  value: 0,
                  label: "0GB",
                },
                {
                  value: 204800,
                  label: "200TB",
                },
              ]}
              classNames={{
                base: "max-w-md",
                label: "text-medium",
                // filler: "bg-signoz_sakura-500"
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-signoz_sakura-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
              renderValue={({ children, ...props }) => (
                <output {...props}>
                  <Tooltip
                    className="text-tiny text-default-500 rounded-md"
                  >
                    <input
                      className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                      type="text"
                      value={inputLogsValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = e.target.value;
                        setinputLogsValue(v);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && !isNaN(Number(inputLogsValue))) {
                          setLogsValue(Number(inputLogsValue));
                        }
                      }}
                    />
                  </Tooltip>
                </output>
              )}
              value={logsValue}
              onChange={handleChangeLogs}
            />

          </div>

          <div className="p-2 metrics-background text-right text-signoz_vanilla-400">{formatBytes(logsValue)}</div>
          <div className="p-2 metrics-background text-right">${formatNumber(logsSubtotal)}</div>

          <div className="flex p-2 gap-2 metrics-background items-center">
            <img src="/img/index_features/bar-chart-2.svg" alt="Logs Icon" className="w-6 h-6" />
            Metrics
          </div>
          <span className="flex items-center justify-left gap-1 metrics-background">
            <span className="text-base font-medium text-signoz_amber-400">
              ${METRICS_PRICES[metricsRetentionPeriod]}
            </span>
            / mn samples
          </span>
          <div className="flex metrics-background items-center">
            <select
              className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
              value={metricsRetentionPeriod}
              onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.METRICS.map((option, idx) => (
                <option key={`${option.months}-${idx}`} value={option.months}>
                  {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center metrics-background'>
            <Slider
              size="sm"
              step={0.01}
              maxValue={200 * 1000}
              minValue={0}
              color="warning"
              marks={[
                {
                  value: 0,
                  label: "0M",
                },
                {
                  value: 200000,
                  label: "200B",
                },
              ]}
              classNames={{
                base: "max-w-md",
                label: "text-medium",
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-signoz_amber-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
              renderValue={({ children, ...props }) => (
                <output {...props}>
                  <Tooltip
                    className="text-tiny text-default-500 rounded-md"
                  >
                    <input
                      className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                      type="text"
                      value={inputMetricsValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = e.target.value;
                        setinputMetricsValue(v);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && !isNaN(Number(inputMetricsValue))) {
                          setMetricsValue(Number(inputMetricsValue));
                        }
                      }}
                    />
                  </Tooltip>
                </output>
              )}
              value={metricsValue}
              onChange={handleChangeMetrics}
            />
          </div>

          <div className="p-2 metrics-background text-right text-signoz_vanilla-400">{formatMetrics(metricsValue)}</div>
          <div className="p-2 metrics-background text-right">${formatNumber(metricsSubtotal)}</div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 button-background px-3 py-4 border border-transparent rounded-md">
          <span className="text-signoz_vanilla-100 text-base font-medium">
            Monthly estimate for usage-based plan
          </span>
          <div className="w-3/5 border-b border-signoz_slate-400 border-dashed" />
          <div>${formatNumber(totalEstimate)}</div>
        </div>
        <div className={`flex justify-between items-center mt-3 mb-6 px-3 py-4 bg-[#4E74F81A] border border-dashed rounded-md ${isHighVolume ? 'border-signoz_robin-500' : 'border-transparent'}`}>
          <span className="text-signoz_vanilla-100 text-base font-medium">
            Reach out to us for custom pricing and retention for high volume
          </span>
          <div className="w-2/5 border-b border-signoz_slate-400 border-dashed" />
          <Link href={'/enterprise/'}>
            <Button className="w-full">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MonthlyEstimate;

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Slider, Tooltip } from "@nextui-org/react";
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button/Button';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    window.location.hash = `#${id}`;
  }
};

const useHash = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    setHash(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return hash;
};

const formatNumber = (number) => number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 });

const formatBytes = (size) => {
  if (size < 1000) {
    return `${formatNumber(size)} GB`;
  }
  return `${formatNumber(size / 1000)} TB`;
};

const formatMetrics = (size) => {
  if (size < 1000) {
    return `${formatNumber(size)} mn`;
  }
  return `${formatNumber(size / 1000)} bn`;
};

const linearToLog = (value, minLog, maxLog) => {
  const minValue = Math.log(minLog);
  const maxValue = Math.log(maxLog);
  const scale = (maxValue - minValue) / (maxLog - minLog);
  return Math.floor(Math.exp(minValue + scale * (value - minLog)));
};

const logToLinear = (value, minLog, maxLog) => {
  const minValue = Math.log(minLog);
  const maxValue = Math.log(maxLog);
  const scale = (maxLog - minLog) / (maxValue - minValue);
  return Math.floor(minLog + scale * (Math.log(value) - minValue));
};

const MobileEstimate = () => {
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

  const [tracesValue, setTracesValue] = useState(0);
  const [inputTracesValue, setInputTracesValue] = useState("0");

  const [logsValue, setLogsValue] = useState(0);
  const [inputLogsValue, setInputLogsValue] = useState("0");

  const [metricsValue, setMetricsValue] = useState(0);
  const [inputMetricsValue, setInputMetricsValue] = useState("0");

  const MIN_VALUE = 1;
  const MAX_VALUE = 200000;

  const handleChangeTraces = (value) => {
    if (isNaN(Number(value))) return;
    setTracesValue(value);
    setInputTracesValue(linearToLog(value, MIN_VALUE, MAX_VALUE).toString());
  };

  const handleChangeLogs = (value) => {
    if (isNaN(Number(value))) return;
    setLogsValue(value);
    setInputLogsValue(linearToLog(value, MIN_VALUE, MAX_VALUE).toString());
  };

  const handleChangeMetrics = (value) => {
    if (isNaN(Number(value))) return;
    setMetricsValue(value);
    setInputMetricsValue(linearToLog(value, MIN_VALUE, MAX_VALUE).toString());
  };

  const getPricePerUnit = (type, retentionPeriod) => {
    if (type === 'metrics') {
      return METRICS_PRICES[retentionPeriod];
    } else {
      return TRACES_AND_LOGS_PRICES[retentionPeriod];
    }
  };

  const calculateSubtotal = (type, value, retentionPeriod) => {
    const pricePerUnit = getPricePerUnit(type, retentionPeriod);
    const estimatedUsage = linearToLog(value, MIN_VALUE, MAX_VALUE);
    return Number(pricePerUnit) * Number(estimatedUsage);
  };

  const tracesSubtotal = calculateSubtotal('traces', tracesValue, tracesRetentionPeriod);
  const logsSubtotal = calculateSubtotal('logs', logsValue, logsRetentionPeriod);
  const metricsSubtotal = calculateSubtotal('metrics', metricsValue, metricsRetentionPeriod);

  const totalEstimate = Math.max(199, tracesSubtotal + logsSubtotal + metricsSubtotal);

  const isHighVolume = totalEstimate >= 2500;

  const [activeTab, setActiveTab] = useState('traces');

  const hash = useHash();

  useEffect(() => {
    const section = hash.replace("#", "");
    if (section) scrollToSection(section);
  }, [hash]);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText("https://signoz.io/pricing/#estimate-your-monthly-bill");
  };

  return (
    <section id="estimate-your-monthly-bill">
      <div className="section-container w-[90vw] mx-[auto] border border-signoz_slate-400 border-dashed">
        <div className="flex flex-col gap-2 pt-6">
          <span className="text-signoz_vanilla-100 text-2xl font-semibold font-semibold pl-1 relative group">
            Estimate your monthly bill
            <a href="#estimate-your-monthly-bill" onClick={copyLinkToClipboard} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
          </span>
          <span className="text-signoz_vanilla-400 text-sm pl-1 mb-4">
            You can also set data ingestion limits so you never get a surprise bill.
            <Link href={"https://signoz.io/docs/ingestion/signoz-cloud/keys/"} className="text-signoz_robin-400 font-medium ml-1">
              Learn more
              <ArrowUpRight className="inline" size={16} />
            </Link>
          </span>
        </div>

        <div className="tabs flex gap-2 justify-between mt-4">
          <button
            className={`tab text-signoz_vanilla-400 p-1 flex gap-2 items-center justify-center font-normal text-base w-full ${activeTab === 'traces' ? '!text-signoz_vanilla-100 bg-signoz_ink-400 rounded-md' : ''}`}
            onClick={() => setActiveTab('traces')}

          >
            {activeTab === 'traces' ? (
              <img src="/img/index_features/drafting-compass.svg" alt="Compass Icon" className="w-4 h-4" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M8.83382 4.66667C9.5702 4.66667 10.1672 4.06971 10.1672 3.33333C10.1672 2.59695 9.5702 2 8.83382 2C8.09744 2 7.50049 2.59695 7.50049 3.33333C7.50049 4.06971 8.09744 4.66667 8.83382 4.66667Z" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.8335 14L8.18016 4.49329" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.49365 4.49329L10.7803 6.78662" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5003 8C10.9203 10.6667 6.74699 10.6667 4.16699 8" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.8336 13.9999L13.3936 11.4399" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            )}
            Traces
          </button>
          <button
            className={`tab text-signoz_vanilla-400 p-1 flex gap-2 items-center justify-center font-normal text-base w-full ${activeTab === 'logs' ? '!text-signoz_vanilla-100 bg-signoz_ink-400 rounded-md' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            {activeTab === 'logs' ? (
              <img src="/img/index_features/logs.svg" alt="logs Icon" className="w-4 h-4" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M3.8335 3.66675L3.8335 12.6667" stroke="#C0C1C3" stroke-width="1.33333" />
                <ellipse cx="7.8335" cy="3.66667" rx="4" ry="1.66667" stroke="#C0C1C3" stroke-width="1.33333" />
                <ellipse cx="7.8335" cy="3.61674" rx="1" ry="0.416667" fill="#C0C1C3" />
                <path d="M11.8335 12.6667C11.8335 13.4031 10.0426 14.0001 7.8335 14.0001C5.62436 14.0001 3.8335 13.4031 3.8335 12.6667" stroke="#C0C1C3" stroke-width="1.33333" />
                <path d="M6.5 7.33337V8.61023C6.5 8.64282 6.52356 8.67063 6.55571 8.67599L8.44429 8.99076C8.47644 8.99611 8.5 9.02393 8.5 9.05652V11.3334" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" />
                <path d="M11.8335 3.66675V7.21313C11.8335 7.26549 11.8911 7.29742 11.9355 7.26966L14.4224 5.71535C14.4608 5.69136 14.5114 5.71179 14.5224 5.75572L14.8249 6.96568C14.8303 6.98719 14.8246 7.00996 14.8098 7.02644L11.8506 10.3144C11.8396 10.3266 11.8335 10.3425 11.8335 10.359V12.6667" stroke="#C0C1C3" stroke-width="1.33333" />
              </svg>
            )}
            Logs
          </button>
          <button
            className={`tab text-signoz_vanilla-400 p-1 flex gap-2 items-center justify-center font-normal text-base w-full ${activeTab === 'metrics' ? '!text-signoz_vanilla-100 bg-signoz_ink-400 rounded-md' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            {activeTab === 'metrics' ? (
              <img src="/img/index_features/bar-chart-2.svg" alt="Metrics Icon" className="w-4 h-4" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M12.167 13.3333V6.66663" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.16699 13.3333V2.66663" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.16699 13.3333V9.33325" stroke="#C0C1C3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            )}
            Metrics
          </button>
        </div>

        {activeTab === 'traces' && (
          <div className="pt-6 pb-0 px-3">
            <div className="mb-4 flex justify-between uppercase">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Pricing per unit</span>
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Retention</span>
            </div>
            <div className="mb-6 flex justify-between">
              <div className="text-signoz_robin-400">${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}/GB</div>
              <div>
                <select
                  className="block w-32 h-[32px] rounded-sm border border-signoz_slate-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500"
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
            </div>
            <div className="mb-2">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px] uppercase">Scale of ingestion (per month)</span>
              <Slider
                className='mt-4'
                size="sm"
                step={0.01}
                maxValue={MAX_VALUE}
                minValue={MIN_VALUE}
                showTooltip={true}
                tooltipProps={{
                  content: formatBytes(linearToLog(tracesValue, MIN_VALUE, MAX_VALUE))
                }}
                color="secondary"
                marks={[
                  { value: MIN_VALUE, label: "0GB" },
                  { value: MAX_VALUE, label: "200TB" },
                ]}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-signoz_robin-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
                value={tracesValue}
                onChange={handleChangeTraces}
              />
            </div>
            <div className="mb-4 mt-0 pt-6 flex justify-between uppercase">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Estimated usage</span>
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Subtotal</span>
            </div>
            <div className="mb-6 flex justify-between items-center uppercase">
              <div className="text-base text-signoz_vanilla-400">{formatBytes(linearToLog(tracesValue, MIN_VALUE, MAX_VALUE))}</div>
              <div className="w-[65%] border-b border-dashed border-signoz_slate-400"></div>
              <div className="text-signoz_vanilla-100">${formatNumber(tracesSubtotal)}</div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="pt-6 pb-0 px-3">
            <div className="mb-4 flex justify-between uppercase">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Pricing per unit</span>
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Retention</span>
            </div>
            <div className="mb-6 flex justify-between">
              <div className="text-signoz_sakura-400">${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}/GB</div>
              <div>
                <select
                  className="block w-32 h-[32px] rounded-sm border border-signoz_slate-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500"
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
            </div>
            <div className="mb-2">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px] uppercase">Scale of ingestion (per month)</span>
              <Slider
                className='mt-4'
                size="sm"
                step={0.01}
                maxValue={MAX_VALUE}
                minValue={MIN_VALUE}
                showTooltip={true}
                tooltipProps={{
                  content: formatBytes(linearToLog(logsValue, MIN_VALUE, MAX_VALUE))
                }}
                color="danger"
                marks={[
                  { value: MIN_VALUE, label: "0GB" },
                  { value: MAX_VALUE, label: "200TB" },
                ]}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-signoz_sakura-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
                value={logsValue}
                onChange={handleChangeLogs}
              />
            </div>
            <div className="mb-4 mt-0 pt-6 flex justify-between uppercase">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Estimated usage</span>
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Subtotal</span>
            </div>
            <div className="mb-6 flex justify-between items-center uppercase">
              <div className="text-base text-signoz_vanilla-400">{formatBytes(linearToLog(logsValue, MIN_VALUE, MAX_VALUE))}</div>
              <div className="w-[65%] border-b border-dashed border-signoz_slate-400"></div>
              <div className="text-signoz_vanilla-100">${formatNumber(logsSubtotal)}</div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="pt-6 pb-0 px-3">
            <div className="mb-4 flex justify-between uppercase">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Pricing per unit</span>
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Retention</span>
            </div>
            <div className="mb-6 flex justify-between">
              <div className="text-signoz_amber-400">${METRICS_PRICES[metricsRetentionPeriod]}/mn samples</div>
              <div>
                <select
                  className="block w-32 h-[32px] rounded-sm border border-signoz_slate-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500"
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
            </div>
            <div className="mb-2">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px] uppercase">Scale of ingestion (per month)</span>
              <Slider
                className='mt-4'
                size="sm"
                step={0.01}
                maxValue={MAX_VALUE}
                minValue={MIN_VALUE}
                showTooltip={true}
                tooltipProps={{
                  content: formatMetrics(linearToLog(metricsValue, MIN_VALUE, MAX_VALUE))
                }}
                color="warning"
                marks={[
                  { value: MIN_VALUE, label: "0M" },
                  { value: MAX_VALUE, label: "200B" },
                ]}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-signoz_amber-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
                value={metricsValue}
                onChange={handleChangeMetrics}
              />
            </div>
            <div className="mb-4 mt-0 pt-6 flex justify-between uppercase">
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Estimated usage</span>
              <span className="text-signoz_vanilla-400 font-semibold text-[13px]">Subtotal</span>
            </div>
            <div className="mb-6 flex justify-between items-center uppercase">
              <div className="text-base text-signoz_vanilla-400">{formatMetrics(linearToLog(metricsValue, MIN_VALUE, MAX_VALUE))}</div>
              <div className="w-[65%] border-b border-dashed border-signoz_slate-400"></div>
              <div className="text-signoz_vanilla-100">${formatNumber(metricsSubtotal)}</div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6 pt-4 px-3 py-4 button-background rounded-md">
          <span className="text-signoz_vanilla-100 text-base font-medium">
            Monthly estimate
          </span>
          <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
          <div className="text-signoz_vanilla-100">${formatNumber(totalEstimate)}</div>
        </div>

        <div className={`flex flex-col justify-between items-center mt-3 mb-6 px-4 py-3 gap-4 bg-[#4E74F81A] border border-dashed rounded-md ${isHighVolume ? 'border-signoz_robin-500' : 'border-transparent'}`}>
          <span className="text-signoz_robin-400 text-base font-medium">
            Reach out to us for custom pricing and retention for high volume
          </span>
          <Button id="btn-contact-us-pricing-monthly-estimate" className="w-full">
            <Link href={'https://share.hsforms.com/1AZy88ajlRsCPZUP0kSMb2gda5af'} className='flex-center'>
              Contact us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobileEstimate;

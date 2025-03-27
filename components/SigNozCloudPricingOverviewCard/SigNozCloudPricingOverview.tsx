'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import Button from '@/components/Button/Button';
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react';
import VimeoPlayer from '@/components/VimeoPlayer/VimeoPlayer';
import TrackingLink from '../TrackingLink';
import TrackingButton from '../TrackingButton';

interface SigNozCloudPricingOverviewProps {
  className?: string;
}

interface TracesAndLogsRetention {
  days: number;
  price: number;
}

interface MetricsRetention {
  months: number;
  price: number;
}

const SigNozCloudPricingOverview: React.FC<SigNozCloudPricingOverviewProps> = ({ className = '' }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const RETENTION_PERIOD = {
    TRACES_AND_LOGS: [
      { days: 15, price: 0.3 },
      { days: 30, price: 0.4 }, 
      { days: 90, price: 0.6 },
      { days: 180, price: 0.8 }
    ] as TracesAndLogsRetention[],
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 }
    ] as MetricsRetention[]
  };

  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(RETENTION_PERIOD.TRACES_AND_LOGS[0].days);
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(RETENTION_PERIOD.TRACES_AND_LOGS[0].days);
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(RETENTION_PERIOD.METRICS[0].months);

  const getPrice = (type: 'TRACES_AND_LOGS' | 'METRICS', period: number) => {
    const prices = RETENTION_PERIOD[type];
    if (type === 'TRACES_AND_LOGS') {
      const price = (prices as TracesAndLogsRetention[]).find(p => p.days === period);
      return price?.price || prices[0].price;
    } else {
      const price = (prices as MetricsRetention[]).find(p => p.months === period);
      return price?.price || prices[0].price;
    }
  };

  return (
    <div className={`py-4 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Top features section */}
        <div className="flex items-center gap-4 justify-between font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-signoz_vanilla-400 text-base">No user-based pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-signoz_vanilla-400 text-base">No host-based pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-signoz_vanilla-400 text-base">No special pricing for custom metrics</span>
          </div>
        </div>

        {/* Get Started button */}
        <div className="flex justify-left items-center my-6">
          <TrackingLink id='pricing-page-get-started-card-cta' href="/teams" clickType="Primary CTA" clickName="Sign Up Button" clickLocation="Pricing Overview Card" clickText="Get Started - Free">
            <Button className="flex items-center justify-center gap-2 font-bold">
              Get Started - Free <ArrowRight className="h-4 w-4" />
            </Button>
          </TrackingLink>
          <button id='pricing-page-estimate-your-monthly-bill-card-cta' className="opacity-80 px-4 py-2 text-signoz_robin-300 hover:text-signoz_robin-400 bg-transparent transition-colors duration-200">
            <TrackingLink id='pricing-page-estimate-your-monthly-bill-card-cta' href="#estimate-your-monthly-bill" clickType="Secondary CTA" clickName="Pricing Calculator Button" clickLocation="Pricing Overview Card" clickText="Estimate Your Monthly Bill" className="flex items-center justify-center">
              Estimate Your Monthly Bill
              <ArrowRight className="ml-2 h-4 w-4" />
            </TrackingLink>
          </button>
        </div>

        {/* Pricing info */}
        <div className="text-center text-sm text-signoz_vanilla-400 flex items-center gap-4">
          <div className="flex-1 border-t border-dashed border-gray-500"></div>
          <div>
            <p className="mb-1">Starts at $199/month</p>
            <p className="text-xs opacity-75 mb-0">
              <TrackingButton 
                onClick={onOpen} 
                className="text-signoz_robin-300 hover:text-signoz_robin-400"
                clickType="Info Button"
                clickName="Pricing Video Modal Button"
                clickLocation="Pricing Overview Card"
                clickText="Check what comes included in $199"
              >
                Check what comes included in $199 <ArrowUpRight size={16} className="inline" />
              </TrackingButton>
            </p>
          </div>
          <div className="flex-1 border-t border-dashed border-gray-500"></div>
        </div>

        <Modal
          size={'5xl'}
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="self-center"
        >
          <ModalContent className="bg-transparent">
            {() => (
              <ModalBody className="py-6">
                <VimeoPlayer videoId="968489758" />
                <p className="text-center text-signoz_vanilla-400 mt-4 mb-0">
                  Note: Usage-based pricing applies after crossing the $199 mark
                </p>
                <div className="flex justify-center">
                  <TrackingButton
                    onClick={() => {
                      onOpenChange();
                      document.getElementById('estimate-your-monthly-bill')?.scrollIntoView({behavior: 'smooth'});
                    }}
                    clickType="In Video CTA"
                    clickName="Pricing Calculator Button"
                    clickLocation="Pricing Overview Card Video Modal"
                    clickText="Estimate Your Monthly Bill"
                    className="text-signoz_robin-300 hover:text-signoz_robin-400 flex items-center gap-2"
                  >
                    Estimate Your Monthly Bill
                    <ArrowRight className="h-4 w-4" />
                  </TrackingButton>
                </div>
              </ModalBody>
            )}
          </ModalContent>
        </Modal>

        {/* Telemetry types */}
        <div className="flex items-center justify-between mt-4 mb-8">
          <div className="text-left">
            <h4 className="font-medium text-xl mb-1">Logs</h4>
            <p className="text-sm text-gray-400 mb-0">${getPrice('TRACES_AND_LOGS', logsRetentionPeriod)}/GB ingested</p>
            <span className="text-sm text-gray-400 border-b border-gray-400 cursor-pointer relative">
              {logsRetentionPeriod} days retention
              <select
                value={logsRetentionPeriod}
                onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                className="absolute opacity-0 cursor-pointer w-max h-full left-0 top-0 z-10"
              >
                {RETENTION_PERIOD.TRACES_AND_LOGS.map(({days}) => (
                  <option key={days} value={days}>{days} days retention</option>
                ))}
              </select>
            </span>
          </div>
          <div className="w-16 border-t border-dashed border-gray-600"></div>
          <div className="text-left">
            <h4 className="font-medium text-xl mb-1">Traces</h4>
            <p className="text-sm text-gray-400 mb-0">${getPrice('TRACES_AND_LOGS', tracesRetentionPeriod)}/GB ingested</p>
            <span className="text-sm text-gray-400 border-b border-gray-400 cursor-pointer relative">
              {tracesRetentionPeriod} days retention
              <select
                value={tracesRetentionPeriod}
                onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                className="absolute opacity-0 cursor-pointer w-max h-full left-0 top-0 z-10"
              >
                {RETENTION_PERIOD.TRACES_AND_LOGS.map(({days}) => (
                  <option key={days} value={days}>{days} days retention</option>
                ))}
              </select>
            </span>
          </div>
          <div className="w-16 border-t border-dashed border-gray-600"></div>
          <div className="text-left">
            <h4 className="font-medium text-xl mb-1">Metrics</h4>
            <p className="text-sm text-gray-400 mb-0">${getPrice('METRICS', metricsRetentionPeriod)}/mil samples</p>
            <span className="text-sm text-gray-400 border-b border-gray-400 cursor-pointer relative">
              {metricsRetentionPeriod} month{metricsRetentionPeriod > 1 ? 's' : ''} retention
              <select
                value={metricsRetentionPeriod}
                onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                className="absolute opacity-0 cursor-pointer w-max h-full left-0 top-0 z-10"
              >
                {RETENTION_PERIOD.METRICS.map(({months}) => (
                  <option key={months} value={months}>{months} month{months > 1 ? 's' : ''} retention</option>
                ))}
              </select>
            </span>
          </div>
        </div>

        {/* Bottom link */}
        <div className="text-center text-sm">
          <p className="text-signoz_vanilla-400">
            Tired of unpredictable pricing and complex billing structure? Save up to{' '}
            <TrackingLink 
              href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/" 
              className="text-signoz_robin-500 hover:underline"
              clickType="Nav Click"
              clickName="Pricing Comparison Blog Link"
              clickLocation="Pricing Overview Card"
              clickText="80% on your Datadog bill"
            >
              80% on your Datadog bill
            </TrackingLink>{' '}
            with SigNoz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigNozCloudPricingOverview;

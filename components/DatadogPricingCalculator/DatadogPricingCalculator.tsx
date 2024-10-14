'use client'

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const DatadogPricingCalculator = () => {
  const [logPlan, setLogPlan] = useState('ingestion');
  const [logVolume, setLogVolume] = useState(100);
  const [apmPlan, setApmPlan] = useState('apm');
  const [apmHosts, setApmHosts] = useState(10);
  const [infraPlan, setInfraPlan] = useState('pro');
  const [infraHosts, setInfraHosts] = useState(20);
  const [totalCost, setTotalCost] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');

  const calculateCost = () => {
    let logCost = 0;
    let apmCost = 0;
    let infraCost = 0;

    // Log cost calculation
    // Assuming 15 day retention and no on-demand usage
    switch (logPlan) {
      case 'ingestion':
        logCost = logVolume * 0.10;
        break;
      case 'standardIndexing':
        logCost = (logVolume / 1) * 1.70;
        break;
      case 'flexStorage':
        logCost = (logVolume / 1) * 0.05;
        break;
      case 'flexLogsStarter':
        logCost = (logVolume / 1) * 0.60;
        break;
    }

    // APM cost calculation
    switch (apmPlan) {
      case 'apm':
        apmCost = apmHosts * 31;
        break;
      case 'apmPro':
        apmCost = apmHosts * 35;
        break;
      case 'apmEnterprise':
        apmCost = apmHosts * 40;
        break;
      case 'apmDevSecOps':
        apmCost = apmHosts * 36;
        break;
      case 'apmDevSecOpsPro':
        apmCost = apmHosts * 40;
        break;
      case 'apmDevSecOpsEnterprise':
        apmCost = apmHosts * 45;
        break;
    }

    // Infrastructure cost calculation
    switch (infraPlan) {
      case 'pro':
        infraCost = infraHosts * 15;
        break;
      case 'enterprise':
        infraCost = infraHosts * 23;
        break;
    }

    setTotalCost(logCost + apmCost + infraCost);
  };

  useEffect(() => {
    calculateCost();
  }, [logPlan, logVolume, apmPlan, apmHosts, infraPlan, infraHosts]);

  const chartData = [
    { name: 'Logs', value: (totalCost * (logVolume / (logVolume + apmHosts + infraHosts))) },
    { name: 'APM', value: (totalCost * (apmHosts / (logVolume + apmHosts + infraHosts))) },
    { name: 'Infrastructure', value: (totalCost * (infraHosts / (logVolume + apmHosts + infraHosts))) },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<any> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-gray-900 p-2 rounded shadow">
          <p className="font-bold">{`${payload[0].name}: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 mt-2">Datadog Pricing Calculator</h2>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 pr-4">
          <div className="mb-6">
            <h3 className="text-xl mb-2">Log Monitoring</h3>
            <p className="text-sm mb-2">Assuming 15 day retention and no on-demand usage</p>
            <div className="flex flex-wrap gap-4 mb-2">
              {[
                { value: 'ingestion', label: 'Ingestion', unit: 'GB', description: 'Starting at $0.10 per ingested or scanned GB per month (billed annually or $0.10 on-demand). Ingest, process, enrich, live tail, and archive all your logs with out-of-the-box parsing for 200+ log sources.' },
                { value: 'standardIndexing', label: 'Standard Indexing', unit: 'million events', description: '$1.70 per million log events per month (billed annually or $2.55 on-demand). Offers 15-day retention for real-time exploration, alerting, and dashboards with mission-critical logs.' },
                { value: 'flexStorage', label: 'Flex Storage', unit: 'million events', description: 'Starting at $0.05 per million events stored per month (billed annually or $0.075 on-demand). Flexible long-term retention up to 15 months for historical investigations or security, audit, and compliance use cases.' },
                { value: 'flexLogsStarter', label: 'Flex Logs Starter', unit: 'million events', description: 'Starting at $0.60 per million events stored per month (billed annually or $0.90 on-demand). Retention options of 6, 12, or 15 months for long-term log retention without the need to rehydrate.' }
              ].map((plan) => (
                <div key={plan.value} className="relative">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value={plan.value}
                      checked={logPlan === plan.value}
                      onChange={(e) => setLogPlan(e.target.value)}
                      className="mr-2"
                    />
                    <span>{plan.label}</span>
                    <Info 
                      className="ml-1 text-blue-400 cursor-pointer" 
                      size={16}
                      onMouseEnter={() => setShowTooltip(plan.value)}
                      onClick={() => setShowTooltip(showTooltip === plan.value ? '' : plan.value)}
                    />
                  </label>
                  {showTooltip === plan.value && (
                    <div 
                      className="absolute left-0 mt-2 p-4 bg-gray-800 text-white rounded shadow-lg z-10 w-64 sm:w-80"
                      onMouseEnter={() => setShowTooltip(plan.value)}
                      onMouseLeave={() => setShowTooltip('')}
                    >
                      <p className="text-sm">{plan.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max={logPlan === 'ingestion' ? 1000 : 100}
              value={logVolume}
              onChange={(e) => setLogVolume(Number(e.target.value))}
              className="w-full mb-2"
            />
            <p>Log Volume: <input 
              type="number" 
              value={logVolume} 
              onChange={(e) => setLogVolume(Number(e.target.value))}
              className="bg-gray-700 text-white p-1 rounded w-20 inline-block"
            /> {logPlan === 'ingestion' ? 'GB' : 'million events'}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-2">APM</h3>
            <div className="flex flex-wrap gap-4 mb-2">
              {[
                { value: 'apm', label: 'APM' },
                { value: 'apmPro', label: 'APM Pro' },
                { value: 'apmEnterprise', label: 'APM Enterprise' },
                { value: 'apmDevSecOps', label: 'APM DevSecOps' },
                { value: 'apmDevSecOpsPro', label: 'APM DevSecOps Pro' },
                { value: 'apmDevSecOpsEnterprise', label: 'APM DevSecOps Enterprise' }
              ].map((plan) => (
                <label key={plan.value} className="flex items-center">
                  <input
                    type="radio"
                    value={plan.value}
                    checked={apmPlan === plan.value}
                    onChange={(e) => setApmPlan(e.target.value)}
                    className="mr-2"
                  />
                  {plan.label}
                </label>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={apmHosts}
              onChange={(e) => setApmHosts(Number(e.target.value))}
              className="w-full mb-2"
            />
            <p>APM Hosts: <input 
              type="number" 
              value={apmHosts} 
              onChange={(e) => setApmHosts(Number(e.target.value))}
              className="bg-gray-700 text-white p-1 rounded w-20 inline-block"
            /></p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-2">Infrastructure Monitoring</h3>
            <div className="flex gap-4 mb-2">
              {['pro', 'enterprise'].map((plan) => (
                <label key={plan} className="flex items-center">
                  <input
                    type="radio"
                    value={plan}
                    checked={infraPlan === plan}
                    onChange={(e) => setInfraPlan(e.target.value)}
                    className="mr-2"
                  />
                  {plan === 'pro' ? 'Pro' : 'Enterprise'}
                </label>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={infraHosts}
              onChange={(e) => setInfraHosts(Number(e.target.value))}
              className="w-full mb-2"
            />
            <p>Infrastructure Hosts: <input 
              type="number" 
              value={infraHosts} 
              onChange={(e) => setInfraHosts(Number(e.target.value))}
              className="bg-gray-700 text-white p-1 rounded w-20 inline-block"
            /></p>
          </div>
        </div>

        <div className="md:w-1/3 pl-4">
          <div className="mb-6">
            <h3 className="text-xl mb-2">Total Estimated Cost</h3>
            <p className="text-3xl font-bold">${totalCost.toFixed(2)} / month</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatadogPricingCalculator;

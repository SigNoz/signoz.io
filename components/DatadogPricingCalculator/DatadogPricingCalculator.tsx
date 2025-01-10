'use client'

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const DatadogPricingCalculator = () => {
  const [activeTab, setActiveTab] = useState('logs');
  const [logPlan, setLogPlan] = useState('ingestion');
  const [logVolume, setLogVolume] = useState(300);
  const [apmPlan, setApmPlan] = useState('apm');
  const [apmHosts, setApmHosts] = useState(1);
  const [infraPlan, setInfraPlan] = useState('pro');
  const [infraHosts, setInfraHosts] = useState(2);
  const [totalCost, setTotalCost] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  const calculateCost = () => {
    let logCost = 0;
    let apmCost = 0;
    let infraCost = 0;

    // Log cost calculation
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

    return { logCost, apmCost, infraCost }; // Only return the costs
  };

  const [costs, setCosts] = useState({ logCost: 0, apmCost: 0, infraCost: 0 });

  useEffect(() => {
    const newCosts = calculateCost();
    setCosts(newCosts);
    setTotalCost(newCosts.logCost + newCosts.apmCost + newCosts.infraCost);
  }, [logPlan, logVolume, apmPlan, apmHosts, infraPlan, infraHosts]);

  const chartData = [
    { name: 'Logs', value: costs.logCost },
    { name: 'APM', value: costs.apmCost },
    { name: 'Infrastructure', value: costs.infraCost },
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'logs':
        return (
          <div className="my-12">
            <div className="flex flex-wrap gap-2 mb-2">
              {[
                { value: 'ingestion', label: 'Ingestion' },
                { value: 'standardIndexing', label: 'Standard Indexing' },
                { value: 'flexStorage', label: 'Flex Storage' },
                { value: 'flexLogsStarter', label: 'Flex Logs Starter' }
              ].map((plan) => (
                <label key={plan.value} className="inline-flex items-center mr-3">
                  <input
                    type="radio"
                    value={plan.value}
                    checked={logPlan === plan.value}
                    onChange={(e) => setLogPlan(e.target.value)}
                    className="mr-1"
                  />
                  <span className="text-sm">{plan.label}</span>
                </label>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max={logPlan === 'ingestion' ? 1000 : 100}
              value={logVolume}
              onChange={(e) => setLogVolume(Number(e.target.value))}
              className="w-full my-2"
            />
            <p className="text-sm">Log Volume: 
              <input 
                type="number" 
                value={logVolume} 
                onChange={(e) => setLogVolume(Number(e.target.value))}
                className="bg-transparent p-0 border-0 border-b border-white w-24 mx-2 text-center focus:outline-none"
              />
              {logPlan === 'ingestion' ? 'GB' : 'million events'}
            </p>
            <p className="text-xs mb-2">(Assuming 15 day retention and no on-demand usage)</p>
          </div>
        );
      case 'apm':
        return (
          <div className="my-12">
            <div className="flex flex-wrap gap-2 mb-2">
              {[
                { value: 'apm', label: 'APM' },
                { value: 'apmPro', label: 'APM Pro' },
                { value: 'apmEnterprise', label: 'APM Enterprise' },
                { value: 'apmDevSecOps', label: 'APM DevSecOps' },
                { value: 'apmDevSecOpsPro', label: 'APM DevSecOps Pro' },
                { value: 'apmDevSecOpsEnterprise', label: 'APM DevSecOps Enterprise' }
              ].map((plan) => (
                <label key={plan.value} className="inline-flex items-center mr-3">
                  <input
                    type="radio"
                    value={plan.value}
                    checked={apmPlan === plan.value}
                    onChange={(e) => setApmPlan(e.target.value)}
                    className="mr-1"
                  />
                  <span className="text-sm">{plan.label}</span>
                </label>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={apmHosts}
              onChange={(e) => setApmHosts(Number(e.target.value))}
              className="w-full my-2"
            />
            <p className="text-sm">APM Hosts: 
              <input 
                type="number" 
                value={apmHosts} 
                onChange={(e) => setApmHosts(Number(e.target.value))}
                className="bg-transparent p-0 border-0 border-b border-white w-24 mx-2 text-center focus:outline-none"
              />
            </p>
            <p className="text-xs mb-2">(Assuming no additional span ingestion.)</p>
          </div>
        );
      case 'infra':
        return (
          <div className="my-12">
            <div className="flex gap-2 mb-2">
              {[
                { value: 'pro', label: 'Pro' },
                { value: 'enterprise', label: 'Enterprise' }
              ].map((plan) => (
                <label key={plan.value} className="inline-flex items-center mr-3">
                  <input
                    type="radio"
                    value={plan.value}
                    checked={infraPlan === plan.value}
                    onChange={(e) => setInfraPlan(e.target.value)}
                    className="mr-1"
                  />
                  <span className="text-sm">{plan.label}</span>
                </label>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={infraHosts}
              onChange={(e) => setInfraHosts(Number(e.target.value))}
              className="w-full my-2"
            />
            <p className="text-sm">Infrastructure Hosts: 
              <input 
                type="number" 
                value={infraHosts} 
                onChange={(e) => setInfraHosts(Number(e.target.value))}
                className="bg-transparent p-0 border-0 border-b border-white w-24 mx-2 text-center focus:outline-none"
              />
            </p>
            <p className="text-xs mb-2">(Assuming no container, custom metric, and custom event usage)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-bold mb-6 mt-0">Datadog Pricing Calculator</h2>
      
      <div className="flex flex-col md:flex-row p-2">
        <div className="md:w-2/3 pr-4">
          <div className="flex mb-4">
            <button
              className={`mr-2 px-3 py-1 text-sm rounded ${activeTab === 'logs' ? 'bg-blue-600' : 'bg-gray-700'}`}
              onClick={() => setActiveTab('logs')}
            >
              Log Monitoring
            </button>
            <button
              className={`mr-2 px-3 py-1 text-sm rounded ${activeTab === 'apm' ? 'bg-blue-600' : 'bg-gray-700'}`}
              onClick={() => setActiveTab('apm')}
            >
              APM
            </button>
            <button
              className={`px-3 py-1 text-sm rounded ${activeTab === 'infra' ? 'bg-blue-600' : 'bg-gray-700'}`}
              onClick={() => setActiveTab('infra')}
            >
              Infrastructure
            </button>
          </div>
          {renderTabContent()}
        </div>

        <div className="md:w-1/3 pl-4">
          <div className="mb-4 h-20">
            <h3 className="text-lg mb-1 mt-0">Total Estimated Cost</h3>
            <p className="text-2xl font-bold my-2">${totalCost.toFixed(2)} / month</p>
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

      <div className="absolute bottom-4 left-4 cursor-pointer" onClick={() => setShowCTA(!showCTA)}>
        <Image className='my-0' src="/img/SigNozLogo-orange.svg" alt="SigNoz Logo" width={40} height={40} />
      </div>

      {showCTA && (
        <div className="absolute bottom-16 py-6 left-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl px-4 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="text-lg font-bold text-white mt-0 mb-2">Ready to Optimize Your Observability Costs?</h3>
          <p className="text-gray-300 text-sm mb-3">
            Discover how SigNoz offers comparable features with significant cost savings.
          </p>
          <a
            href="/product-comparison/signoz-vs-datadog/"
            style={{color: 'white', textDecoration: 'none'}}
            className="inline-block bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Compare SigNoz vs. Datadog
          </a>
        </div>
      )}
    </div>
  );
};

export default DatadogPricingCalculator;

'use client'

import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
}

interface Tool {
  name: string;
  description: string;
  bestFor: string[];
  keyFeatures: string[];
  deployment: string[];
  budget: string[];
  features: string[];
  scale: string[];
  setup: string[];
}

const questions: Question[] = [
  {
    id: 'deployment',
    text: 'What is your preferred deployment model?',
    type: 'single',
    options: ['Self-Hosted/Open-Source', 'SaaS/Cloud-Based', 'No Preference']
  },
  {
    id: 'budget',
    text: 'What is your budget range?',
    type: 'single',
    options: ['Free/Open-Source', 'Cost-Effective', 'Enterprise-Level Budget']
  },
  {
    id: 'features',
    text: 'Which features are essential? (Select all that apply)',
    type: 'multiple',
    options: [
      'APM',
      'Infrastructure Monitoring',
      'Log Management',
      'Distributed Tracing',
      'AI/ML Capabilities',
      'Alerting',
      'Custom Dashboards'
    ]
  },
  {
    id: 'scale',
    text: 'What is your organization size?',
    type: 'single',
    options: ['Small Team/Startup', 'Medium Company', 'Large Enterprise']
  },
  {
    id: 'setup',
    text: 'What is your preference for setup and maintenance?',
    type: 'single',
    options: ['Easy Setup', 'Flexible with Setup Time']
  }
];

const tools: Tool[] = [
  {
    name: 'SigNoz',
    description: 'Open-source observability platform with native OpenTelemetry support',
    bestFor: ['Open-source enthusiasts', 'Cost-conscious teams', 'OpenTelemetry users'],
    keyFeatures: [
      'Full-stack observability',
      'Native OpenTelemetry support',
      'Simple pricing',
      'Columnar database (ClickHouse)',
      'Flexible deployment options',
      'Correlated signals'
    ],
    deployment: ['Self-Hosted/Open-Source', 'SaaS/Cloud-Based'],
    budget: ['Free/Open-Source', 'Cost-Effective'],
    features: [
      'APM',
      'Infrastructure Monitoring',
      'Log Management',
      'Distributed Tracing',
      'Alerting',
      'Custom Dashboards'
    ],
    scale: ['Small Team/Startup', 'Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'New Relic',
    description: 'Comprehensive observability platform with AI-powered analytics',
    bestFor: ['Enterprise teams', 'Full-stack monitoring', 'Cloud-native applications'],
    keyFeatures: [
      'Full-stack observability',
      'AI-powered analytics',
      'Generous free tier',
      'Extensive integrations',
      'User-based pricing'
    ],
    deployment: ['SaaS/Cloud-Based'],
    budget: ['Cost-Effective', 'Enterprise-Level Budget'],
    features: [
      'APM',
      'Infrastructure Monitoring',
      'Log Management',
      'Distributed Tracing',
      'AI/ML Capabilities',
      'Alerting',
      'Custom Dashboards'
    ],
    scale: ['Small Team/Startup', 'Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'Dynatrace',
    description: 'AI-driven observability platform with advanced automation',
    bestFor: ['Large enterprises', 'Complex infrastructures', 'AI-driven analytics'],
    keyFeatures: [
      'AI-powered root cause analysis',
      'Single-agent deployment',
      'Detailed infrastructure monitoring',
      'Automated discovery'
    ],
    deployment: ['SaaS/Cloud-Based'],
    budget: ['Enterprise-Level Budget'],
    features: [
      'APM',
      'Infrastructure Monitoring',
      'Log Management',
      'Distributed Tracing',
      'AI/ML Capabilities',
      'Alerting',
      'Custom Dashboards'
    ],
    scale: ['Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'Grafana',
    description: 'Open-source visualization and analytics platform',
    bestFor: ['Visualization enthusiasts', 'Custom monitoring setups', 'Multi-source data analysis'],
    keyFeatures: [
      'Highly customizable dashboards',
      'Multi-source data support',
      'LGTM stack support',
      'Strong community'
    ],
    deployment: ['Self-Hosted/Open-Source', 'SaaS/Cloud-Based'],
    budget: ['Free/Open-Source', 'Cost-Effective', 'Enterprise-Level Budget'],
    features: [
      'Infrastructure Monitoring',
      'Log Management',
      'Distributed Tracing',
      'Custom Dashboards',
      'Alerting',
      'APM'
    ],
    scale: ['Small Team/Startup', 'Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'LogicMonitor',
    description: 'SaaS-based hybrid observability platform with AIOps',
    bestFor: ['Hybrid environments', 'Enterprise IT', 'Automated operations'],
    keyFeatures: [
      'Dynamic topology mapping',
      'AI-powered anomaly detection',
      'Automated deployment',
      'Hybrid monitoring'
    ],
    deployment: ['SaaS/Cloud-Based'],
    budget: ['Cost-Effective', 'Enterprise-Level Budget'],
    features: [
      'Infrastructure Monitoring',
      'Log Management',
      'AI/ML Capabilities',
      'Alerting',
      'Custom Dashboards',
      'APM'
    ],
    scale: ['Small Team/Startup', 'Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'Splunk',
    description: 'Enterprise-grade observability and security platform',
    bestFor: ['Large enterprises', 'Security-focused teams', 'Big data analysis'],
    keyFeatures: [
      'Powerful search capabilities',
      'Advanced analytics',
      'Strong security features',
      'SIEM functionality'
    ],
    deployment: ['Self-Hosted/Open-Source', 'SaaS/Cloud-Based'],
    budget: ['Cost-Effective', 'Enterprise-Level Budget'],
    features: [
      'APM',
      'Infrastructure Monitoring',
      'Log Management',
      'AI/ML Capabilities',
      'Alerting',
      'Custom Dashboards',
      'Distributed Tracing'
    ],
    scale: ['Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'Sematext',
    description: 'Full-stack monitoring and logging solution',
    bestFor: ['Small to medium teams', 'Quick setup needs', 'Cost-conscious organizations'],
    keyFeatures: [
      'Infrastructure monitoring',
      'Log management',
      'Real-time monitoring',
      'Competitive pricing'
    ],
    deployment: ['SaaS/Cloud-Based'],
    budget: ['Cost-Effective', 'Enterprise-Level Budget'],
    features: [
      'APM',
      'Infrastructure Monitoring',
      'Log Management',
      'Alerting',
      'Custom Dashboards',
      'Distributed Tracing'
    ],
    scale: ['Small Team/Startup', 'Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'AppDynamics',
    description: 'Business-centric application performance monitoring',
    bestFor: ['Enterprise applications', 'Business metrics correlation', 'Deep diagnostics'],
    keyFeatures: [
      'Deep code-level diagnostics',
      'Business metrics correlation',
      'Full-stack visibility',
      'AI/ML capabilities'
    ],
    deployment: ['SaaS/Cloud-Based'],
    budget: ['Cost-Effective', 'Enterprise-Level Budget'],
    features: [
      'APM',
      'Infrastructure Monitoring',
      'Log Management',
      'Distributed Tracing',
      'AI/ML Capabilities',
      'Alerting',
      'Custom Dashboards'
    ],
    scale: ['Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  },
  {
    name: 'Sumo Logic',
    description: 'Cloud-native observability and security platform',
    bestFor: ['Cloud-native organizations', 'Security-focused teams', 'Log analysis'],
    keyFeatures: [
      'Real-time monitoring',
      'Advanced log analysis',
      'Integrated SIEM',
      'Machine learning analytics'
    ],
    deployment: ['SaaS/Cloud-Based'],
    budget: ['Cost-Effective', 'Enterprise-Level Budget'],
    features: [
      'Infrastructure Monitoring',
      'Log Management',
      'AI/ML Capabilities',
      'Alerting',
      'Custom Dashboards',
      'APM',
      'Distributed Tracing'
    ],
    scale: ['Small Team/Startup', 'Medium Company', 'Large Enterprise'],
    setup: ['Easy Setup', 'Flexible with Setup Time']
  }
];

const DatadogAlternativeFinder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [results, setResults] = useState<Tool[]>([]);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateResults = () => {
    let matchedTools = tools;

    // Filter by deployment if preference specified
    if (answers.deployment && answers.deployment !== 'No Preference') {
      matchedTools = matchedTools.filter(tool => 
        tool.deployment.includes(answers.deployment as string)
      );
    }

    // Filter by budget
    if (answers.budget) {
      matchedTools = matchedTools.filter(tool => 
        tool.budget.includes(answers.budget as string)
      );
    }

    // Filter by features (require at least 50% match)
    if (answers.features) {
      const requestedFeatures = answers.features as string[];
      matchedTools = matchedTools.filter(tool => {
        const matchedFeatures = requestedFeatures.filter(f => tool.features.includes(f));
        return matchedFeatures.length / requestedFeatures.length >= 0.5;
      });
    }

    // Filter by scale
    if (answers.scale) {
      matchedTools = matchedTools.filter(tool => 
        tool.scale.includes(answers.scale as string)
      );
    }

    // If no matches found, return top 3 most flexible tools
    if (matchedTools.length === 0) {
      matchedTools = [tools[0], tools[1], tools[3]]; // SigNoz, New Relic, and Grafana as fallbacks
    }

    setResults(matchedTools);
  };

  return (
    <div className="w-full my-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <p className="text-gray-300 mt-0 mb-6">Tell us your requirements and we will sortlist the top datadog alternatives tailored for your needs</p>
        {currentStep < questions.length ? (
          <div>
            <h3 className="text-xl mt-0 font-semibold mb-4 text-white">{questions[currentStep].text}</h3>
            <div className="space-y-3">
              {questions[currentStep].type === 'single' ? (
                questions[currentStep].options.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      handleAnswer(questions[currentStep].id, option);
                      setCurrentStep(prev => prev + 1);
                      if (currentStep === questions.length - 1) {
                        calculateResults();
                      }
                    }}
                    className="w-full p-3 text-left border border-gray-600 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                  >
                    {option}
                  </button>
                ))
              ) : (
                <>
                  {questions[currentStep].options.map(option => (
                    <label key={option} className="flex items-center space-x-3 text-gray-200">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const currentAnswers = (answers[questions[currentStep].id] as string[]) || [];
                          if (e.target.checked) {
                            handleAnswer(questions[currentStep].id, [...currentAnswers, option]);
                          } else {
                            handleAnswer(
                              questions[currentStep].id,
                              currentAnswers.filter(a => a !== option)
                            );
                          }
                        }}
                        className="form-checkbox text-blue-500"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                  <button
                    onClick={() => {
                      setCurrentStep(prev => prev + 1);
                      if (currentStep === questions.length - 1) {
                        calculateResults();
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Recommended Alternatives</h3>
            <div className="space-y-6">
              {results.map(tool => (
                <div key={tool.name} className="border border-gray-600 p-4 rounded-lg bg-gray-700">
                  <h4 className="text-lg font-semibold text-white">{tool.name}</h4>
                  <p className="text-gray-300 mt-2">{tool.description}</p>
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Best For:</h5>
                    <ul className="list-disc list-inside text-gray-300">
                      {tool.bestFor.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Key Features:</h5>
                    <ul className="list-disc list-inside text-gray-300">
                      {tool.keyFeatures.map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
                setResults([]);
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatadogAlternativeFinder;
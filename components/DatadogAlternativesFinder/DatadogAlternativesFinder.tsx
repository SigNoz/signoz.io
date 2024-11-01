'use client'

import React, { useState } from 'react';
import Button from '../Button/Button';
import { BookOpen } from 'lucide-react';

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
    bestFor: [
      'Having logs, metrics, and traces under a single pane',
      'Opentelemetry-native visualizations', 
      'cost-efficient at scale',
      'Users who want to use open-source tools'
    ],
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults([]);
  };

  return (
    <>
      {/* Banner */}
      <div className="sticky top-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded px-7 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-xl mt-0 mb-2 font-bold">Find Your Perfect Datadog Alternative</h2>
            <p className="text-sm mb-0 opacity-90">Answer a few questions to get personalized recommendations in 30 seconds</p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              resetQuiz();
            }}
            className="px-4 py-1.5 bg-white text-blue-600 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Start Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
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
                        className="w-full p-3 text-left border border-gray-600 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors break-words"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <>
                      <div>
                        {questions[currentStep].options.map(option => (
                          <button
                            key={option}
                            onClick={() => {
                              const currentAnswers = (answers[questions[currentStep].id] as string[]) || [];
                              const isSelected = currentAnswers.includes(option);
                              
                              if (!isSelected) {
                                handleAnswer(questions[currentStep].id, [...currentAnswers, option]);
                              } else {
                                handleAnswer(
                                  questions[currentStep].id,
                                  currentAnswers.filter(a => a !== option)
                                );
                              }
                            }}
                            className={`px-4 py-2 mx-2 my-2 rounded-full font-medium transition-all ${
                              (answers[questions[currentStep].id] as string[] || []).includes(option)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl mt-0 font-semibold text-white">Recommended DataDog Alternatives</h3>
                  <button
                    onClick={resetQuiz}
                    className="px-3 py-1.5 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
                <div className="space-y-6">
                  {results.map(tool => (
                    <div key={tool.name} className="border border-gray-600 p-4 rounded-lg bg-gray-700">
                      <h4 className="text-lg mt-0 font-semibold text-white">{tool.name}</h4>
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
                      {tool.name === 'SigNoz' && (
                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                          <Button>
                            <a 
                              href="https://signoz.io/docs/cloud/"
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', color: 'inherit' }}
                              className="flex items-center gap-2"
                            >
                              <BookOpen size={14} />Read Documentation
                            </a>
                          </Button>
                          <Button
                            type={Button.TYPES.SECONDARY}
                          >
                            <a
                              href="https://signoz.io/application-performance-monitoring/"
                              target="_blank"
                              rel="noopener noreferrer" 
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              Explore Features &rarr;
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {!results.some(tool => tool.name === 'SigNoz') && (
                    <div className="mt-8 p-4 border border-blue-500 rounded-lg bg-gray-800 bg-opacity-50">
                      <h4 className="text-lg mt-0 font-semibold text-white">Have You Considered SigNoz?</h4>
                      <p className="text-gray-300 mt-2">
                        SigNoz offers a cost-effective, open-source alternative with full-stack observability and native OpenTelemetry support. Perfect for teams looking for flexible deployment options and simple pricing.
                      </p>
                      <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        <Button>
                          <a 
                            href="https://signoz.io/"
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            See a Demo &rarr;
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DatadogAlternativeFinder;
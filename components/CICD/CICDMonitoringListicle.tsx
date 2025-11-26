'use client'

import React, { useState } from 'react'
import { SiGithub, SiJenkins, SiArgo } from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'

export default function CICDMonitoringListicle() {
  // Define all sections with their IDs and labels
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'github', label: 'GitHub' },
    { id: 'jenkins', label: 'Jenkins' },
    { id: 'argocd', label: 'ArgoCD' },
  ]

  // State to track the active section
  const [activeSection, setActiveSection] = useState('all')

  // Navigation pills component
  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeSection === section.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  )

  // GitHub Section
  const renderGitHubSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">GitHub</h2>
      <IconCardGrid
        cards={[
          {
            name: 'GitHub Actions Traces',
            href: '/docs/cicd/github/github-actions-traces',
            icon: <SiGithub className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'GitHub Actions Traces Link',
          },
          {
            name: 'GitHub Metrics',
            href: '/docs/cicd/github/github-metrics',
            icon: <SiGithub className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'GitHub Metrics Link',
          },
        ]}
        sectionName="GitHub Monitoring"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Jenkins Section
  const renderJenkinsSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Jenkins</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Jenkins Agent Monitoring',
            href: '/docs/cicd/jenkins/agent-node-monitoring',
            icon: <SiJenkins className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'Jenkins Agent Monitoring Link',
          },
          {
            name: 'Jenkins Tracing',
            href: '/docs/cicd/jenkins/jenkins-tracing',
            icon: <SiJenkins className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'Jenkins Tracing Link',
          },
        ]}
        sectionName="Jenkins Monitoring"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // ArgoCD Section
  const renderArgoCDSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">ArgoCD</h2>
      <IconCardGrid
        cards={[
          {
            name: 'ArgoCD Metrics',
            href: '/docs/cicd/argocd/argocd-metrics',
            icon: <SiArgo className="h-7 w-7 text-orange-500" />,
            clickName: 'ArgoCD Metrics Link',
          },
        ]}
        sectionName="ArgoCD Monitoring"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Render sections based on the active section
  return (
    <div>
      <NavigationPills />

      {(activeSection === 'all' || activeSection === 'github') && renderGitHubSection()}
      {(activeSection === 'all' || activeSection === 'jenkins') && renderJenkinsSection()}
      {(activeSection === 'all' || activeSection === 'argocd') && renderArgoCDSection()}
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { SiGithub, SiJenkins, SiArgo, SiGitlab } from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'
import { CICD_MONITORING_ITEMS } from '@/constants/componentItems'

export default function CICDMonitoringListicle() {
  // Define all sections with their IDs and labels
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'github', label: 'GitHub' },
    { id: 'jenkins', label: 'Jenkins' },
    { id: 'argocd', label: 'ArgoCD' },
    { id: 'gitlab', label: 'GitLab' },
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

  // Icon map keyed by href
  const ICON_MAP: Record<string, React.ReactNode> = {
    '/docs/cicd/github/github-actions-traces': (
      <SiGithub className="h-7 w-7 text-black dark:text-white" />
    ),
    '/docs/cicd/github/github-metrics': <SiGithub className="h-7 w-7 text-black dark:text-white" />,
    '/docs/cicd/jenkins/agent-node-monitoring': (
      <SiJenkins className="h-7 w-7 text-black dark:text-white" />
    ),
    '/docs/cicd/jenkins/jenkins-tracing': (
      <SiJenkins className="h-7 w-7 text-black dark:text-white" />
    ),
    '/docs/cicd/argocd/argocd-metrics': <SiArgo className="h-7 w-7 text-orange-500" />,
    '/docs/cicd/gitlab/gitlab-traces': <SiGitlab className="h-7 w-7 text-orange-600" />,
  }

  const githubCards = CICD_MONITORING_ITEMS.github.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const jenkinsCards = CICD_MONITORING_ITEMS.jenkins.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const argocdCards = CICD_MONITORING_ITEMS.argocd.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const gitlabCards = CICD_MONITORING_ITEMS.gitlab.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  // GitHub Section
  const renderGitHubSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">GitHub</h2>
      <IconCardGrid
        cards={githubCards}
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
        cards={jenkinsCards}
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
        cards={argocdCards}
        sectionName="ArgoCD Monitoring"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // GitLab Section
  const renderGitLabSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">GitLab</h2>
      <IconCardGrid
        cards={gitlabCards}
        sectionName="GitLab Monitoring"
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
      {(activeSection === 'all' || activeSection === 'gitlab') && renderGitLabSection()}
    </div>
  )
}

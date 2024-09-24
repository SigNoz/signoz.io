import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'


import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical Writer Program',
}


const markdownContent = `

# SigNoz Technical Documentation Program (TDP)

## Overview

The SigNoz Technical Documentation Program is an initiative designed to scale the creation and 
maintenance of high-quality documentation for SigNoz.

This program seeks to bring in developers with a knack for writing technical documentation to contribute to our knowledge base.

// Add Image

SigNoz is an OpenTelemetry Native, Open Source alternative to Datadog and New Relic that provides APM, logs,
traces, metrics, exceptions, & alerts in a single pane of Glass.


## Who is this for ?

The SigNoz TEchnical Documentation Program is open to developers and technical writers who:

- Possess strong technical writing skills, with the ability to explain complex concepts clearly and concisely in a structured manner.
- Have hands-on experience with observability tools 
- Developers who have familiarity with OpenTelemetry 
- Developers who have a good understanding of backend technologies, DevOps, or observability practices.





`

export default function page() {
  return (
    <div className="container mx-auto my-16">
      <MarkdownRenderer markdownContent={markdownContent} />
    </div>
  )
}

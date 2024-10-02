import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz Expert Contributors Program',
}

const markdownContent = `

# SigNoz Expert Contributors Program

The **SigNoz Expert Contributors Program** is an exclusive initiative for seasoned professionals in the observability domain. 
Looking for an opportunity to showcase your expertise while contributing to a top open-source project? Then this program might just be what you’ve been waiting for.

![Create dashboards and documentation for SigNoz with its Expert Contributors program, build your digital presence and get paid to do it](/img/ecp-cover.webp)

SigNoz is an open-source observability platform that provides metrics, traces, and logs in a single pane of glass. It serves as an open-source alternative to tools
like Datadog and New Relic.

Loved by the developer community, SigNoz has earned over 18,000 GitHub stars, making it one of the top open-source tools in the observability space.

As a developer-focused tool, SigNoz empowers developers to build more reliable and performant applications. 
Our technical documentation and ready-to-use dashboards ensure that developers can seamlessly monitor, 
optimize, and maintain their applications with ease. We're continuously expanding our library of helpful resources to further enhance developer experience.

[![Apply for SigNoz Expert Contributors Program](/img/ecp-cta.webp)](https://forms.gle/f2TogL5GZ7CZ7rUY9)

&nbsp;

---

## Why Join the Program?

### Generous Compensation 

- ○ We understand the effort it takes to create detailed dashboards and technical documentation, 
which is why we offer competitive payments that reflect the value of your contributions.

### Amplify your expertise
- ○ SigNoz is used by users across the globe. This gives you an opportunity to showcase your work across a global community and establish yourself as an expert in 
observability.

### Continuous Learning 
- ○ Stay ahead of the curve with the latest trends in observability. As a contributor, you'll sharpen your skills, 
learn new tools, and broaden your technical expertise with every contribution you make.

&nbsp;

---

## Who Should Apply?

- ○ Professionals with extensive experience in observability, monitoring, and distributed tracing.
  
- ○ Individuals proficient with tools like OpenTelemetry, Prometheus, Grafana, Jaeger, etc.
  
**Note:** You must have hands-on experience working with Git and GitHub.

&nbsp;

---

## Areas of Contribution

### Dashboards

- ○ Create dashboards for monitoring specific technologies, industries, or use cases.
  
- ○ Optimize existing dashboards for better performance and user experience.

**Compensation Range:** $150 - $300 per dashboard

&nbsp;

👇 Checkout dashboards example

[![Dashboards GitHub](/img/ecp-dashboard-examples.webp)](https://github.com/SigNoz/dashboards) 

&nbsp;

### Comprehensive Documentation

- ○ Develop in-depth technical documentation, tutorials, product explanations, and test new documentation created by other contributors.

**Compensation Range:** Up to $300 per contribution

&nbsp;

👇 Checkout SigNoz documentation

[![SigNoz Documentation](/img/ecp-signoz-documentation.webp)](https://signoz.io/docs/introduction/) 

&nbsp;

---

## Program Structure

### Application Process

- ○ Submit your application along with your portfolio or examples of previous work.
   
- ○ Our team will review your expertise and align your skills with task needs.

&nbsp;

### Task assigned

- ○ Receive tasks with specific deliverables and timelines.
  
- ○ Agree on compensation terms before contribution.

&nbsp;

### Contribution and Review

- ○ Conduct independent research and testing, then submit a pull request (PR) to the appropriate repository.
  
- ○ Address feedback from the PR review, make necessary revisions, and get the PR merged successfully.

&nbsp;

### Payment Process
  
Once the **PR(s) is merged**, 
- ○ SigNoz team will share a Google form on the **last working day of the month**.
- ○ The contributor will fill out the Google form by 5th of the following month with relevant information and an invoice.
- ○ SigNoz team will verify the invoices and process the payments by **15th of the following month**.

&nbsp;

---

## How to Apply

Click the **"Apply Now"** button below and complete the form. If your profile aligns with our requirements, our team will reach out to you with the next steps.

[![Apply for SigNoz Expert Contributors Program](/img/ecp-cta.webp)](https://forms.gle/f2TogL5GZ7CZ7rUY9)

&nbsp;


`

export default function Page() {
  return (
    <div className="container mx-auto my-24 px-16 lg:px-28">
      <div className="container mx-auto my-16">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  )
}

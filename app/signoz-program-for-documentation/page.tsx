import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz Program for Documentation',
}

const markdownContent = `

# SigNoz Expert Contributors Program

The SigNoz Expert Contributors Program is an exclusive initiative for seasoned professionals in the observability domain. 
If you're an expert eager to showcase your skills, contribute to a leading open-source project, and get compensated for your expertise, this program is for you.

![Create dashboards and documentation for SigNoz with its Expert Contributors program, build your digital presence and get paid to do it](/img/ecp-cover.webp)

&nbsp;

## Why join the program ?

**Monetary Compensation:** Receive competitive payments for your high-quality contributions to SigNoz.

**Exclusive Badges:** Earn SigNoz Expert Badges as proof of your work and expertise. Display them on your professional profiles, resumes, or portfolios.

**Showcase Your Skills:** Your dashboards and documentation will be featured on the SigNoz platform, reaching a global audience and potential employers or clients.

**Influence the Industry:** Play a pivotal role in shaping the future of observability tools and best practices.

&nbsp;

## Who Should Apply?

• Professionals with extensive experience in observability, monitoring, and distributed tracing.

• Individuals proficient with tools like OpenTelemetry, Prometheus, Grafana, Jaeger, etc.

**Note:**  You must have hands-on experience working with Git and GitHub.

&nbsp;

## Areas of Contribution

### Advanced Dashboards:

Create sophisticated dashboards tailored for specific technologies, industries, or use cases.
Optimize existing dashboards for better performance and user experience.

Compensation Range: $150 - $300

### Comprehensive Documentation:

Develop in-depth technical documentation, tutorials, product explanation.

Compensation Range: Upto $500


### Beta test new features 

Test out new features and documentation and give feedback. 


Compensation range: Variable

&nbsp;

## Program Structure

### Application Process:

○ Submit [your application](https://example.com) along with your portfolio or examples of previous work.

○ Our team will review your expertise and align your skills with our project needs.

### Task Assignment

○ Receive tasks with specific deliverables and timelines.

○ Agree on compensation terms before project commencement.

### Contribution and Review

○ Conduct independent research and testing, then submit a pull request (PR) to the appropriate repository.

○ Address feedback from the PR review, make necessary revisions, and get the PR merged successfully.


### Recognition and Payment:

○ Earn your SigNoz Expert Badge upon successful project completion. 

○ Receive prompt payment for your contributions.


&nbsp;

## How to Apply:

Click the "Apply Now" button below 👇 and complete the form. If your profile aligns with our requirements, our team will reach out to you with the next steps.

[![Apply for SigNoz Technical Writing Program](/img/ecp-cta.webp)](https://forms.gle/f2TogL5GZ7CZ7rUY9)



`

export default function Page() {
  return (
    <div className="container mx-auto my-16">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  )
}

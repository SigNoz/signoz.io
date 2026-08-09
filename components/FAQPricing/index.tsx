import React from 'react'
import Card from './Card'

const FAQs = [
  {
    body: 'SigNoz manages storage, scaling, and upgrades for SigNoz Cloud. With Self-Hosted SigNoz, your team deploys and operates the software and pays for its infrastructure and storage. Enterprise support is available under contract.',
    title: 'What is the difference between SigNoz Cloud and Self-Hosted SigNoz?',
  },
  {
    body: "A time series that sends data every 30 seconds produces two samples per minute. For example, 10,000 time series produce about 864 million samples per month. At one-month retention, SigNoz Cloud charges USD 0.10 per million samples, so this example costs USD 86.40 per month. <a href='https://vimeo.com/973012522' target='_blank' className='mx-0 rounded px-0 py-0.5 text-primary-400'>Link</a>.",
    title: 'How does SigNoz Cloud calculate metric samples?',
  },
  {
    body: "SigNoz Cloud includes email and in-product chat support. Dedicated Slack and migration support depend on the current spend or contract. Self-Hosted SigNoz users can use community Slack and GitHub Discussions or buy enterprise support. Contact <a mailto='support@signoz.io'>support@signoz.io</a> for a paid support plan.",
    title: 'What support is available for SigNoz Cloud and Self-Hosted SigNoz?',
  },
  {
    body: 'Enterprise customers can choose SigNoz Cloud — Dedicated, SigNoz Cloud — BYOC, or Self-Hosted SigNoz with enterprise support. SigNoz manages the Cloud and BYOC deployments. Self-hosted customers manage their infrastructure and operations.',
    title: 'Which SigNoz Enterprise deployment options are available?',
  },
]

const FAQBody = () => (
  <>
    {FAQs.map((faq, idx) => (
      <Card body={faq.body} idx={idx} title={faq.title} key={`${idx}${faq.title}`} />
    ))}
  </>
)

export default FAQBody

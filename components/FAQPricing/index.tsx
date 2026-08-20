import React from 'react'
import Card from './Card'

const FAQs = [
  {
    body: 'You can deploy and manage Self-Hosted SigNoz Community Edition yourself. Choose SigNoz Cloud if you do not want to manage the SigNoz cluster. SigNoz Cloud includes features such as SSO and SAML support. Our team can also help with the initial configuration of dashboards and alerts and advise on observability setup practices.',
    title: 'What is the difference between SigNoz Cloud and Self-Hosted SigNoz?',
  },
  {
    body: "A time series that sends data every 30 seconds produces two samples per minute. For example, 10,000 time series produce about 864 mn samples per month. At one-month retention, SigNoz Cloud charges $0.10/mn samples, so this example costs 86.4 USD/month. <a href='https://vimeo.com/973012522' target='_blank' className='mx-0 rounded px-0 py-0.5 text-primary-400'>Link</a>.",
    title: 'How are number of samples calculated for metrics pricing?',
  },
  {
    body: "Contact <a mailto='support@signoz.io'>support@signoz.io</a> if you need a dedicated support plan or paid support for your initial SigNoz Cloud or Self-Hosted SigNoz setup.",
    title: 'What support is available for SigNoz Cloud and Self-Hosted SigNoz?',
  },
  {
    body: 'Enterprise customers can choose SigNoz Cloud: Dedicated, SigNoz Cloud: BYOC, or Self-Hosted SigNoz with enterprise support. SigNoz manages the Cloud and BYOC deployments. Self-hosted customers manage their infrastructure and operations.',
    title: 'Who should use Enterprise plans?',
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

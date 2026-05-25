// Contact Us Data
const PORTAL_ID = '22308423'
const FORM_ID = 'cf4128d5-51f1-46aa-ae4a-552bcff20f8c'

export const contactUsData = {
  TITLE: 'Enterprise Grade Observability at Any Scale',
  PORTAL_ID,
  FORM_ID,
  FORM_NAME: 'Contact Us Form',
  SUBMIT_URL: `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
  FEATURES: [
    {
      title: 'Dedicated support',
    },
    {
      title: 'Volume discounts',
    },
    {
      title: 'Dashboard Migration',
    },
  ],
  OPTIONS: [
    {
      title: 'Enterprise Cloud',
      description: 'A dedicated cloud environment with upgraded security and compliance features.',
    },
    {
      title: 'BYOC',
      description:
        'Managed by SigNoz in your cloud. Let the SigNoz team run SigNoz in your cloud infrastructure.',
    },
    {
      title: 'Enterprise Self-Hosted',
      description:
        'Self-host SigNoz in your infrastructure with a support contract from SigNoz team.',
    },
  ],
  FOOTER: 'All plans come with Dedicated support, dashboard migration & team training.',
}

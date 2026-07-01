import CustomLink from '@/components/Link'

export default function GetHelp() {
  return (
    <p>
      If you need help with the steps in this topic, please reach out to us on{' '}
      <CustomLink href="https://signoz.io/slack/">SigNoz Community Slack</CustomLink>. If you are a
      SigNoz Cloud user, please use in product chat support located at the bottom right corner of
      your SigNoz instance or contact us at{' '}
      <a href="mailto:cloud-support@signoz.io">cloud-support@signoz.io</a>.
    </p>
  )
}

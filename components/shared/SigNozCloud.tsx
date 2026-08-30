import { Typography } from '@signozhq/ui/typography'
import Admonition from '@/components/Admonition/Admonition'
import CustomLink from '@/components/Link'

export default function SigNozCloud() {
  return (
    <Admonition type="tip">
      <Typography.Text as="p">
        The easiest way to run SigNoz is to use SigNoz Cloud - no installation, maintenance, or
        scaling needed.
      </Typography.Text>
      <Typography.Text as="p">
        New users get 30 days of unlimited access to all features. Click{' '}
        <CustomLink
          href="https://signoz.io/teams/"
          className="text-[var(--accent-primary)] hover:underline"
        >
          here
        </CustomLink>{' '}
        to sign up.
      </Typography.Text>
    </Admonition>
  )
}

import Admonition from '@/components/Admonition/Admonition'
import CustomLink from '@/components/Link'

export default function SigNozCloud() {
  return (
    <Admonition type="tip">
      <p>
        The easiest way to run SigNoz is to use SigNoz Cloud - no installation, maintenance, or
        scaling needed.
      </p>
      <p>
        New users get 30 days of unlimited access to all features. Click{' '}
        <CustomLink href="https://signoz.io/teams/">here</CustomLink> to sign up.
      </p>
    </Admonition>
  )
}

import Admonition from '@/components/Admonition/Admonition'
import CustomLink from '@/components/Link'

export default function RetentionInfo() {
  return (
    <Admonition type="info">
      <p>
        By default, retention period is set to <strong>7 days</strong> for logs and traces, and{' '}
        <strong>30 days</strong> for metrics. To change this, navigate to the{' '}
        <strong>General</strong> tab on the <strong>Settings</strong> page of SigNoz UI.
      </p>
      <p>
        For more details, refer to the{' '}
        <CustomLink href="https://signoz.io/docs/userguide/retention-period">
          retention period guide
        </CustomLink>
        .
      </p>
    </Admonition>
  )
}

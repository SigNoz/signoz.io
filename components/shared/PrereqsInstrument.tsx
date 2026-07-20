import { Typography } from '@signozhq/ui/typography'
import CustomLink from '@/components/Link'

export default function PrereqsInstrument() {
  return (
    <ul>
      <li>
        <Typography.Text as="span">
          This section assumes that your application is already instrumented. For details about how
          you can instrument your application, see the{' '}
          <CustomLink
            href="https://signoz.io/docs/instrumentation/"
            className="text-[var(--accent-primary)] hover:underline"
          >
            Instrument Your Application
          </CustomLink>{' '}
          section.
        </Typography.Text>
      </li>
      <li>
        <Typography.Text as="span">
          This section assumes that you are familiar with the basics of monitoring applications.
        </Typography.Text>
      </li>
    </ul>
  )
}

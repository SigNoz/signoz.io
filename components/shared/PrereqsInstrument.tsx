import CustomLink from '@/components/Link'

export default function PrereqsInstrument() {
  return (
    <ul>
      <li>
        This section assumes that your application is already instrumented. For details about how
        you can instrument your application, see the{' '}
        <CustomLink href="https://signoz.io/docs/instrumentation/">
          Instrument Your Application
        </CustomLink>{' '}
        section.
      </li>
      <li>
        This section assumes that you are familiar with the basics of monitoring applications.
      </li>
    </ul>
  )
}

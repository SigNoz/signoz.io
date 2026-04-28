import Admonition from '@/components/Admonition/Admonition'

export default function OtelOperatorAutoInstrumentation() {
  return (
    <Admonition type="info">
      <p>
        We can enable auto-instrumentation to the deployed workloads by simply adding{' '}
        <code>
          instrumentation.opentelemetry.io/inject-{'{'}language{'}'}
        </code>{' '}
        pod annotations.
      </p>
    </Admonition>
  )
}

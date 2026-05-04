import Admonition from '@/components/Admonition/Admonition'

export default function OtelOperatorOTLPEndpoint() {
  return (
    <Admonition type="info">
      <p>
        If you have SigNoz running in other Kubernetes (K8s) cluster or in a Virtual Machine (VM),
        you should update the <code>endpoint</code> property to point at the appropriate OTLP
        address.
      </p>
    </Admonition>
  )
}

import Admonition from '@/components/Admonition/Admonition'

export default function UpgradeInfo() {
  return (
    <Admonition type="info">
      <p>
        To override values in a Helm chart, you can also use the <code>values</code>/<code>-f</code>{' '}
        flag. See the{' '}
        <a
          href="https://helm.sh/docs/helm/helm_upgrade/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Helm Upgrade
        </a>{' '}
        page of the Helm documentation for more details.
      </p>
    </Admonition>
  )
}

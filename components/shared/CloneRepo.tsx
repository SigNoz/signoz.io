import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'

export default function CloneRepo() {
  return (
    <>
      <p>
        In a directory of your choosing, clone the SigNoz repository and &apos;cd&apos; into the{' '}
        <code>signoz/deploy</code> directory by entering the following commands:
      </p>
      <RegionAwarePre>
        <RegionAwareCode className="language-bash">
          {`git clone -b main https://github.com/SigNoz/signoz.git && cd signoz/deploy/`}
        </RegionAwareCode>
      </RegionAwarePre>
    </>
  )
}

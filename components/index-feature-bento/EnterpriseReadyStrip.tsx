import HipaaLogo from '@/public/svgs/icons/hipaa.svg'
import Soc2Logo from '@/public/svgs/icons/SOC-2.svg'

export default function EnterpriseReadyStrip() {
  const compliances = [
    {
      Logo: Soc2Logo,
      label: 'SOC 2 Type II',
      description: 'Controls and operational safeguards for security-conscious teams.',
    },
    {
      Logo: HipaaLogo,
      label: 'HIPAA',
      description: 'Protected health information can be handled with the right safeguards.',
    },
  ]

  return (
    <div className="mt-14 border-y border-signoz_slate-400/35 md:mt-20">
      <div className="grid gap-0 md:grid-cols-3">
        <div className="flex items-center border-b border-signoz_slate-400/35 py-8 md:border-b-0 md:pr-8">
          <div>
            <p className="m-0 text-sm font-medium uppercase tracking-widest text-signoz_robin-400">
              Enterprise ready
            </p>
            <h3 className="m-0 mt-3 max-w-xs text-2xl font-medium leading-tight tracking-tight text-signoz_vanilla-100 md:max-w-xs md:text-3xl">
              Compliance answers, before they become blockers.
            </h3>
          </div>
        </div>

        {compliances.map(({ Logo, description, label }, index) => (
          <div
            key={label}
            className={`flex min-h-44 flex-col justify-between border-t border-signoz_slate-400/35 py-7 md:min-h-56 md:border-t-0 md:px-12 ${
              index === 0 ? 'md:border-x' : ''
            } border-signoz_slate-400/35`}
          >
            <Logo className="h-12 w-auto opacity-70" />
            <div>
              <p className="m-0 text-sm leading-5 text-signoz_vanilla-400">{label} compliance</p>
              <p className="m-0 mt-3 max-w-xs text-lg font-medium leading-7 tracking-normal text-signoz_vanilla-100 md:text-xl md:leading-8">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import HipaaLogo from '@/public/svgs/icons/hipaa.svg'
import Soc2Logo from '@/public/svgs/icons/SOC-2.svg'

export default function EnterpriseReadyStrip() {
  const compliances = [
    {
      Logo: Soc2Logo,
      label: 'SOC 2 Type II',
    },
    {
      Logo: HipaaLogo,
      label: 'HIPAA',
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
              Built secure, from day one.
            </h3>
          </div>
        </div>

        {compliances.map(({ Logo, label }, index) => (
          <div
            key={label}
            className={`flex min-h-44 flex-col justify-center gap-5 border-t border-signoz_slate-400/35 py-7 md:min-h-56 md:border-t-0 md:px-12 ${
              index === 0 ? 'md:border-x' : ''
            } border-signoz_slate-400/35`}
          >
            <div className="h-14 overflow-visible">
              <Logo className="h-14 w-auto origin-left scale-[1.55] opacity-80 md:scale-[1.85]" />
            </div>
            <div>
              <p className="m-0 text-base font-medium leading-6 text-signoz_vanilla-400 md:text-lg md:leading-7">
                {label} compliance
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

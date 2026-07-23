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
    <div className="border-border/35 mt-14 border-y md:mt-20">
      <div className="grid gap-0 md:grid-cols-3">
        <div className="border-border/35 flex items-center border-b py-8 md:border-b-0 md:pr-8">
          <div>
            <p className="text-robin-400 m-0 text-sm font-medium tracking-widest uppercase">
              Enterprise ready
            </p>
            <h3 className="text-l1-foreground m-0 mt-3 max-w-xs text-2xl leading-tight font-medium tracking-tight md:max-w-xs md:text-3xl">
              Built secure, from day one.
            </h3>
          </div>
        </div>

        {compliances.map(({ Logo, label }, index) => (
          <div
            key={label}
            className={`border-border/35 flex min-h-44 flex-col justify-center gap-5 border-t py-7 md:min-h-56 md:border-t-0 md:px-12 ${
              index === 0 ? 'md:border-x' : ''
            } border-border/35`}
          >
            <div className="h-14 overflow-visible">
              <Logo className="h-14 w-auto origin-left scale-[1.55] opacity-80 brightness-0 md:scale-[1.85] dark:brightness-100" />
            </div>
            <div>
              <p className="text-muted-foreground m-0 text-base leading-6 font-medium md:text-lg md:leading-7">
                {label} compliance
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

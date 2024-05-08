import * as React from 'react'
import Image from 'next/image'

interface LinkWithIconProps {
  text: string
  iconSrc: string
}

const LinkWithIcon: React.FC<LinkWithIconProps> = ({ text, iconSrc }) => (
  <div className="mt-5 flex gap-2 whitespace-nowrap pr-3.5">
    <div className="text-md font-semibold">{text}</div>
    {/* <Image
      src={iconSrc}
      alt=""
      width={14}
      height={14}
      className="aspect-square w-3.5 shrink-0 self-start"
    /> */}
  </div>
)

interface FooterSectionProps {
  title: string
  links: Array<string | LinkWithIconProps>
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => (
  <div className="flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
    <div className="flex flex-col pb-2.5 text-sm tracking-wide text-black dark:text-stone-300 max-md:mt-10">
      <div className="text-md font-bold uppercase leading-5 tracking-wide text-gray-700 dark:text-white">
        {title}
      </div>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {typeof link === 'string' ? (
            <div className="mt-5 text-sm font-semibold">{link}</div>
          ) : (
            <LinkWithIcon text={link.text} iconSrc={link.iconSrc} />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
)

const MainFooter: React.FC = () => {
  const platformLinks = [
    'Metrics',
    'Logs',
    'Traces',
    'Dashboards',
    'Alerts',
    'Exceptions',
    'Integrations',
    { text: 'Documentation', iconSrc: '/icons/external-link.svg' },
    { text: 'Product guide', iconSrc: '/icons/external-link.svg' },
    'FAQ',
  ]

  const companyLinks = [
    'Team',
    'Careers',
    'Privacy Policy',
    'Terms of Service',
    { text: 'Press Kit', iconSrc: '/icons/download.svg' },
    { text: 'Contact', iconSrc: '/icons/external-link.svg' },
  ]

  const developerLinks = [
    { text: 'Open Source', iconSrc: '/icons/external-link.svg' },
    { text: 'Self-hosting', iconSrc: '/icons/external-link.svg' },
    'Tutorials',
    'Guides',
    'Examples',
    'Comparisons',
    'Changelog',
  ]

  return (
    <footer className="mt-16 flex flex-col justify-center">
      <div className="flex w-full items-center justify-center bg-white bg-opacity-70 py-14 backdrop-blur-[20px] dark:bg-gray-950 max-md:max-w-full max-md:px-5">
        <div className="w-full justify-between max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <FooterSection title="platform" links={platformLinks} />
            <FooterSection title="company" links={companyLinks} />
            <FooterSection title="developers" links={developerLinks} />
            <div className="ml-5 flex w-3/12 flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col items-start self-stretch pb-20 pl-16 shadow-sm max-md:mt-10">
                <div className="text-dark flex justify-between gap-1.5 self-end whitespace-nowrap text-center text-lg font-medium leading-5 dark:text-white">
                  {/* <Image
                    src="/logo.svg"
                    alt=""
                    width={19}
                    height={20}
                    className="aspect-[0.95] w-[19px] shrink-0 self-start"
                  /> */}
                  <div>SigNoz</div>
                </div>
                {/* <div className="mt-5 justify-center rounded px-3.5 text-right text-sm leading-5 text-emerald-300 max-md:ml-2">
                  All systems operational
                </div> */}
                {/* <div className="mt-5 flex items-start justify-between gap-1 px-1.5 py-1.5">
                  <Image
                    src="/icons/github.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="aspect-square w-5 shrink-0 fill-stone-300"
                  />
                  <Image
                    src="/icons/twitter.svg"
                    alt=""
                    width={20}
                    height={22}
                    className="aspect-[0.91] w-5 shrink-0 self-stretch"
                  />
                  <Image
                    src="/icons/linkedin.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="aspect-square w-5 shrink-0"
                  />
                  <Image
                    src="/icons/slack.svg"
                    alt=""
                    width={18}
                    height={20}
                    className="aspect-[0.9] w-[18px] shrink-0"
                  />
                  <Image
                    src="/icons/youtube.svg"
                    alt=""
                    width={20}
                    height={18}
                    className="my-auto aspect-[1.11] w-5 shrink-0 self-stretch"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MainFooter

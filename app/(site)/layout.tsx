import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'
import TopNav from '@/components/TopNav/TopNav'
import { TooltipProviderWrapper } from '@/components/TooltipProviderWrapper'
import { getDocsSideNav } from '@/utils/docsSideNav'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const sideNav = await getDocsSideNav()

  return (
    <TooltipProviderWrapper>
      <SectionContainer>
        <div className="relative flex h-screen flex-col justify-between">
          <TopNav sideNav={sideNav} />
          <main className="mb-auto mt-[48px] bg-signoz_ink-500">{children}</main>
          <MainFooter />
        </div>
      </SectionContainer>
    </TooltipProviderWrapper>
  )
}

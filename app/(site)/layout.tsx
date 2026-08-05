import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'
import TopNav from '@/components/TopNav/TopNav'
import { TooltipProviderWrapper } from '@/components/TooltipProviderWrapper'
import { MobileDocsSidebarProvider } from '@/components/DocsSidebar/MobileDocsSidebarContext'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProviderWrapper>
      <MobileDocsSidebarProvider>
        <SectionContainer>
          <div className="relative flex h-screen flex-col justify-between">
            <TopNav />
            <main className="mb-auto mt-[48px] bg-[var(--l1-background)]">{children}</main>
            <MainFooter />
          </div>
        </SectionContainer>
      </MobileDocsSidebarProvider>
    </TooltipProviderWrapper>
  )
}

import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'
import TopNav from '@/components/TopNav/TopNav'
import { TooltipProviderWrapper } from '@/components/TooltipProviderWrapper'
import { MobileDocsSidebarProvider } from '@/components/DocsSidebar/MobileDocsSidebarContext'
import { FloatingThemeToggle } from '@/components/ThemeToggle/FloatingThemeToggle'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProviderWrapper>
      <MobileDocsSidebarProvider>
        <SectionContainer>
          <div className="relative flex h-screen flex-col justify-between">
            <TopNav />
            <main className="bg-background mt-[48px] mb-auto">{children}</main>
            <MainFooter />
          </div>
        </SectionContainer>
        <FloatingThemeToggle />
      </MobileDocsSidebarProvider>
    </TooltipProviderWrapper>
  )
}

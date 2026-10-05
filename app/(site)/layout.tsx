import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'
import TopNav from '@/components/TopNav/TopNav'
import SitePageFrame from '@/components/SitePageFrame'
import { TooltipProviderWrapper } from '@/components/TooltipProviderWrapper'
import { MobileDocsSidebarProvider } from '@/components/DocsSidebar/MobileDocsSidebarContext'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProviderWrapper>
      <MobileDocsSidebarProvider>
        <SectionContainer>
          <div className="relative flex min-h-screen flex-col justify-between">
            <div className="sr-only" data-markdown-ignore>
              For the complete documentation index, see{' '}
              <a href="https://signoz.io/llms.txt">llms.txt</a>. Markdown versions are available by
              appending <code>.md</code> to documentation URLs.
            </div>
            <TopNav />
            <SitePageFrame>{children}</SitePageFrame>
            <MainFooter />
          </div>
        </SectionContainer>
      </MobileDocsSidebarProvider>
    </TooltipProviderWrapper>
  )
}

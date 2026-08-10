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
          <div className="relative flex min-h-screen flex-col justify-between">
            {/* Agent-facing directive (growth-pod #1177): server-rendered and
                visually hidden (sr-only clip pattern, not display:none) so
                crawlers and agents discover /llms.txt and .md retrieval on
                every page — docs, blog, comparisons, guides, product pages. */}
            <div className="sr-only" data-markdown-ignore>
              For the complete documentation index, see{' '}
              <a href="https://signoz.io/llms.txt">llms.txt</a>. Markdown versions are available by
              appending <code>.md</code> to documentation URLs.
            </div>
            <TopNav />
            <main className="mb-auto mt-[48px] bg-[var(--l1-background)]">{children}</main>
            <MainFooter />
          </div>
        </SectionContainer>
      </MobileDocsSidebarProvider>
    </TooltipProviderWrapper>
  )
}

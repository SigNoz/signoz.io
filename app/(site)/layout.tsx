import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'
import TopNav from '@/components/TopNav/TopNav'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionContainer>
      <div className="relative flex h-screen flex-col justify-between">
        <TopNav />
        <main className="mb-auto mt-[48px] bg-signoz_ink-500">{children}</main>
        <MainFooter />
      </div>
    </SectionContainer>
  )
}

import NotFoundRecoveryClient from '@/components/not-found/NotFoundRecoveryClient'
import TopNav from '@/components/TopNav/TopNav'
import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'

export default function NotFound() {
  return (
    <SectionContainer>
      <div className="relative flex h-screen flex-col justify-between">
        <TopNav />
        <main className="bg-background mt-[48px] mb-auto">
          <NotFoundRecoveryClient />
        </main>
        <MainFooter />
      </div>
    </SectionContainer>
  )
}

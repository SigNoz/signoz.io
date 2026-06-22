import NotFoundRecoveryClient from '@/components/not-found/NotFoundRecoveryClient'
import TopNav from '@/components/TopNav/TopNav'
import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'

export default function NotFound() {
  return (
    <SectionContainer>
      <div className="relative flex h-screen flex-col justify-between ">
        <TopNav />
        <main className="mb-auto mt-[48px] bg-signoz_ink-500">
          <NotFoundRecoveryClient />
        </main>
        <MainFooter />
      </div>
    </SectionContainer>
  )
}

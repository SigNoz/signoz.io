import NotFoundRecoveryClient from '@/components/not-found/NotFoundRecoveryClient'
import TopNav from '@/components/TopNav/TopNav'
import SectionContainer from '@/components/SectionContainer'
import MainFooter from '@/components/mainFooter'
import { getDocsSideNav } from '@/utils/docsSideNav'

export default async function NotFound() {
  const docsSideNavItems = await getDocsSideNav()

  return (
    <SectionContainer>
      <div className="relative flex h-screen flex-col justify-between ">
        <TopNav docsSideNavItems={docsSideNavItems} />
        <main className="mb-auto mt-[48px] bg-signoz_ink-500">
          <NotFoundRecoveryClient />
        </main>
        <MainFooter />
      </div>
    </SectionContainer>
  )
}

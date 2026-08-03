'use client'

import { useEffect } from 'react'
import { ArrowBigLeft } from 'lucide-react'
import DocsSidebar from './DocsSidebar'
import TrackingButton from '@/components/TrackingButton'
import { useMobileDocsSidebar } from './MobileDocsSidebarContext'

export default function MobileDocsSideNav() {
  const { isOpen, close, openMainMenu } = useMobileDocsSidebar()

  useEffect(() => {
    return () => close()
  }, [close])

  if (!isOpen) return null

  return (
    <div className="md:hidden">
      <div
        className="fixed inset-0 top-[56px] z-[1100] bg-[var(--l1-background)]"
        onClick={() => close()}
      />
      <div className="fixed left-0 top-[56px] z-[1100] h-[calc(100vh-56px)] w-full overflow-y-auto border-r border-[var(--l1-border)] bg-[var(--l1-background)] sm:max-w-sm">
        <div className="px-4">
          <TrackingButton
            className="mt-4 inline-flex items-center gap-1 rounded px-1 py-1 text-sm font-bold text-[var(--l1-foreground)]"
            clickType="Nav Click"
            clickName="Back to Main Menu Button"
            clickText="Back to main menu"
            clickLocation="Mobile Menu"
            onClick={openMainMenu}
          >
            <ArrowBigLeft size={16} /> Back to main menu
          </TrackingButton>
        </div>
        <DocsSidebar onNavItemClick={() => close()} showRegionSelector={false} />
      </div>
    </div>
  )
}

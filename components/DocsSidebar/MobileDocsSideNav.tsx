'use client'

import React, { useEffect } from 'react'
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
      <div className="fixed inset-0 top-[56px] z-40 bg-black/50" onClick={() => close()} />
      <div className="border-border bg-background fixed top-[56px] left-0 z-40 h-[calc(100vh-56px)] w-full overflow-y-auto border-r sm:max-w-sm">
        <div className="px-4">
          <TrackingButton
            className="text-foreground mt-4 inline-flex items-center gap-1 rounded px-1 py-1 text-sm font-bold"
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

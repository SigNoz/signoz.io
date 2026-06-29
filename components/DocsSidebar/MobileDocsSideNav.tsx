'use client'

import React, { useEffect } from 'react'
import { ArrowBigLeft } from 'lucide-react'
import DocsSidebar from './DocsSidebar'
import TrackingButton from '@/components/TrackingButton'
import { useDocsMobileSidebarOpen, closeDocsMobileSidebar } from '@/hooks/useDocsMobileSidebar'

const OPEN_MAIN_MENU_EVENT = 'signoz:open-main-menu'

export default function MobileDocsSideNav() {
  const isOpen = useDocsMobileSidebarOpen()

  useEffect(() => {
    return () => closeDocsMobileSidebar()
  }, [])

  const handleBackToMainMenu = () => {
    closeDocsMobileSidebar()
    window.dispatchEvent(new Event(OPEN_MAIN_MENU_EVENT))
  }

  if (!isOpen) return null

  return (
    <div className="md:hidden">
      <div
        className="fixed inset-0 top-[56px] z-40 bg-black/50"
        onClick={() => closeDocsMobileSidebar()}
      />
      <div className="fixed left-0 top-[56px] z-40 h-[calc(100vh-56px)] w-full overflow-y-auto border-r border-signoz_slate-500 bg-signoz_ink-500 sm:max-w-sm">
        <div className="px-4">
          <TrackingButton
            className="mt-4 inline-flex items-center gap-1 rounded px-1 py-1 text-sm font-bold text-white"
            clickType="Nav Click"
            clickName="Back to Main Menu Button"
            clickText="Back to main menu"
            clickLocation="Mobile Menu"
            onClick={handleBackToMainMenu}
          >
            <ArrowBigLeft size={16} /> Back to main menu
          </TrackingButton>
        </div>
        <DocsSidebar onNavItemClick={() => closeDocsMobileSidebar()} />
      </div>
    </div>
  )
}

export { OPEN_MAIN_MENU_EVENT }

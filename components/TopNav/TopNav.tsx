'use client'

import { useEffect, useState } from 'react'
import { Button, Dialog, Popover} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowBigLeft, ArrowRight, MoveLeft } from 'lucide-react'
import SearchButton from '../SearchButton'
import GitHubStars from '../GithubStars/GithubStars'
import React from 'react'
import DocsSidebar from '../DocsSidebar/DocsSidebar'
import { usePathname } from 'next/navigation'
import Banner from '../Banner/Banner'

export default function TopNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDocsBasePath, setIsDocsBasePath] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)

  useEffect(() => {
    const isDocsBasePath = pathname.startsWith('/docs')
    setIsDocsBasePath(isDocsBasePath)

    if (!isDocsBasePath) {
      setShowMainMenu(true)
    } else {
      setShowMainMenu(false)
    }
  }, [pathname])

  return (
    <div className='fixed left-0 right-0 z-30'>  
    <Banner/>
    <header
      className={`mx-auto box-border flex h-[56px] w-full items-center border-b border-signoz_slate-500 header-bg px-4 text-signoz_vanilla-100 dark:text-signoz_vanilla-100 md:px-8 lg:px-8 backdrop-blur-[20px]`}
    >                                                
      <nav
        className="flex w-full justify-between text-signoz_vanilla-100 dark:text-signoz_vanilla-100"
        aria-label="Global"
      >
        <div className="mr-4 gap-x-6 flex justify-start lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 flex items-center gap-2 p-1.5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              className="h-6 w-auto"
              src="/img/SigNozLogo-orange.svg"
              width={160}
              height={60}
              alt=""
            />

            <span className="text-[18.58px] font-satoshi-bold font-medium">SigNoz</span>
          </Link>        
          <Popover.Group className="hidden items-center lg:flex gap-x-6">
          <Link
            href="/docs"
            className={`truncate text-sm font-normal  hover:text-signoz_robin-500 py-1 px-1.5`}
          >
            Documentation
          </Link>

          <Link
            href="/resource-center/blog"
            className={`truncate text-sm font-normal hover:text-signoz_robin-500 py-1 px-1.5`}
          >
            Resources
          </Link>

          <Link
            href="/pricing"
            className={`truncate text-sm font-normal hover:text-signoz_robin-500 py-1 px-1.5`}
          >
            Pricing
          </Link>

          <Link
            href="/case-study"
            className={`truncate text-sm font-normal hover:text-signoz_robin-500 py-1 px-1.5`}
          >
            Customer Stories
          </Link>


        </Popover.Group>
        </div>
        <div className="flex justify-end lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
          </button>
        </div>

  
        <div className="hidden gap-8 lg:flex lg:flex-1 lg:justify-end">      
          <GitHubStars />
          <SearchButton />

          <Link href="/teams" className="mx-2">
            <Button
              id="btn-get-started-website-navbar"
              className="start-free-trial-btn primary-gradient h-8 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate text-center font-medium leading-5 text-white no-underline outline-none hover:text-white"
            >
              Try SigNoz Cloud <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 top-[56px]" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-signoz_ink-500 px-6 py-24 !pt-[calc(6rem-56px)] mt-[56px] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">SigNoz</span>
            </Link>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {showMainMenu && (
                <div className="space-y-2 py-6">
                  <Link
                    href="/docs"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/resource-center/blog"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold  leading-7 hover:bg-signoz_ink-200 sm:text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>

                  <div className="-mx-3 inline-block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200">
                    <GitHubStars />
                  </div>

                  <Link
                    href="/teams"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                  >
                    <Button
                      id="btn-get-started-website-navbar"
                      className="start-free-trial-btn primary-gradient font-heading text-sm flex items-center justify-center gap-1 truncate rounded-md border-none px-4 py-2 text-center text-xs  font-bold leading-4 text-white no-underline outline-none hover:text-white"
                    >
                      Try SigNoz Cloud <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              )}
              <div className="hidden py-6 md:block">
                <SearchButton />
              </div>

              {isDocsBasePath && !showMainMenu && (
                <div className="docs-sidebar-mobile-nav">
                  <div
                    className="mt-4 inline-flex items-center gap-1 rounded px-1 py-1 text-sm font-bold text-white"
                    onClick={() => {
                      setShowMainMenu(true)
                    }}
                  >
                    <ArrowBigLeft size={16} /> Back to main menu
                  </div>

                  <DocsSidebar onNavItemClick={() => setMobileMenuOpen(false)} />
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
    </div>
  )
}

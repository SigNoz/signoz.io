'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Banner = () => {
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const [isHomePage, setIsHomePage] = useState(false)

  useEffect(() => {
    setIsHomePage(pathname === '/')
  }, [pathname])

  if (!visible || !isHomePage) return null

  //Uncomment the below code to launch a banner on homepage and comment our return null

  return (
    <div className="flex w-full min-w-0 items-center justify-center bg-indigo-500 py-2">
      <div className="flex w-full min-w-0 max-w-full items-center gap-3 px-4 md:relative md:justify-center">
        <Link
          href="https://signoz.io/blog/cloud-teams-plan-now-at-49usd/"
          className="min-w-0 flex-1 break-words text-base font-medium leading-5 text-white md:flex-none md:text-center"
        >
          We slashed SigNoz Cloud monthly base fee by 75% - learn more. 🥳
        </Link>
        <button
          type="button"
          className="shrink-0 text-white md:absolute md:right-4"
          onClick={() => setVisible(false)}
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default Banner

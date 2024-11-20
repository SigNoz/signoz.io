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
    <div className="flex w-full items-center justify-center bg-signoz_robin-500 py-2">
      <div className="flex w-full items-center justify-between px-4 md:justify-center">
        <Link href="https://lu.ma/1z2jr0yy" className="text-base font-medium leading-5 text-white">
          Join us for SigNoz Community call on 20th November 🚀
        </Link>
        <button className="text-white md:absolute md:right-4" onClick={() => setVisible(false)}>
          <X size={16} />
        </button>
      </div>
    </div>
  )

  // return null;
}

export default Banner

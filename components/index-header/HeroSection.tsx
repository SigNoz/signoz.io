'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'
import { useFeatureIsOn, useFeatureValue } from '@growthbook/growthbook-react'
import Cookies from 'js-cookie'
import { GB_UUID_COOKIE } from 'middleware'

export default function HeroSection() {
  // const feature1Enabled = useFeatureIsOn('feature1')
  const feature2Value = useFeatureValue('feature2', 'fallback')

  console.log('GB_UUID_COOKIE', Cookies.get(GB_UUID_COOKIE))

  return (
    <div className="!mx-auto mx-2 flex !w-[100vw] flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw] md:flex-row">
      <Button>
        <Link href="/teams/" className="flex-center">
          {feature2Value} - {Cookies.get(GB_UUID_COOKIE)}
          <ArrowRight size={14} />
        </Link>
      </Button>

      <Button type={Button.TYPES.SECONDARY}>
        <Link href="/docs/introduction/" className="flex-center">
          <BookOpen size={14} />
          Read Documentation
        </Link>
      </Button>
    </div>
  )
}

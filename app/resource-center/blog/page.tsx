import React from 'react'
import Blogs from './Blogs'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogHome() {
  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Blogs />
      </div>
    </div>
  )
}

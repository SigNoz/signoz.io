'use client'

import Image from 'next/image'
import Authors from '../constants/authors.json'
import React from 'react'

export default function AuthorInfo({ author }: { author: string }) {
  const handelAuthorClick = () => {
    window.open(Authors[author]?.url, '_blank')
  }

  return (
    <div className="my-2 flex h-9 cursor-pointer items-center gap-4" onClick={handelAuthorClick}>
      <Image
        className="m-0 rounded-full"
        src={Authors[author]?.image_url}
        alt="Rounded avatar"
        width={30}
        height={30}
      />

      <div className="flex flex-col">
        <h4 className="m-0 text-sm font-medium capitalize text-stone-700 dark:text-white">
          {Authors[author]?.name}
        </h4>
      </div>
    </div>
  )
}

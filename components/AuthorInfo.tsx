'use client'

import Image from 'next/image'
import React from 'react'

interface AuthorInfoProps {
  author: string
  authorData?: { name?: string; url?: string; image_url?: string }
}

export default function AuthorInfo({ author, authorData }: AuthorInfoProps) {
  const handelAuthorClick = () => {
    if (authorData?.url) {
      window.open(authorData.url, '_blank')
    }
  }

  return (
    <div className="my-2 flex h-9 cursor-pointer items-center gap-4" onClick={handelAuthorClick}>
      {authorData?.image_url && (
        <Image
          className="m-0 rounded-full"
          src={authorData.image_url}
          alt="Rounded avatar"
          width={30}
          height={30}
        />
      )}

      <div className="flex flex-col">
        <h4 className="m-0 text-sm font-medium capitalize text-stone-700 dark:text-white">
          {authorData?.name || author}
        </h4>
      </div>
    </div>
  )
}

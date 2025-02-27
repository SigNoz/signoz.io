'use client'

import Image from 'next/image'
import Authors from '../../constants/authors.json'

interface SidebarAuthorInfoProps {
  authors: string[]
}

const SidebarAuthorInfo = ({ authors }: SidebarAuthorInfoProps) => {
  const handelAuthorClick = (author: string) => {
    window.open(Authors[author]?.url, '_blank')
  }

  return (
    <div className="flex flex-col">
      {authors?.map((author) => (
        <div
          key={author}
          className="flex cursor-pointer items-center gap-2 py-1 text-gray-500 transition-colors hover:text-white"
          onClick={() => handelAuthorClick(author)}
        >
          <Image
            className="h-4 w-4 rounded-full"
            src={Authors[author]?.image_url}
            alt="Rounded avatar"
            width={16}
            height={16}
          />
          <span className="line-clamp-1 text-[11px]">{Authors[author]?.name}</span>
        </div>
      ))}
    </div>
  )
}

export default SidebarAuthorInfo

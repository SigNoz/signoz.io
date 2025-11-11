
'use client'

import Image from 'next/image'
import Authors from '../../constants/authors.json'

interface MobileAuthorInfoProps {
  authors: string[]
}

const MobileAuthorInfo = ({ authors }: MobileAuthorInfoProps) => {
  const handleAuthorClick = (author: string) => {
    window.open(Authors[author]?.url, '_blank')
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-signoz_ink-300 pb-6 lg:hidden">
      <h3 className="text-sm font-medium text-gray-400 m-0">
        {authors.length === 1 ? 'Author:' : 'Authors:'}
      </h3>
      <div className="flex flex-wrap gap-3">
        {authors?.map((author) => (
          <div
            key={author}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-signoz_ink-300 px-3 py-1.5 text-gray-300 transition-colors hover:text-white"
            onClick={() => handleAuthorClick(author)}
          >
            <Image
              className="h-4 w-4 rounded-full"
              src={Authors[author]?.image_url}
              alt={Authors[author]?.name || 'Author'}
              width={16}
              height={16}
            />
            <span className="text-xs">{Authors[author]?.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileAuthorInfo 
import { tocItemProps } from '@/layouts/PostLayout'
import React from 'react'

export default function BlogTOC({ toc }: { toc: tocItemProps[] }) {
  return (
    <div>
      {toc.map((tocItem: tocItemProps) => {
        return (
          <div className="post-toc-item" key={tocItem.url}>
            <a data-level={tocItem.depth} href={tocItem.url} className="line-clamp-2">
              {tocItem.value}
            </a>
          </div>
        )
      })}
    </div>
  )
}

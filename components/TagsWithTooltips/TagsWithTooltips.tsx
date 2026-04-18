'use client'

import React from 'react'
import { Badge } from '@signozhq/badge'
import { AppTooltip as Tooltip } from '@/components/ui/AppTooltip'
import { tagDefinitions } from '@/constants/tagDefinitions'

interface TagsWithTooltipsProps {
  tags: string[]
  className?: string
}

const TagsWithTooltips: React.FC<TagsWithTooltipsProps> = ({ tags, className = '' }) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tags?.map((tag) => {
        const tooltipContent = tagDefinitions[tag as keyof typeof tagDefinitions]

        return tooltipContent ? (
          <Tooltip
            key={tag}
            content={tooltipContent}
            side="right"
            contentClassName="max-w-96 break-words rounded-none border-signoz_slate-400 bg-signoz_ink-200 text-xs text-signoz_vanilla-100"
          >
            <div className="inline-flex items-center justify-center">
              <Badge color="vanilla" className="cursor-pointer transition-colors">
                {tag}
                <span className="sr-only"> - {tooltipContent}</span>
              </Badge>
            </div>
          </Tooltip>
        ) : (
          <Badge key={tag} color="vanilla" className="cursor-pointer text-xs transition-colors">
            {tag}
          </Badge>
        )
      })}
    </div>
  )
}

export default TagsWithTooltips

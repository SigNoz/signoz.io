'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
interface KeyPointCalloutProps {
  title?: string
  children: React.ReactNode
  defaultCollapsed?: boolean
}

const KeyPointCallout: React.FC<KeyPointCalloutProps> = ({ title, children, defaultCollapsed }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(Boolean(defaultCollapsed))

  return (
    <div className="my-8 w-full rounded-2xl border border-white/10 bg-white/5 text-gray-100 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <button
        type="button"
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          {title ? (
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-signoz_sakura-200">
              <span
                className="inline-block h-1.5 w-6 rounded-full bg-signoz_sakura-400/70"
                aria-hidden="true"
              />
              {title}
            </div>
          ) : (
            <span className="text-sm font-semibold text-signoz_sakura-100">Key point</span>
          )}
        </div>
        <span
          className={`text-sm font-medium text-gray-300 transition-transform ${
            isCollapsed ? 'rotate-0' : 'rotate-180'
          }`}
          aria-hidden="true"
        >
          <ChevronDown size={16} />
        </span>
      </button>
      <div
        className={`overflow-hidden px-6 pb-6 text-base leading-relaxed text-gray-100/90 transition-[max-height,opacity] duration-200 ${
          isCollapsed ? 'hidden opacity-0' : 'block max-h-[2000px] opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default KeyPointCallout

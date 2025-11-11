'use client'

import React from 'react'

interface KeyPointCalloutProps {
  title?: string
  children: React.ReactNode
}

const KeyPointCallout: React.FC<KeyPointCalloutProps> = ({ title, children }) => {
  return (
    <div className="my-8 w-full rounded-lg border-2 border-orange-500/30 bg-orange-500/10 px-6 pb-4 pt-6 shadow-md shadow-orange-500/20 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/15 hover:shadow-xl hover:shadow-orange-500/30">
      {title && <h4 className="mb-3 mt-0 text-lg font-bold text-orange-400">{title}</h4>}
      <div className="mb-0 text-base font-semibold leading-relaxed text-gray-200">{children}</div>
    </div>
  )
}

export default KeyPointCallout

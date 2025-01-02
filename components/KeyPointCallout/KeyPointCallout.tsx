'use client'

import React from 'react'

interface KeyPointCalloutProps {
  title?: string
  children: React.ReactNode
}

const KeyPointCallout: React.FC<KeyPointCalloutProps> = ({ title, children }) => {
  return (
    <div className="float-right clear-right mb-8 ml-8 w-[300px] rounded-lg border-2 border-orange-500/30 bg-orange-500/10 p-6 shadow-lg shadow-orange-500/20 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/15 hover:shadow-xl hover:shadow-orange-500/30">
      {title && <h4 className="mb-3 text-xl font-bold text-orange-400">{title}</h4>}
      <div className="text-lg font-semibold leading-relaxed text-gray-200">{children}</div>
    </div>
  )
}

export default KeyPointCallout

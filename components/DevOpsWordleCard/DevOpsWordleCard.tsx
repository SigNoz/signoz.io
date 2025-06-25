import React from 'react'
import TrackingLink from '../TrackingLink'
import { Lightbulb } from 'lucide-react'
import { getTodaysHint } from '../../app/todaysdevopswordle/lib/game-data'

interface DevOpsWordleCardProps {
  className?: string
}

const DevOpsWordleCard: React.FC<DevOpsWordleCardProps> = ({ className = '' }) => {
  const todaysHint = getTodaysHint()
  return (
    <TrackingLink
      href="/todaysdevopswordle"
      target="_blank"
      clickType="Card Click"
      clickName="Blog Sidebar Wordle Card"
      clickText="Play DevOps Wordle"
      clickLocation="Blog Right Sidebar"
      className={`group flex flex-col rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-black/80 p-5 transition-all duration-300 hover:border-gray-600/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Header with title and code brackets */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center justify-between">
          <h3 className="mb-0 mr-3 text-lg font-bold tracking-wide text-red-400 transition-all duration-300 group-hover:text-red-300">
            DEVOPS WORDLE
          </h3>
          <div className="font-mono text-sm text-blue-400 transition-colors group-hover:text-blue-300">
            &lt;/&gt;
          </div>
        </div>
      </div>

      {/* Today's Hint */}
      <div className="mb-6 flex items-start gap-3">
        <Lightbulb
          size={16}
          className="mt-0.5 flex-shrink-0 text-yellow-400 transition-colors group-hover:text-yellow-300"
        />
        <div className="flex flex-col">
          <div className="mb-1 text-sm font-semibold text-yellow-400 transition-colors group-hover:text-yellow-300">
            Today's Hint:
          </div>
          <p className="m-0 text-sm leading-relaxed text-gray-300 transition-colors group-hover:text-gray-200">
            {todaysHint}
          </p>
        </div>
      </div>

      {/* Play Now Button */}
      <div className="flex items-center justify-center rounded-lg bg-[#4558c4] px-6 py-3 text-sm font-semibold tracking-wide text-gray-200 transition-all duration-300 hover:bg-[#3a4aa3] hover:shadow-[0_0_10px_rgba(69,88,196,0.5)]">
        <span>PLAY NOW</span>
      </div>
    </TrackingLink>
  )
}

export default DevOpsWordleCard

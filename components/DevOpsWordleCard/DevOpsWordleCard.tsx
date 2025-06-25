import React from 'react'
import TrackingLink from '../TrackingLink'
import { Lightbulb, ArrowRight } from 'lucide-react'
import { getTodaysHint } from '../../app/todaysdevopswordle/lib/game-data'

interface DevOpsWordleCardProps {
  className?: string
}

const DevOpsWordleCard: React.FC<DevOpsWordleCardProps> = ({ className = '' }) => {
  const todaysHint = getTodaysHint()
  return (
    <div
      className={`group relative mb-12 rounded-2xl border-2 border-blue-500/60 bg-black/90 p-6 pb-8 transition-all duration-300 hover:border-blue-400/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] ${className}`}
    >
      <TrackingLink
        href="/todaysdevopswordle"
        target="_blank"
        clickType="Card Click"
        clickName="Blog Sidebar Wordle Card"
        clickText="Play DevOps Wordle"
        clickLocation="Blog Right Sidebar"
        className="block"
      >
        {/* Header with title and code brackets */}
        <div className="mb-4 flex items-center">
          <h3 className="mb-0 mr-3 text-lg font-bold text-red-400 transition-colors group-hover:text-red-300">
            DEVOPS WORDLE
          </h3>
          <div className="font-mono text-base text-blue-400 transition-colors group-hover:text-blue-300">
            &lt;/&gt;
          </div>
        </div>

        {/* Today's Hint */}
        <div className="mb-4 flex items-start gap-3">
          <Lightbulb
            size={20}
            className="mt-1 flex-shrink-0 text-blue-400 transition-colors group-hover:text-blue-300"
          />
          <div className="flex flex-col">
            <div className="mb-2 text-base font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
              Today's hint
            </div>
            <p className="m-0 text-sm leading-relaxed text-gray-300 transition-colors group-hover:text-gray-200">
              {todaysHint}
            </p>
          </div>
        </div>
      </TrackingLink>

      {/* Play Now Button - positioned on bottom border */}
      <TrackingLink
        href="/todaysdevopswordle"
        target="_blank"
        clickType="Button Click"
        clickName="Blog Sidebar Wordle Button"
        clickText="Play DevOps Wordle"
        clickLocation="Blog Right Sidebar"
        className="absolute -bottom-[1.4rem] left-1/2 w-[70%] -translate-x-1/2 transform"
      >
        <div className="flex items-center justify-center rounded-lg bg-[#4558c4] py-3 pl-8 pr-6 text-sm font-semibold tracking-wide text-gray-200 transition-all duration-300 hover:bg-[#3a4aa3] hover:shadow-[0_0_10px_rgba(69,88,196,0.5)]">
          <span>PLAY NOW</span>
          <ArrowRight
            size={16}
            className="ml-2 transition-all duration-300 group-hover:translate-x-1"
          />
        </div>
      </TrackingLink>
    </div>
  )
}

export default DevOpsWordleCard

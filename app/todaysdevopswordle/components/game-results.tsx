'use client'

import { FaTrophy } from 'react-icons/fa6'
import { FaSadTear } from 'react-icons/fa'
import { Orbitron, Lexend } from 'next/font/google'
import TrackingLink from '../../../components/TrackingLink'
import { getCurrentGameData } from '../lib/game-data'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] })

interface GameResultsProps {
  isWon: boolean
  score: number
  timeTaken: number
  targetWord: string
  guesses: string[]
  onBackToOverview?: () => void
}

export function GameResults({
  isWon,
  score = 0,
  timeTaken,
  targetWord,
  guesses,
  onBackToOverview,
}: GameResultsProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 rounded-lg border-2 bg-black/30 p-8 backdrop-blur-md ${isWon ? 'neon-box-border border-[#233457]' : 'neon-box-red border-[#cc3939]'} relative mx-auto mb-12 mt-9 w-full max-w-[600px] ${lexend.className}`}
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform">
        {isWon ? (
          <FaTrophy className="neon-text-blue trophy-animate h-16 w-16 text-[#4558c4]" />
        ) : (
          <FaSadTear className="neon-text-red sad-animate h-16 w-16 text-[#da4b48]" />
        )}
      </div>

      <div className="pt-2 text-center">
        <div className={`text-[24px] text-gray-400`}>
          {isWon ? "Wooohoooo! You've Won." : 'Oops, better luck next time!'}
        </div>
      </div>

      {/* Score Section */}
      <div className="space-y-4 text-center">
        <div className={`neon-text text-4xl text-[#FF4C4C] sm:text-5xl ${orbitron.className}`}>
          {score}
          <span className={`ml-2 text-sm ${lexend.className}`}>pts</span>
        </div>
      </div>

      {/* Back to Overview CTA */}
      {onBackToOverview && (
        <div className="text-center">
          <button
            onClick={onBackToOverview}
            className={`neon-text-blue text-base font-[500] tracking-wider hover:cursor-pointer hover:text-[#5569d7] hover:underline sm:text-lg ${orbitron.className}`}
          >
            ← Back to Overview
          </button>
        </div>
      )}

      {/* Daily Release Info */}
      <div className="pt-2 text-center">
        <p className="text-base text-gray-400">
          <TrackingLink
            href="https://x.com/signozhq"
            target="_blank"
            clickType="external_link"
            clickName="x_twitter_follow"
            clickLocation="game_results"
            clickText="~ A new wordle is released daily on X ~"
            className="inline-block text-[#4558c4] transition-colors hover:text-[#5569d7] hover:underline"
          >
            ~ Follow us on X for daily wordle updates ~
          </TrackingLink>
        </p>
      </div>

      {/* Separator */}
      <div className="flex w-full justify-center">
        <div className="h-[2px] w-[80%] bg-gradient-to-r from-transparent via-[#da4b48] to-transparent opacity-40"></div>
      </div>

      {/* Word Information */}
      <div className="space-y-3 text-center">
        <p className="text-[15px] leading-[1.6] text-gray-400">
          {getCurrentGameData().info}
        </p>
        <TrackingLink
          href={getCurrentGameData().link}
          target="_blank"
          clickType="external_link"
          clickName="blog_post_link"
          clickLocation="game_results"
          clickText={`Read something cool on ${targetWord.toLowerCase()} here!`}
          className={`inline-block text-sm text-[#4558c4] transition-colors hover:text-[#5569d7] hover:underline`}
        >
          Read something cool on {targetWord.toLowerCase()} here! →
        </TrackingLink>
      </div>

      {/* Motivational Section for Lost State */}
      {!isWon && (
        <div className="text-center">
          <div className="rounded-lg border border-[#4558c4]/30 bg-[#4558c4]/10 p-4">
            <p className="m-0 text-sm text-gray-300">
              <span className="font-medium text-[#4558c4]">Good news!</span> 73% of players who miss
              their first word perform better the next day. Plus, you just learned a new DevOps
              concept! 🧠
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

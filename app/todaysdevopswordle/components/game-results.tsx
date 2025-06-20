'use client'

import { FaLink, FaTrophy } from 'react-icons/fa6'
import { FaSadTear } from 'react-icons/fa'
import { FaLinkedin, FaTwitter, FaCopy } from 'react-icons/fa'
import { Orbitron, Lexend } from 'next/font/google'
import { useState } from 'react'
import TrackingButton from '../../../components/TrackingButton'
import TrackingLink from '../../../components/TrackingLink'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] })

interface GameResultsProps {
  isWon: boolean
  score: number
  timeTaken: number
  targetWord: string
  guesses: string[]
}

export function GameResults({
  isWon,
  score = 0,
  timeTaken,
  targetWord,
  guesses,
}: GameResultsProps) {
  const [isCopied, setIsCopied] = useState(false)

  function generateEmojiMatrix() {
    return guesses
      .map((guess) => {
        return guess
          .split('')
          .map((letter, index) => {
            letter = letter.toUpperCase()
            if (targetWord[index] === letter) {
              return '🟦'
            } else if (targetWord.includes(letter)) {
              return '🟨'
            } else {
              return '🟥'
            }
          })
          .join('')
      })
      .join('\n')
  }

  function generateShareText() {
    const formattedTime = `${Math.floor(timeTaken / 60)}:${timeTaken % 60}`
    if (guesses.length === 0) {
      return `Hey there, I just played today's DevOps Wordle by SigNoz and got a score of ${score}. Can you beat me 😉? Try it out at https://signoz.io/todaysdevopswordle.`
    } else {
      const emojiMatrix = generateEmojiMatrix()
      return `Hey there, I just played today's DevOps Wordle by SigNoz and got a score of ${score} in ${formattedTime} minutes. Can you beat me 😉? Here's my game: \n\n${emojiMatrix}\n\nTry it out at https://signoz.io/todaysdevopswordle.`
    }
  }

  const handleShare = async () => {
    const shareText = generateShareText()
    try {
      await navigator.clipboard.writeText(shareText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 5000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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

      <div className="text-center">
        <div className={`neon-text text-4xl text-[#FF4C4C] sm:text-5xl ${orbitron.className}`}>
          {score}
          <span className={`ml-2 text-sm ${lexend.className}`}>pts</span>
        </div>
      </div>


      <div className="x-cta text-center pt-1" > 
        <p className="text-gray-400 text-[18px] ">
        <TrackingLink
            href="https://x.com/signozhq"
            target="_blank"
            clickType="external_link"
            clickName="x_twitter_follow"
            clickLocation="game_results"
            clickText="~ A new wordle is released every midnight on X ~"
            className="inline-block text-[#4558c4] hover:text-[#5569d7] hover:underline"
          >
            ~ A new wordle is released daily on X ~
          </TrackingLink>        
          </p>
      </div>

      {/* Tapering red line separator */}
      <div className="flex w-full justify-center">
        <div className="h-[2px] w-[80%] bg-gradient-to-r from-transparent via-[#da4b48] to-transparent opacity-40"></div>
      </div>

      <div className="mb-10 text-center">
        <p className="text-[15px] leading-[1.6] text-gray-400">
          Today's word was '{targetWord}' which permits unlimited read/write access to resources within a namespace. This role can create roles 
          and role bindings within a particular namespace. It does not permit write access to the namespace itself.
        </p>
        <TrackingLink
          href="https://medium.com/@maheshwar.ramkrushna/draining-and-uncordoning-in-kubernetes-managing-pod-eviction-and-node-scheduling-8a37ce15a3ae"
          target="_blank"
          clickType="external_link"
          clickName="blog_post_link"
          clickLocation="game_results"
          clickText={`Read something cool on ${targetWord.toLowerCase()} here!`}
          className={`inline-block text-sm text-[#4558c4] hover:text-[#5569d7] hover:underline`}
        >
          Read something cool on {targetWord.toLowerCase()} here!
        </TrackingLink>
      </div>

      <div className="mb-5 text-center">
        <p className="text-[15px] leading-[1.6] text-gray-400">
          Share score with your DevOps buddies & see if they can beat you!
        </p>
      </div>

      <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 transform flex-col items-center">
        <div className="mb-4 flex gap-4">
          <TrackingButton
            clickType="share"
            clickName="linkedin_share"
            clickLocation="game_results"
            clickText="Share on LinkedIn"
            className={`h-12 w-12 rounded-full border-2 bg-black ${isWon ? 'neon-box-border border-[#233457]' : 'neon-box-red border-[#cc3939]'} share-button-neon flex items-center justify-center text-white shadow-lg hover:shadow-xl`}
            onClick={() => {
              const shareText = generateShareText()
              const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://wordle.signoz.io/todayswordle')}`
              // Copy text to clipboard for easy pasting
              navigator.clipboard.writeText(shareText)
              window.open(linkedinUrl, '_blank')
            }}
            title="Share on LinkedIn"
          >
            <FaLinkedin
              className={`h-5 w-5 ${isWon ? 'neon-text-blue text-[#4558c4]' : 'neon-text text-[#FF4C4C]'}`}
            />
          </TrackingButton>

          <TrackingButton
            clickType="share"
            clickName="twitter_share"
            clickLocation="game_results"
            clickText="Share on X"
            className={`h-12 w-12 rounded-full border-2 bg-black ${isWon ? 'neon-box-border border-[#233457]' : 'neon-box-red border-[#cc3939]'} share-button-neon flex items-center justify-center text-white shadow-lg transition-colors duration-300 hover:shadow-xl`}
            onClick={() => {
              const shareText = generateShareText()
              const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
              window.open(twitterUrl, '_blank')
            }}
            title="Share on X"
          >
            <FaTwitter
              className={`h-5 w-5 ${isWon ? 'neon-text-blue text-[#4558c4]' : 'neon-text text-[#FF4C4C]'}`}
            />
          </TrackingButton>

          <TrackingButton
            clickType="share"
            clickName="copy_share"
            clickLocation="game_results"
            clickText="Copy to clipboard"
            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-black text-white shadow-lg transition-colors duration-300 hover:shadow-xl ${isWon ? 'neon-box-border border-[#233457]' : 'neon-box-red border-[#cc3939]'} share-button-neon`}
            onClick={handleShare}
            title={isCopied ? 'Copied!' : 'Copy to clipboard'}
          >
            <FaLink
              className={`h-5 w-5 ${isWon ? 'neon-text-blue text-[#4558c4]' : 'neon-text text-[#FF4C4C]'}`}
            />
          </TrackingButton>
        </div>
      </div>
    </div>
  )
}

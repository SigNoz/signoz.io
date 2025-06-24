'use client'

import { FaLink, FaTrophy } from 'react-icons/fa6'
import { FaSadTear } from 'react-icons/fa'
import { FaLinkedin, FaTwitter, FaCopy, FaShare } from 'react-icons/fa'
import { Orbitron, Lexend } from 'next/font/google'
import { useState, useEffect } from 'react'
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
  const [supportsNativeShare, setSupportsNativeShare] = useState(false)

  // Only check for Web Share API support (not device type)
  useEffect(() => {
    const checkShareSupport = () => {
      setSupportsNativeShare(typeof navigator.share !== 'undefined')
    }

    checkShareSupport()
  }, [])

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
    const formattedTime = `${Math.floor(timeTaken / 60)}:${String(timeTaken % 60).padStart(2, '0')}`

    if (isWon) {
      if (guesses.length === 0) {
        return `🎉 Just crushed today's DevOps Wordle by SigNoz and scored ${score} points! Can you beat me? Try it out at https://signoz.io/todaysdevopswordle.`
      } else {
        const emojiMatrix = generateEmojiMatrix()
        return `🎉 Just crushed today's DevOps Wordle by SigNoz! Scored ${score} points in ${formattedTime}. Can you beat me? Here's my game: \n\n${emojiMatrix}\n\nTry it out at https://signoz.io/todaysdevopswordle.`
      }
    } else {
      // Lost state - focus on challenge
      return `🤔 Today's DevOps Wordle stumped me! The word was '${targetWord}' - think you can solve it? Challenge yourself at https://signoz.io/todaysdevopswordle and see if you're smarter than me! 😉`
    }
  }

  const handleShare = async () => {
    const shareText = generateShareText()
    try {
      await navigator.clipboard.writeText(shareText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleNativeShare = async () => {
    const shareText = generateShareText()
    const shareData = {
      title: 'DevOps Wordle by SigNoz',
      text: shareText,
      url: 'https://signoz.io/todaysdevopswordle',
    }

    try {
      if (navigator.share && supportsNativeShare) {
        await navigator.share(shareData)
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(shareText)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 3000)
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share:', err)
        // Fallback to clipboard copy on error
        try {
          await navigator.clipboard.writeText(shareText)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 3000)
        } catch (clipboardErr) {
          console.error('Failed to copy to clipboard:', clipboardErr)
        }
      }
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

      {/* Score and Primary CTA Section */}
      <div className="space-y-4 text-center">
        <div className={`neon-text text-4xl text-[#FF4C4C] sm:text-5xl ${orbitron.className}`}>
          {score}
          <span className={`ml-2 text-sm ${lexend.className}`}>pts</span>
        </div>

        {/* Primary Share CTA - Mobile vs Desktop via CSS */}
        <div className="flex flex-col items-center space-y-3">
          <p className="text-base font-medium text-gray-300">
            {isWon
              ? 'Share your victory with friends!'
              : `Think your friends can solve '${targetWord}'? Challenge them!`}
          </p>

          {/* Mobile Native Share Button - Hidden on desktop via CSS */}
          {supportsNativeShare && (
            <TrackingButton
              clickType="share"
              clickName="native_share_mobile"
              clickLocation="game_results"
              clickText={isWon ? 'Share Results' : 'Challenge Friends'}
              className={`block w-full max-w-[280px] rounded-lg px-6 py-3 text-base font-medium transition-all duration-300 md:hidden ${
                isWon
                  ? 'neon-box-blue border-[#4558c4] bg-[#4558c4] text-white hover:bg-[#3a4aa3]'
                  : 'neon-box-red border-[#FF4C4C] bg-[#FF4C4C] text-white hover:bg-[#e63946]'
              } flex items-center justify-center gap-2 border-2 shadow-lg hover:scale-105`}
              onClick={handleNativeShare}
            >
              <FaShare className="h-4 w-4" />
              {isWon ? 'Share Results' : 'Challenge Friends'}
            </TrackingButton>
          )}

          {/* Desktop Copy Button - Hidden on mobile via CSS */}
          <TrackingButton
            clickType="share"
            clickName="copy_share_primary"
            clickLocation="game_results"
            clickText={isCopied ? 'Copied!' : isWon ? 'Copy Score & Results' : 'Challenge Friends'}
            className={`${supportsNativeShare ? 'hidden md:flex' : 'flex'} w-full max-w-[280px] rounded-lg px-6 py-3 text-base font-medium transition-all duration-300 ${
              isCopied
                ? 'border-green-500 bg-green-600 text-white'
                : isWon
                  ? 'neon-box-blue border-[#4558c4] bg-[#4558c4] text-white hover:bg-[#3a4aa3]'
                  : 'neon-box-red border-[#FF4C4C] bg-[#FF4C4C] text-white hover:bg-[#e63946]'
            } flex items-center justify-center gap-2 border-2 shadow-lg hover:scale-105`}
            onClick={handleShare}
          >
            {isCopied ? (
              <>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <FaCopy className="h-4 w-4" />
                {isWon ? 'Copy Score & Results' : 'Challenge Friends'}
              </>
            )}
          </TrackingButton>
        </div>
      </div>

      {/* Secondary Social Share Options - Hidden on mobile via CSS */}
      <div className="hidden space-y-3 text-center md:block">
        <p className="text-sm text-gray-400">
          {isWon ? 'Or share directly on:' : 'Or challenge friends on:'}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackingButton
            clickType="share"
            clickName="linkedin_share"
            clickLocation="game_results"
            clickText="Share on LinkedIn"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#0077B5] bg-[#0077B5] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:border-[#005885] hover:bg-[#005885] hover:shadow-lg sm:w-auto"
            onClick={() => {
              const shareText = generateShareText()
              const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://signoz.io/todaysdevopswordle')}`
              navigator.clipboard.writeText(shareText)
              window.open(linkedinUrl, '_blank')
            }}
            title="Share on LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" />
            {isWon ? 'Share on LinkedIn' : 'Challenge on LinkedIn'}
          </TrackingButton>

          <TrackingButton
            clickType="share"
            clickName="twitter_share"
            clickLocation="game_results"
            clickText="Share on X"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-700 bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:border-gray-600 hover:bg-gray-900 hover:shadow-lg sm:w-auto"
            onClick={() => {
              const shareText = generateShareText()
              const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
              window.open(twitterUrl, '_blank')
            }}
            title="Share on X"
          >
            <FaTwitter className="h-4 w-4" />
            {isWon ? 'Share on X' : 'Challenge on X'}
          </TrackingButton>
        </div>
      </div>

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
          Today's word was '<span className="font-medium text-[#4558c4]">{targetWord}</span>' which
          is a command that allows you to apply small, precise updates to live Kubernetes
          resources—such as changing an image or updating labels—without replacing their entire YAML
        </p>
        <TrackingLink
          href="https://komodor.com/learn/kubectl-patch-changing-kubernetes-objects-in-place"
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

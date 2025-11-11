'use client'

import React from 'react'
import { Root, Portal, Overlay, Content } from 'vaul'
import { HiLightBulb } from 'react-icons/hi2'
import { IoHeart } from 'react-icons/io5'
import { Orbitron, Lexend } from 'next/font/google'
import { GameStatus } from '../types'
import { getGameDataByDay } from '../lib/game-data'
import TrackingButton from '../../../components/TrackingButton'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] })

interface HowToPlayDrawerProps {
  isOpen: boolean
  onClose: () => void
  onStartGame: () => void
  gameState: GameStatus
  elapsedTime?: number
  selectedDay?: string | null
  onBackToOverview?: () => void
}

export function HowToPlayDrawer({
  isOpen,
  onClose,
  onStartGame,
  gameState,
  elapsedTime = 0,
  selectedDay,
  onBackToOverview,
}: HowToPlayDrawerProps) {
  const gameData = selectedDay ? getGameDataByDay(selectedDay) : null
  const todaysHint = gameData?.hint || "No hint available"
  const minutes = Math.floor(elapsedTime / 60)
  const seconds = elapsedTime % 60

  const renderButton = () => {
    switch (gameState) {
      case GameStatus.NOT_STARTED:
        return (
          <TrackingButton
            onClick={onStartGame}
            clickType="game_action"
            clickName="start_game"
            clickLocation="how_to_play_drawer"
            clickText="START GAME"
            className={`game-button neon-box-blue w-60 rounded-lg bg-[#4558c4] px-6 py-3 text-base font-[500] tracking-wider text-gray-900 sm:text-lg ${orbitron.className}`}
          >
            START GAME
          </TrackingButton>
        )
      case GameStatus.PLAYING:
        return (
          <div className="space-y-3 text-center">
            <div className={`neon-text text-3xl text-[#4558c4] ${orbitron.className}`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="flex justify-center">
              <div
                onClick={onClose}
                className={`neon-text-blue w-60 text-base font-[500] tracking-wider hover:cursor-pointer hover:text-[#5569d7] hover:underline sm:text-lg ${orbitron.className}`}
              >
                BACK TO GAME &gt;&gt;
              </div>
            </div>
          </div>
        )
      case GameStatus.WON:
      case GameStatus.LOST:
        return (
          <div className="space-y-3 text-center">
            <div className={`text-gray-400`}>Try another day or come back later!</div>
            <div className="flex justify-center">
              <div
                onClick={onClose}
                className={`neon-text-blue text-base font-[500] tracking-wider hover:cursor-pointer hover:text-[#5569d7] hover:underline sm:text-lg ${orbitron.className}`}
              >
                View Stats &gt;&gt;
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Root open={isOpen} onOpenChange={onClose} dismissible={false}>
      <Portal>
        <Overlay className="fixed inset-0 z-[3147483646] bg-black/80" />
        <Content
          className={`fixed bottom-0 left-0 right-0 z-[3147483646] flex h-[98%] flex-col rounded-t-[30px] bg-black/80 ${lexend.className}`}
        >
          <div className="absolute inset-0 rounded-t-[30px] bg-gradient-to-br from-[#FF4C4C]/10 via-[#FF4C4C]/10 to-[#FF4C4C]/15" />
          <div className="absolute inset-0 rounded-t-[30px] bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="relative flex-1 overflow-auto rounded-t-[30px] bg-gradient-to-b from-black/50 to-transparent p-3">
            <div className="mx-auto max-w-md space-y-8 sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <h2
                className={`neon-text mb-[60px] text-center text-4xl font-light tracking-wider ${orbitron.className}`}
              >
                DEVOPS WORDLE &lt;/&gt;
              </h2>

              {gameData && (
                <div className="neon-box-border hint-box-attention relative rounded-lg border border-[#233457] bg-[#1B224B]/30 p-6">
                  <p className="m-0 text-center text-base text-gray-400 sm:text-lg">
                    {gameData.dayId.replace('day-', 'Day ')} hint: {todaysHint}
                  </p>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform ">
                    <HiLightBulb className="neon-bulb bulb-illuminate h-10 w-10 text-[#4558c4]" />
                  </div>
                </div>
              )}

              <div className="space-y-6 pb-4">
                <h3
                  className={`items-center text-center text-xl font-[400] text-[#4558c4] sm:text-2xl ${orbitron.className}`}
                >
                  HOW TO PLAY
                </h3>
                <div className="space-y-1">
                  <div className="flex w-full items-center justify-center gap-4 text-gray-400">
                    <p className="flex-1 text-center text-base sm:text-lg">
                      This is a 5 letter word and you have 5 guesses. Score is based on the time
                      taken to crack it.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 place-items-center gap-3 sm:grid-cols-3 sm:place-items-center sm:gap-8">
                  <div className="flex items-center gap-3 text-center">
                    <div className="neon-box-red h-5 w-5 rounded bg-[#FF4C4C] sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    <span className="text-sm text-gray-400 sm:text-base">
                      Letter not present in the word
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-center">
                    <div className="neon-box-blue h-5 w-5 rounded bg-[#4558c4] sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    <span className="text-sm text-gray-400 sm:text-base">
                      Letter present & correct spot
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-center">
                    <div className="neon-box-yellow h-5 w-5 rounded bg-yellow-600 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    <span className="text-sm text-gray-400 sm:text-base">
                      Letter present but wrong spot
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative pt-4">
                <div className="absolute left-0 right-0 top-2 h-[2px] bg-gradient-to-r from-transparent via-[#FF4C4C]/30 to-transparent" />

                <p className="pt-5 text-center text-[16px] leading-[1.5] text-gray-400 sm:text-[16px] lg:text-[16px]">
                  This game was created to help you learn the evolving language of observability,
                  DevOps, and monitoring in a playful way. After each game, you'll find resources to
                  explore the day's word.
                </p>
              </div>

              <div className="relative flex flex-col items-center space-y-4 pt-4">
                {/* Back to Overview Button - Always visible */}
                {onBackToOverview && (
                  <button
                    onClick={onBackToOverview}
                    className={`neon-text-blue text-base font-[500] tracking-wider hover:cursor-pointer hover:text-[#5569d7] hover:underline sm:text-lg ${orbitron.className}`}
                  >
                    ← Back to Overview
                  </button>
                )}
                
                {/* Main CTA Button */}
                {renderButton()}
              </div>
              
              <div className="relative z-[1] pt-8 text-center">
                <p className={`text-[12px] text-gray-400 ${lexend.className}`}>
                  Made with{' '}
                  <IoHeart className="neon-heart inline h-6 w-9 px-1 pb-1 text-[#FF4C4C]" /> by{' '}
                  <a
                    href="https://signoz.io"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SigNoz
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  )
}

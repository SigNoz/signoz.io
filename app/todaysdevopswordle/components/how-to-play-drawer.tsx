'use client';

import React from 'react';
import { Root, Portal, Overlay, Content } from 'vaul';
import { HiLightBulb } from 'react-icons/hi2';
import { IoHeart } from 'react-icons/io5';
import { Orbitron, Lexend } from 'next/font/google';
import { GameStatus } from '../types';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500'] });
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] });
const HINT = "I keep asking: are you alive and well?"

interface HowToPlayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
  gameState: GameStatus;
  elapsedTime?: number;
}

export function HowToPlayDrawer({ 
  isOpen, 
  onClose, 
  onStartGame, 
  gameState,
  elapsedTime = 0
}: HowToPlayDrawerProps) {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const renderButton = () => {
    switch (gameState) {
      case GameStatus.NOT_STARTED:
        return (
          <button
            onClick={onStartGame}
            className={`w-60 bg-[#4558c4] text-gray-900 py-3 px-6 rounded-lg tracking-wider text-base sm:text-lg font-[500] game-button neon-box-blue ${orbitron.className}`}
          >
            START GAME
          </button>
        );
      case GameStatus.PLAYING:
        return (
          <div className="space-y-3 text-center">
            <div className={`text-[#4558c4] text-3xl neon-text ${orbitron.className}`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="flex justify-center">
            <div 
              onClick={onClose}
              className={`w-60 tracking-wider text-base sm:text-lg font-[500] neon-text-blue hover:underline hover:text-[#5569d7] hover:cursor-pointer ${orbitron.className}`}
            >
              BACK TO GAME &gt;&gt;
            </div>
            </div>
          </div>
        );
      case GameStatus.WON:
      case GameStatus.LOST:
        return (
          <div className="space-y-3 text-center">
            <div className={`text-gray-400`}>
              Come back tomorrow for another game!
            </div>
            <div className="flex justify-center">
              <div 
                onClick={onClose}
                className={`tracking-wider text-base sm:text-lg font-[500] neon-text-blue hover:underline hover:text-[#5569d7] hover:cursor-pointer ${orbitron.className}`}
              >
                View Stats &gt;&gt;
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Root 
      open={isOpen} 
      onOpenChange={onClose} 
      dismissible={false}
    >
      <Portal>
        <Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Content className={`bg-black/80 flex flex-col rounded-t-[30px] h-[98%] fixed bottom-0 left-0 right-0 z-50 ${lexend.className}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4C4C]/10 via-[#FF4C4C]/10 to-[#FF4C4C]/15 rounded-t-[30px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-[30px]" />
          <div className="p-3 bg-gradient-to-b from-black/50 to-transparent rounded-t-[30px] flex-1 overflow-auto relative">
            <div className="max-w-md mx-auto space-y-8 sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <h2 className={`neon-text text-4xl text-center font-light tracking-wider mb-[60px] ${orbitron.className}`}>
                DEVOPS WORDLE &lt;/&gt;
              </h2>

              <div className="bg-[#1B224B]/30 rounded-lg p-6 border border-[#233457] relative neon-box-border hint-box-attention">
                <p className="text-gray-400 text-center text-base sm:text-lg">
                Today's hint: {HINT}
                </p>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 ">
                  <HiLightBulb className="w-10 h-10 text-[#4558c4] neon-bulb bulb-illuminate" />
                </div>
              </div>



              <div className="space-y-6 pb-4">
                <h3 className={`text-[#4558c4] font-[400] text-xl sm:text-2xl text-center items-center ${orbitron.className}`}>HOW TO PLAY</h3>
                <div className="space-y-1">
                <div className="flex items-center justify-center gap-4 text-gray-400 w-full">
                  <p className="text-base sm:text-lg flex-1 text-center">This is a 5 letter word and you have 5 guesses. Score is based on the time taken to crack it.</p>
                </div>
              </div>

                <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 gap-3 sm:gap-8 sm:place-items-center">
                  <div className="flex items-center text-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#FF4C4C] rounded neon-box-red" />
                    <span className="text-gray-400 text-sm sm:text-base">Letter not present in the word</span>
                  </div>
                  <div className="flex items-center text-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#4558c4] rounded neon-box-blue" />
                    <span className="text-gray-400 text-sm sm:text-base">Letter present & correct spot</span>
                  </div>
                  <div className="flex items-center text-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-600 rounded neon-box-yellow" />
                    <span className="text-gray-400 text-sm sm:text-base">Letter present but wrong spot</span>
                  </div>
                </div>
              </div>

              
              <div className="pt-4 relative">
                <div className="absolute top-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4C4C]/30 to-transparent" />

                <p className="text-gray-400 pt-5 text-center text-[16px] sm:text-[16px] lg:text-[16px] leading-[1.5]">
                This game was created to help you learn the evolving language of observability, DevOps, and monitoring in a playful way. 
                After each game, you'll find resources to explore the day's word. 
                </p>
              </div>

              <div className="pt-4 relative flex justify-center">
                {renderButton()}
              </div>
              <div className="relative z-[1] text-center pt-8">
              <p className={`text-gray-400 text-[12px] ${lexend.className}`}>
                Made with <IoHeart className="inline w-9 h-6 text-[#FF4C4C] neon-heart px-1 pb-1" /> by{' '}
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
  );
} 
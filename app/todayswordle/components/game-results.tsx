'use client';

import { FaTrophy } from 'react-icons/fa6';
import { FaSadTear } from 'react-icons/fa';
import { Orbitron, Lexend } from 'next/font/google';
import { useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500'] });
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] });

interface GameResultsProps {
  isWon: boolean;
  score: number;
  timeTaken: number;
  targetWord: string;
}

export function GameResults({ isWon, score = 0, timeTaken, targetWord }: GameResultsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    // const shareText = `🎮 SigNoz Wordle\n🏆 Score: ${score} pts\n🎯 Word: ${targetWord}\n\nPlay now at ${window.location.href}`;
    const shareText = `Hey there, I just played today's Wordle by SigNoz and got a score of ${score}. Can you beat me 😉? Try it out at ${window.location.href}`
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-6 p-8 bg-black/30 backdrop-blur-md rounded-lg border-2 ${isWon ? 'border-[#233457] neon-box-border' : 'border-[#cc3939] neon-box-red'} relative mt-12 max-w-[600px] w-full mx-auto ${lexend.className}`}>
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        {isWon ? (
          <FaTrophy className="w-16 h-16 text-[#4558c4] neon-text-blue trophy-animate" />
        ) : (
          <FaSadTear className="w-16 h-16 text-[#da4b48] neon-text-red sad-animate" />
        )}
      </div>

      <div className="text-center pt-6">
        <div className={`text-[24px] text-gray-400`}>
          {isWon ? "Wooohoooo! You've Won." : "Oops, better luck next time!"}
        </div>
      </div>

      <div className="text-center mt-4">
        <div className={`text-4xl sm:text-5xl neon-text text-[#FF4C4C] ${orbitron.className}`}>
          {score}
          <span className={`text-sm ml-2 ${lexend.className}`}>pts</span>
        </div>
      </div>

      <div className="text-center mt-4">
        <div className={`text-gray-400 text-[16px]`}>
          Come back tomorrow for a new challenge!
        </div>
      </div>

      {/* Tapering red line separator */}
      <div className="w-full flex justify-center mt-4">
        <div className="h-[2px] w-[80%] bg-gradient-to-r from-transparent via-[#da4b48] to-transparent opacity-40"></div>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm sm:text-base">
          Today's word was '{targetWord}' which are key-value-effect labels applied to nodes to repel pods, only those with matching tolerations can be scheduled onto those nodes. 
          You can apply a Taint to a node using the kubectl taint command.
        </p>
        <a 
          href="https://medium.com/@manojkumar_41904/understanding-taints-and-tolerations-in-kubernetes-with-example-37739afa930b" 
          target="_blank"
          className={`text-[#4558c4] hover:text-[#5569d7] mt-2 inline-block hover:underline`}
        >
          Read more about it here!
        </a>
      </div>

      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <button 
          className={`text-gray-900 py-3 px-6 rounded-lg tracking-wider text-base sm:text-sm font-[500] w-[200px] sm:w-[400px] ${orbitron.className} relative game-button ${isWon ? 'bg-[#4558c4] neon-box-blue' : 'bg-[#da4b48] neon-box-red'}`}
          onClick={handleShare}
        >
          {isCopied ? 'Copied to clipboard! ' : 'Share with fellow SRE peeps!'}
        </button>
      </div>

      <div className="h-8" /> {/* Spacer for the absolute positioned button */}
    </div>
  );
} 
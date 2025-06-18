'use client';

import { FaLink, FaTrophy } from 'react-icons/fa6';
import { FaSadTear } from 'react-icons/fa';
import { FaLinkedin, FaTwitter, FaCopy } from 'react-icons/fa';
import { Orbitron, Lexend } from 'next/font/google';
import { useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500'] });
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] });

interface GameResultsProps {
  isWon: boolean;
  score: number;
  timeTaken: number;
  targetWord: string;
  guesses: string[];
}

export function GameResults({ isWon, score = 0, timeTaken, targetWord, guesses }: GameResultsProps) {
  const [isCopied, setIsCopied] = useState(false);

  function generateEmojiMatrix ()
   {
    return guesses.map(guess => {
      return guess.split('').map((letter, index) => {
        letter = letter.toUpperCase();
        if (targetWord[index] === letter) {
          return '🟦'; 
        } else if (targetWord.includes(letter)) {
          return '🟨'; 
        } else {
          return '🟥';
        }
      }).join('');
    }).join('\n');
  };

  function generateShareText () {
    const formattedTime = `${Math.floor(timeTaken/60)}:${timeTaken%60}`;
    if (guesses.length === 0) {
      return `Hey there, I just played today's DevOps Wordle by SigNoz and got a score of ${score}. Can you beat me 😉? Try it out at https://signoz.io/todaysdevopswordle.`;
    } else {
      const emojiMatrix = generateEmojiMatrix();
      return `Hey there, I just played today's DevOps Wordle by SigNoz and got a score of ${score} in ${formattedTime} minutes. Can you beat me 😉? Here's my game: \n\n${emojiMatrix}\n\nTry it out at https://signoz.io/todaysdevopswordle.`;
    }
  }


  const handleShare = async () => {
    const shareText = generateShareText();
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-6 p-8 bg-black/30 backdrop-blur-md rounded-lg border-2 ${isWon ? 'border-[#233457] neon-box-border' : 'border-[#cc3939] neon-box-red'} relative mt-9 max-w-[600px] w-full mx-auto mb-12 ${lexend.className}`}>
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        {isWon ? (
          <FaTrophy className="w-16 h-16 text-[#4558c4] neon-text-blue trophy-animate" />
        ) : (
          <FaSadTear className="w-16 h-16 text-[#da4b48] neon-text-red sad-animate" />
        )}
      </div>

      <div className="text-center pt-2">
        <div className={`text-[24px] text-gray-400`}>
          {isWon ? "Wooohoooo! You've Won." : "Oops, better luck next time!"}
        </div>
      </div>

      <div className="text-center">
        <div className={`text-4xl sm:text-5xl neon-text text-[#FF4C4C] ${orbitron.className}`}>
          {score}
          <span className={`text-sm ml-2 ${lexend.className}`}>pts</span>
        </div>
      </div>


      <div className="x-cta text-center pt-1" > 
        <p className="text-gray-400 text-[18px] ">
          <a href="https://x.com/signozhq" target="_blank" className="text-[#4558c4] hover:text-[#5569d7] inline-block hover:underline">~ A new wordle is released every midnight on X ~</a>
        </p>
      </div>

      {/* Tapering red line separator */}
      <div className="w-full flex justify-center">
        <div className="h-[2px] w-[80%] bg-gradient-to-r from-transparent via-[#da4b48] to-transparent opacity-40"></div>
      </div>

      <div className="text-center mb-10">
        <p className="text-gray-400 text-[15px] leading-[1.6]">
          Today's word was '{targetWord}' which in K8s is a periodic check that determines if a container is healthy and ready to receive traffic. Probes help the system restart or stop containers that 
          aren't working as expected, ensuring your app stays resilient.
        </p>
        <a 
          href="https://overcast.blog/6-types-of-kubernetes-probes-you-should-be-using-in-2024-205441e43ac2" 
          target="_blank"
          className={`text-[#4558c4] hover:text-[#5569d7] inline-block hover:underline text-sm`}
        >
          Read something cool on {targetWord.toLowerCase()} here!
        </a>
      </div>

      <div className="text-center mb-5">
        <p className="text-gray-400 text-[15px] leading-[1.6]">
        Share score with your DevOps buddies & see if they can beat you!
        </p>
      </div>

      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <button 
            className={`w-12 h-12 rounded-full bg-black border-2 ${isWon ? 'border-[#233457] neon-box-border' : 'border-[#cc3939] neon-box-red'} flex items-center justify-center text-white shadow-lg hover:shadow-xl share-button-neon`}
            onClick={() => {
              const shareText = generateShareText();
              const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://wordle.signoz.io/todayswordle')}`;
              // Copy text to clipboard for easy pasting
              navigator.clipboard.writeText(shareText);
              window.open(linkedinUrl, '_blank');
            }}
            title="Share on LinkedIn"
          >
            <FaLinkedin className={`w-5 h-5 ${isWon ? 'text-[#4558c4] neon-text-blue' : 'text-[#FF4C4C] neon-text'}`} />
          </button>
          
          <button 
            className={`w-12 h-12 rounded-full bg-black border-2 ${isWon ? 'border-[#233457] neon-box-border' : 'border-[#cc3939] neon-box-red'} transition-colors duration-300 flex items-center justify-center text-white shadow-lg hover:shadow-xl share-button-neon`}
            onClick={() => {
              const shareText = generateShareText();
              const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
              window.open(twitterUrl, '_blank');
            }}
            title="Share on X"
          >
            <FaTwitter className={`w-5 h-5 ${isWon ? 'text-[#4558c4] neon-text-blue' : 'text-[#FF4C4C] neon-text'}`} />
          </button>
          
          <button 
            className={`w-12 h-12 rounded-full transition-colors duration-300 flex items-center justify-center text-white shadow-lg hover:shadow-xl bg-black border-2 ${isWon ? 'border-[#233457] neon-box-border' : 'border-[#cc3939] neon-box-red'} share-button-neon`}
            onClick={handleShare}
            title={isCopied ? 'Copied!' : 'Copy to clipboard'}
          >
            <FaLink className={`w-5 h-5 ${isWon ? 'text-[#4558c4] neon-text-blue' : 'text-[#FF4C4C] neon-text'}`} />
          </button>
        </div>
      </div>

      
    </div>
  );
} 
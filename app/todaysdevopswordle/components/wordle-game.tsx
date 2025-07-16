'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { GameConfig, GameState, LetterState, GameStatus } from '../types'
import { Keyboard } from './keyboard'
import { GameBoard } from './game-board'
import { WordleHeader } from './wordle-header'
import { GameResults } from './game-results'
import { Toast } from './toast'
import { getGameState } from '../lib/cookie-utils'
import { useLogEvent } from '../../../hooks/useLogEvent'
import wordExists from 'word-exists'

const MAX_TIME = 86400 // 24 hours in seconds
const MAX_ATTEMPTS = 5

interface WordleGameProps {
  targetWord: string
  config?: Partial<GameConfig>
  elapsedTime: number
  gameStatus: GameStatus
  onGameWon: (attempts: number) => void
  onGameLost: () => void
  onBackToOverview?: () => void
}

const DEFAULT_CONFIG: GameConfig = {
  wordLength: 5,
  maxAttempts: 5,
}

function getGameScore(attempts: number, elapsedTime: number) {
  if (getGameState().wonScore) return getGameState().wonScore

  const score = Math.ceil((MAX_TIME / elapsedTime) * (MAX_ATTEMPTS / attempts))
  return score
}

export function isValidWord(word: string): boolean {
  // Convert to lowercase for validation
  const normalizedWord = word.toLowerCase()

  // Check if word exists in dictionary
  return wordExists(normalizedWord)
}

export function WordleGame({
  targetWord,
  config = {},
  elapsedTime,
  onGameWon,
  onGameLost,
  gameStatus,
  onBackToOverview,
}: WordleGameProps) {
  const gameConfig = { ...DEFAULT_CONFIG, ...config }
  const pathname = usePathname()
  const logEvent = useLogEvent()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    currentRow: 0,
    currentCol: 0,
    gameStatus: gameStatus,
    guesses: [],
    letterStates: new Map(),
  })

  const updateLetterStates = useCallback(
    (guess: string) => {
      const newStates = new Map(gameState.letterStates)

      // First pass: Mark all CORRECT letters
      for (let i = 0; i < gameConfig.wordLength; i++) {
        const letter = guess[i].toUpperCase()
        if (letter === targetWord[i].toUpperCase()) {
          newStates.set(letter, LetterState.CORRECT)
        }
      }

      // Second pass: Mark PRESENT or ABSENT letters
      for (let i = 0; i < gameConfig.wordLength; i++) {
        const letter = guess[i].toUpperCase()
        if (letter !== targetWord[i].toUpperCase()) {
          if (targetWord.toUpperCase().includes(letter)) {
            // Only mark as PRESENT if not already CORRECT
            if (newStates.get(letter) !== LetterState.CORRECT) {
              newStates.set(letter, LetterState.PRESENT)
            }
          } else {
            // Only mark as ABSENT if not already marked
            if (!newStates.has(letter)) {
              newStates.set(letter, LetterState.ABSENT)
            }
          }
        }
      }

      return newStates
    },
    [targetWord, gameConfig.wordLength, gameState.letterStates]
  )

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameState.gameStatus !== 'playing') return

      if (key === 'DEL') {
        setCurrentGuess((prev) => prev.slice(0, -1))
        return
      }

      if (key === 'ENTER') {
        // Validate the word
        if (currentGuess.length !== gameConfig.wordLength) {
          // Track invalid submission - too short
          logEvent({
            eventName: 'Word Submission',
            eventType: 'track',
            attributes: {
              submissionType: 'invalid',
              invalidReason: 'too_short',
              attemptNumber: gameState.guesses.length + 1,
              wordLength: currentGuess.length,
              pageLocation: pathname,
            },
          })

          setIsShaking(true)
          setToastMessage('Too short.')
          setShowToast(true)
          setTimeout(() => setIsShaking(false), 500)
          return
        }
        if (!isValidWord(currentGuess)) {
          // Track invalid submission - not a valid word
          logEvent({
            eventName: 'Word Submission',
            eventType: 'track',
            attributes: {
              submissionType: 'invalid',
              invalidReason: 'not_valid_word',
              attemptNumber: gameState.guesses.length + 1,
              guessedWord: currentGuess,
              pageLocation: pathname,
            },
          })

          setIsShaking(true)
          setToastMessage('Not a valid word.')
          setShowToast(true)
          setTimeout(() => setIsShaking(false), 500)
          return
        }

        const newGuesses = [...gameState.guesses, currentGuess]
        const newLetterStates = updateLetterStates(currentGuess)

        let newStatus: GameStatus = gameState.gameStatus
        const isCorrect = currentGuess.toUpperCase() === targetWord.toUpperCase()

        if (isCorrect) {
          newStatus = GameStatus.WON
          const finalScore = getGameScore(newGuesses.length, elapsedTime) as number

          // Track winning submission
          logEvent({
            eventName: 'Word Submission',
            eventType: 'track',
            attributes: {
              submissionType: 'valid',
              gameResult: 'won',
              attemptNumber: newGuesses.length,
              guessedWord: currentGuess,
              targetWord: targetWord,
              elapsedTime: elapsedTime,
              score: finalScore,
              pageLocation: pathname,
            },
          })

          onGameWon(finalScore)
        } else if (newGuesses.length === gameConfig.maxAttempts) {
          newStatus = GameStatus.LOST

          // Track losing submission (final attempt)
          logEvent({
            eventName: 'Word Submission',
            eventType: 'track',
            attributes: {
              submissionType: 'valid',
              gameResult: 'lost',
              attemptNumber: newGuesses.length,
              guessedWord: currentGuess,
              targetWord: targetWord,
              elapsedTime: elapsedTime,
              pageLocation: pathname,
            },
          })

          onGameLost()
        } else {
          // Track valid but incorrect submission
          logEvent({
            eventName: 'Word Submission',
            eventType: 'track',
            attributes: {
              submissionType: 'valid',
              gameResult: 'continuing',
              attemptNumber: newGuesses.length,
              guessedWord: currentGuess,
              elapsedTime: elapsedTime,
              pageLocation: pathname,
            },
          })
        }

        setGameState((prev) => ({
          ...prev,
          currentRow: prev.currentRow + 1,
          currentCol: 0,
          gameStatus: newStatus,
          guesses: newGuesses,
          letterStates: newLetterStates,
        }))
        setCurrentGuess('')
        return
      }

      if (currentGuess.length < gameConfig.wordLength) {
        setCurrentGuess((prev) => prev + key.toLowerCase())
      }
    },
    [currentGuess, gameState, gameConfig, targetWord, updateLetterStates, onGameWon, onGameLost]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'DEL') {
        handleKeyPress('DEL')
      } else if (e.key === 'Enter') {
        handleKeyPress('ENTER')
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyPress])
  if (gameState.gameStatus !== GameStatus.PLAYING) {
    return (
      <GameResults
        isWon={gameState.gameStatus === GameStatus.WON}
        score={
          gameState.gameStatus === GameStatus.WON
            ? (getGameScore(gameState.guesses.length, elapsedTime) as number)
            : 0
        }
        timeTaken={elapsedTime}
        targetWord={targetWord}
        guesses={gameState.guesses}
        onBackToOverview={onBackToOverview}
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        time={800}
      />
      <div className="flex w-full max-w-[450px] justify-center pt-10 sm:pt-0">
        <WordleHeader
          currentAttempts={gameState.guesses.length}
          maxAttempts={gameConfig.maxAttempts}
          elapsedTime={elapsedTime}
        />
      </div>
      <div className="flex justify-center">
        <GameBoard
          guesses={gameState.guesses}
          currentGuess={currentGuess}
          targetWord={targetWord}
          config={gameConfig}
          isShaking={isShaking}
        />
      </div>
      <div className="flex justify-center">
        <Keyboard onKeyPress={handleKeyPress} letterStates={gameState.letterStates} />
      </div>
    </div>
  )
}

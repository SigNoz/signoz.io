'use client'

import React, { useState, useCallback } from 'react'
import { Outfit, Syne, JetBrains_Mono } from 'next/font/google'
import { Answer, CategoryScore, QuizPhase } from './types'
import { questions } from './data/questions'
import {
  CATEGORY_LABELS,
  ROASTS,
  SEVERITY_CONFIG,
  getSeverityLevel,
} from './data/constants'
import HeroSection from './components/HeroSection'
import QuizSection from './components/QuizSection'
import ResultsSection from './components/ResultsSection'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
})

export default function SRESkillDecayIndex() {
  const [phase, setPhase] = useState<QuizPhase>('hero')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const handleStart = useCallback(() => {
    setPhase('quiz')
    setCurrentQuestion(0)
    setAnswers([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleAnswer = useCallback(
    (score: number, category: Answer['category']) => {
      const newAnswers = [...answers, { score, category }]
      setAnswers(newAnswers)

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setTimeout(() => {
          setPhase('results')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 400)
      }
    },
    [answers, currentQuestion]
  )

  const handleRestart = useCallback(() => {
    setPhase('hero')
    setCurrentQuestion(0)
    setAnswers([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const computeResults = useCallback(() => {
    const totalScore = answers.reduce((sum, a) => sum + a.score, 0)
    const maxScore = questions.length * 3
    const normalized = (totalScore / maxScore) * 10
    const display = normalized.toFixed(1)
    const level = getSeverityLevel(normalized)
    const config = SEVERITY_CONFIG[level]
    const roastPool = ROASTS[level]
    const roast = roastPool[Math.floor(Math.random() * roastPool.length)]

    const categoryScores: Record<string, { total: number; count: number }> = {}
    answers.forEach((a) => {
      if (!categoryScores[a.category]) {
        categoryScores[a.category] = { total: 0, count: 0 }
      }
      categoryScores[a.category].total += a.score
      categoryScores[a.category].count += 1
    })

    const breakdown: CategoryScore[] = Object.entries(categoryScores).map(
      ([cat, data]) => {
        const avg = (data.total / (data.count * 3)) * 10
        return {
          category: cat as CategoryScore['category'],
          label: CATEGORY_LABELS[cat as CategoryScore['category']],
          score: data.total,
          count: data.count,
          average: avg,
          level: getSeverityLevel(avg),
          percent: Math.round(avg * 10),
        }
      }
    )

    return { display, level, label: config.label, roast, breakdown }
  }, [answers])

  return (
    <div
      className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} decay-page`}
    >
      <style jsx global>{`
        body:has(.decay-page) .fixed.left-0.right-0.z-30 {
          display: none !important;
        }
        body:has(.decay-page) main {
          margin-top: 0 !important;
        }
        .decay-page {
          --bg: #0a0a0b;
          --surface: #111113;
          --surface-2: #19191d;
          --border: #2a2a30;
          --text: #e8e6e3;
          --text-dim: #7a7880;
          --accent: #ff3d3d;
          --green: #00ff9d;
          --amber: #ffb020;
          --terminal-green: #39ff14;
          font-family: var(--font-outfit), sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          position: relative;
        }
        .decay-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 50;
        }
        .decay-page::after {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          );
          pointer-events: none;
          z-index: 49;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(255, 61, 61, 0.4);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 0 6px rgba(255, 61, 61, 0);
          }
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scoreReveal {
          from {
            opacity: 0;
            transform: scale(0.5);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }
        @keyframes scrollBounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.4;
          }
        }
@keyframes ollyReveal {
          from {
            opacity: 0;
            transform: scale(0.6) translateY(20px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
      `}</style>

      <div className="relative z-[60]">
        {phase === 'hero' && <HeroSection onStart={handleStart} />}

        {phase === 'quiz' && (
          <QuizSection
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
          />
        )}

        {phase === 'results' && (
          <ResultsSection results={computeResults()} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}

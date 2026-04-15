'use client'

import React, { useState, useCallback } from 'react'
import { Outfit, Syne, JetBrains_Mono } from 'next/font/google'
import { Answer, CategoryScore, QuizPhase } from './types'
import { questions } from './data/questions'
import { CATEGORY_LABELS, ROASTS, SEVERITY_CONFIG, getSeverityLevel } from './data/constants'
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

interface ResultsData {
  display: string
  level: ReturnType<typeof getSeverityLevel>
  label: string
  roast: string
  breakdown: CategoryScore[]
}

function computeResults(answers: Answer[]): ResultsData {
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

  const breakdown: CategoryScore[] = Object.entries(categoryScores).map(([cat, data]) => {
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
  })

  return { display, level, label: config.label, roast, breakdown }
}

export default function SRESkillDecayIndex() {
  const [phase, setPhase] = useState<QuizPhase>('hero')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [resultsData, setResultsData] = useState<ResultsData | null>(null)

  const handleStart = useCallback(() => {
    setPhase('quiz')
    setCurrentQuestion(0)
    setAnswers([])
    setResultsData(null)
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
        const data = computeResults(newAnswers)
        setResultsData(data)
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
    setResultsData(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} decay-page`}>
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

        {phase === 'results' && resultsData && (
          <ResultsSection results={resultsData} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}

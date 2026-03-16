import Image from 'next/image'
import { Category, QuizQuestion } from '../types'
import { OLLY_IMAGES } from '../data/constants'

interface QuizSectionProps {
  currentQuestion: number
  totalQuestions: number
  question: QuizQuestion
  onAnswer: (score: number, category: Category) => void
}

const OPTION_KEYS = ['A', 'B', 'C', 'D']

export default function QuizSection({
  currentQuestion,
  totalQuestions,
  question,
  onAnswer,
}: QuizSectionProps) {
  const progress = (currentQuestion / totalQuestions) * 100
  const ollyData = OLLY_IMAGES[question.olly]

  return (
    <section className="pb-[120px] pt-20">
      {/* Branded progress bar */}
      <div className="fixed left-0 right-0 top-0 z-[100]">
        <div className="flex items-center justify-between px-5 py-2 bg-[var(--surface)]/80 backdrop-blur-sm border-b border-[var(--border)]">
          <span className="font-[family-name:var(--font-jetbrains)] text-[11px] font-semibold tracking-[0.08em] text-[var(--text-dim)]">
            <a href="https://signoz.io/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-dim)] hover:text-[var(--accent)] no-underline transition-colors duration-200">SigNoz</a>
          </span>
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.08em] text-[var(--text-dim)]">
            {currentQuestion + 1} / {totalQuestions}
          </span>
        </div>
        <div className="h-[2px] bg-[var(--surface)]">
          <div
            className="h-full bg-[var(--accent)] shadow-[0_0_12px_rgba(255,61,61,0.4)]"
            style={{
              width: `${progress}%`,
              transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-6">
        {/* Question header */}
        <div className="relative">
          <div className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.1em] text-[var(--text-dim)] mb-4">
            Question {currentQuestion + 1}
          </div>

          {/* Olly - desktop: absolute positioned, mobile: centered block */}
          <Image
            src={ollyData.src}
            alt={ollyData.alt}
            width={200}
            height={200}
            className={`hidden md:block absolute -right-[160px] -top-[10px] z-10 h-auto max-h-[200px] w-[200px] object-contain drop-shadow-[0_4px_16px_rgba(68,97,215,0.2)] ${ollyData.rounded ? 'rounded-xl' : ''}`}
            style={{ animation: 'ollyFloat 4s ease-in-out infinite' }}
          />
          <Image
            src={ollyData.src}
            alt={ollyData.alt}
            width={96}
            height={96}
            className={`mx-auto mb-3 block h-auto max-h-24 w-24 object-contain md:hidden ${ollyData.rounded ? 'rounded-xl' : ''}`}
            style={{ animation: 'ollyFloat 4s ease-in-out infinite' }}
          />
        </div>

        {/* Question card */}
        <div key={currentQuestion} style={{ animation: 'cardIn 0.5s ease' }}>
          {/* Scenario block */}
          <div className="relative mb-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-5 font-[family-name:var(--font-jetbrains)] text-xs leading-[1.7] text-[var(--terminal-green)]">
            <span
              className="absolute left-3 top-5 text-[var(--text-dim)]"
              style={{ animation: 'blink 1.2s step-end infinite' }}
            >
              &gt;
            </span>
            <div className="pl-4">{question.scenario}</div>
          </div>

          {/* Question text */}
          <div className="mb-9 font-[family-name:var(--font-syne)] text-[22px] font-bold leading-[1.3] tracking-[-0.01em] max-md:text-xl">
            {question.question}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => onAnswer(option.score, option.category)}
                className="group flex items-start gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-5 text-left transition-all duration-[250ms] hover:translate-x-1 hover:border-[var(--accent)] hover:bg-[var(--surface-2)] cursor-pointer"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-2)] font-[family-name:var(--font-jetbrains)] text-[11px] font-semibold text-[var(--text-dim)] transition-all duration-[250ms] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
                  {OPTION_KEYS[i]}
                </span>
                <span className="text-[15px] leading-normal text-[var(--text)]">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

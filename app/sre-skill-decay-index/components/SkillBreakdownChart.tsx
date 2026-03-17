import { useEffect, useState } from 'react'
import { CategoryScore } from '../types'
import { SEVERITY_BG } from '../data/constants'

interface SkillBreakdownChartProps {
  breakdown: CategoryScore[]
}

export default function SkillBreakdownChart({ breakdown }: SkillBreakdownChartProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mt-10 border-t border-[var(--border)] pt-10 text-left">
      <div className="mb-6 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
        Skill Atrophy Breakdown
      </div>

      {breakdown.map((item) => (
        <div key={item.category} className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-medium">{item.label}</span>
            <span className="font-[family-name:var(--font-jetbrains)] text-[13px] font-semibold">
              {item.average.toFixed(1)}/10
            </span>
          </div>
          <div className="h-[6px] overflow-hidden rounded-[3px] bg-[var(--surface-2)]">
            <div
              className={`h-full rounded-[3px] ${SEVERITY_BG[item.level]} transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
              style={{ width: animated ? `${item.percent}%` : '0%' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

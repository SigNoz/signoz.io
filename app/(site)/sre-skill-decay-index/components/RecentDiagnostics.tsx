import { RECENT_DIAGNOSTICS, getScoreColor } from '../data/constants'

export default function RecentDiagnostics() {
  return (
    <div className="mt-20">
      <h3 className="mb-6 text-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
        Recent Diagnostics
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {RECENT_DIAGNOSTICS.map((diag, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
          >
            <div className="flex flex-col gap-1">
              <div className="text-[13px] font-semibold">{diag.role}</div>
              <div className="max-w-[260px] text-[11px] italic leading-snug text-[var(--text-dim)]">
                &ldquo;{diag.roast}&rdquo;
              </div>
            </div>
            <div
              className="ml-4 flex-shrink-0 font-[family-name:var(--font-jetbrains)] text-xl font-extrabold"
              style={{ color: getScoreColor(diag.score) }}
            >
              {diag.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

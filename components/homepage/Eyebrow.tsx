import { cn } from 'app/lib/utils'

interface EyebrowProps {
  children: string
  className?: string
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'm-0 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--bg-robin-400)]',
        className
      )}
    >
      <span aria-hidden="true" className="inline-block h-3 w-1 bg-[var(--primary-background)]" />
      {children}
    </p>
  )
}

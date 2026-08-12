type WizardFrameProps = {
  title: React.ReactNode
  icon?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export default function WizardFrame({ title, icon, footer, children }: WizardFrameProps) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-[4px] border border-[var(--l1-border)] bg-[var(--l2-background-60)]">
      <div className="border-b border-[var(--l1-border)] bg-[var(--l2-background)] py-1">
        <div className="flex items-center gap-2 p-1.5">
          {icon}
          <span className="text-[13px] leading-5 tracking-[-0.065px] text-[var(--l1-foreground-hover)]">
            {title}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3">{children}</div>

      {footer}
    </div>
  )
}

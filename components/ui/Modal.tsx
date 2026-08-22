'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  type DialogSize,
} from '@signozhq/ui/dialog'
import { X } from 'lucide-react'
import { type ReactNode } from 'react'
import { cn } from 'app/lib/utils'

const sizeMaxWidthClass = {
  sm: '!max-w-sm',
  md: '!max-w-md',
  lg: '!max-w-lg',
  xl: '!max-w-xl',
  '2xl': '!max-w-2xl',
  '3xl': '!max-w-3xl',
  '4xl': '!max-w-4xl',
  '5xl': '!max-w-5xl',
} as const

const sizeToDialogWidth: Record<keyof typeof sizeMaxWidthClass, DialogSize> = {
  sm: 'narrow',
  md: 'narrow',
  lg: 'base',
  xl: 'base',
  '2xl': 'wide',
  '3xl': 'wide',
  '4xl': 'extra-wide',
  '5xl': 'extra-wide',
}

export type AppModalSize = keyof typeof sizeMaxWidthClass

type AppModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  size?: AppModalSize
  panelClassName?: string
  backdrop?: 'blur' | 'default'
  showCloseButton?: boolean
}

export function AppModal({
  isOpen,
  onOpenChange,
  children,
  size = '2xl',
  panelClassName,
  backdrop = 'default',
  showCloseButton = true,
}: AppModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className={cn(
            // ! overrides needed: @signozhq/ui CSS modules beat normal Tailwind
            backdrop === 'blur' &&
              '!bg-[color-mix(in_srgb,var(--bg-ink-500)_30%,transparent)] backdrop-blur-[12px] backdrop-saturate-150'
          )}
        />
      </DialogPortal>
      <DialogContent
        showOverlay={false}
        width={sizeToDialogWidth[size]}
        position="center"
        animation="fade"
        className={cn(
          'overflow-hidden !border-none !bg-transparent text-left !shadow-none',
          sizeMaxWidthClass[size]
        )}
      >
        <DialogTitle className="sr-only">Dialog</DialogTitle>
        <div className={cn('relative w-full', panelClassName)}>
          {showCloseButton && (
            <DialogClose asChild>
              <button
                type="button"
                aria-label="Close modal"
                className="absolute right-1 top-1 z-10 select-none appearance-none rounded-full p-2 text-zinc-400 outline-none transition-[background-color,color] [-webkit-tap-highlight-color:transparent] hover:bg-zinc-700/40 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signoz_robin-500 active:bg-zinc-600/40"
              >
                <X className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
            </DialogClose>
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

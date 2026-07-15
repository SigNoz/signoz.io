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
import { type CSSProperties, type ReactNode } from 'react'
import { cn } from 'app/lib/utils'

const sizeMaxWidth = {
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
} as const

const sizeToDialogWidth: Record<keyof typeof sizeMaxWidth, DialogSize> = {
  sm: 'narrow',
  md: 'narrow',
  lg: 'base',
  xl: 'base',
  '2xl': 'wide',
  '3xl': 'wide',
  '4xl': 'extra-wide',
  '5xl': 'extra-wide',
}

export type AppModalSize = keyof typeof sizeMaxWidth

type AppModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  size?: AppModalSize
  panelClassName?: string
  backdrop?: 'blur' | 'default'
  showCloseButton?: boolean
}

const transparentDialogSurfaceVars = {
  '--l2-background': 'var(--l2-background-transparent)',
  '--l2-border': 'transparent',
} as CSSProperties

const blurOverlayStyle: CSSProperties = {
  backgroundColor: 'color-mix(in srgb, var(--bg-ink-500) 30%, transparent)',
  backdropFilter: 'blur(12px) saturate(150%)',
  WebkitBackdropFilter: 'blur(12px) saturate(150%)',
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
        <DialogOverlay {...(backdrop === 'blur' ? { style: blurOverlayStyle } : {})} />
      </DialogPortal>
      <DialogContent
        showOverlay={false}
        width={sizeToDialogWidth[size]}
        position="center"
        animation="fade"
        style={{
          ...transparentDialogSurfaceVars,
          boxShadow: 'none',
          maxWidth: sizeMaxWidth[size],
        }}
        className="overflow-hidden text-left shadow-xl"
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

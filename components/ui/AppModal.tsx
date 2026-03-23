'use client'

import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { type ReactNode } from 'react'
import { cn } from 'app/lib/utils'

const sizeClass = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
} as const

export type AppModalSize = keyof typeof sizeClass

type AppModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  size?: AppModalSize
  /** Panel wrapper classes (width comes from size unless overridden) */
  panelClassName?: string
  backdrop?: 'blur' | 'default'
}

export function AppModal({
  isOpen,
  onOpenChange,
  children,
  size = '2xl',
  panelClassName,
  backdrop = 'default',
}: AppModalProps) {
  return (
    <Dialog
      as="div"
      className="relative z-[100]"
      open={isOpen}
      onClose={() => onOpenChange(false)}
      transition
    >
      <DialogBackdrop
        transition
        className={cn(
          'fixed inset-0 transition duration-200 ease-out data-[closed]:opacity-0',
          backdrop === 'blur' ? 'bg-black/40 backdrop-blur-sm' : 'bg-black/55'
        )}
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
          <DialogPanel
            transition
            className={cn(
              'relative w-full transform overflow-hidden text-left align-middle shadow-xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
              sizeClass[size],
              panelClassName
            )}
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

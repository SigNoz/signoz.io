'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, type ReactNode } from 'react'
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
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => onOpenChange(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={cn(
              'fixed inset-0',
              backdrop === 'blur' ? 'bg-black/40 backdrop-blur-sm' : 'bg-black/55'
            )}
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'relative w-full transform overflow-hidden text-left align-middle shadow-xl transition-all',
                  sizeClass[size],
                  panelClassName
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

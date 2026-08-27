'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import Admonition from '@/components/Admonition/Admonition'

import AnimatedHeight from './AnimatedHeight'
import SegmentedControl from './SegmentedControl'
import WizardFooter from './WizardFooter'
import WizardFrame from './WizardFrame'
import WizardHatIcon from './WizardHatIcon'
import WizardOptionButton from './WizardOptionButton'
import {
  SIGNALS,
  SIGNAL_ICONS,
  START,
  TONE_TO_ADMONITION,
  buildTree,
} from './TroubleshootingWizard.constants'
import type { Signal } from './TroubleshootingWizard.types'

const SIGNAL_OPTIONS = (Object.keys(SIGNALS) as Signal[]).map((signal) => ({
  value: signal,
  label: SIGNALS[signal].label,
  icon: SIGNAL_ICONS[signal],
}))

export default function TroubleshootingWizard() {
  const [signal, setSignal] = useState<Signal>('traces')
  const [history, setHistory] = useState<string[]>([START])

  const meta = SIGNALS[signal]
  const tree = useMemo(() => buildTree(meta), [meta])
  const currentId = history[history.length - 1]
  const node = tree[currentId]

  const reset = (next?: Signal) => {
    if (next) setSignal(next)
    setHistory([START])
  }

  const answer = (to: string) => setHistory((h) => [...h, to])
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h))

  // Clicking an option unmounts the focused button; move focus onto the new
  // content so keyboard users are not dropped back to <body>.
  const swapRef = useRef<HTMLDivElement>(null)
  const prevSwapKey = useRef(`${signal}:${currentId}`)
  useEffect(() => {
    const key = `${signal}:${currentId}`
    if (prevSwapKey.current === key) return
    prevSwapKey.current = key
    swapRef.current?.focus({ preventScroll: true })
  }, [currentId, signal])

  return (
    <WizardFrame
      title="Troubleshooting Wizard"
      icon={<WizardHatIcon className="shrink-0 text-signoz_robin-500" />}
      footer={
        <WizardFooter
          step={history.length}
          onBack={back}
          backDisabled={history.length <= 1}
          onStartOver={() => reset()}
        />
      }
    >
      <p className="m-0 text-[13px] leading-5 text-[var(--l2-foreground)]">
        Answer a few questions to find where your data is getting lost.
      </p>

      <SegmentedControl
        ariaLabel="Telemetry signal"
        options={SIGNAL_OPTIONS}
        value={signal}
        onChange={(next) => reset(next)}
      />

      <AnimatedHeight>
        <div ref={swapRef} tabIndex={-1} className="outline-none [&>div]:!my-0">
          {node.kind === 'question' ? (
            <div className="flex flex-col gap-3">
              <div>
                <p className="m-0 text-[13px] leading-5 text-[var(--l1-foreground)]">
                  {node.prompt}
                </p>
                {node.hint ? (
                  <p className="m-0 mt-1.5 text-[11px] leading-[18px] text-[var(--l2-foreground)]">
                    {node.hint}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                {node.options.map((opt) => (
                  <WizardOptionButton key={opt.to + opt.label} onClick={() => answer(opt.to)}>
                    {opt.label}
                  </WizardOptionButton>
                ))}
              </div>
            </div>
          ) : (
            <Admonition
              type={TONE_TO_ADMONITION[node.tone].type}
              title={`${TONE_TO_ADMONITION[node.tone].label}: ${node.title}`}
            >
              {node.body}
            </Admonition>
          )}
        </div>
      </AnimatedHeight>

      <span role="status" className="sr-only">
        {node.kind === 'result'
          ? `Step ${history.length}. ${TONE_TO_ADMONITION[node.tone].label}: ${node.title}`
          : `Step ${history.length}`}
      </span>
    </WizardFrame>
  )
}

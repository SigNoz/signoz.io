import NoiseToSignalStage from './NoiseToSignalStage'

export default function NoiseToSignal() {
  return (
    <section className="relative left-1/2 mx-auto hidden w-dvw max-w-none -translate-x-1/2 pb-12 md:block md:pb-16">
      <p className="sr-only">
        Visualization: noisy telemetry signals converging into a single clear signal with detected
        events.
      </p>
      <div
        className="w-full overflow-hidden border-b border-[var(--l2-border)] bg-[var(--l1-background)]"
        data-markdown-ignore
      >
        <NoiseToSignalStage />
      </div>
    </section>
  )
}

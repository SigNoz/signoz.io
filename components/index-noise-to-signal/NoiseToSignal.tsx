import NoiseToSignalStage from './NoiseToSignalStage'

export default function NoiseToSignal() {
  return (
    <section className="mx-auto w-full max-w-8xl px-5 py-12 sm:px-6 md:py-16 lg:px-20 wide:px-0">
      <p className="sr-only">
        Visualization: noisy telemetry signals converging into a single clear signal with detected
        events.
      </p>
      <div
        className="overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l1-background)]"
        data-markdown-ignore
      >
        <NoiseToSignalStage />
      </div>
    </section>
  )
}

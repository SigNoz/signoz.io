export default function ListingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto !mt-[48px] max-w-8xl px-8 py-16 sm:py-8">
      <div className="tab-content pt-6">{children}</div>
    </div>
  )
}

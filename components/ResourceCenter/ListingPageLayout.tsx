export default function ListingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">{children}</div>
    </div>
  )
}

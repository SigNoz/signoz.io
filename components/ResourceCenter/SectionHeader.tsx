import SearchInput from './Search'

export default function SectionHeader({
  title,
  description,
  searchPlaceholder,
  onSearch,
  className = 'mb-[72px]',
}: {
  title: string
  description: string
  searchPlaceholder: string
  onSearch: (e: any) => void
  className?: string
}) {
  return (
    <section className={`flex max-w-[697px] flex-col leading-[143%] ${className}`}>
      <h2 className="mb-0 self-start text-sm font-medium uppercase tracking-wider text-signoz_sakura-500 dark:text-signoz_sakura-400">
        resources
      </h2>
      <h1 className="my-0 mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        {title}
      </h1>
      <p className="my-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
        {description}
      </p>
      <SearchInput placeholder={searchPlaceholder} onSearch={onSearch} />
    </section>
  )
}

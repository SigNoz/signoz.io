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
      <h2 className="text-sakura-500 dark:text-sakura-400 mb-0 self-start text-sm font-medium tracking-wider uppercase">
        resources
      </h2>
      <h1 className="my-0 mt-3 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        {title}
      </h1>
      <p className="my-4 w-full text-lg leading-8 tracking-normal text-gray-700 max-md:max-w-full dark:text-stone-300">
        {description}
      </p>
      <SearchInput placeholder={searchPlaceholder} onSearch={onSearch} />
    </section>
  )
}

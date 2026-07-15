import { type FC } from 'react'
import { Input } from '@headlessui/react'
import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder: string
  onSearch: (e) => void
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  return (
    <div className="dark:bg-card mt-0 flex w-full items-center rounded border border-solid px-3 text-base leading-6 text-zinc-600 max-md:max-w-full max-md:pr-5 dark:border-gray-900">
      <div className="flex w-full items-center gap-2.5">
        <Search size={16} />

        <Input
          className="dark:bg-card w-full border-none focus:border-none active:border-none dark:text-white"
          name="full_name"
          type="text"
          placeholder={placeholder}
          onChange={onSearch}
          autoComplete="off"
        />
      </div>
    </div>
  )
}

export default SearchInput

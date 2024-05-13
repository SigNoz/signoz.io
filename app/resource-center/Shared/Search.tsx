import React from 'react'
import { Input } from '@headlessui/react'
import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder: string
  onSearch: (e) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  return (
    <div className="dark:bg-signoz_ink-400 mt-4 flex w-full items-center rounded border border-solid px-3 text-base leading-6 text-zinc-600 dark:border-gray-900 max-md:max-w-full max-md:pr-5">
      <div className="flex w-full items-center gap-2.5 max-md:flex-wrap ">
        <Search size={16} />

        <Input
          className="dark:bg-signoz_ink-400 w-full border-none focus:border-none active:border-none dark:text-white"
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

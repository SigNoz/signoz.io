import { type FC } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@signozhq/ui/input'

interface SearchInputProps {
  placeholder: string
  onSearch: (e) => void
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  return (
    <Input
      prefix={<Search size={16} />}
      name="full_name"
      type="text"
      placeholder={placeholder}
      onChange={onSearch}
      autoComplete="off"
      containerClassName="mt-0 w-full max-md:max-w-full text-base leading-6 text-zinc-600 [--input-wrapper-height:auto] [--input-wrapper-box-shadow:none] [--input-wrapper-border-radius:theme(borderRadius.DEFAULT)] dark:[--input-wrapper-border-color:theme(colors.gray.900)] dark:[--input-wrapper-background:theme(colors.signoz_ink.400)]"
      className="dark:text-white"
    />
  )
}

export default SearchInput

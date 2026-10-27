'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'

interface DirectorySearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export default function DirectorySearchInput({
  value,
  onChange,
  placeholder,
}: DirectorySearchInputProps) {
  const [slot, setSlot] = useState<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSlot(document.querySelector('[data-listicle-directory-search-slot]'))
  }, [])

  const input = (
    <label className="flex h-8 items-center gap-2 rounded-[50px] border border-[var(--l1-border)] bg-[var(--l2-background)] pl-2.5 pr-4">
      <Search size={14} className="shrink-0 text-[var(--l3-foreground)]" aria-hidden="true" />
      <input
        type="text"
        name="listicle-directory-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search integrations"
        className="w-44 border-none bg-transparent p-0 text-[13px] text-[var(--l1-foreground)] placeholder-[var(--l3-foreground)] focus:outline-none focus:ring-0"
      />
    </label>
  )

  if (!mounted) return null
  if (slot) return createPortal(input, slot)
  return (
    <div data-markdown-ignore className="mb-6">
      {input}
    </div>
  )
}

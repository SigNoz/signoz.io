import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Link as LinkIcon, Check } from 'lucide-react'
import { sluggify } from '@/utils/common'

interface ChangelogTitleProps {
  title: string
  link: string
}

const ChangelogTitle: React.FC<ChangelogTitleProps> = ({ title, link }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return (): void => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  const handleCopy = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    await navigator.clipboard.writeText(`https://signoz.io${link}`)
    if (isCopied) {
      return
    }
    setIsCopied(true)

    timeout.current = setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <h2 id={sluggify(title)}>
      <Link
        className="group flex items-center gap-2 !text-signoz_vanilla-100 !no-underline"
        href={link}
      >
        {title}
        <div className={`${isCopied ? 'block' : 'hidden'} group-hover:block`} onClick={handleCopy}>
          {isCopied ? <Check size={16} /> : <LinkIcon size={16} />}
        </div>
      </Link>
    </h2>
  )
}

export default ChangelogTitle

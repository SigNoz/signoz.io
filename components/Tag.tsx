import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary hover:text-robin-600 dark:hover:text-accent-primary mr-3 text-sm font-medium uppercase"
      prefetch={false}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag

import { ReactNode } from 'react'
import { CopyButton } from './CopyBtn/CopyBtn'

interface PreProps {
  children?: ReactNode
  raw?: any
}

export const Pre = ({ children, raw, ...props }: PreProps) => {
  return (
    <pre {...props} className={'p-0'}>
      <div className={'code-header'}>
        <CopyButton text={raw} />
      </div>
      {children}
    </pre>
  )
}

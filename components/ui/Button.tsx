import Link from 'next/link'
import React from 'react'

const Button = ({
  isButton = false,
  children,
  outlined = false,
  href = null,
  to = '/',
  className = '',
  id = '',
  onClick = () => {},
}) => {
  const classNames = {
    isButton:
      'inline-block border-none outline-none px-4 py-1 text-white rounded-md font-heading text-md font-medium hover:text-white no-underline text-center',
    filled: 'primary-gradient',
    outlined: 'border-gradient bg-signoz_ink-500',
    inline: 'text-indigo-500 underline',
  }
  const linkProps = {
    [href ? 'href' : 'to']: href ? href : to,
    [href ? 'rel' : 'data-prop']: 'noopener noreferrer nofollow',
    [href ? 'target' : 'data-prop']: '_blank',
  }

  return (
    <Link
      href={to}
      className={`cursor-pointer
        ${isButton ? classNames.isButton : classNames.inline}
        ${isButton ? (outlined ? classNames.outlined : classNames.filled) : ''}
        ${className}
      `}
      id={id}
      onClick={onClick}
      {...linkProps}
    >
      {children}
    </Link>
  )
}

export default Button

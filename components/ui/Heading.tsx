import React from 'react'

const Heading = ({ type, className = '', children }) => {
  switch (type) {
    case 1:
      return (
        <h1 className={`font-heading text-gradient text-4xl font-bold md:text-3xl ${className}`}>
          {children}
        </h1>
      )
    case 2:
      return (
        <h2 className={`font-heading text-gradient font-bold md:text-2xl lg:text-3xl ${className}`}>
          {children}
        </h2>
      )
    case 3:
      return (
        <h3 className={`font-heading font-bold md:text-xl lg:text-2xl ${className}`}>{children}</h3>
      )
    case 4:
      return (
        <h4
          className={`font-heading font-light uppercase text-gray-300 md:text-lg lg:text-xl ${className}`}
        >
          {children}
        </h4>
      )
    case 5:
      return (
        <h5 className={`font-heading md:text-md font-semibold lg:text-lg ${className}`}>
          {children}
        </h5>
      )
    case 6:
      return <h6 className={`font-heading text-base font-medium ${className}`}>{children}</h6>

    default:
      return <Heading type={1}>{children}</Heading>
  }
}

export default Heading

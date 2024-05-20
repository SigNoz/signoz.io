import React from 'react'

function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={currentPage === index + 1 ? 'font-bold' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination

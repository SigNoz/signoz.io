'use client'
import Pagination from '@signozhq/pagination'
import { useState } from 'react'

const Pagin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Add any additional logic you want to handle when the page changes
    console.log(`Current page is now: ${page}`)
  }

  return (
    <Pagination
      total={100}
      pageSize={10}
      current={currentPage}
      onPageChange={(page) => handlePageChange(page)}
      align="end"
    />
  )
}

export default Pagin

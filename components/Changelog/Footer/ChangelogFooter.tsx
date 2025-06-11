'use client'
import Pagination from '@signozhq/pagination'
import { useState } from 'react'
import type { TPagination } from '@/utils/strapi'
import { useRouter, useParams } from 'next/navigation'

const ChangelogFooter: React.FC<{ pagination: TPagination }> = ({ pagination }) => {
  const { page } = useParams()
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page as string, 10) : 1)
  const router = useRouter()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push('/changelog?page=' + page)
  }

  const pageStart = pagination.pageSize * pagination.page - 1
  const pageEnd = pageStart + pagination.pageSize - 1

  return (
    <div className="relative flex items-center justify-between px-4 md:px-8">
      <div className="absolute -bottom-14 left-0 hidden h-20 w-px -translate-y-full bg-signoz_slate-400 lg:block">
        <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signoz_slate-400" />
      </div>
      <span className="text-sm text-signoz_vanilla-100">
        <b>{pageStart}</b>-<b>{pageEnd}</b> of {pagination.total}
      </span>
      <Pagination
        total={pagination.total}
        pageSize={pagination.pageSize}
        current={currentPage}
        onPageChange={(page) => handlePageChange(page)}
        align="end"
      />
    </div>
  )
}

export default ChangelogFooter

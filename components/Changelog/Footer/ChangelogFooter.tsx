'use client'
import Pagination from '@signozhq/pagination'
import { useState, useEffect } from 'react'
import type { TPagination } from '@/utils/strapi'
import { useRouter, useParams, useSearchParams } from 'next/navigation'

const ChangelogFooter: React.FC<{ pagination: TPagination }> = ({ pagination }) => {
  const { page } = useParams()
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page as string, 10) : 1)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const curPage = searchParams.get('page')
    const page = curPage ? parseInt(curPage, 10) : 1
    setCurrentPage(page)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('page', page.toString())
    router.push(`/changelog?${queryParams.toString()}`, { scroll: true })
  }

  const pageStart = pagination.pageSize * (pagination.page - 1) + 1
  const pageEnd = pageStart + Math.min(pagination.pageSize, pagination.total) - 1

  return (
    <div className="relative flex min-h-20 items-center justify-between px-4 md:px-8">
      <div className="absolute -bottom-11 left-0 hidden h-20 w-px -translate-y-full bg-signoz_slate-400 md:left-4 lg:block">
        <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signoz_slate-400" />
      </div>
      <span className="flex items-center text-sm text-signoz_vanilla-100">
        <b>{pageStart}</b>
        <span className="mx-1 inline-block h-0.5 w-5 bg-signoz_vanilla-100"></span>
        <b>{pageEnd}</b>&nbsp;
        <span className="text-signoz_vanilla-400">of {pagination.total}</span>
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

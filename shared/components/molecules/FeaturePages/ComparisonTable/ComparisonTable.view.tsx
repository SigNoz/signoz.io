import { ComparisonTableProps } from './ComparisonTable.types'
import { Check, TriangleAlert, X } from 'lucide-react'
import { cn } from 'app/lib/utils'

const ComparisonTable: React.FC<ComparisonTableProps<string>> = ({
  vendors,
  rows,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'overflow-x-auto border border-[var(--l2-border)] bg-[var(--l1-background-60)]',
        className
      )}
    >
      <table className="m-0 border-collapse text-left">
        <tbody className="text-sm text-[var(--l1-foreground)]">
          <tr className="relative">
            <td className="sticky left-[-1px] border-b border-r border-[var(--l2-border)] bg-[var(--l3-background)] px-6 py-4 text-left font-semibold text-[var(--l2-foreground)]">
              Feature
            </td>
            {vendors.map((vendor) => (
              <th
                key={vendor.key}
                className={cn(
                  'border-b border-[var(--l2-border)] px-4 py-4 text-left font-semibold text-[var(--l2-foreground)]',
                  vendor.className
                )}
              >
                {vendor.label}
              </th>
            ))}
          </tr>
          {rows.map((row, index) => (
            <tr key={index} className="transition-colors hover:bg-[var(--l1-background-hover)]">
              <td className="sticky left-[-1px] border-b border-r border-[var(--l2-border)] bg-[var(--l3-background)] px-6 py-4 text-sm text-signoz_robin-400">
                {row.feature}
              </td>
              {vendors.map((vendor) => {
                const cellData = row.vendors[vendor.key]

                return (
                  <td
                    key={vendor.key}
                    className="border-b border-[var(--l2-border)] px-4 py-4 text-left"
                  >
                    <span className="flex items-center gap-2">
                      {cellData.supported !== undefined &&
                        (cellData.supported === 'partial' ? (
                          <TriangleAlert size={20} className="text-yellow-400" />
                        ) : cellData.supported ? (
                          <Check size={20} className="text-green-400" />
                        ) : (
                          <X size={20} className="text-red-400" />
                        ))}
                      {cellData.text}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable

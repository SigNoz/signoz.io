import { ComparisonTableProps } from './ComparisonTable.types'
import { Check, TriangleAlert, X } from 'lucide-react'
import { cn } from 'app/lib/utils'

const ComparisonTable: React.FC<ComparisonTableProps<string>> = ({
  vendors,
  rows,
  className = '',
}) => {
  return (
    <div className={cn('border-border bg-background/50 overflow-x-auto border', className)}>
      <table className="m-0 border-collapse text-left">
        <tbody className="text-muted-foreground text-sm">
          <tr className="relative">
            <td className="border-border bg-muted text-muted-foreground sticky left-[-1px] border-r border-b px-6 py-4 text-left font-semibold">
              Feature
            </td>
            {vendors.map((vendor) => (
              <th
                key={vendor.key}
                className={cn(
                  'border-border text-muted-foreground border-b px-4 py-4 text-left font-semibold',
                  vendor.className
                )}
              >
                {vendor.label}
              </th>
            ))}
          </tr>
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-card/30 transition-colors">
              <td className="border-border bg-muted text-accent-primary sticky left-[-1px] border-r border-b px-6 py-4 text-sm">
                {row.feature}
              </td>
              {vendors.map((vendor) => {
                const cellData = row.vendors[vendor.key]

                return (
                  <td key={vendor.key} className="border-border border-b px-4 py-4 text-left">
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

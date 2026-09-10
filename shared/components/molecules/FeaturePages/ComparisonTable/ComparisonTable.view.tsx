import { ComparisonCell, ComparisonTableProps } from './ComparisonTable.types'
import { Check, TriangleAlert, X } from 'lucide-react'
import { cn } from 'app/lib/utils'

const STRIPED_FEATURE_CELL_BG =
  'bg-[var(--l1-background)] bg-[image:linear-gradient(var(--l2-background-60),var(--l2-background-60))]'

const StripedCellContent: React.FC<{ cell: ComparisonCell }> = ({ cell }) => {
  return (
    <span className="flex items-start gap-2">
      <span className="mt-0.5 w-[18px] shrink-0">
        {cell.supported === 'partial' ? (
          <TriangleAlert size={18} className="text-yellow-400" />
        ) : cell.supported === true ? (
          <Check size={18} className="text-[var(--primary-background)]" />
        ) : cell.supported === false ? (
          <X size={18} className="text-red-400" />
        ) : null}
      </span>
      <span>{cell.text}</span>
    </span>
  )
}

const ComparisonTable: React.FC<ComparisonTableProps<string>> = ({
  vendors,
  rows,
  className = '',
  variant = 'default',
  featureColumnLabel = 'Feature',
}) => {
  const striped = variant === 'striped'

  return (
    <div
      className={cn(
        'overflow-x-auto border border-[var(--l2-border)]',
        striped ? 'rounded-md' : 'bg-[var(--l1-background-60)]',
        className
      )}
    >
      <table
        className={cn(
          'm-0 border-collapse text-left',
          striped && 'table w-full min-w-[640px] table-fixed'
        )}
      >
        <tbody className="text-sm text-[var(--l1-foreground)]">
          <tr className={cn(!striped && 'relative')}>
            <td
              className={cn(
                'sticky left-[-1px] border-b border-r border-[var(--l2-border)] px-6 py-4 text-left font-semibold text-[var(--l2-foreground)]',
                striped
                  ? cn('w-[34%] align-top', STRIPED_FEATURE_CELL_BG)
                  : 'bg-[var(--l3-background)]'
              )}
            >
              {featureColumnLabel}
            </td>
            {vendors.map((vendor, index) => (
              <th
                key={vendor.key}
                className={cn(
                  'border-b border-[var(--l2-border)] px-4 py-4 text-left font-semibold text-[var(--l2-foreground)]',
                  striped && 'align-top',
                  striped && index < vendors.length - 1 && 'border-r',
                  vendor.className
                )}
              >
                {vendor.label}
              </th>
            ))}
          </tr>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={cn(
                striped
                  ? 'even:bg-[color-mix(in_srgb,var(--l3-background)_30%,transparent)]'
                  : 'transition-colors hover:bg-[var(--l1-background-hover)]'
              )}
            >
              <td
                className={cn(
                  'sticky left-[-1px] border-r border-[var(--l2-border)] px-6 py-4 text-sm',
                  striped
                    ? cn('align-top text-[var(--l1-foreground)]', STRIPED_FEATURE_CELL_BG)
                    : 'border-b bg-[var(--l3-background)] text-signoz_robin-400'
                )}
              >
                {row.feature}
              </td>
              {vendors.map((vendor, vendorIndex) => {
                const cellData = row.vendors[vendor.key]

                return (
                  <td
                    key={vendor.key}
                    className={cn(
                      'border-[var(--l2-border)] px-4 py-4 text-left',
                      striped
                        ? cn('align-top', vendorIndex < vendors.length - 1 && 'border-r')
                        : 'border-b'
                    )}
                  >
                    {striped ? (
                      <StripedCellContent cell={cellData} />
                    ) : (
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
                    )}
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

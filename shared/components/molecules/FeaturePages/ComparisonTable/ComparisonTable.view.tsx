import { ComparisonCell, ComparisonTableProps } from './ComparisonTable.types'
import { Check, TriangleAlert, X } from 'lucide-react'
import { cn } from 'app/lib/utils'

const STRIPED_FEATURE_CELL_BG = 'bg-[var(--l2-background-60)]'

const SupportIcon: React.FC<{
  supported?: boolean | 'partial'
  size: number
  checkClassName: string
}> = ({ supported, size, checkClassName }) =>
  supported === 'partial' ? (
    <TriangleAlert size={size} className="text-yellow-400" />
  ) : supported === true ? (
    <Check size={size} className={checkClassName} />
  ) : supported === false ? (
    <X size={size} className="text-red-400" />
  ) : null

const StripedCellContent: React.FC<{ cell: ComparisonCell }> = ({ cell }) => {
  return (
    <span className="flex items-start gap-2">
      <span className="mt-0.5 w-[18px] shrink-0">
        <SupportIcon
          supported={cell.supported}
          size={18}
          checkClassName="text-[var(--primary-background)]"
        />
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
        <thead className="bg-transparent text-sm text-[var(--l1-foreground)]">
          <tr className={cn(striped ? 'border-0 bg-transparent' : 'relative border-b-0')}>
            <th
              scope="col"
              className={cn(
                'sticky left-[-1px] border-r border-[var(--l2-border)] px-6 py-4 text-left font-semibold text-[var(--l2-foreground)]',
                striped
                  ? cn('w-[34%] border-y-0 border-l-0 align-top', STRIPED_FEATURE_CELL_BG)
                  : 'border-b bg-[var(--l3-background)]'
              )}
            >
              {featureColumnLabel}
            </th>
            {vendors.map((vendor, index) => (
              <th
                key={vendor.key}
                scope="col"
                className={cn(
                  'border-[var(--l2-border)] px-4 py-4 text-left font-semibold text-[var(--l2-foreground)]',
                  striped ? 'border-y-0 border-l-0 bg-transparent align-top' : 'border-b',
                  striped && (index < vendors.length - 1 ? 'border-r' : 'border-r-0'),
                  vendor.className
                )}
              >
                {vendor.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-[var(--l1-foreground)]">
          {rows.map((row, index) => (
            <tr
              key={index}
              className={cn(
                striped
                  ? 'border-0 odd:bg-[color-mix(in_srgb,var(--l3-background)_30%,transparent)] even:bg-transparent'
                  : 'transition-colors odd:bg-[var(--ifm-table-stripe-background)] even:bg-transparent hover:bg-[var(--l1-background-hover)]'
              )}
            >
              <th
                scope="row"
                className={cn(
                  'sticky left-[-1px] border-r border-[var(--l2-border)] px-6 py-4 text-left text-sm font-normal',
                  striped
                    ? cn(
                        'border-y-0 border-l-0 align-top text-[var(--l1-foreground)]',
                        STRIPED_FEATURE_CELL_BG
                      )
                    : 'border-b bg-[var(--l3-background)] text-signoz_robin-400'
                )}
              >
                {row.feature}
              </th>
              {vendors.map((vendor, vendorIndex) => {
                const cellData = row.vendors[vendor.key]

                return (
                  <td
                    key={vendor.key}
                    className={cn(
                      'border-[var(--l2-border)] px-4 py-4 text-left',
                      striped
                        ? cn(
                            'border-y-0 border-l-0 align-top',
                            vendorIndex < vendors.length - 1 ? 'border-r' : 'border-r-0'
                          )
                        : 'border-b'
                    )}
                  >
                    {striped ? (
                      <StripedCellContent cell={cellData} />
                    ) : (
                      <span className="flex items-center gap-2">
                        <SupportIcon
                          supported={cellData.supported}
                          size={20}
                          checkClassName="text-green-400"
                        />
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

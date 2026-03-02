import { ComparisonTableProps } from './ComparisonTable.types'
import { Check, TriangleAlert, X } from 'lucide-react'

const ComparisonTable: React.FC<ComparisonTableProps<string>> = ({
  vendors,
  rows,
  className = '',
}) => {
  return (
    <div
      className={`overflow-x-auto border border-signoz_slate-400 bg-signoz_ink-500/50 ${className}`}
    >
      <table className="m-0 border-collapse text-left">
        <tbody className="text-sm text-signoz_vanilla-300">
          <tr className="relative">
            <td className="sticky left-[-1px] border-b border-r border-signoz_slate-400 bg-signoz_slate-400 px-6 py-4 text-left font-semibold text-signoz_vanilla-400">
              Feature
            </td>
            {vendors.map((vendor) => (
              <th
                key={vendor.key}
                className="border-b border-signoz_slate-400 px-4 py-4 text-left font-semibold text-signoz_vanilla-400"
              >
                {vendor.label}
              </th>
            ))}
          </tr>
          {rows.map((row, index) => (
            <tr key={index} className="transition-colors hover:bg-signoz_ink-400/30">
              <td className="sticky left-[-1px] border-b border-r border-signoz_slate-400 bg-signoz_slate-400 px-6 py-4 text-sm text-signoz_robin-400">
                {row.feature}
              </td>
              {vendors.map((vendor) => {
                const cellData = row.vendors[vendor.key]

                return (
                  <td
                    key={vendor.key}
                    className="border-b border-signoz_slate-400 px-4 py-4 text-left"
                  >
                    <span className="flex items-center gap-2">
                      {cellData.supported === 'partial' ? (
                        <TriangleAlert size={20} className="text-yellow-400" />
                      ) : cellData.supported ? (
                        <Check size={20} className="text-green-400" />
                      ) : (
                        <X size={20} className="text-red-400" />
                      )}
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

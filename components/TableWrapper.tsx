import React from 'react'

type TableChildElement = React.ReactElement<{
  children?: React.ReactNode
  className?: string
}>

const isTableElement = (child: React.ReactNode): child is TableChildElement => {
  return React.isValidElement(child)
}

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        {React.Children.map(children, (sectionChild) => {
          if (!isTableElement(sectionChild)) return sectionChild
          // Mapping for `thead` and `tbody`
          return React.Children.map(sectionChild.props.children, (rowChild) => {
            if (!isTableElement(rowChild)) return rowChild
            if (rowChild.type === 'tr') {
              return React.cloneElement(
                rowChild,
                {
                  className: 'border-b border-gray-200 border-1', // Styles for rows
                },
                React.Children.map(rowChild.props.children, (cell) => {
                  if (!isTableElement(cell)) return cell
                  if (cell.type === 'td' || cell.type === 'th') {
                    return React.cloneElement(cell, {
                      className: 'px-6 py-4 border-r border-white-200', // Styles for cells
                    })
                  }
                  return cell
                })
              )
            }
            return rowChild
          })
        })}
      </table>
    </div>
  )
}

export default TableWrapper

import React from 'react'

const TableWrapper = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        {React.Children.map(children, (child) => {
          // Mapping for `thead` and `tbody`
          return React.Children.map(child.props.children, (child) => {
            if (child.type === 'tr') {
              return React.cloneElement(
                child,
                {
                  className: 'border-b border-gray-200 border-4 hover:bg-gray-100', // Styles for rows
                },
                React.Children.map(child.props.children, (cell) => {
                  if (cell.type === 'td' || cell.type === 'th') {
                    return React.cloneElement(cell, {
                      className: 'px-6 py-4 border-r border-white-200', // Styles for cells
                    })
                  }
                  return cell
                })
              )
            }
            return child
          })
        })}
      </table>
    </div>
  )
}

export default TableWrapper

const TableWrapper = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center'}}>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}


export default TableWrapper;

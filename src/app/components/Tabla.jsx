const Tabla = ({ children, columns }) => {
  return (
    <>
      <h1>Instrumentos Registrados</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns !== null
                ? columns.map((col, i) => (
                    <th scope="col" className="px-6 py-3" key={i}>
                      {col}
                    </th>
                  ))
                : ""}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
};
export default Tabla;

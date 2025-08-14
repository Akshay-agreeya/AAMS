import React from "react";
import Pagenation from "../Pagenation";
import Loading from "../../component/Loading";

const Table = ({
  columns,
  dataSource = [],
  showHeader = true,
  rowKey = "id",
  loading = false,
  pagenation = true,
  style = {},
}) => {
  return (
    <div className="gridContainer">
      <table style={style}>
        {showHeader && (
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  width={column.width}
                  className={column.className}
                  key={column.dataIndex}
                  scop={column.scop}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {/* <tbody>
                    {loading ?
                        <tr><td colSpan={columns.length} style={{ height: '100px' }}><Loading style={{ position: 'unset' }} /></td></tr>
                        :
                        dataSource.map((record, index) => (
                            <tr key={record[rowKey] ?? index}>
                                {columns.map((column, i) => (
                                    <td className={column.className} key={i}>{
                                        column.render ? column.render(record[column.dataIndex], record, index) : record[column.dataIndex]
                                    }</td>
                                ))}
                            </tr>
                        ))}
                </tbody> */}

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ height: "100px" }}>
                <Loading style={{ position: "unset" }} />
              </td>
            </tr>
          ) : (
            dataSource.map((record, index) => (
              <tr key={record[rowKey] ?? index}>
                {columns.map((column, i) => {
                  // Get the original cell value
                  let value = record[column.dataIndex];

                  // 🔹 Condition: If category is "Best Practice", override values
                  if (
                    record.category === "Best Practice" &&
                    (column.dataIndex === "criteria" ||
                      column.dataIndex === "guideline")
                  ) {
                    value = "NA";
                  }

                  return (
                    <td className={column.className} key={i}>
                      {column.render
                        ? column.render(value, record, index)
                        : value}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagenation && dataSource.length > 0 && <Pagenation {...pagenation} />}
    </div>
  );
};

export default Table;

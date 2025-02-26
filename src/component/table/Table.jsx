import React from 'react'

const Table = ({ columns, dataSource = [], showHeader = true, rowKey = "id" }) => {

    return (
        <div className="gridContainer">
            <table>
                {showHeader && <thead>
                    <tr>
                        {columns.map(column => (<th width={column.width}
                            className={column.className} key={column.dataIndex}>{column.title}</th>
                        ))}
                    </tr>
                </thead>}
                <tbody>
                    {dataSource.map(record => (
                        <tr key={record.rowKey}>
                            {columns.map(column => (
                                <td className={column.className}>{
                                    column.render ? column.render(record[column.dataIndex], record) : record[column.dataIndex]
                                }</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
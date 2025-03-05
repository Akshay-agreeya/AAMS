import React from 'react'

const Table = ({ columns, dataSource = [], showHeader = true, rowKey = "id", loading = false }) => {

    return (
        <div className="gridContainer">
            <table>
                {showHeader && <thead>
                    <tr>
                        {columns.map(column => (<th width={column.width}
                            className={column.className} key={column.dataIndex}
                            scop={column.scop}>{column.title}</th>
                        ))}
                    </tr>
                </thead>}
                <tbody>
                    {loading ?
                        <div className="message">Loading data, please wait...</div>
                        :
                        dataSource.map((record, index) => (
                            <tr key={record[rowKey] || index}>
                                {columns.map((column, i) => (
                                    <td className={column.className} key={i}>{
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
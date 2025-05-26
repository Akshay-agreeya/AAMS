import React from 'react'
import Pagenation from '../Pagenation';
import Loading from '../../component/Loading';

const Table = ({ columns, dataSource = [], showHeader = true, rowKey = "id", loading = false,
    pagenation = true }) => {

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
                        <tr><td colSpan={columns.length} style={{height: '100px'}}><Loading style={{ position: 'unset' }}/></td></tr>
                        :
                        dataSource.map((record, index) => (
                            <tr key={record[rowKey] ?? index}>
                                {columns.map((column, i) => (
                                    <td className={column.className} key={i}>{
                                        column.render ? column.render(record[column.dataIndex], record,index) : record[column.dataIndex]
                                    }</td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
            {pagenation && dataSource.length > 0 && <Pagenation {...pagenation} />}
        </div>
    )
}

export default Table;
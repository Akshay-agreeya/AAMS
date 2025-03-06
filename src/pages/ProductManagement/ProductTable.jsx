import React, { useState } from 'react'
import Table from '../../component/table/Table';

const ProductTable = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [{
        title: 'Service Name',
        dataIndex: 'service_name',
        width: '18%'
    },
    {
        title: 'Resource Path',
        dataIndex: 'resource_path',
        width: '18%'
    },
    {
        title: 'WCAG',
        dataIndex: 'wcag',
        width: '8%',
        className: "text-center"
    },

    {
        title: 'Version',
        dataIndex: 'version',
        width: '8%',
        className: "text-center"
    },
    {
        title: 'Compliance Level',
        dataIndex: 'comp_level',
        width: '8%',
        className: "text-center"
    },
    {
        title: 'Support Type',
        dataIndex: 'sup_type',
        width: '8%',
        className: "text-center"
    },
    {
        title: 'Frequency',
        dataIndex: 'frequency',
        width: '8%',
        className: "text-center"
    },
    {
        title: 'Day',
        dataIndex: 'day',
        width: '8%',
        className: "text-center"
    },

    {
        title: 'Scan Date',
        dataIndex: 'scan-date',
        width: '8%',
        className: "text-center"
    },

    {
        title: 'Schedule Time',
        dataIndex: 'time',
        width: '8%',
        className: "text-center"
    },

    {
        title: 'Action',
        dataIndex: 'action',
        width: '8%',
        className: "text-center"
    },
    ];
    return (
        <>
            <Table columns={columns} dataSource={products} rowKey="user_id" loading={loading} />

        </>
    )
}

export default ProductTable
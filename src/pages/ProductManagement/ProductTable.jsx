import React, { useEffect, useState } from 'react'
import Table from '../../component/table/Table';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../utils/CommonApi';
import { formattedDate } from '../../component/input/DatePicker';
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images/iconDelete.svg";
import viewicon from "../../assets/images/iconView.svg";
import { getAllowedOperations } from '../../utils/Helper';

const ProductTable = ({ org_id }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (org_id)
            getProducts();
    }, [org_id]);

    const getProducts = async () => {
        try {
            setLoading(true);
            const resp = await getData(`/product/get/${org_id}`);
            if (resp.data)
                resp.data = resp.data?.map((item, index) => ({ ...item, id: index + 1 }));
            setProducts(resp.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const operations = getAllowedOperations(4);

    const columns = [{
        title: 'Service Name',
        dataIndex: 'service_type_name',
        width: '18%'
    },
    {
        title: 'Resource Path',
        dataIndex: 'web_url',
        width: '18%'
    },
    {
        title: 'WCAG',
        dataIndex: 'guideline',
        width: '8%',
        className: "text-center"
    },

    {
        title: 'Version',
        dataIndex: 'guidline_version_id',
        width: '8%',
        className: "text-center"
    },
    {
        title: 'Compliance Level',
        dataIndex: 'compliance_level',
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
        dataIndex: 'scan_days',
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
        dataIndex: 'schedule_time',
        width: '8%',
        className: "text-center",
        render: (text) => (
            <span>{formattedDate(new Date(text, "dd/MM/yyyy"))}</span>
        )
    },

    {
        title: "Action",
        dataIndex: "action",
        width: "8%",
        className: "text-center",
        render: (_text, record) => (
            <>
                
                {operations?.find(item => item.operation_type_id === 2) && <a href={`/admin/user-management/edituser/${record.user_id}`} className="me-3">
                    <img src={editicon} alt="Edit Details" />
                </a>
                }
                {operations?.find(item => item.operation_type_id === 4) && <a href="#" onClick={() => {
                    
                }}>
                    <img src={deleteicon} alt="Delete Details" />
                </a>
                }
            </>
        ),
    },
    ];
    return (
        <>
            <Table columns={columns} dataSource={products} rowKey="user_id" loading={loading} />

        </>
    )
}

export default ProductTable
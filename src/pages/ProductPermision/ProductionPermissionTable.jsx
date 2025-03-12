import React, { useEffect, useState } from 'react';
import Table from '../../component/table/Table';
import { getData } from '../../utils/CommonApi';
import { getFullName } from '../../utils/Helper';

const ProductionPermissionTable = ({ org_id }) => {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (org_id)
            getOrganizationData();
    }, [org_id]);

    const getOrganizationData = async () => {

        try {
            setLoading(true);
            const users = await getData(`/user/list/${org_id}?page=0&size=20`);
            if (users.contents)
                users.contents = users.contents.map((item, index) => ({ ...item, id: index + 1 }));
            setUsers(users.contents);
            const products = await getData(`/product/get/${org_id}?page=0&size=20`);
            if (products.contents) {
                products.contents = products.contents?.map((item, index) => ({ ...item, id: index + 1 }));
            }
            setProducts(products.contents);
        }
        catch (error) {
            console.log(error);
        }
    }


    const TDComp = ({ }) => {
        return (
            <div className="selectCheckRepeat">
                <div className="form-check custCheck me-3">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked disabled />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">View</label>
                </div>
                <div className="form-check custCheck">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" checked disabled />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Edit</label>
                </div>
            </div>

        )
    }

    const columns = [
        {
            title: 'Users',
            dataIndex: 'user',
            scope: 'col',
            width: '20%',
            render: (_, record) => (
                <>
                    {record.username}
                    <div className="roletype">Role: <span>{record.role}</span></div>
                </>
            )
        },
        {
            title: 'User Management',
            dataIndex: 'user',
            scope: 'col',
            width: '13%',
            render: (_text) => (
                <TDComp />
            )
        },
        {
            title: 'Role Management',
            dataIndex: 'role',
            scope: 'col',
            width: '13%',
            render: (_text) => (
                <TDComp />
            )
        },
        {
            title: 'Product Permission',
            dataIndex: 'prodPer',
            scope: 'col',
            width: '13%',
            render: (_text) => (
                <TDComp />
            )
        },
        {
            title: 'Product',
            dataIndex: 'user',
            scope: 'col',
            width: '15%',
            className: "tblDataOuter",
            render: () => (
                <div className="selectOptionRepeat">
                    <ul>
                        {products?.map(item => <div className="form-check custCheck"><li>{item.web_url}</li></div>)}
                    </ul>
                </div>

            )
        },
        {
            title: 'Product management',
            dataIndex: 'user',
            scope: 'col',
            width: '13%',
            className: "tblDataOuter",
            render: () => (
                <div className="selectOptionRepeat">
                    <ul>
                        {products?.map(item => <div className="form-check custCheck">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox20" value="option1"  />
                            <label className="form-check-label" htmlFor="inlineCheckbox20">View</label>
                        </div>)}
                    </ul>
                </div>
            )
        },
        {
            title: 'Reports',
            dataIndex: 'user',
            scope: 'col',
            width: '13%',
            className: "tblDataOuter",
            render: () => (
                <div className="selectOptionRepeat">
                    <ul>
                        {products?.map(item => <div className="form-check custCheck">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox20" value="option1" />
                            <label className="form-check-label" htmlFor="inlineCheckbox20">View</label>
                        </div>)}
                    </ul>
                </div>

            )
        },
    ]
    return (
        <Table columns={columns} dataSource={users} pagenation={false} />
    )
}

export default ProductionPermissionTable
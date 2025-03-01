import React, { useEffect, useState } from 'react'
import Table from '../../component/table/Table';
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images//iconDelete.svg";
import viewicon from "../../assets/images/iconView.svg";
import { getData } from "../../utils/CommonApi";

export const UserTable = ({ org_id }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (org_id)
            getUsers();
    }, [org_id]);

    const getUsers = async () => {
        try {
            const resp = await getData(`/user/list/${org_id}`);
            if (resp.data)
                resp.data = resp.data.map((item, index) => ({ ...item, id: index+1 }));
            setUsers(resp.data);
        }
        catch (error) {
            console.log(error);
        }
    }


    const columns = [{
        title: "S. No.",
        dataIndex: "id",
        width: '5%',
        className: "text-center"
    },
    {
        title: "User Name",
        dataIndex: "username",
        width: '15%',
    },
    {
        title: "Email Address",
        dataIndex: "email",
        width: '20%'
    },
    {
        title: "Location",
        dataIndex: "location",
        width: '15%',
        className: "text-center"
    },
    {
        title: "Created on",
        dataIndex: "created",
        width: '10%'
    },
    {
        title: "Role",
        dataIndex: "role",
        width: '10%'
    },
    {
        title: "Status",
        dataIndex: "status",
        width: '12%',
        render: (_text, record) => (
            <select className="form-select" defaultValue={record.status}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
        )
    },
    {
        title: "Action",
        dataIndex: "action",
        width: '13%',
        className: "text-center",
        render: (_text, record) => (
            <>
                <a href={`/admin/user-management/viewuser/${record.user_id}`} className="me-3">
                    <img src={viewicon} alt="View Details" />
                </a>
                <a href={`/admin/user-management/edituser/${record.user_id}`}className="me-3">
                    <img src={editicon} alt="Edit Details" />
                </a>
                <a href="#" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                    <img src={deleteicon} alt="Delete Details" />
                </a>
            </>
        )
    }
    ];
    return (
        <Table columns={columns} dataSource={users} rowKey="user_id" />
    )
}
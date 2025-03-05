import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images/iconDelete.svg";
import viewicon from "../../assets/images/iconView.svg";
import { getData, patchData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import { deleteData } from "../../utils/CommonApi";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../component/input/DatePicker";
import { convertUtcToLocal, getShortAddress } from "../../utils/Helper";
import { UserStatusSelect } from "../../component/select/UserStatusSelect";

export const UserTable = ({ org_id }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openUserDeleteModal, setOpenUserDeleteModal] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (org_id)
            getUsers();
    }, [org_id]);

    const getUsers = async () => {
        try {
            setLoading(true);
            const resp = await getData(`/user/list/${org_id}`);
            if (resp.data)
                resp.data = resp.data.map((item, index) => ({ ...item, id: index + 1 }));
            setUsers(resp.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const resp = await deleteData(`/user/delete/${selectedUserId}`);
            notification.success({
                title: `Delete User`,
                message: resp.message
            });
            navigate(0);
        }
        catch (error) {
            notification.error({
                title: 'Delete User',
                message: error.data?.error
            });
        }
    }
    const handleStatusChanged = async (e, record) => {
        try {
            const resp = await patchData(`/user/update/status`, {
                user_id: record.user_id,
                status_id: parseInt(e.target.value)
            });
            notification.success({
                title: `Update  Status`,
                message: resp.message
            });
        }
        catch (error) {
            console.log(error);
            notification.error({
                title: 'Update Status',
                message: error.data?.error
            });
        }
    }

    const columns = [
        {
            title: "S. No.",
            dataIndex: "id",
            width: "5%",
            className: "text-center",
        },
        {
            title: "User Name",
            dataIndex: "username",
            width: "15%",
        },
        {
            title: "Email Address",
            dataIndex: "email",
            width: "20%",
        },
        {
            title: "Location",
            dataIndex: "location",
            width: "15%",
            className: "text-center",
            render: (_, record) => (
                <span>{getShortAddress(record)}</span>
            )
        },
        {
            title: "Created on",
            dataIndex: "created_on",
            width: "10%",
            render: (text) => (
                <span>{formattedDate(convertUtcToLocal(text), "dd-MM-yyyy")}</span>
            )
        },
        {
            title: "Role",
            dataIndex: "role",
            width: "10%",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "12%",
            render: (_text, record) => (
                <UserStatusSelect value={record.status_id}
                    onChange={(e) => { handleStatusChanged(e, record) }} />
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "13%",
            className: "text-center",
            render: (_text, record) => (
                <>
                    <a href={`/admin/user-management/viewuser/${record.user_id}`} className="me-3">
                        <img src={viewicon} alt="View Details" />
                    </a>
                    <a href={`/admin/user-management/edituser/${record.user_id}`} className="me-3">
                        <img src={editicon} alt="Edit Details" />
                    </a>
                    <a href="#" onClick={() => {
                        setSelectedUserId(record.user_id);
                        setOpenUserDeleteModal(true);
                    }}>
                        <img src={deleteicon} alt="Delete Details" />
                    </a>
                </>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={users} rowKey="user_id" loading={loading} />
            <DeleteConfirmationModal
                modalId="deleteUserModal"
                open={openUserDeleteModal}
                onDelete={handleDelete}
                onClose={() => { setOpenUserDeleteModal(false) }}
            />
        </>
    )

};

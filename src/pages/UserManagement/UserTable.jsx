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
import { convertUtcToLocal, getAllowedOperations, getPagenationFromResponse, getShortAddress, operationExist } from "../../utils/Helper";
import { UserStatusSelect } from "../../component/select/UserStatusSelect";
import { DATE_FORMAT, TABLE_RECORD_SIZE, USER_MGMT } from "../../utils/Constants";

export const UserTable = ({ org_id }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openUserDeleteModal, setOpenUserDeleteModal] = useState();
    const [pagenation, setPagenation] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (org_id)
            getUsers();
    }, [org_id]);

    const getUsers = async (page = 1) => {
        try {
            setLoading(true);
            const resp = await getData(`/user/list/${org_id}?page=${page}&size=${TABLE_RECORD_SIZE}`);
            if (resp.contents)
                resp.contents = resp.contents.map((item, index) => ({ ...item, id: index + 1 }));
            setUsers(resp.contents);
            setPagenation(getPagenationFromResponse(resp));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handlePageChanged = (pageNum) => {
       getUsers(pageNum);
    }

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

    const operations = getAllowedOperations(USER_MGMT);

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
                <span>{formattedDate(convertUtcToLocal(text), DATE_FORMAT)}</span>
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
                    {operations?.find(item => item.operation_type_id === 3) && <a title="View Details" href={`/user-management/viewuser/${record.user_id}`} className="me-3">
                        <img src={viewicon} alt="View Details" />
                    </a>}
                    {operations?.find(item => item.operation_type_id === 2) && <a title="Edit Details" href={`/user-management/edituser/${record.user_id}`} className="me-3">
                        <img src={editicon} alt="Edit Details" />
                    </a>
                    }
                    {operations?.find(item => item.operation_type_id === 4) && <a title="Delete Details"  href="#" onClick={() => {
                        setSelectedUserId(record.user_id);
                        setOpenUserDeleteModal(true);
                    }}>
                        <img src={deleteicon} alt="Delete Details" />
                    </a>
                    }
                </>
            ),
        },
    ];

    if (!operationExist(operations, 2) && !operationExist(operations, 3) && !operationExist(operations, 4))
        columns.splice(columns.length - 1, 1);

    return (
        <>
            <Table columns={columns} dataSource={users} rowKey="user_id" loading={loading}
                pagenation={{ ...pagenation, onChange: handlePageChanged }} />
            <DeleteConfirmationModal
                modalId="deleteUserModal"
                open={openUserDeleteModal}
                onDelete={handleDelete}
                onClose={() => { setOpenUserDeleteModal(false) }}
            />
        </>
    )

};

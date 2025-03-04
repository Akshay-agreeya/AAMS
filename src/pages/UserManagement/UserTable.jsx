import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images/iconDelete.svg";
import viewicon from "../../assets/images/iconView.svg";
import { getData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import { deleteData } from "../../utils/CommonApi";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import { useNavigate } from "react-router-dom";

export const UserTable = ({ org_id }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (org_id) getUsers();
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
        finally{
            setLoading(false);
          }
    };

    const handleDelete = async()=>{
        try{
          const resp = await deleteData(`/user/delete/${selectedUserId}`);
          notification.success({
            title: `Delete User`,
            message: resp.message
          });
          navigate(0);
        }
        catch(error){
          notification.error({
            title: 'Delete User',
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
        },
        {
            title: "Created on",
            dataIndex: "created",
            width: "10%",
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
                <select className="form-select" defaultValue={record.status}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
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
                    <a href="#" onClick={()=>setSelectedUserId(record.user_id)} data-bs-toggle="modal" data-bs-target="#deleteUserModal2">
                    <img src={deleteicon} alt="Delete Details" />
                </a>
                </>
            ),
        },
    ];

    return(
        <>
        {loading ? (
                <div className="dataLoadContainer">
                  <div className="progressBarContainer">
                    <div className="message">Loading data, please wait...</div>
                    <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                      <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "55%" }}></div>
                    </div>
                  </div>
                </div>
            ) : (
     <Table columns={columns} dataSource={users} rowKey="user_id" />
     )}
     <DeleteConfirmationModal modalId="deleteUserModal2" onDelete={handleDelete}/>
     </>
    )
    
};

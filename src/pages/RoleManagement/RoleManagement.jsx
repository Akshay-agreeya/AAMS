import React, { useEffect, useState } from "react";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images//iconDelete.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';
import { getData } from "../../utils/CommonApi";
import Table from "../../component/table/Table";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";


const RoleManagement = () => {

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);


  const getRoles = async () => {
    try {
      const resp = await getData("/role/list");
      setRoles(resp.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const columns = [{
    title: 'Role Name',
    dataIndex: 'role_name',
    scop: "col",
    width: '25%'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    scop: 'col',
    width: '30%'
  },
  {
    title: 'Created',
    dataIndex: 'creation_date',
    scop: 'col',
    width: '25%',
    render: (text)=>(
      <span>{getFormattedDateWithTime(new Date(text))}</span>
    )
  },
  {
    title: 'Action',
    dataIndex: 'ction',
    scop: 'col',
    width: '20%',
    className: "text-center",
    render: (_, record) => (
      <>
        <a href={`/admin/role-management/editrole/${record.role_id}`} className="me-3">
          <img src={editicon} alt="Edit Role" />
        </a>
        <a href="/" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
          <img src={deleteicon} alt="Delete Role" />
        </a>
      </>
    )

  }
  ];

  return (
    <Layout >
      <div className="adaMainContainer">
        {/* Breadcrumbs */}
        {/* Admin Panel Content */}
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Role Management</h1>
                  <div className="buttonContainer">
                    <a href="/admin/role-management/addrole" className="add">
                      + New Role
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="roleManagmentContainer">
                  <div className="gridContainer">
                    <Table columns={columns} dataSource={roles} rowKey="role_id" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delete Confirmation Modal - Reusable Component */}
        <DeleteConfirmationModal modalId="deleteUserModal" />

        {/* Change Password Modal */}

      </div>
    </Layout>
  );
};

export default RoleManagement;

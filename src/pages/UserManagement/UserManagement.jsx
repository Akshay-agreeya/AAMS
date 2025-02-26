import React, { useState } from "react";
import editOrgicon from "../../assets/images//iconWhiteEdit.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';
import ChangePasswordModal from '../../common/auth/ChangePassword'
import Accordian from "../../component/accordian/Accordian";
import Table from "../../component/table/Table";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images//iconDelete.svg";
import viewicon from "../../assets/images/iconView.svg";

const UserManagement = () => {

  const organizations = [
    {
      id: "one",
      name: "Organization Name 1",
      users: [
        { id: 1, username: "mukesh.kumar", email: "mukesh.kumar@gmail.com", location: "India, Mumbai", created: "30-01-2025", role: "Admin", status: "Active" },
        { id: 2, username: "ajay_sharma", email: "ajay.sharma@gmail.com", location: "India, Pune", created: "12-09-2024", role: "User", status: "Active" },
      ],
    },
    {
      id: "two",
      name: "Organization Name 2",
      users: [
        { id: 1, username: "mukesh.kumar", email: "mukesh.kumar@gmail.com", location: "India, Mumbai", created: "30-01-2025", role: "Admin", status: "Active" },
      ],
    },
  ];

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
    render: () => (
      <>
        <a href="/admin/user-management/viewuser" className="me-3">
          <img src={viewicon} alt="View Details" />
        </a>
        <a href="/admin/user-management/edituser" className="me-3">
          <img src={editicon} alt="Edit Details" />
        </a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
          <img src={deleteicon} alt="Delete Details" />
        </a>
      </>
    )
  }
  ]

  return (
    <Layout>
      <div className="adaMainContainer">
        {/* Breadcrumb */}
        {/* Admin Panel Content */}
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>User Management - Organization ({organizations.length})</h1>
                  <div className="buttonContainer">
                    <a href="#" className="delete me-1" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </a>
                    <a href="/admin/user-management/addorg" className="add">
                      <i className="fa-solid fa-plus"></i> Add New Organization
                    </a>
                  </div>
                </div>
              </div>

              {/* Accordion Section */}
              <div className="col-12">
                <div className="userManagmentContainer">
                  <div className="accordion" id="userManageList">
                    {organizations.map((org) => (
                      <Accordian title={org.name} prefix={<div className="form-check me-2 custCheck">
                        <input className="form-check-input" type="checkbox" id={`addcheck-${org.id}`} value="Add" />
                      </div>} extra={<div className="addNewUserCont">
                        <a href="/admin/user-management/editorganization" className="edit me-1">
                          <img src={editOrgicon} alt="Edit Organization" /> Edit Organization
                        </a>
                        <a href="/admin/user-management/adduser" className="add">
                          <i className="fa-solid fa-plus"></i> Add New User
                        </a>
                      </div>}>
                        <Table columns={columns} dataSource={org.users} />
                      </Accordian>
                    ))}
                  </div>
                  {/* Accordion Ends */}
                  {/* Delete Confirmation Modal - Reusable Component */}
                  <DeleteConfirmationModal modalId="deleteUserModal" />
                  <ChangePasswordModal id="changePassword" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UserManagement;

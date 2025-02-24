import React, { useState } from "react";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images//iconDelete.svg";
import viewicon from "../../assets/images/iconView.svg";
import editOrgicon from "../../assets/images//iconWhiteEdit.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';
import ChangePasswordModal from '../../common/auth/ChangePassword'

const UserManagement = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };  

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
                    <div key={org.id} className="userManagmentRepeater">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id={`heading${org.id}`}>
                          <div
                            className={`accordion-button ${openAccordion === org.id ? "" : "collapsed"}`}
                            type="button"
                            onClick={() => toggleAccordion(org.id)}
                            aria-expanded={openAccordion === org.id}
                            aria-controls={`collapse${org.id}`}
                          >
                            <div className="userManagmentShortView">
                              <div className="manageOrg">
                                <div className="form-check me-2 custCheck">
                                  <input className="form-check-input" type="checkbox" id={`addcheck-${org.id}`} value="Add" />
                                </div>
                                <div className="arrowDown me-2">▼</div>
                                <div className="title">{org.name}</div>
                              </div>
                            </div>
                          </div>
                          <div className="addNewUserCont">
                            <a href="/admin/editorg" className="edit me-1">
                              <img src={editOrgicon} alt="Edit Organization" /> Edit Organization
                            </a>
                            <a href="/admin/user-management/adduser" className="add">
                              <i className="fa-solid fa-plus"></i> Add New User
                            </a>
                          </div>
                        </h2>

                        {/* User Table */}
                        <div
                          id={`collapse${org.id}`}
                          className={`accordion-collapse collapse ${openAccordion === org.id ? "show" : ""}`}
                          aria-labelledby={`heading${org.id}`}
                          data-bs-parent="#userManageList"
                        >
                          <div className="accordion-body">
                            <div className="gridContainer">
                              <table>
                                <thead>
                                  <tr>
                                    <th width="5%" className="text-center">S. No.</th>
                                    <th width="15%">User Name</th>
                                    <th width="20%">Email Address</th>
                                    <th width="15%">Location</th>
                                    <th width="10%">Created on</th>
                                    <th width="10%">Role</th>
                                    <th width="12%">Status</th>
                                    <th width="13%" className="text-center">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {org.users.map((user, i) => (
                                    <tr key={user.id}>
                                      <td className="text-center">{i + 1}</td>
                                      <td>{user.username}</td>
                                      <td>{user.email}</td>
                                      <td>{user.location}</td>
                                      <td>{user.created}</td>
                                      <td>{user.role}</td>
                                      <td>
                                        <select className="form-select" defaultValue={user.status}>
                                          <option value="Active">Active</option>
                                          <option value="Inactive">Inactive</option>
                                        </select>
                                      </td>
                                      <td className="text-center">
                                        <a href="/admin/viewuser" className="me-3">
                                          <img src={viewicon} alt="View Details" />
                                        </a>
                                        <a href="/admin/edituser" className="me-3">
                                          <img src={editicon} alt="Edit Details" />
                                        </a>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                                          <img src={deleteicon} alt="Delete Details" />
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

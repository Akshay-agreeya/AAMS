import React from "react";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images//iconDelete.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';


const RoleManagement = () => {
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
                    <table>
                      <thead>
                        <tr>
                          <th scope="col" width="25%">Role Name</th>
                          <th scope="col" width="30%">Description</th>
                          <th scope="col" width="25%">Created</th>
                          <th scope="col" width="20%" className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Super Admin", description: "Administrator role with full access", created: "16 Jan 2025 - 20:55:12" },
                          { name: "Admin", description: "View and Delete Reports", created: "09 Dec 2024 - 22:34:07" },
                          { name: "User", description: "View Reports", created: "09 Dec 2024 - 22:34:07" },
                        ].map((role, index) => (
                          <tr key={index}>
                            <td>{role.name}</td>
                            <td>{role.description}</td>
                            <td>{role.created}</td>
                            <td className="text-center">
                              <a href="/admin/role-management/editrole" className="me-3">
                                <img src={editicon} alt="Edit Role" />
                              </a>
                              <a href="#" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                                <img src={deleteicon} alt="Delete Role" />
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
        </section>

     {/* Delete Confirmation Modal - Reusable Component */}
 <DeleteConfirmationModal modalId="deleteUserModal" />

        {/* Change Password Modal */}
        
      </div>
    </Layout>
  );
};

export default RoleManagement;

import React from "react";
import Layout from '../../component/Layout';

const AddRole = () => {
  const breadcrumbs = [{ url: "/admin/editorg", label: "Home" },
        {label:"Add Role"}
    ];
  return (
    <Layout breadcrumbs={breadcrumbs}>
    <div className="adaMainContainer">
      {/* Admin Panel site content */}
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>Add Role</h1>
              </div>
            </div>

            <div className="col-12">
              <div className="roleManagmentContainer">
                <form>
                  <div className="formContainer">
                    <div className="row">
                      <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <label htmlFor="roleName" className="form-label">
                            Role Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="roleName"
                            name="roleName"
                            placeholder="Role Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Description"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="gridContainer">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col" width="40%">
                              Module Name
                            </th>
                            <th scope="col" width="15%" className="text-center">
                              Add
                            </th>
                            <th scope="col" width="15%" className="text-center">
                              Edit
                            </th>
                            <th scope="col" width="15%" className="text-center">
                              View
                            </th>
                            <th scope="col" width="15%" className="text-center">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            "User Management",
                            "Role Management",
                            "Product Permission",
                            "Product Management",
                            "Reports",
                          ].map((module, index) => (
                            <tr key={index}>
                              <td scope="row">{module}</td>
                              {["Add", "Edit", "View", "Delete"].map(
                                (action, i) => (
                                  <td key={i}>
                                    <div className="form-check custCheckRol">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`${action.toLowerCase()}Check${index}`}
                                        value={action}
                                      />
                                    </div>
                                  </td>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="buttonBox mt-4">
                    <a href="/admin/role-management" className="btnCancel">
                      Cancel
                    </a>
                    <button type="submit" className="btnAddUser">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default AddRole;

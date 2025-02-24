import React from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";

const AddRole = () => {
  const modules = ["User Management", "Role Management", "Product Permission", "Product Management", "Reports"];
  const actions = ["Add", "Edit", "View", "Delete"];

  return (
    <Layout>
      <div className="adaMainContainer">
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
                  <Form>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <FormItem name="roleName" label="Role Name" required>
                            <Input type="text" placeholder="Role Name" required />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="description" label="Description">
                            <Input type="text" placeholder="Description" />
                          </FormItem>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="gridContainer">
                        <table>
                          <thead>
                            <tr>
                              <th scope="col" width="40%">Module Name</th>
                              {actions.map((action, i) => (
                                <th key={i} scope="col" width="15%" className="text-center">
                                  {action}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {modules.map((module, index) => (
                              <tr key={index}>
                                <td scope="row">{module}</td>
                                {actions.map((action, i) => (
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
                                ))}
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
                  </Form>
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

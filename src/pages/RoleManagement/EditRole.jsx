import { useState } from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";

const EditRole = () => {
  const [roleName, setRoleName] = useState("Super Admin");
  const [description, setDescription] = useState("Administrator role with full access");
  const [permissions, setPermissions] = useState({
    "User Management": { add: true, edit: true, view: true, delete: true },
    "Role Management": { add: true, edit: true, view: true, delete: true },
    "Product Permission": { add: true, edit: true, view: true, delete: true },
    "Product Management": { add: true, edit: true, view: true, delete: true },
    Reports: { add: true, edit: true, view: true, delete: true },
  });
  const breadcrumbs = [{ url: "/admin/editrole", label: "Home" }, { label: "Edit Role" }];

  const handleCheckboxChange = (module, action) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: { ...prev[module], [action]: !prev[module][action] },
    }));
  };

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Edit Role</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="roleManagmentContainer">
                  <Form>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <FormItem name="roleName" label="Role Name" required>
                            <Input
                              type="text"
                              value={roleName}
                              onChange={(e) => setRoleName(e.target.value)}
                              placeholder="Role Name"
                              required
                            />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="description" label="Description">
                            <Input
                              type="text"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Description"
                            />
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
                              <th scope="col" width="15%" className="text-center">Add</th>
                              <th scope="col" width="15%" className="text-center">Edit</th>
                              <th scope="col" width="15%" className="text-center">View</th>
                              <th scope="col" width="15%" className="text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(permissions).map(([module, actions]) => (
                              <tr key={module}>
                                <td scope="row">{module}</td>
                                {Object.keys(actions).map((action) => (
                                  <td key={action} className="text-center">
                                    <div className="form-check custCheckRol">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={actions[action]}
                                        onChange={() => handleCheckboxChange(module, action)}
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
                        Save
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

export default EditRole;

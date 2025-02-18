import { useState } from "react";
import Layout from '../../component/Layout';

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
  const breadcrumbs = [{ url: "/admin/editrole", label: "Home" },
  {label:"Edit Role"}
];

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
                <form>
                  <div className="formContainer">
                    <div className="row">
                      <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <label htmlFor="roleName" className="form-label">
                            Role Name <span className="required">*</span>
                          </label>
                          <input type="text" className="form-control" id="roleName" value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder="Role Name" required />
                        </div>
                      </div>
                      <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

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

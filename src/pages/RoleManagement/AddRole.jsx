import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";
import { getData, patchData, postData } from "../../utils/CommonApi";
import Table from "../../component/table/Table";
import notification from "../../component/notification/Notification";
import { useNavigate, useParams } from "react-router-dom";


const AddRole = () => {

  const [roleSeedData, setRoleSeedData] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState([]);

  const actions = [{ label: "Add", id: 1 }, { label: "Edit", id: 2 }, { label: "View", id: 3 }, { label: "Delete", id: 4 }];

  const navigate = useNavigate();
  const { role_id } = useParams();

  const formRef = useRef();

  

  const getSeedData = async () => {
    try {
      const resp = await getData("/lookup/permissions");
      setRoleSeedData(resp.contents);
    }
    catch (error) {
      console.log(error);
    }
  }
  const getRoleInfo = useCallback(async () => {

    try {
      const resp = await getData(`/role/get/${role_id}`);
      formRef.current.setFieldsValue(resp.role);
      setSelectedPermission(resp.details?.map(id => id.menu_detail_permission_id));
    }
    catch (error) {
      console.log(error);
    }
  }, [role_id]);

  useEffect(() => {
    getSeedData();
    if (role_id)
      getRoleInfo();
  }, [getRoleInfo,role_id]);

  const roleColumns = [
    {
      title: "Module Name",
      dataIndex: 'menu_detail_name',
      width: '40%',

    }
  ];

  actions.forEach((item, index) => {
    roleColumns.push({
      title: item.label,
      dataIndex: 'menu_detail_permission_id',
      width: '15%',
      scop: 'col',
      className: "text-center",

      render: (_, record) => {
        // Precompute the permission_id for the current item
        const permissionId = record.operations.find(fItem => fItem.operation_type_id === item.id)?.menu_detail_permission_id;

        // Check if permissionId exists for the current record
        if (!permissionId) return null;

        const handleChange = (e) => {
          const { value, checked } = e.target;
          setSelectedPermission(prev => {
            const newSelection = new Set(prev);
            if (checked) {
              newSelection.add(parseInt(value)); // Add value if checked
            } else {
              newSelection.delete(parseInt(value)); // Remove value if unchecked
            }
            return Array.from(newSelection); // Convert back to array
          });
        };

        return (
          <div className="form-check custCheckRol" key={permissionId}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`${item.label.toLowerCase()}Check${index}`}
              value={permissionId}
              checked={selectedPermission.includes(permissionId)}
              onChange={handleChange}
            />
          </div>
        );
      }
    });
  });


  const onSubmit = async (formData) => {
    try {
      const roleData = { ...formData, role_permissions: selectedPermission };
      if (selectedPermission?.length === 0) {
        notification.error({
          title: role_id ? "Edit Role" : 'Add Role',
          message: "Please select at least one permission"
        });
        return;
      }

      const resp = role_id ? await patchData(`/role/edit/${role_id}`, roleData) :
        await postData("/role/add", roleData);

      notification.success({
        message: role_id ? "Edit Role" : 'Add Role',
        description: resp.message
      });
      navigate("/admin/role-management");
    }
    catch (error) {
      console.log(error);
      notification.error({
        title: role_id ? "Edit Role" : 'Add Role',
        message: error.data?.error
      });
    }
  }

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>{`${role_id ? "Edit" : "Add"} Role`}</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="roleManagmentContainer">
                  <Form onSubmit={onSubmit} ref={formRef}>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <FormItem name="role_name" label="Role Name" rules={[{
                            required: true,
                            message: "Role name is required"
                          }]} requiredMark={true}>
                            <Input type="text" placeholder="Role Name" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="description" label="Description" rules={[{
                            required: true,
                            message: "Description is required"
                          }]} requiredMark={true}>
                            <Input type="text" placeholder="Description" />
                          </FormItem>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="gridContainer">
                        <Table columns={roleColumns} dataSource={roleSeedData} rowKey="menu_detail_id"
                          pagenation={false} />
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

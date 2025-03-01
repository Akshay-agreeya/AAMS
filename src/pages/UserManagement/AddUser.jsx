import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";
import { Select } from "../../component/input/Select";
import { getData, patchData, postData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import { RoleSelect } from "../../component/select/RoleSelect";

const AddUser = () => {
  const [initialValues, setInitialValues] = useState({});
  const navigate = useNavigate();
  const { org_id, user_id } = useParams();
  const formRef = useRef();

  useEffect(() => {
    if (user_id) {
      getUserInfo();
    }
  }, [user_id]);

  const getUserInfo = async () => {
    try {
      const resp = await getData(`/user/get/${user_id}`);
      if (resp.success) {
        setInitialValues(resp.data);
        formRef.current?.setFieldsValue(resp.data); // Update form fields
      } else {
        notification.error({
          title: "Error",
          message: "Failed to fetch user details.",
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      notification.error({
        title: "Error",
        message: "An error occurred while fetching user details.",
      });
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        // username: formData.username,
        // first_name: formData.firstName,
        // last_name: formData.lastName,
        // email: formData.email,
        // phone_number: formData,
        // password: formData.password,
        role_id: parseInt(formData.selRole),
        status_id: formData.selStatus,
      };

      const response = user_id
        ? await patchData(`/user/edit/${user_id}`, payload)
        : await postData(`/user/add/${org_id}`, payload);

      if (response.success) {
        notification.success({
          title: `${user_id ? "Edit" : "Add"} User`,
          message: "User saved successfully!",
        });

        navigate("/admin/user-management");
      } else {
        notification.error({
          title: "User Operation Failed",
          message: response.message || "Failed to process the request.",
        });
      }
    } catch (error) {
      console.error("Error handling user:", error);
      notification.error({
        title: "Error",
        message: error.response?.data?.message || "An error occurred while processing the user request.",
      });
    }
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>{user_id ? "Edit User" : "Add User"}</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="userManagmentContainer">

                  <Form onSubmit={handleSubmit} ref={formRef}>
                    <h3>User Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem
                              name="selRole"
                              label="Select Role"
                              rules={[{ required: true, message: "Role is required" }]}
                              requiredMark={true}
                            >
                              <RoleSelect />
                            </FormItem>
                          </div>
                        </div>

                        {[
                          { label: "First Name", name: "first_name", type: "text", placeholder: "First Name" },
                          { label: "Last Name", name: "last_name", type: "text", placeholder: "Last Name" },
                          { label: "Email address", name: "email", type: "text", patternType:'email', placeholder: "name@example.com", patternMsg: "Enter valid email" },
                          { label: "Contact Number", name: "phone_number", type: "text", placeholder: "Contact Number" },
                        ].map((field, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <div className="mb-3">
                              <FormItem name={field.name} label={field.label} rules={[
                                { required: true, message: `${field.label} is required` },
                                { type: field.patternType, message: field.patternMsg }
                              ]} requiredMark={true}>
                                <Input type={field.type} placeholder={field.placeholder} />
                              </FormItem>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <h3>User Login Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { label: "User Name", name: "username", type: "text", placeholder: "User Name" },
                          { label: "Password", name: "password", type: "password", placeholder: "Password" },
                          { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
                        ].map((field, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <div className="mb-3">
                              <FormItem name={field.name} label={field.label} rules={[{ required: true, message: `${field.label} is required` }]} requiredMark={true}>
                                <Input type={field.type} placeholder={field.placeholder} />
                              </FormItem>
                            </div>
                          </div>
                        ))}

                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="selStatus" label="Status" rules={[{ required: true, message: "Status is required" }]} requiredMark={true}>
                              <Select
                                options={[
                                  { value: "1", label: "Active" },
                                  { value: "2", label: "Inactive" },
                                ]}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="buttonBox">
                        <button type="button" className="btnCancel" onClick={() => navigate("/admin/user-management")}>
                          Cancel
                        </button>
                        <button type="submit" className="btnAddUser">
                          {user_id ? "Update" : "Submit"}
                        </button>
                      </div>
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

export default AddUser;

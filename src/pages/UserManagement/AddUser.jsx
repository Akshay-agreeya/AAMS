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
import { getFormattedAddress } from "../../utils/Helper";
import { UserStatusSelect } from "../../component/select/UserStatusSelect";
import Loading from "../../component/Loading";

const AddUser = () => {

  const [initialValues, setInitialValues] = useState({});
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { org_id, user_id } = useParams();

  const formRef = useRef();

  useEffect(() => {
    if (user_id)
      getUserInfo();

  }, [user_id]);

  useEffect(() => {
    if (org_id)
      getOrganizationInfo();
  }, [org_id]);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const resp = await getData(`/user/get/${user_id}`);
      const userData = resp || {};
      setInitialValues(userData);
      setOrganization({
        org_name: userData.org_name,
        contact_first_name: userData.contact_first_name, contact_last_name: userData.contact_last_name,
        contact_email: userData.contact_email, contact: userData.contact,
        address_line: userData.address_line, city: userData.city, state: userData.state,
        country: userData.country
      })
    } catch (error) {
      console.error("Error fetching user details:", error);
      notification.error({
        title: "Error",
        message: "An error occurred while fetching user details.",
      });
    }
    finally {
      setLoading(false);
    }
  };

  const getOrganizationInfo = async () => {
    try {
      const resp = await postData(`/org/get`, { org_id });
      const orgData = resp.contents?.[0] || {};
      setOrganization({
        ...orgData,
        contact_first_name: orgData.first_name, contact_last_name: orgData.last_name,
        contact_email: orgData.email, contact: orgData.phone_number
      })
    } catch (error) {
      console.error("Error fetching organization details:", error);
      notification.error({
        title: "Error",
        message: "An error occurred while fetching organization details.",
      });
    }
  };

  useEffect(() => {
    formRef.current.setFieldsValue(initialValues);
  }, [initialValues])

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        role_id: parseInt(formData.role_id),
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
      formRef.current.setFieldsError(error.data?.errors || {});
      if (!error.data?.errors)
        notification.error({
          title: "Error",
          message: error?.data?.errors?.[0] || "An error occurred while processing the user request.",
        });
    }
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        {loading ? (
          <Loading />
        ) : (
          <section className="adminControlContainer">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="pageTitle">
                    <h1>{`${user_id ? "Edit" : "Add"} User`}</h1>
                  </div>
                </div>

                <div className="col-12">
                  <div className="userManagmentContainer">
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { title: "Organization Name", value: organization.org_name || "N/A" },
                          { title: "Organization Address", value: getFormattedAddress(organization) || "N/A" },
                          {
                            title: "Contact Person", value: `${organization.contact_first_name || ''}  ${organization.contact_last_name || ''} - ${organization.contact}`
                          },
                          { title: "Email", value: organization.contact_email || "N/A" },
                        ].map((item, index) => (
                          <div className="col-12 col-lg-3" key={index}>
                            <div className="mb-3">
                              <div className="userStaticInfo">
                                <div className="title">{item.title}</div>
                                <div className="value">{item.value}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Form onSubmit={handleSubmit} ref={formRef}>
                      <h3>User Details</h3>
                      <div className="formContainer">
                        <div className="row">
                          <div className="col-12 col-lg-4">
                            <div className="mb-3">
                              <FormItem
                                name="role_id"
                                label="Select Role"
                                rules={[{ required: true, message: "Role is required" }]}
                                requiredMark={true}
                              >
                                <RoleSelect value={initialValues.role_id} />
                              </FormItem>
                            </div>
                          </div>

                          {[
                            { label: "First Name", name: "first_name", type: "text", placeholder: "First Name" },
                            { label: "Last Name", name: "last_name", type: "text", placeholder: "Last Name" },
                            { label: "Email address", name: "email", type: "text", patternType: 'email', placeholder: "name@example.com", patternMsg: "Enter valid email" },
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
                      {!user_id && <>
                        <h3>User Login Details</h3>
                        <div className="formContainer ">
                          <div className="row">
                            {[
                              { label: "User Name", name: "username", type: "text", placeholder: "User Name" },
                              { label: "Password", name: "password", type: "password", placeholder: "Password" },
                              { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
                            ].map((field, index) => (
                              <div className="col-12 col-lg-4 " key={index}>
                                <div className="mb-3">
                                  <FormItem name={field.name} label={field.label} rules={[{ required: true, message: `${field.label} is required` }]} requiredMark={true}>
                                    <Input type={field.type} placeholder={field.placeholder} />
                                  </FormItem>
                                </div>
                              </div>
                            ))}

                            <div className="col-12 col-lg-4">
                              <div className="mb-3">
                                <FormItem name="selStatus" label="Status" rules={[{ required: true, message: "Status is required" }]}
                                  requiredMark={true}>
                                  <UserStatusSelect />
                                </FormItem>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>}

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
        )}
      </div>
    </Layout>

  );
};

export default AddUser;

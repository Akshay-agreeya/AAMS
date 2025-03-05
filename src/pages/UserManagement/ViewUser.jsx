import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";
import iconEdit from "../../assets/images/iconEditDeails.svg";

const ViewUserDetails = () => {
  const { user_id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const formRef = useRef();

  useEffect(() => {
    if (user_id) fetchUserDetails();
  }, [user_id]);

  const fetchUserDetails = async () => {
    try {
      const response = await getData(`/user/get/${user_id}`);
      if (response.success) {
        setUserDetails(response.data);
        formRef.current?.setFieldsValue(response.data); // Update Form Fields
      } else {
        notification.error({ title: "Error", message: "Failed to load user details" });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      notification.error({ title: "Error", message: "An error occurred while fetching user details." });
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
                  <h1>View User Details</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="roleContainer">
                  <div className="userrole">
                    User Name: <span className="me-4">{userDetails.username || "N/A"}</span>
                    Role: <span>{userDetails.role_name || "N/A"}</span>
                  </div>
                  <div className="editDetails">
                    <a href={`/admin/user-management/edituser/${user_id}`}>
                      <img src={iconEdit} alt="Edit User Details" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="userManagmentContainer">
                  <div className="formContainer">
                    <div className="row">
                      {[ 
                        { title: "Organization Name", value: userDetails.org_name || "N/A" },
                        { title: "Organization Address", value: userDetails.address_line || "N/A" },
                        { title: "Contact Person", value: userDetails.contact_first_name && userDetails.contact_last_name
                        ? `${userDetails.contact_first_name} ${userDetails.contact_last_name}`
                        : "N/A"},
                        { title: "Email", value: userDetails.contact_email || "N/A" },
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

                  <h3>User Details</h3>
                  <Form ref={formRef}>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { label: "First Name", name: "first_name", type: "text", placeholder: "First Name" },
                          { label: "Last Name", name: "last_name", type: "text", placeholder: "Last Name" },
                          { label: "Email address", name: "email", type: "email", placeholder: "name@example.com" },
                          { label: "Contact Number", name: "contact", type: "text", placeholder: "Contact Number" },
                        ].map((field, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <div className="mb-3">
                              <FormItem name={field.name} label={field.label}>
                                <Input type={field.type} placeholder={field.placeholder} value={userDetails[field.name] || ""} disabled />
                              </FormItem>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="buttonBox">
                        <button type="button" className="btnAddUser" onClick={() => window.history.back()}>
                          <i className="fa-solid fa-arrow-left-long"></i> Back
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

export default ViewUserDetails;

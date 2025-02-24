import React from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";
import { Select } from "../../component/input/Select";
import Captcha from "../../assets/images/capcha.jpg";

const AddUser = () => {
 
  const initialData = {
    selRole: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    username: "",
    password: "",
    confirmPassword: "",
    selStatus: "",
  };

  const handleSubmit = (formData) => {
    console.log("Form Submitted", formData);
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Add User</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="userManagmentContainer">
                  <Form onSubmit={handleSubmit} initialValues={initialData}>
                    <h3>Organization Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { title: "Organization Name", value: "Organization Name 1" },
                          { title: "Organization Address", value: "B-34, Sector 45, Noida, India" },
                          { title: "Contact Person", value: "Shiva Sharma - +91 9876545367" },
                          { title: "Email", value: "shiva.sharma@email.com" },
                        ].map((item, index) => (
                          <div className="col-12 col-lg-3" key={index}>
                            <div className="userStaticInfo">
                              <div className="title">{item.title}</div>
                              <div className="value">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <h3>User Details - 01</h3>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <FormItem name="selRole" label="Select Role" rules={[{ required: true, message: "Required" }]}>
                            <Select
                              options={[
                                { value: "1", label: "Admin" },
                                { value: "2", label: "User" },
                              ]}
                            />
                          </FormItem>
                        </div>

                        {[
                          { label: "First Name", name: "firstName", type: "text", placeholder: "First Name" },
                          { label: "Last Name", name: "lastName", type: "text", placeholder: "Last Name" },
                          { label: "Email address", name: "email", type: "email", placeholder: "name@example.com" },
                          { label: "Contact Number", name: "contactNo", type: "text", placeholder: "Contact Number" },
                        ].map((field, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <FormItem name={field.name} label={field.label} rules={[{ required: true, message: "Required" }]}>
                              <Input type={field.type} placeholder={field.placeholder} />
                            </FormItem>
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
                            <FormItem name={field.name} label={field.label} rules={[{ required: true, message: "Required" }]}>
                              <Input type={field.type} placeholder={field.placeholder} />
                            </FormItem>
                          </div>
                        ))}

                        <div className="col-12 col-lg-4">
                          <FormItem name="selStatus" label="Status" rules={[{ required: true, message: "Required" }]}>
                            <Select
                              options={[
                                { value: "1", label: "Active" },
                                { value: "2", label: "Inactive" },
                              ]}
                            />
                          </FormItem>
                        </div>

                        <div className="col-12 col-lg-8">
                          <div className="captchaContainer text-end">
                            <img src={Captcha} alt="captcha" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="buttonBox">
                        <a href="/admin/user-management" className="btnCancel">
                          Cancel
                        </a>
                        <button type="submit" className="btnAddUser">
                          Submit
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

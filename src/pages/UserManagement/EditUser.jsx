import React from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";

const EditUser = () => {
  const initialData = {
    firstName: "Ajay",
    lastName: "Sharma",
    email: "ajay.sharma@gmail.com",
    contactNo: "+91 9899432567",
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
                  <h1>Edit User Details</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="roleContainer">
                  <div className="userrole">
                    User Name: <span className="me-4">mukesh.kumar</span> Role: <span>Admin</span>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="userManagmentContainer">
                  <Form onSubmit={handleSubmit} initialValues={initialData}>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { title: "Organization Name", value: "Organization Enterprise -1" },
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

                    <div className="buttonBox mt-4">
                      <a href="/admin/user-management" className="btnCancel">
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

export default EditUser;

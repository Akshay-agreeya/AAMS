import React from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";
import { Select } from "../../component/input/Select";

const EditOrganization = () => {
  

  const initialData = {
    name: "Organization Name 1",
    type: "1",
    industry: "1",
    country: "2",
    state: "1",
    address: "B-34, Sector 45, Noida, India",
    contractExpiry: "2028-03-01",
    role: "1",
    firstName: "Mukesh",
    lastName: "Kumar",
    email: "mukesh.kumar@gmail.com",
    contactNo: "+91 9877662221",
  };

  const handleSubmit = (formData) => {
    console.log("Updated Organization Details:", formData);
  };

  return (
    <Layout >
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Edit Organization</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="roleContainer">
                  <div className="userrole">
                    User Name: <span className="me-4">Mukesh.Kumar</span> Role: <span>Admin</span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="userManagmentContainer">
                  <Form onSubmit={handleSubmit} initialValues={initialData}>
                    <h3>Organization Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        <div className="col-12 col-lg-4">
                          <FormItem name="name" label="Organization Name" rules={[{ required: true, message: "Required" }]}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="type" label="Type of Organization" rules={[{ required: true, message: "Required" }]}>
                            <Select
                              options={[
                                { value: "1", label: "Private" },
                                { value: "2", label: "Government" },
                                { value: "3", label: "Non-Profit" },
                              ]}
                            />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="industry" label="Industry Type" rules={[{ required: true, message: "Required" }]}>
                            <Select
                              options={[
                                { value: "1", label: "IT" },
                                { value: "2", label: "Healthcare" },
                                { value: "3", label: "Education" },
                              ]}
                            />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="country" label="Country" rules={[{ required: true, message: "Required" }]}>
                            <Select
                              options={[
                                { value: "1", label: "United States" },
                                { value: "2", label: "India" },
                                { value: "3", label: "Japan" },
                              ]}
                            />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="state" label="State" rules={[{ required: true, message: "Required" }]}>
                            <Select
                              options={[
                                { value: "1", label: "Noida" },
                                { value: "2", label: "Pune" },
                                { value: "3", label: "Mumbai" },
                              ]}
                            />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="address" label="Organization Address" rules={[{ required: true, message: "Required" }]}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="contractExpiry" label="Hub Contract Expiry Date" rules={[{ required: true, message: "Required" }]}>
                            <Input type="date" />
                          </FormItem>
                        </div>
                      </div>
                    </div>

                    <h3>Organization Contact Person Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {/* <div className="col-12 col-lg-4"> */}
                          {/* <FormItem name="role" label="Select Role" rules={[{ required: true, message: "Required" }]}>
                            <Select
                              options={[
                                { value: "1", label: "Admin" },
                                { value: "2", label: "User" },
                              ]}
                            />
                          </FormItem> */}
                        {/* </div> */}
                        <div className="col-12 col-lg-4">
                          <FormItem name="firstName" label="First Name" rules={[{ required: true, message: "Required" }]}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="lastName" label="Last Name" rules={[{ required: true, message: "Required" }]}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="email" label="Email Address" rules={[{ required: true, message: "Invalid email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }]}>
                            <Input type="email" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="contactNo" label="Contact Number" rules={[{ required: true, message: "Required" }]}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="buttonBox">
                        <a href="/admin/user-management" className="btnCancel">Cancel</a>
                        <button type="submit" className="btnAddUser">Save Details</button>
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

export default EditOrganization;

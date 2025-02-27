import React from "react";
import Layout from "../../component/Layout";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { Input } from "../../component/input/Input";
import { Select } from "../../component/input/Select";
import { OrganizationTypeSelect } from "../../component/select/OrganizationTypeSelect";
import { IndustryTypeSelect } from "../../component/select/IndustryTypeSelect";
import { CountrySelect } from "../../component/select/CountrySelect";
import { StateSelect } from "../../component/select/StateSelect";
import DatePicker from "../../component/input/DatePicker";

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
                          <FormItem name="name" label="Organization Name" rules={[{ required: true, message: "Organization Name is equired" }]}requiredMark={true}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <FormItem name="type" label="Type of Organization" rules={[{ required: true, message: "Organization Type required" }]}requiredMark={true}>
                            <OrganizationTypeSelect/>
                          </FormItem>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <FormItem name="industry" label="Industry Type" rules={[{ required: true, message: "Indtustry Type is required" }]}requiredMark={true}>
                            <IndustryTypeSelect/>
                          </FormItem>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <FormItem name="country" label="Country" rules={[{ required: true, message: "Country is required" }]}requiredMark={true}>
                            <CountrySelect/>
                          </FormItem>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="state" label="State" rules={[{ required: true, message: "State is required" }]}requiredMark={true}>
                            <StateSelect/>
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="address" label="Organization Address" rules={[{ required: true, message: "organization Address is required" }]}requiredMark={true}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="contractExpiry" label="Hub Contract Expiry Date" rules={[{ required: true, message: "Hub Contract Expiry Date is required" }]}requiredMark={true}>
                          <DatePicker minDate={new Date()}
                                onChange={(date) => { console.log(date) }} name="contract_expiry_date" />
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
                        <div className="mb-3">
                          <FormItem name="firstName" label="First Name" rules={[{ required: true, message: "First Name is required" }]}requiredMark={true}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <FormItem name="lastName" label="Last Name" rules={[{ required: true, message: "Last Name is required" }]}requiredMark={true}>
                            <Input type="text" />
                          </FormItem>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                          <FormItem name="email" label="Email Address" rules={[{ required: true, message: "Email is required", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }]}requiredMark={true}>
                            <Input type="email" />
                          </FormItem>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4">
                          <FormItem name="contactNo" label="Contact Number" rules={[{ required: true, message: "Contact No is required" }]}requiredMark={true}>
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

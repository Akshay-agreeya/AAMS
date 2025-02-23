import Layout from '../../component/Layout';
import Form from '../../component/form/Form';
import { FormItem } from '../../component/form/FormItem';
import { Input } from '../../component/input/Input';
import { OrganizationTypeSelect } from "../../component/select/OrganizationTypeSelect";
import { StateSelect } from "../../component/select/StateSelect";
import { IndustryTypeSelect } from "../../component/select/IndustryTypeSelect";
import { CountrySelect } from "../../component/select/CountrySelect";

const AddOrganization = () => {
  const breadcrumbs = [{ url: "/admin/addorg", label: "Home" }, { label: "Add Organization" }];

  const handleSubmit = (formData) => {
    console.log("Form Submitted", formData);
  };

  const initialValues = {
  };

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Add New Organization</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="userManagmentContainer">
                  <h3>Organization Details</h3>
                  <Form onSubmit={handleSubmit} initialValues={initialValues}>
                    <div className="formContainer">
                      <div className="row">
                        {/* Organization Name */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="userName" label="Organization Name"
                              rules={[{ required: true, message: "Name is required" }]}
                              requiredMark={true}>
                              <Input type="text" placeholder="Organization Name" />
                            </FormItem>
                          </div>
                        </div>
                        {/* Dropdowns */}
                        {/* {[
                          { label: "Type of Organization", name: "role", options: [{ value: "Private", label: "Private" }, { value: "Government", label: "Government" }, { value: "Non-Profit", label: "Non-Profit" }] },
                          { label: "Industry Type", name: "selIndustry", options: [{ value: "IT", label: "IT" }, { value: "Healthcare", label: "Healthcare" }, { value: "Education", label: "Education" }] },
                          { label: "Country", name: "selCountry", options: [{ value: "United States", label: "United States" }, { value: "India", label: "India" }, { value: "Japan", label: "Japan" }] },
                          { label: "State", name: "selState", options: [{ value: "Noida", label: "Noida" }, { value: "Pune", label: "Pune" }, { value: "Mumbai", label: "Mumbai" }] },
                        ].map((select, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <FormItem name={select.name} label={select.label} rules={[{ required: true, message: "Required" }]}>
                              <Select options={select.options} />
                            </FormItem>
                          </div>
                        ))} */}
                        {/* Organization Type */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="org_type" label="Organization Type"
                              rules={[{ required: true, message: "Organization type is required" }]}
                              requiredMark={true}>
                              <OrganizationTypeSelect />
                            </FormItem>
                          </div>
                        </div>
                        {/* Industry Type */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="industry_type" label="Industry Type"
                              rules={[{ required: true, message: "Industry type is required" }]}
                              requiredMark={true}>
                              <IndustryTypeSelect />
                            </FormItem>
                          </div>
                        </div>
                        {/* Country */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="country" label="Country"
                              rules={[{ required: true, message: "Country is required" }]}
                              requiredMark={true}>
                              <CountrySelect />
                            </FormItem>
                          </div>
                        </div>
                        {/* State */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="state" label="State"
                              rules={[{ required: true, message: "State is required" }]}
                              requiredMark={true}>
                              <StateSelect />
                            </FormItem>
                          </div>
                        </div>

                        {/* Organization Address */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="address" label="Organization Address"
                              rules={[{ required: true, message: "Required" }]}
                              requiredMark={true}>
                              <Input type="text" placeholder="Organization Address" />
                            </FormItem>
                          </div>
                        </div>



                        {/* Contract Expiry Date */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="contractExpiry" label="Hub Contract Expiry Date"
                              rules={[{ required: true, message: "Required" }]}
                              requiredMark={true}>
                              <Input type="date" />
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3>Organization Contact Person Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { label: "First Name", name: "firstName", type: "text", placeholder: "First Name" },
                          { label: "Last Name", name: "lastName", type: "text", placeholder: "Last Name" },
                          { label: "Email Address", name: "email", type: "email", placeholder: "name@example.com" },
                          { label: "Contact Number", name: "contactNo", type: "text", placeholder: "Contact Number" },
                        ].map((field, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <div className="mb-3">
                              <FormItem name={field.name} label={field.label}
                                rules={[{ required: true, message: "Required" }]}>
                                <Input type={field.type} placeholder={field.placeholder} />
                              </FormItem>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="buttonBox">
                        <a href="/admin/user-management" className="btnCancel">Cancel</a>
                        <button type="submit" className="btnAddUser">Submit</button>
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

export default AddOrganization;

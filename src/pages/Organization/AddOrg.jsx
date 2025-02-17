import { useState } from "react";

const AddOrganization = () => {
  const [formData, setFormData] = useState({
    userName: "",
    role: "",
    selIndustry: "",
    selCountry: "",
    selState: "",
    address: "",
    contractExpiry: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="adaMainContainer">
      <div className="breadcrumbsContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <a href="dashboard.html">Home</a> &gt; 
              <a href="userManagment.html">User Management</a> &gt; 
              <span> Add New Organization</span>
            </div>
          </div>
        </div>
      </div>

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
                <form onSubmit={handleSubmit}>
                  <h3>Organization Details</h3>
                  <div className="formContainer">
                    <div className="row">
                      {[
                        { label: "Organization Name", name: "userName", type: "text", placeholder: "Organization Name" },
                        { label: "Organization Address", name: "address", type: "text", placeholder: "Organization Address" },
                      ].map((field, index) => (
                        <div className="col-12 col-lg-4" key={index}>
                          <div className="mb-3">
                            <label className="form-label">{field.label} <span className="required">*</span></label>
                            <input
                              type={field.type}
                              className="form-control"
                              name={field.name}
                              placeholder={field.placeholder}
                              required
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      ))}

                      {[
                        { label: "Type of Organization", name: "role", options: ["Private", "Government", "Non-Profit"] },
                        { label: "Industry Type", name: "selIndustry", options: ["IT", "Healthcare", "Education"] },
                        { label: "Country", name: "selCountry", options: ["United States", "India", "Japan"] },
                        { label: "State", name: "selState", options: ["Noida", "Pune", "Mumbai"] },
                      ].map((select, index) => (
                        <div className="col-12 col-lg-4" key={index}>
                          <div className="mb-3">
                            <label className="form-label">{select.label} <span className="required">*</span></label>
                            <select className="form-select" name={select.name} required onChange={handleChange}>
                              <option value="" disabled selected>Select {select.label}</option>
                              {select.options.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}

                      <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Hub Contract Expiry Date <span className="required">*</span></label>
                          <input type="date" className="form-control" name="contractExpiry" onChange={handleChange} />
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
                            <label className="form-label">{field.label}</label>
                            <input
                              type={field.type}
                              className="form-control"
                              name={field.name}
                              placeholder={field.placeholder}
                              required
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="buttonBox">
                      <a href="/usermanagement" className="btnCancel">Cancel</a>
                      <button type="submit" className="btnAddUser">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddOrganization;

import React, { useState } from "react";
import Layout from '../../component/Layout';

const EditOrganization = () => {
  const [organization, setOrganization] = useState({
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
  });
  const breadcrumbs = [{ url: "/admin/editorg", label: "Home" },
        {label:"Edit Organization"}
    ];

  const handleChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  return (
    <Layout breadcrumbs={breadcrumbs}>
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
                <div className="userrole">User Name: <span className="me-4">Mukesh.Kumar</span> Role: <span>Admin</span></div>
              </div>
            </div>
            <div className="col-12">
              <div className="userManagmentContainer">
                <form>
                  <h3>Organization Details</h3>
                  <div className="formContainer">
                    <div className="row">
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Organization Name *</label>
                        <input type="text" className="form-control" name="name" value={organization.name} onChange={handleChange} />
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Type of Organization *</label>
                        <select className="form-select" name="type" value={organization.type} onChange={handleChange}>
                          <option value="1">Private</option>
                          <option value="2">Government</option>
                          <option value="3">Non-Profit</option>
                        </select>
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Industry Type *</label>
                        <select className="form-select" name="industry" value={organization.industry} onChange={handleChange}>
                          <option value="1">IT</option>
                          <option value="2">Healthcare</option>
                          <option value="3">Education</option>
                        </select>
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Country *</label>
                        <select className="form-select" name="country" value={organization.country} onChange={handleChange}>
                          <option value="1">United States</option>
                          <option value="2">India</option>
                          <option value="3">Japan</option>
                        </select>
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">State *</label>
                        <select className="form-select" name="state" value={organization.state} onChange={handleChange}>
                          <option value="1">Noida</option>
                          <option value="2">Pune</option>
                          <option value="3">Mumbai</option>
                        </select>
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Organization Address *</label>
                        <input type="text" className="form-control" name="address" value={organization.address} onChange={handleChange} />
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Hub Contract Expiry Date *</label>
                        <input type="date" className="form-control" name="contractExpiry" value={organization.contractExpiry} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <h3>Organization Contact Person Details</h3>
                  <div className="formContainer">
                    <div className="row">
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Select Role</label>
                        <select className="form-select" name="role" value={organization.role} onChange={handleChange}>
                          <option value="1">Admin</option>
                          <option value="2">User</option>
                        </select>
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={organization.firstName} onChange={handleChange} />
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={organization.lastName} onChange={handleChange} />
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="email" value={organization.email} onChange={handleChange} />
                      </div>
                      <div className="col-12 col-lg-4">
                        <label className="form-label">Contact Number</label>
                        <input type="text" className="form-control" name="contactNo" value={organization.contactNo} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="buttonBox">
                      <a href="/admin/user-management" className="btnCancel">Cancel</a>
                      <button type="submit" className="btnAddUser">Save Details</button>
                    </div>
                  </div>
                </form>
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

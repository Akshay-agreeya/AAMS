import { useState } from "react";
import Captcha from 'C:/Users/abhishek.joshi/Downloads/AAMS/src/assets/images/capcha.jpg'

const AddUser = () => {
  const [formData, setFormData] = useState({
    selRole: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    username: "",
    password: "",
    confirmPassword: "",
    selStatus: "",
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
      {/* Breadcrumbs */}
      <div className="breadcrumbsContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <a href="dashboard.html">Home</a> &gt;{" "}
              <a href="userManagment.html">User Management</a> &gt;
              <span> Add User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel */}
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
                <form onSubmit={handleSubmit}>
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
                        <div className="mb-3">
                          <label className="form-label">Select Role</label>
                          <select className="form-select" name="selRole" required onChange={handleChange}>
                            <option value="" disabled selected>
                              Select Role
                            </option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                          </select>
                        </div>
                      </div>

                      {[
                        { label: "First Name", name: "firstName", type: "text", placeholder: "First Name" },
                        { label: "Last Name", name: "lastName", type: "text", placeholder: "Last Name" },
                        { label: "Email address", name: "email", type: "email", placeholder: "name@example.com" },
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

                  <h3>User Login Details</h3>
                  <div className="formContainer">
                    <div className="row">
                      {[
                        { label: "User Name", name: "username", type: "text", placeholder: "User Name" },
                        { label: "Password", name: "password", type: "password", placeholder: "Password" },
                        { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
                      ].map((field, index) => (
                        <div className="col-12 col-lg-4" key={index}>
                          <div className="mb-3 passwordContainer">
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

                      <div className="col-12 col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Status <span className="required">*</span>
                          </label>
                          <select className="form-select" name="selStatus" required onChange={handleChange}>
                            <option value="" disabled selected>
                              Select Status
                            </option>
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                          </select>
                        </div>
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
                      <a href="/usermanagement" className="btnCancel">
                        Cancel
                      </a>
                      <button type="submit" className="btnAddUser">
                        Submit
                      </button>
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

export default AddUser;

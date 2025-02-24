import React from 'react';
import Layout from '../component/Layout';


const ProductPermission = () => {
    
    return (
        <Layout >
        <div className="adaMainContainer">
            <section className="adminControlContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="pageTitle">
                                <h1>Product Permission</h1>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="roleManagmentContainer">
                                <form>
                                    <div className="d-flex mb-4 align-items-center">
                                        <h3 className="mb-0 me-3">Selected Organization</h3>
                                        <div>
                                            <select className="form-select" id="selUser" name="role" required>
                                                <option value="" disabled>Select Organization</option>
                                                <option value="1" selected>Organization Enterprise -1</option>
                                                <option value="2">Organization Enterprise -2</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="formContainer">
                                        <div className="row">
                                            <div className="col-12 col-lg-3">
                                                <div className="userStaticInfo">
                                                    <div className="title">Organization Name</div>
                                                    <div className="value">Organization Enterprise -1</div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-3">
                                                <div className="userStaticInfo">
                                                    <div className="title">Organization Address</div>
                                                    <div className="value">B-34, Sector 45, Noida, India</div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-3">
                                                <div className="userStaticInfo">
                                                    <div className="title">Contact Person</div>
                                                    <div className="value">Shiva Sharma - +91 9899765234</div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-3">
                                                <div className="userStaticInfo">
                                                    <div className="title">Email</div>
                                                    <div className="value">shiva.sharma@email.com</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="gridContainer">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" width="20%">Users</th>
                                                        <th scope="col" width="13%">User Management</th>
                                                        <th scope="col" width="13%">Role Management</th>
                                                        <th scope="col" width="13%">Product Permission</th>
                                                        <th scope="col" width="15%">Product</th>
                                                        <th scope="col" width="13%">Product Management</th>
                                                        <th scope="col" width="13%">Reports</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td scope="row">
                                                            Mukesh Kumar
                                                            <div className="roletype">Role: <span>Admin</span></div>
                                                        </td>
                                                        <td>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked disabled />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox1">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" checked disabled />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox2">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option1" checked disabled />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox7">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="option2" checked disabled />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox8">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox13" value="option1" checked disabled />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox13">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox14" value="option2" checked disabled />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox14">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="tblDataOuter">
                                                            <div className="selectOptionRepeat">
                                                                <ul>
                                                                    <li>www.agreeya.com</li>
                                                                    <li>AQMD Mobile App</li>
                                                                    <li className="pb-0">Mobile Product</li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="tblDataOuter">
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox20" value="option1" checked />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox20">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox21" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox21">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox22" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox22">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox23" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox23">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat mb-0">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox24" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox24">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox25" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox25">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="tblDataOuter">
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox26" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox26">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox27" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox27">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox28" value="option1" checked />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox28">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox29" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox29">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat mb-0">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox30" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox30">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox31" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox31">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Nidhi Yadav
                                                            <div className="roletype">Role: <span>User</span></div>
                                                        </td>
                                                        <td>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox1">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox2">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox7">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox8">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox13" value="option1" checked disabled />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox13">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox14" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox14">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="tblDataOuter">
                                                            <div className="selectOptionRepeat">
                                                                <ul>
                                                                    <li>www.agreeya.com</li>
                                                                    <li>AQMD Mobile App</li>
                                                                    <li className="pb-0">Mobile Product</li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="tblDataOuter">
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox20" value="option1" checked />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox20">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox21" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox21">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox22" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox22">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox23" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox23">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat mb-0">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox24" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox24">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox25" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox25">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="tblDataOuter">
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox26" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox26">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox27" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox27">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox28" value="option1" checked />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox28">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox29" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox29">Edit</label>
                                                                </div>
                                                            </div>
                                                            <div className="selectCheckRepeat mb-0">
                                                                <div className="form-check custCheck me-3">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox30" value="option1" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox30">View</label>
                                                                </div>
                                                                <div className="form-check custCheck">
                                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox31" value="option2" />
                                                                    <label className="form-check-label" htmlFor="inlineCheckbox31">Edit</label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="buttonBox mt-4">
                                        <a href="/admin/product-permission" className="btnCancel">Cancel</a>
                                        <button type="submit" className="btnAddUser">Save</button>
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

export default ProductPermission;
import React from 'react';
import Layout from '../component/Layout';
import iconEditDeails from '../assets/images/iconEditDeails.svg';
import dummyUserPic from '../assets/images/dummyUserPic.jpg';
import Form from "../component/form/Form";
import { useNavigate } from 'react-router-dom';

const ProfileSetting = () => {

    const navigate = useNavigate();
    
    let previewSrc = '';

    const previewProfilePicture = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            const spinner = document.getElementById('spinner');
            const overlay = document.getElementById('previewOverlay');
            const profileImg = document.getElementById('profilePicture');

            spinner.style.display = 'block';

            reader.onload = function (e) {
                setTimeout(() => {
                    spinner.style.display = 'none';
                    previewSrc = e.target.result;
                    profileImg.src = previewSrc;
                    overlay.style.display = 'flex';
                }, 1000); // Simulated loading time
            };

            reader.readAsDataURL(file);
        }
    }

    const applyPreview = () => {
        document.getElementById('previewOverlay').style.display = 'none';
    }

    const cancelPreview = () => {
        document.getElementById('profilePicture').src = dummyUserPic;
        document.getElementById('previewOverlay').style.display = 'none';
    }


    return (
        <Layout>
            <div className="adaMainContainer">
                <section className="adminControlContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <h1>Update User Profile</h1>
                                </div>
                            </div>
                            <div className="col-12">

                                <div className="userManagmentContainer">
                                    <div className="row">

                                        <div className="col-12 col-lg-2 formContainer position-relative profilePicture">
                                            <img src={dummyUserPic} alt="User Picture" className="img-fluid profile-img" id="profilePicture" />
                                            <div className="edit" onClick={() => { document.getElementById('fileInput').click(); }}>
                                                <a>  <img src={iconEditDeails} alt="Edit User Details " /></a>
                                            </div>
                                            <div className="spinner" id="spinner"></div>
                                            <div className="preview-overlay" id="previewOverlay">
                                                <button className="confirm" onClick={applyPreview}>Confirm</button>
                                                <button className="cancel" onClick={cancelPreview}>Cancel</button>
                                            </div>
                                            <input type="file" id="fileInput" accept="image/*" onChange={previewProfilePicture} />
                                        </div>
                                        <div className="col-12 col-lg-10">
                                            <Form>
                                                <div className="formContainer">
                                                    <div className="row">

                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label for="firstName" className="form-label">First Name</label>
                                                                <input type="text" className="form-control" id="firstName" name="firstName"
                                                                    placeholder="First Name" value="Ajay" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label for="lastName" className="form-label">Last Name</label>
                                                                <input type="text" className="form-control" id="lastName" name="lastName"
                                                                    placeholder="Last Name" value="Sharma" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label for="email" className="form-label">Email address</label>
                                                                <input type="email" className="form-control" id="email" name="email"
                                                                    placeholder="name@example.com" value="ajay.sharma@gmail.com" disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label for="contactNo" className="form-label">Contact Number</label>
                                                                <input type="text" className="form-control" id="contactNo" name="lastName"
                                                                    placeholder="Contact Number" value="+91 9899432567" />
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="col-12">
                                                    <div className="buttonBox">
                                                        <button type="button" className="btnCancel" onClick={() => navigate(-1)}>
                                                            Cancel
                                                        </button>
                                                        <button type="submit" className="btnAddUser">
                                                            Save Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default ProfileSetting
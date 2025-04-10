import React, { useEffect, useState } from 'react';
import Layout from '../component/Layout';
import iconEditDeails from '../assets/images/iconEditDeails.svg';
import Form from "../component/form/Form";
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/CommonApi';


const ProfileSetting = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const user_id = user?.id;
    const Token = user?.token;

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            if (user_id) {
                try {
                    const response = await apiRequest(
                        `/user/display-image/${user_id}`,
                        "GET",
                        null,
                        {
                            responseType: "blob",
                        }
                    );
    
                    const imageUrl = URL.createObjectURL(response); // response is the Blob
                    setImageSrc(imageUrl);
                } catch (error) {
                    console.error("Error loading image:", error);
                }
            }
        };
    
        fetchImage();
    }, [user_id]);
    

    const previewProfilePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
        const allowedTypes = ['image/png', 'image/jpeg'];

        if (!allowedTypes.includes(file.type)) {
            alert("Only .png and .jpeg files are allowed.");
            return;
        }

        setSelectedFile(file);

        const reader = new FileReader();
        const spinner = document.getElementById('spinner');
        const overlay = document.getElementById('previewOverlay');

        spinner.style.display = 'block';

        reader.onload = function (e) {
            setTimeout(() => {
                spinner.style.display = 'none';
                setPreviewSrc(e.target.result);
                overlay.style.display = 'flex';
            }, 1000);
        };

        reader.readAsDataURL(file);
    }
};


    const applyPreview = async () => {
        if (!selectedFile) return;

        const overlay = document.getElementById('previewOverlay');
        overlay.style.display = 'none';

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = apiRequest('/user/update/image',"POST",formData,{headers: {
                'Content-Type': 'multipart/form-data', 
              }})
            

            // if (response.ok) {
            //     setImageSrc(`http://localhost:8080/api/user/display-image/${user_id}?t=${Date.now()}`); // Add cache buster
            //     setSelectedFile(null);
            // } else {
            //     alert('Failed to upload image');
            // }
        } catch (error) {
            console.error('Upload Error:', error);
        }
    };

    const cancelPreview = () => {
        document.getElementById('previewOverlay').style.display = 'none';
        setPreviewSrc('');
        setSelectedFile(null);
    };

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
                                            <img
                                                src={previewSrc || imageSrc}
                                                alt="User Picture"
                                                className="img-fluid profile-img"
                                                id="profilePicture"
                                            />
                                            <div className="edit" onClick={() => document.getElementById('fileInput').click()}>
                                                <a><img src={iconEditDeails} alt="Edit User Details " /></a>
                                            </div>
                                            <div className="spinner" id="spinner"></div>
                                            <div className="preview-overlay" id="previewOverlay">
                                                <button className="confirm" onClick={applyPreview}>Confirm</button>
                                                <button className="cancel" onClick={cancelPreview}>Cancel</button>
                                            </div>
                                            <input type="file" id="fileInput" accept="image/*" onChange={previewProfilePicture} hidden />
                                        </div>
                                        <div className="col-12 col-lg-10">
                                            <Form>
                                                <div className="formContainer">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                                <input type="text" className="form-control" id="firstName" name="firstName" placeholder="First Name" defaultValue="Ajay" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                                <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Last Name" defaultValue="Sharma" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="email" className="form-label">Email address</label>
                                                                <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" defaultValue="ajay.sharma@gmail.com" disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="mb-3">
                                                                <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                                                <input type="text" className="form-control" id="contactNo" name="contactNo" placeholder="Contact Number" defaultValue="+91 9899432567" />
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
    );
};

export default ProfileSetting;

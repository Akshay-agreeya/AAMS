import React, { useEffect, useRef, useState } from "react";
import Layout from "../component/Layout";
import iconEditDeails from "../assets/images/iconEditDeails.svg";
import dummyuser from "../assets/images/noUserImage.svg";
import Form from "../component/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import { getData, patchData, apiRequest } from "../utils/CommonApi";
import { getImageUrlFromBlob } from "../utils/Helper";
import notification from "../component/notification/Notification";
import {
  OPERATION_FAILED_MSG,
  USER_SAVE_SUCCESS_MSG,
} from "../constants/MessageConstants";
import { FormItem } from "../component/form/FormItem";
import { Input } from "../component/input/Input";

const EditUserProfile = () => {
  const navigate = useNavigate();
  const { id: userIdParam } = useParams(); // For dynamic user ID (if editing other users)
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const loggedInUserId = user?.id;
  const user_id = userIdParam || loggedInUserId; // Use passed ID or fallback to logged in user

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
const formRef = useRef();
  useEffect(() => {
    const fetchImage = async () => {
      if (!user_id) return setImageSrc(dummyuser);
      const url = await getImageUrlFromBlob(`/user/display-image/${user_id}`);
      setImageSrc(url || dummyuser);
    };
    fetchImage();
  }, [user_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`/user/get/${user_id}`);
        if (data) {
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            phone_number: data.phone_number || "",
          });
          formRef.current.setFieldsValue(data)
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };
    if (user_id) fetchData();
  }, [user_id]);

  const previewProfilePicture = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return alert("Only JPEG or PNG images are allowed.");
    }

    const reader = new FileReader();
    const spinner = document.getElementById("spinner");
    const overlay = document.getElementById("previewOverlay");

    setSelectedFile(file);
    spinner.style.display = "block";

    reader.onload = function (e) {
      setTimeout(() => {
        spinner.style.display = "none";
        setPreviewSrc(e.target.result);
        overlay.style.display = "flex";
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const applyPreview = async () => {
    if (!selectedFile) return;
    const overlay = document.getElementById("previewOverlay");
    overlay.style.display = "none";

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await apiRequest(`/user/update/image`, "POST", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreviewSrc("");
      setSelectedFile(null);
      // Optional: refresh image after upload
      const imageUrl = await getImageUrlFromBlob(
        `/user/display-image/${user_id}`
      );
      setImageSrc(imageUrl || dummyuser);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const cancelPreview = () => {
    document.getElementById("previewOverlay").style.display = "none";
    setPreviewSrc("");
    setSelectedFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    
    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      };
      await patchData(`/user/edit/${user_id}`, payload);
      notification.success({
        message: USER_SAVE_SUCCESS_MSG,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Edit Profile</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="userManagmentContainer">
                  <div className="row">
                    <div className="col-12 col-lg-2 profilePicture position-relative">
                      <img
                        src={previewSrc || imageSrc}
                        className="img-fluid profile-img"
                      />
                      <div
                        className="edit"
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                      >
                        <a>
                          <img src={iconEditDeails} alt="Edit" />
                        </a>
                      </div>
                      <div className="spinner" id="spinner"></div>
                      <div className="preview-overlay" id="previewOverlay">
                        <button className="confirm" onClick={applyPreview}>
                          Confirm
                        </button>
                        <button className="cancel" onClick={cancelPreview}>
                          Cancel
                        </button>
                      </div>
                      <input
                        type="file"
                        id="fileInput"
                        hidden
                        accept="image/*"
                        onChange={previewProfilePicture}
                      />
                    </div>
                    <div className="col-12 col-lg-10">
                      <Form onSubmit={handleSubmit} ref={formRef}>
                        <div className="formContainer">
                          <div className="row">
                            <div className="col-lg-4 mb-3">
                              <FormItem
                                name="first_name"
                                label="First Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "First Name is required",
                                  },
                                ]}
                                requiredMark={true}
                              >
                                <Input
                                  name="first_name"
                                  value={formData.first_name}
                                  onChange={handleChange}
                                />
                              </FormItem>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <FormItem
                                name="last_name"
                                label="Last Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Last Name  is required",
                                  },
                                ]}
                                requiredMark={true}
                              >
                                <Input
                                  name="last_name"
                                  value={formData.last_name}
                                  onChange={handleChange}
                                />
                              </FormItem>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <label>Email</label>
                              <Input
                                type="email"
                                value={formData.email}
                                disabled
                              />
                            </div>
                            <div className="col-lg-4 mb-3">
                              <FormItem
                                name="phone_number"
                                label="Contact Number"
                                rules={[
                                  {
                                    required: true,
                                    message: "Contact No is required",
                                  },
                                ]}
                                requiredMark={true}
                              >
                                <Input
                                  name="phone_number"
                                  value={formData.phone_number}
                                  onChange={handleChange}
                                />
                              </FormItem>
                            </div>
                          </div>
                        </div>
                        <div className="buttonBox">
                          <button
                            type="button"
                            className="btnCancel"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btnAddUser">
                            Save Details
                          </button>
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

export default EditUserProfile;

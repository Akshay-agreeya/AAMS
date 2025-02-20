import { useState, useEffect } from "react";
import { patchData } from "../../utils/CommonApi";
import { InputPassword } from "../../component/input/InputPassword";
import { Input } from "../../component/input/Input";
import { FormItem } from "../../component/form/FormItem";
import Form from "../../component/form/Form";

const ChangePasswordModal = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);

    // Retrieve user_id from sessionStorage on component mount
    useEffect(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
          try {
              const parsedUser = JSON.parse(storedUser);
              const userId = parsedUser.id;
              console.log("User ID:", userId);
          } catch (error) {
              console.error("Error parsing user data:", error);
          }
      }
      
    }, []);

    console.log("User ID:", userId); // Debugging purpose

    const handleSubmit = async (formData) => {
        if (!userId) {
            setMessage("User ID not found. Please log in again.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage("New passwords do not match!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await patchData(`/user/change-password/${userId}`, formData);

            if (response.data.success) {
                setMessage("Password changed successfully!");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popUpMessageContainer">
            <div className="modal fade" id="changePassword" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="heading">Change Password</div>
                            <div className="message">Please enter your current password and create a new one.</div>
                            {message && <div className="alert alert-info">{message}</div>}
                            <div className="formContainer">
                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-3 passwordContainer">
                                        <FormItem name="oldPassword" rules={[{ required: true, message: "Please enter your current password" }]}>
                                            <InputPassword className="form-control" placeholder="Current Password" />
                                        </FormItem>
                                    </div>

                                    <div className="mb-3 passwordContainer">
                                        <FormItem name="newPassword" rules={[{ required: true, message: "Please enter a new password" }]}>
                                            <InputPassword className="form-control" placeholder="New Password" />
                                        </FormItem>
                                    </div>

                                    <div className="mb-3 passwordContainer">
                                        <FormItem name="confirmPassword" rules={[{ required: true, message: "Please confirm your new password" ,}]}>
                                            <InputPassword className="form-control" placeholder="Confirm New Password" />
                                        </FormItem>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btnpassword" disabled={loading}>
                                            {loading ? "Saving..." : "Save Password"}
                                        </button>
                                        <button type="button" className="btn btnCancel" data-bs-dismiss="modal">
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;

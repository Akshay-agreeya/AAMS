import { useState, useEffect } from "react";
import { patchData } from "../../utils/CommonApi";
import { InputPassword } from "../../component/input/InputPassword";
import { FormItem } from "../../component/form/FormItem";
import Form from "../../component/form/Form";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = (props) => {

    const { open, onClose = () => { } } = props;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false); // Added state to control modal visibility


    const navigate = useNavigate();

    useEffect(() => {
        setIsModalVisible(open);
      }, [open]);
    
      const handleCloseModal = () => {
        setIsModalVisible(false);
        onClose();
      }

    const handleSubmit = async (formData) => {

        setLoading(true);
        setMessage("");
        const reqData = { oldPassword: formData.oldPassword, newPassword: formData.password };
        try {
            const response = await patchData(`/user/change-password`, reqData);

            if (response.success) {
                setMessage("Password changed successfully!");
                setIsModalVisible(false); // Close modal after successful change
                sessionStorage.clear();
                navigate("/login");
            }
        } catch (error) {
            setMessage(error.data?.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`popUpMessageContainer ${isModalVisible ? 'd-block' : 'd-none'}`}>
            <div className="modal fade show" style={{ display: isModalVisible ? 'block' : 'none' }} id="changePassword" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
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
                                        <FormItem name="password" rules={[{ required: true, message: "Please enter a new password" }]}>
                                            <InputPassword className="form-control" placeholder="New Password" />
                                        </FormItem>
                                    </div>

                                    <div className="mb-3 passwordContainer">
                                        <FormItem name="confirmPassword" rules={[{ required: true, message: "Please confirm your new password" }]}>
                                            <InputPassword className="form-control" placeholder="Confirm New Password" />
                                        </FormItem>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btnpassword" disabled={loading}>
                                            {loading ? "Saving..." : "Save Password"}
                                        </button>
                                        <button type="button" className="btn btnCancel" onClick={handleCloseModal}>
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

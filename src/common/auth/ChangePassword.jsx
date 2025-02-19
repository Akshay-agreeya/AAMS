import { useState, useEffect } from "react";
import { patchData } from "../../utils/CommonApi";

const ChangePasswordModal = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  // Retrieve user_id from sessionStorage on component mount
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    if (storedUserId) {
      try {
        const parsedData = JSON.parse(storedUserId);
        setUserId(parsedData.id || parsedData); // Handle both object and string cases
      } catch (error) {
        setUserId(storedUserId); // If it's a plain string
      }
    }
  }, []);

  console.log("User ID:", userId); // Debugging purpose

  const handleChangePassword = async () => {
    if (!userId) {
      setMessage("User ID not found. Please log in again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await patchData(`/user/change-password/${userId}`, {
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        setMessage("Password changed successfully!");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popUpMessageContainer">
      <div
        className="modal fade"
        id="changePassword"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="heading">Change Password</div>
              <div className="message">
                Please enter your current password and create a new one.
              </div>
              {message && <div className="alert alert-info">{message}</div>}
              <div className="formContainer">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3 passwordContainer">
                      <label htmlFor="curpassword" className="form-label">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="curpassword"
                        placeholder="Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 passwordContainer">
                      <label htmlFor="password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3 passwordContainer">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btnpassword"
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Password"}
              </button>
              <button className="btn btnCancel" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { patchData } from "../utils/CommonApi"; // Import patchData
import Years_Logo_Horizontal1 from "../assets/images/Final_25-Years_Logo_Horizontal1.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    // Apply and clean up styles
    useEffect(() => {
        document.body.classList.add("formbg", "loginFormContainer");
        const root = document.getElementById('root');
        if (root) root.style.width = '100%';

        return () => {
            document.body.classList.remove("formbg", "loginFormContainer");
            if (root) root.style.width = '';
        };
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== retypePassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await patchData(
                "http://localhost:8080/api/user/reset-password", 
                { email, password }
            );

            if (response.success) {
                setSuccessMessage("Password reset Successfully!");
                setError(""); // Clear any previous error
                navigate("/login");
            }
        } catch (error) {
            setError("Something went wrong, please try again.");
            console.error("Error during password reset", error);
        }
    };

    return (
        <div className="formLogin">
            <div className="loginLogo">
                <img
                    src={Years_Logo_Horizontal1}
                    alt="Agreeya Logo"
                    className="w-75"
                />
            </div>
            <div className="loginHeading">ADA CMS Forgot Password</div>

            {/* Show error or success message */}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="formFieldsContainer">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control formFieldborder"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control formFieldborder"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control formFieldborder"
                            id="floatingRetypePassword"
                            placeholder="Retype Password"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingRetypePassword">Retype-Password</label>
                    </div>

                    <div className="btnContainer">
                        <button type="submit" className="btn signInAdmin w-100">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

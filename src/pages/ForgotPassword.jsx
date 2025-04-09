import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Years_Logo_Horizontal1 from "../assets/images/Final_25-Years_Logo_Horizontal1.png";
import { FormItem } from '../component/form/FormItem';
import Form from '../component/form/Form';
import { Input } from '../component/input/Input';
import { postData } from "../utils/CommonApi";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add("formbg", "loginFormContainer");
        const root = document.getElementById('root');
        if (root) root.style.width = '100%';

        return () => {
            document.body.classList.remove("formbg", "loginFormContainer");
            if (root) root.style.width = '';
        };
    }, []);

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            await postData("/forgot-password", { email: formData.email });
            setSuccessMessage("A password reset link has been sent to your registered email.");
        } catch (error) {
            setError(error.data?.message || "Something went wrong, please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="formLogin">
            <div className="loginLogo mb-4">
                <img src={Years_Logo_Horizontal1} alt="Agreeya Logo" className="w-75" />
            </div>
            <div className="loginHeading mb-3">ADA CMS Forgot Password</div>
            <div className="mb-3 fw-medium" id="loginSubHeading">
                Enter your email address and we will send you instructions to reset your password.
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="formFieldsContainer" id="forgotPasswordContainer">
                {!successMessage ? (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3" id="emailContainer">
                            <FormItem name="email" rules={[{ required: true, message: "Please enter your email" }]}> 
                                <Input type="email" className="form-control formFieldborder" placeholder="name@example.com" />
                            </FormItem>
                            <label>Email address</label>
                        </div>
                        <div className="btnContainer d-flex text-center" id="buttonContainer">
                            <button type="submit" className="btn signInAdmin w-50" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Instructions"}
                            </button>    
                            <button className="btn signInCustomer w-50"onClick={() => window.history.back()}>Cancel</button>
                        </div>
                       
                    </Form>
                ) : (
                    <div className="text-center mt-4 fw-bold">
                        <p id="successMessage">{successMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;

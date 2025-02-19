import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Years_Logo_Horizontal1 from "../assets/images/Final_25-Years_Logo_Horizontal1.png";
import { FormItem } from '../component/form/FormItem';
import Form from '../component/form/Form';
import { Input } from '../component/input/Input';
import { InputPassword } from '../component/input/InputPassword';
import { patchData } from "../utils/CommonApi";

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
        if (formData.password !== formData.retypePassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await patchData("/user/reset-password", {
                email: formData.email,
                password: formData.password
            });

            setSuccessMessage("Password reset successfully!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(error.data?.message || "Something went wrong, please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="formLogin">
            <div className="loginLogo">
                <img src={Years_Logo_Horizontal1} alt="Agreeya Logo" className="w-75" />
            </div>
            <div className="loginHeading">ADA CMS Forgot Password</div>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="formFieldsContainer">
                <Form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <FormItem name="email" rules={[{ required: true, message: "Please enter your email" }]}> 
                            <Input type="email" className="form-control" placeholder="name@example.com" />
                        </FormItem>
                        <label>Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <FormItem name="password" rules={[{ required: true, message: "Please enter your password" }]}> 
                            <InputPassword className="form-control" placeholder="Password" />
                        </FormItem>
                        <label>Password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <FormItem name="retypePassword" rules={[{ required: true, message: "Please re-enter your password" }]}> 
                            <InputPassword className="form-control" placeholder="Retype Password" />
                        </FormItem>
                        <label>Retype Password</label>
                    </div>

                    <div className="btnContainer">
                        <button type="submit" className="btn signInAdmin w-100" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;

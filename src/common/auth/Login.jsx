import React, { useEffect, useState } from 'react';
import Years_Logo_Horizontal1 from "../../assets/images/Final_25-Years_Logo_Horizontal1.png";
import { FormItem } from '../../component/form/FormItem';
import Form from '../../component/form/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRememberMeChange = () => setRememberMe(!rememberMe);

    const { login } = useAuth();

    useEffect(() => {
        // Add custom classes to body for styling purposes
        document.body.classList.add("formbg");
        document.body.classList.add("loginFormContainer");

        // If you really need to change the width of #root (though usually not necessary):
        const root = document.getElementById('root');
        if (root) {
            root.style.width = '100%'; // Modify the width of root (if really necessary)
        }

        // Cleanup function to reset styles when the component unmounts
        return () => {
            document.body.classList.remove("formbg");
            document.body.classList.remove("loginFormContainer");

            // Reset #root styles if modified
            if (root) {
                root.style.width = ''; // Reset width if it was modified
            }
        };
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        login();
        console.log('Email:', formData);
        console.log('Password:', password);
        console.log('Remember Me:', rememberMe);
        navigate("/admin/dashboard");
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
            <div className="loginHeading">ADA CMS Sign In</div>
            <div className="loginSubHeading">Sign in to your account to continue</div>
            <div className="formFieldsContainer">
                <Form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <FormItem
                            name="email"
                            rules={[
                                { required: true, message: "Please fill email value" },
                                { minLength: 3 },
                            ]}
                        >
                            <input
                                type="email"
                                className="form-control formFieldborder"
                                id="floatingInput"
                                placeholder="name@example.com"
                            />
                        </FormItem>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <FormItem
                            name="password"
                            rules={[
                                { required: true,message: "Please fill email value" },
                                { minLength: 3,message: "Password length is greater then or equal 3" },
                            ]}
                        >
                            <input
                                type="password"
                                className="form-control formFieldborder"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </FormItem>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mt-3 mb-2">
                        <label className="form-checkbox-txt">
                            <FormItem
                                name="rem"
                                rules={[
                                    { required: true },
                                    { minLength: 3 },
                                ]}
                            >
                                <input
                                    type="checkbox"
                                    value="remember-me"
                                    className="form-check-input login-checkbox selected-checkbox"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                            </FormItem>
                            Remember me
                        </label>
                    </div>

                    <div className="btnContainer">
                        <button
                            type="submit"
                            className="btn signInAdmin"
                        >
                            Login as Admin
                        </button>
                        <button
                            type="submit"
                            className="btn signInCustomer"
                        >
                            Login as Customer
                        </button>
                    </div>
                    <div className="forgotPassword">
                        <a href="forgotPassword.html">Forgot Password?</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;

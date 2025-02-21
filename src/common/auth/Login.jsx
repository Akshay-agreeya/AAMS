import React, { useEffect, useState } from 'react';
import Years_Logo_Horizontal1 from "../../assets/images/Final_25-Years_Logo_Horizontal1.png";
import { FormItem } from '../../component/form/FormItem';
import Form from '../../component/form/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { postData } from '../../utils/CommonApi'; // Import API utility
import { InputPassword } from '../../component/input/InputPassword';
import { Input } from '../../component/input/Input';

const LoginForm = () => {
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleRememberMeChange = () => setRememberMe(!rememberMe);

    const { login } = useAuth();


    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await postData('/login', formData);
            login();
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('user', JSON.stringify(response.data));
            navigate("/admin/dashboard");

        }
        catch (error) {
            console.log(error);
            setError(error.data?.message || 'Login failed.');
            setLoading(false);
        }
    }

    return (
        <div className="formLogin">
            <div className="loginLogo">
                <img src={Years_Logo_Horizontal1} alt="Agreeya Logo" className="w-75" />
            </div>
            <div className="loginHeading">ADA CMS Sign In</div>
            <div className="loginSubHeading">Sign in to your account to continue</div>
            {error && <div class="alert alert-danger" role="alert">{error}</div>
 }
            <div className="formFieldsContainer">
                <Form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <FormItem name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                            <Input type="email" className="form-control" placeholder="name@example.com" />
                        </FormItem>
                        <label>Email address</label>
                    </div>

                    <div className="form-floating">
                        <FormItem name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                            <InputPassword className="form-control" placeholder="Password" />
                        </FormItem>
                        <label>Password</label>
                    </div>

                    <div className="checkbox mt-3 mb-2">
                        <label className="form-checkbox-txt">
                            <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} /> Remember me
                        </label>
                    </div>

                    <div className="btnContainer text-center">
                        <button type="submit" className="btn signInAdmin" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login '}
                        </button>
                        
                    </div>
                    <div className="forgotPassword">
                        <a href="/forgotpassword">Forgot Password?</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;

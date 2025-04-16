import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Years_Logo_Horizontal1 from "../../assets/images/Final_25-Years_Logo_Horizontal1.png";
import Form from '../../component/form/Form';
import { FormItem } from '../../component/form/FormItem';
import { InputPassword } from '../../component/input/InputPassword';
import { postData } from '../../utils/CommonApi';
 

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isReset, setIsReset] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();   
      const queryParams = new URLSearchParams(location.search);     
      const token = queryParams.get('token'); 

    useEffect(() => {
      document.body.classList.add("formbg", "loginFormContainer");
      const root = document.getElementById('root');
      if (root) root.style.width = '100%';

      return () => {
          document.body.classList.remove("formbg", "loginFormContainer");
          if (root) root.style.width = '';
      };
  }, []);

    const handleSubmit = async (formdata) => {
        

       

        setLoading(true);
        setError(null);

        try {
            const response = await postData('/user/reset-password?token='+token, {
                 
                newPassword: formdata.password,
            });
            
            

            if (response.status === 200) {
                setIsReset(true);
            } else {
                setError(response.data?.message || "Password reset failed.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="formLogin">
            <div className="loginLogo">
                <img src={Years_Logo_Horizontal1} alt="Agreeya Logo" className="w-75" />
            </div>
            <div className="loginHeading mb-3">ADA CMS Reset Your Password</div>

            {error && <div className="alert alert-danger">{error}</div>}

            {!isReset ? (
                <>
                    <div className="fw-medium mb-3">Enter a new password for your account.</div>
                    <div className="formFieldsContainer">
                        <Form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <FormItem name="password" rules={[{ required: true, message: "Enter a new password" }]}>
                                    <InputPassword
                                        className="form-control formFieldborder mb-2"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormItem>
                                <label>New Password</label>
                            </div>

                            <div className="form-floating mb-3">
                                <FormItem name="confirmPassword" rules={[{ required: true, message: "Confirm your password" }]}>
                                    <InputPassword
                                        className="form-control formFieldborder mb-2"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </FormItem>
                                <label>Confirm Password</label>
                            </div>

                            <div className="btnContainer text-center">
                                <button type="submit" className="btn signInAdmin w-75" disabled={loading}>
                                    {loading ? "Resetting..." : "Reset Password"}
                                </button>
                            </div>
                        </Form>
                    </div>
                </>
            ) : (
                <div className="text-center mt-4 fw-bold">
                    <p>Your password has been reset successfully.</p>
                    <button onClick={() => navigate("/login")} className="btn signInAdmin w-50 mt-5">
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;

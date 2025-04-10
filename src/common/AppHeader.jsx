import React, { useEffect, useState } from 'react';
import siteLogo from "../assets/images/siteLogo.svg";
import iconHelp from "../assets/images/iconHelp.svg";
import iconNotification from "../assets/images/iconNotification.svg";
import dummyUserPic from "../assets/images/dummyUserPic.jpg";
import { getUserFromSession } from '../utils/Helper';
import { useAuth } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from './auth/ChangePassword';
import { apiRequest } from '../utils/CommonApi'; // make sure this path is correct

const AppHeader = ({ topNav = true }) => {
    
    const user = getUserFromSession() || {};
    const user_id = user?.id;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const response = await apiRequest(
                    `/user/display-image/${user_id}`,
                    "GET",
                    null,
                    { responseType: "blob" }
                );
                const objectUrl = URL.createObjectURL(response);
                setImageSrc(objectUrl);
            } catch (error) {
                console.error("Failed to load profile image", error);
            }
        };

        if (user_id) fetchUserImage();
    }, [user_id]);

    return (
        <div>
            <header className="headerContainer">
                <div className="headerSubContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="headerNavigation">
                                    <div className="siteLogo">
                                        <img src={siteLogo} alt="Site Logo" />
                                        <span>AgreeYa Accessibility Monitoring System</span>
                                    </div>
                                    {topNav && (
                                        <div className="topNav">
                                            <div className="topUtilities">
                                                <ul>
                                                    <li>
                                                        <a href="/help"><img src={iconHelp} alt="Help" /></a>
                                                    </li>
                                                    <li>
                                                        <a href="notification.html"><img src={iconNotification} alt="Notification" /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="userInformationContainer">
                                                <div className="userProfilePic">
                                                    <img src={imageSrc || dummyUserPic} alt="User Picture" />
                                                </div>
                                                <div className="userProfileInformation">
                                                    <div className="dropdown">
                                                        <a className="btn custProfileDropDown dropdown-toggle" href="#"
                                                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {`${user.first_name} ${user.last_name}`}
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <a className="dropdown-item" href={`/profile-setting`}>Profile Setting</a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#" onClick={() => setIsModalVisible(true)}>Change Password</a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    logout();
                                                                    navigate("/login");
                                                                }}>Logout</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="userProfileType">{user.user_role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <ChangePasswordModal open={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </div>
    );
};

export default AppHeader;

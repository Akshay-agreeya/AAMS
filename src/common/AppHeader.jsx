import React, { useState } from 'react';
import siteLogo from "../assets/images/siteLogo.svg";
import iconHelp from "../assets/images/iconHelp.svg";
import iconNotification from "../assets/images/iconNotification.svg";
import dummyUserPic from "../assets/images/dummyUserPic.jpg";
import { getUserFromSession } from '../utils/Helper';
import { useAuth } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from './auth/ChangePassword';


const AppHeader = ({ topNav = true }) => {
    const userID = JSON.parse(sessionStorage.getItem("user_id") || "{}");
    const user = getUserFromSession() || {};

    const [isModalVisible, setIsModalVisible] = useState(false); // Added state to control modal visibility


    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <header className="headerContainer">
                <div className="headerSubContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="headerNavigation">
                                    <div className="siteLogo"><img src={siteLogo}
                                        alt="Site Logo" /><span>Accessibility Monitoring System</span></div>
                                    {topNav && <div className="topNav">
                                        <div className="topUtilities">
                                            <ul>

                                                <li>
                                                    <a href="help.html"><img src={iconHelp} alt="Help" /></a>
                                                </li>
                                                <li>
                                                    <a href="notification.html"><img src={iconNotification}
                                                        alt="Notification" /></a>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="userInformationContainer">
                                            <div className="userProfilePic">
                                                <img src={dummyUserPic} alt="User Picture" />
                                            </div>
                                            <div className="userProfileInformation">
                                                <div className="dropdown">
                                                    <a className="btn custProfileDropDown dropdown-toggle" href="#"
                                                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {`${user.first_name} ${user.last_name}`}
                                                    </a>

                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href={`#`} onClick={() => {
                                                            setIsModalVisible(true);
                                                        }}>Change Password</a></li>
                                                        <li><a className="dropdown-item" href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            logout();
                                                            navigate("/login");
                                                        }}>Logout</a></li>

                                                    </ul>
                                                </div>
                                                <div className="userProfileType">{user.user_role}</div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header >

            <ChangePasswordModal open={isModalVisible}
                onClose={() => { setIsModalVisible(false) }} />
        </div >
    )
}

export default AppHeader;

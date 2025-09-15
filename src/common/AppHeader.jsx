import React, { useCallback, useContext, useEffect, useState } from 'react';
import siteLogo from "../assets/images/siteLogo.svg";
import iconHelp from "../assets/images/iconHelp.svg";
import iconNotification from "../assets/images/iconNotification.svg";
import dummyUserPic from "../assets/images/noUserImage.svg";
import { getImageUrlFromBlob, getUserFromSession } from '../utils/Helper';
import { useAuth } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from './auth/ChangePassword';
import { ProfileContext } from './ProfilerContext';

const AppHeader = ({ topNav = true }) => {

    const user = getUserFromSession() || {};
    const user_id = user?.id;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { imageSrc, setImageSrc } = useContext(ProfileContext);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchImage = useCallback(async () => {
        if (!user_id) return;
        const url = await getImageUrlFromBlob(`/user/display-image/${user_id}`) || dummyUserPic;
        if (url) setImageSrc(url);   // cache in context
    }, [user_id, setImageSrc]);

    useEffect(() => {
        if (!user_id || imageSrc) return;  // already have it
        fetchImage();
    }, [user_id, imageSrc, fetchImage]);


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
                                                        <a href="/notification"><img src={iconNotification} alt="Notification" /></a>
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

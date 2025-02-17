import React from 'react';
import siteLogo from "../assets/images/siteLogo.svg";
import iconHelp from "../assets/images/iconHelp.svg";
import iconNotification from "../assets/images/iconNotification.svg";
import dummyUserPic from "../assets/images/dummyUserPic.jpg";


const AppHeader = () => {
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
                                    <div className="topNav">
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
                                                        Jane Cooper
                                                    </a>

                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#changePassword">Change Password</a></li>
                                                        <li><a className="dropdown-item" href="#">Logout</a></li>

                                                    </ul>
                                                </div>
                                                <div className="userProfileType">Super Admin</div>
                                            </div>



                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </div >
    )
}

export default AppHeader;

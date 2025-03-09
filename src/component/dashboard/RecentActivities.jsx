import React from 'react';
import iconMoveForward from '../../assets/images/iconMoveForward.svg';

const RecentActivities = () => {
    return (
        <div className="dashGraphicContainerWhite">
            <div className="heading">Recent Activities <a href="#"><img src={iconMoveForward} alt="Click Here for next Page" /></a></div>
            <div className="activityContainer">
                <div className="activityLeft">
                    <div className="activityDesc">
                        <span className="userAddStatus add"></span><span className="actheading">User Added</span>
                    </div>
                    <div className="activityRole">by Super Admin - IBM</div>
                </div>
                <div className="activityRight">
                    <div className="actDate">Feb 5, 10:30 AM</div>
                </div>
            </div>
            <div className="activityContainer">
                <div className="activityLeft">
                    <div className="activityDesc">
                        <span className="userAddStatus delete"></span><span className="actheading">User Deleted</span>
                    </div>
                    <div className="activityRole">by Admin - Wipro</div>
                </div>
                <div className="activityRight">
                    <div className="actDate">Jan 15, 03:38 PM</div>
                </div>
            </div>
            <div className="activityContainer">
                <div className="activityLeft">
                    <div className="activityDesc">
                        <span className="userAddStatus update"></span><span className="actheading">Role Updated</span>
                    </div>
                    <div className="activityRole">by Suber Admin - SAP</div>
                </div>
                <div className="activityRight">
                    <div className="actDate">Jan 5, 01.30 PM</div>
                </div>
            </div>
            <div className="activityContainer">
                <div className="activityLeft">
                    <div className="activityDesc">
                        <span className="userAddStatus add"></span><span className="actheading">User Added</span>
                    </div>
                    <div className="activityRole">by Super Admin - IBM</div>
                </div>
                <div className="activityRight">
                    <div className="actDate">Feb 5, 10:30 AM</div>
                </div>
            </div>
            <div className="activityContainer">
                <div className="activityLeft">
                    <div className="activityDesc">
                        <span className="userAddStatus add"></span><span className="actheading">User Added</span>
                    </div>
                    <div className="activityRole">by Super Admin - IBM</div>
                </div>
                <div className="activityRight">
                    <div className="actDate">Feb 5, 10:30 AM</div>
                </div>
            </div>
        </div>
    )
}

export default RecentActivities
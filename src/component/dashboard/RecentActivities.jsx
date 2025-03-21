import React, { useCallback, useEffect, useState } from 'react';
import iconMoveForward from '../../assets/images/iconMoveForward.svg';
import { getData } from '../../utils/CommonApi';
import { getFormattedDateWithTime } from '../input/DatePicker';

const RecentActivities = () => {

    const [recentActivities, setRecentActivities] = useState([]);


    const getRecentActivities = useCallback(async () => {
        try {
            const resp = await getData(`/dashboard/recent-activities?days=30&size=5`);
            setRecentActivities(resp.contents);
        }
        catch (error) {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        getRecentActivities();
    }, [getRecentActivities]);


    return (
        <div className="dashGraphicContainerWhite">
            <div className="heading">Recent Activities <a href="#"><img src={iconMoveForward} alt="Click Here for next Page" /></a></div>

            {recentActivities.map((item, index) => <div className="activityContainer" key={index}>
                <div className="activityLeft">
                    <div className="activityDesc">
                        <span className={`userAddStatus ${item.action_type === "INSERT" ? "add" : item.action_type?.toLowerCase()}`}></span><span className="actheading">{item.action_description}</span>
                    </div>
                    <div className="activityRole">{`by ${item.role_name}${item.org_name ? '- ' : ''} ${item.org_name || ''}`}</div>
                </div>
                <div className="activityRight">
                    <div className="actDate">{getFormattedDateWithTime(new Date(item.action_datetime), "MMM dd, hh:mm a")}</div>
                </div>
            </div>
            )}
        </div>
    )
}

export default RecentActivities
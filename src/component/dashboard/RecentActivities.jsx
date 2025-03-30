import React, { useCallback, useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';
import { getFormattedDateWithTime } from '../input/DatePicker';

const RecentActivities = ({org_id=''}) => {

    const [recentActivities, setRecentActivities] = useState([]);


    const getRecentActivities = useCallback(async () => {
        try {
            const url =org_id?`/dashboard/recent-activities?org_id=${org_id}&days=30&size=5`:`/dashboard/recent-activities?days=30&size=5`;
            const resp = await getData(url);
            setRecentActivities(resp.contents);
        }
        catch (error) {
            console.log(error);
        }
    }, [org_id]);


    useEffect(() => {
        getRecentActivities();
    }, [getRecentActivities]);


    return (
        <div className="dashGraphicContainerWhite">
            <div className="heading">Recent Activities 
                {/* <a href="#"><img src={iconMoveForward} alt="Click Here for next Page" /></a> */}
            </div>

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
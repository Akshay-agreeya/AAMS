import React, { useEffect, useState } from 'react';
import iconUser from '../../assets/images/iconUser.svg';
import { addLeadingZero } from '../../utils/Helper';

const UserBox = ({ counts, icon = iconUser, title = "Total Users",boxType="box-3" }) => {

    const [totalElements, setTotalElements] = useState(counts);

    useEffect(() => {
        setTotalElements(counts);
    }, [counts]);


    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className={`box ${boxType}`}>
                    <img src={icon} alt="User" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">{addLeadingZero(totalElements)}</div>
                <div className="desc">{title}</div>
            </div>
        </div>
    )
}

export default UserBox
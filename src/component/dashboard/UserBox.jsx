import React, { useEffect, useState } from 'react';
import iconUser from '../../assets/images/iconUser.svg';
import { addLeadingZero } from '../../utils/Helper';

const UserBox = ({counts}) => {

     const [totalElements, setTotalElements] = useState(counts);
    
        useEffect(() => {
            setTotalElements(counts);
        }, [counts]);
    

    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-3">
                    <img src={iconUser} alt="User" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">{addLeadingZero(totalElements)}</div>
                <div className="desc">Total Users</div>
            </div>
        </div>
    )
}

export default UserBox
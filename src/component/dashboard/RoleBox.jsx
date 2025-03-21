import React, { useEffect, useState } from 'react';
import iconRole from '../../assets/images/iconRole.svg';
import { addLeadingZero } from '../../utils/Helper';

const RoleBox = ({counts}) => {

     const [totalElements, setTotalElements] = useState(counts);
    
        useEffect(() => {
            setTotalElements(counts);
        }, [counts]);
    
    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-2">
                    <img src={iconRole} alt="Roles" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">{addLeadingZero(totalElements)}</div>
                <div className="desc">Total Roles</div>
            </div>
        </div>
    )
}

export default RoleBox;
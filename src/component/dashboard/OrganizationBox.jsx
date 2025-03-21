import React, { useEffect, useState } from 'react';
import iconOrg from '../../assets/images/iconOrg.svg';
import { addLeadingZero } from '../../utils/Helper';

const OrganizationBox = ({ counts = 0 }) => {

    const [totalElements, setTotalElements] = useState(counts);

    useEffect(() => {
        setTotalElements(counts);
    }, [counts]);


    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-1">
                    <img src={iconOrg} alt="Organization" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">{addLeadingZero(totalElements)}</div>
                <div className="desc">Total Organization</div>
            </div>
        </div>
    )
}

export default OrganizationBox;
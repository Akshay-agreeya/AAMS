import React from 'react';
import iconOrg from '../../assets/images/iconOrg.svg';

const OrganizationBox = () => {
    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-1">
                    <img src={iconOrg} alt="Organization" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">10</div>
                <div className="desc">Total Organization</div>
            </div>
        </div>
    )
}

export default OrganizationBox;
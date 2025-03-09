import React from 'react';
import iconRole from '../../assets/images/iconRole.svg';

const RoleBox = () => {
    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-2">
                    <img src={iconRole} alt="Roles" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">03</div>
                <div className="desc">Total Roles</div>
            </div>
        </div>
    )
}

export default RoleBox;
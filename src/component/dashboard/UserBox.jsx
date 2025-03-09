import React from 'react';
import iconUser from '../../assets/images/iconUser.svg';

const UserBox = () => {
    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-3">
                    <img src={iconUser} alt="User" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">50</div>
                <div className="desc">Total Users</div>
            </div>
        </div>
    )
}

export default UserBox
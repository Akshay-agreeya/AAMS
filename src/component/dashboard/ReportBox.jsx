import React from 'react';
import iconReport from '../../assets/images/iconReports.svg';

const ReportBox = () => {
    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-1">
                    <img src={iconReport} alt="Reports" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">05</div>
                <div className="desc">Total Reports</div>
            </div>
        </div>
    )
}

export default ReportBox;
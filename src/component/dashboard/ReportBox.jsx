import React, { useEffect, useState } from 'react';
import iconReport from '../../assets/images/iconReports.svg';
import { addLeadingZero } from '../../utils/Helper';

const ReportBox = ({counts}) => {

     const [totalElements, setTotalElements] = useState(counts);
    
        useEffect(() => {
            setTotalElements(counts);
        }, [counts]);
    

    return (
        <div className="dashBoxContainer">
            <div className="dashIcon">
                <div className="box box-1">
                    <img src={iconReport} alt="Reports" />
                </div>
            </div>
            <div className="dashContent">
                <div className="number">{addLeadingZero(totalElements)}</div>
                <div className="desc">Total Reports</div>
            </div>
        </div>
    )
}

export default ReportBox;
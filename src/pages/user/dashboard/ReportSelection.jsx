import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { getFormattedDateWithTime } from '../../../component/input/DatePicker';

// const data = [
//     { label: "16 Jan 2025 - AQMD Site Assessment Report-3", url: '/user/reports/view' },
//     { label: "09 Jan 2025 - AQMD Site Assessment Report-2", url: '/user/reports/view' },
//     { label: "02 Jan 2025 - AQMD Site Assessment Report-1", url: '/user/reports/view' }];

export const ReportSelection = ({product_id, onChange }) => {

    
    const [selectedReport, setSelectedReport] = useState({});
    
    const {response} = useFetch(`/report/get/assessments/${product_id}`);

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedReport(response?.contents?.[0]);
        if (onChange)
            onChange(response?.contents?.[0]);
    }, [response]);


    const handleClick = (e, item) => {
        e.preventDefault();
        setSelectedReport(item);
        if (onChange)
            onChange(item);
        navigate(`/reports/listing/viewreport/${item.assessment_id}`);
    }

if (response.contents?.length===0)
return<></>
    return (
        <span className="dropdown">
            <a className="reportArchiveName dropdown-toggle" href={`/reports/listing/viewreport/${selectedReport?.assessment_id}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {getFormattedDateWithTime(new Date(selectedReport?.scan_date))}
            </a>
            <ul className="dropdown-menu">
                {response?.contents?.map((item, index) => <li className="archiveReportDDVal" key={index}><a className="dropdown-item"
                    href="#" onClick={(e) => { handleClick(e, item) }}>{getFormattedDateWithTime(new Date(item?.scan_date))}</a></li>)}

            </ul>
        </span>
    )
}

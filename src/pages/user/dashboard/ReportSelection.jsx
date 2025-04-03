import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

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
        navigate(`/user/reports/listing/viewreport/${item.assessment_id}`);
    }

if (response.contents?.length===0)
return<></>
    return (
        <span className="dropdown">
            <a className="reportArchiveName dropdown-toggle" href={`/user/reports/listing/viewreport/${selectedReport?.assessment_id}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedReport?.report_name}
            </a>
            <ul className="dropdown-menu">
                {response?.contents?.map((item, index) => <li className="archiveReportDDVal" key={index}><a className="dropdown-item"
                    href="#" onClick={(e) => { handleClick(e, item) }}>{item.report_name}</a></li>)}

            </ul>
        </span>
    )
}

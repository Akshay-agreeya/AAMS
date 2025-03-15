import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
    { label: "16 Jan 2025 - AQMD Site Assessment Report-3", url: '/user/reports/view' },
    { label: "09 Jan 2025 - AQMD Site Assessment Report-2", url: '/user/reports/view' },
    { label: "02 Jan 2025 - AQMD Site Assessment Report-1", url: '/user/reports/view' }];

export const ReportSelection = ({ onChange }) => {

    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState({});

    const navigate = useNavigate();


    useEffect(() => {
        setReports(data);
    }, [data]);

    useEffect(() => {
        setSelectedReport(reports?.[0]);
    }, [reports]);


    const handleClick = (e, item) => {
        e.preventDefault();
        setSelectedReport(item);
        if (onChange)
            onChange(item);
        navigate(item.url,{state:{fileName: item.label}});
    }


    return (
        <span className="dropdown">
            <a className="reportArchiveName dropdown-toggle" href={selectedReport?.url} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedReport?.label}
            </a>
            <ul className="dropdown-menu">
                {reports.map((item, index) => <li className="archiveReportDDVal" key={index}><a className="dropdown-item"
                    href="#" onClick={(e) => { handleClick(e, item) }}>{item.label}</a></li>)}

            </ul>
        </span>
    )
}

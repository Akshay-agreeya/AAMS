import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData } from "../../utils/CommonApi";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import iconPDF from "../../assets/images/iconPDF.svg";
import notification from "../../component/notification/Notification";

export const ReportTable = ({ service_id, selectedUrl, handleClick }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(service_id)
        // if (service_id) {
            fetchReports(service_id);
        // }
    }, [service_id]);

    const fetchReports = async (serviceId) => {
        try {
            setLoading(true);
            const response = await getData(`/report/get/assessments/${serviceId}`);
            if (response?.contents) {
                const formattedReports = response.contents.map((item) => ({
                    report_name: item.report_name, 
                    url: item.web_url, 
                    last_scan_date: item.scan_date, 
                    issues_found: item.issues, 
                    accessibility_score: item.benchmark, 
                    guidelines: item.guideline
                }));
                setReports(formattedReports);
            } else {
                setReports([]);
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
            notification.error({
                title: "Fetch Reports",
                message: error?.data?.error || "Failed to fetch reports",
            });
        } finally {
            setLoading(false);
        }
    };
    

    const columns = [
        {
            title: "Report Name",
            dataIndex: "report_name",
            width: "20%",
            render: (text, record) => (
                <a href="/#" onClick={(e) => handleClick(e, record.report_name)}>
                    {record.report_name}
                </a>
            ),
        },
        {
            title: "URL",
            dataIndex: "url",
            width: "20%",
            render: (_, record) => (
                <a href={selectedUrl || record.url || "#"} target="_blank" rel="noopener noreferrer">
                    {selectedUrl || record.url || "N/A"}
                </a>
            ),
        },
        {
            title: "Last Scan Date & Time",
            dataIndex: "last_scan_date",
            width: "14%",
        },
        {
            title: "Issues Found",
            dataIndex: "issues_found",
            width: "10%",
            className: "text-center",
        },
        {
            title: "Guidelines",
            dataIndex: "guidelines",
            width: "10%",
            className: "text-center",
        },
        {
            title: "Accessibility Score",
            dataIndex: "accessibility_score",
            width: "13%",
            className: "text-center",
        },
        {
            title: "View",
            dataIndex: "view",
            width: "5%",
            className: "text-center",
            render: (_, record) => (
                <a href={record.view_url || "#"} target="_blank" rel="noopener noreferrer">
                    <img src={iconViewInternet} alt="View Online" />
                </a>
            ),
        },
        {
            title: "Download",
            dataIndex: "download",
            width: "8%",
            className: "text-center",
            render: (_, record) => (
                <>
                    <a href={record.word_download || "#"} className="me-3" onClick={(e) => e.preventDefault()}>
                        <img src={iconMsWord} alt="Download Document in Microsoft Word" />
                    </a>
                    <a href={record.pdf_download || "#"} onClick={(e) => e.preventDefault()}>
                        <img src={iconPDF} alt="Download Document in PDF Format" />
                    </a>
                </>
            ),
        },
    ];

    return <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />;
};

export default ReportTable;

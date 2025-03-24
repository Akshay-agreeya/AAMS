import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData } from "../../utils/CommonApi";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import iconPDF from "../../assets/images/iconPDF.svg";
import notification from "../../component/notification/Notification";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";

const ViewReport = (assessment_id, icon, text) => {
    return <a href={`/admin/reports/listing/viewReport/${assessment_id}`} rel="noopener noreferrer">
        {icon ? <img src={icon} alt="View Online" /> : text }
    </a>
}

export const ReportTable = ({ product_id }) => {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(product_id);

    useEffect(() => {
        if (product_id) {
            setSelectedProductId(product_id);
        }
    }, [product_id]);

    useEffect(() => {
        if (selectedProductId) {
            fetchReports();
        }
    }, [selectedProductId]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await getData(`/report/get/assessments/${selectedProductId}`);
            if (response?.contents) {
                const formattedReports = response.contents.map((item) => ({
                    report_name: item.report_name,
                    url: item.web_url,
                    last_scan_date: item.scan_date,
                    issues_found: item.issues,
                    accessibility_score: item.benchmark,
                    guidelines: item.guideline,
                    assessment_id: item.assessment_id
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
            render: (text, record) => {
                return ViewReport(record.assessment_id, undefined, text);
            },
        },
        {
            title: "URL",
            dataIndex: "url",
            width: "20%",
            render: (_, record) => (
                <a href={record.url || "#"} target="_blank" rel="noopener noreferrer">
                    {record.url || "N/A"}
                </a>
            ),
        },
        {
            title: "Last Scan Date & Time",
            dataIndex: "last_scan_date",
            width: "14%",
            render: (text) => (
                <span>{getFormattedDateWithTime(new Date(text))}</span>
            )
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
            render: (_, record) => {
                return ViewReport(record.assessment_id, iconViewInternet);
            },
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

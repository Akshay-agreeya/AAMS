import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData } from "../../utils/CommonApi";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import notification from "../../component/notification/Notification";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";
import AccesibilitySmallCircle from "./AccesibilitySmallCircle";
import DownloadDocx from "../../component/download/DownloadDocx";
import DownloadPDF from "../../component/download/DownloadPDF";

const ViewReport = (assessment_id, icon, text) => {
    return <a href={`/reports/listing/viewreport/${assessment_id}`} rel="noopener noreferrer">
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
            
                setReports(response.contents);
            }
         catch (error) {
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
                <a href={record.web_url || "#"} target="_blank" rel="noopener noreferrer">
                    {record.web_url || "N/A"}
                </a>
            ),
        },
        {
            title: "Last Scan Date & Time",
            dataIndex: "scan_date",
            width: "14%",
            render: (text) => (
                <span>{getFormattedDateWithTime(new Date(text))}</span>
            )
        },
        {
            title: "Issues Found",
            dataIndex: "issues",
            width: "10%",
            className: "text-center",
        },
        {
            title: "Guidelines",
            dataIndex: "guideline",
            width: "10%",
            className: "text-center",
        },
        {
            title: "Accessibility Score",
            dataIndex: "accessibility_score",
            width: "13%",
            className: "text-center",
            render : (_,record)=>(
                <AccesibilitySmallCircle product ={record}/>
            )
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
                    <DownloadDocx record={record} product_id={product_id}/>
                    <DownloadPDF record={record} product_id={product_id}/>
                </>
            ),
        },
    ];

    return <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />;
};

export default ReportTable;
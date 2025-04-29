import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData } from "../../utils/CommonApi";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import notification from "../../component/notification/Notification";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";
import AccesibilitySmallCircle from "./AccesibilitySmallCircle";
import DownloadDocx from "../../component/download/DownloadDocx";
import DownloadPDF from "../../component/download/DownloadPDF";
import { DATE_FORMAT } from "../../utils/Constants";
import MSdisable from '../../assets/images/iconMsWordDisable.svg'
import PDFdisable from '../../assets/images/iconPDFDisable.svg'
import Viewdisable from '../../assets/images/iconViewDisable.svg'

const ViewReport = (assessment_id, icon, text) => {
    return <a href={`/reports/listing/summaryreport/${assessment_id}`} rel="noopener noreferrer">
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
                return ViewReport(record.assessment_id, undefined, text || "");
            },
        },
        {
            title: "URL",
            dataIndex: "url",
            width: "20%",
            render: (_, record) => (
                <a href={record.web_url || "#"} target="_blank" rel="noopener noreferrer">
                    {record.web_url || ""}
                </a>
            ),
        },
        {
            title: "Last Scan Date",
            dataIndex: "scan_date",
            width: "14%",
            className: "text-center",
            render: (text) => {
                if (!text) return "";
                try {
                    const date = new Date(text);
                    if (isNaN(date)) return "";
                    return <span>{getFormattedDateWithTime(date, DATE_FORMAT)}</span>;
                } catch {
                    return "";
                }
            }
        },
        {
            title: "Issues Found",
            dataIndex: "issues",
            width: "10%",
            className: "text-center",
            render: (text) => text ?? "",
        },
        {
            title: "Guidelines",
            dataIndex: "guideline",
            width: "10%",
            className: "text-center",
            render: (text) => text ?? "",
        },
        {
            title: "Accessibility Score",
            dataIndex: "accessibility_score",
            width: "13%",
            className: "text-center",
            render: (_, record) =>
                record ? <AccesibilitySmallCircle product={record} /> : "",
        },
        {
            title: "View",
            dataIndex: "view",
            width: "5%",
            className: "text-center",
            render: (_, record) => (
                record?.status === "Completed" && record?.assessment_id ? (
                    ViewReport(record.assessment_id, iconViewInternet)
                ) : (
                    <img
                        src={Viewdisable}
                        alt="View disabled"
                        title="View unavailable"
                        style={{ cursor: "not-allowed" }}
                    />
                )
            ),
        },
        
        
        {
            title: "Download",
            dataIndex: "download",
            width: "8%",
            className: "text-center",
            render: (_, record) => (
                record?.status === "Completed" ? (
                    <>
                        <DownloadDocx record={record} product_id={product_id} />
                        <DownloadPDF record={record} product_id={product_id} />
                    </>
                ) : (
                    <>
                        <img
                            src={MSdisable}
                            alt="DOCX download disabled"
                            title="DOCX download unavailable"
                            style={{  marginRight: "14px" ,cursor: "not-allowed" }}
                        />
                        <img
                            src={PDFdisable} 
                            alt="PDF download disabled"
                            title="PDF download unavailable"
                            style={{  cursor: "not-allowed" }}
                        />
                    </>
                )
            ),
        },
        
        {
            title: "Status",
            dataIndex: "status",
            width: "8%",
            className: "text-center",
            
        },
    ];

    return <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />;
};

export default ReportTable;
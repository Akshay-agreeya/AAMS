import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData } from "../../utils/CommonApi";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";
import editicon from "../../assets/images/iconEdit.svg";
import DownloadDocx from "../../component/download/DownloadDocx";
import DownloadPDF from "../../component/download/DownloadPDF";
import { DATE_FORMAT } from "../../utils/Constants";
import MSdisable from '../../assets/images/iconMsWordDisable.svg';
import PDFdisable from '../../assets/images/iconPDFDisable.svg';
import { useNavigate } from "react-router-dom";

const ViewReport = (transaction_id, icon, text, selectedProductId, org_id,web_url) => {

    const navigate = useNavigate();

    return <a href="#" rel="noopener noreferrer" onClick={(e) => {
        e.preventDefault();
        navigate(`/reports/listing/manual-viewreport/${transaction_id}?id=${selectedProductId}&org_id=${org_id}`,
            {state:{web_url}}
        )
    }}>
        {icon ? <img src={icon} alt="View Online" /> : text}
    </a>
}

export const ManualReportTable = ({ product_id, org_id }) => {

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
            const response = await getData(`/manual/list/${selectedProductId}`);

            setReports(response.contents);
        }
        catch (error) {
            console.error("Error fetching reports:", error);
            setReports([]);
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
                return ViewReport(1, undefined, text || "", 2, "ASEDRFDEDRDD");
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
            dataIndex: "timestamp",
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
            title: "View",
            dataIndex: "view",
            width: "5%",
            className: "text-center",
            render: (_, record) => (
                (
                    ViewReport(record.txn_id, iconViewInternet, null, selectedProductId, org_id, record.web_url)
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
                            style={{ marginRight: "14px", cursor: "not-allowed" }}
                        />
                        <img
                            src={PDFdisable}
                            alt="PDF download disabled"
                            title="PDF download unavailable"
                            style={{ cursor: "not-allowed" }}
                        />
                    </>
                )
            ),
        },

        {
            title: "Action",
            dataIndex: "status",
            width: "8%",
            className: "text-center text-nowrap",
            render: (_text, record) => (
                <>
                    <a title="Edit Details" href={`#`} className="me-3">
                        <img src={editicon} alt="Edit Details" />
                    </a>
                </>
            )
        },
    ];

    return <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />;
};

export default ManualReportTable;
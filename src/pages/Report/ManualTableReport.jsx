import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { deleteData, getData } from "../../utils/CommonApi";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images/iconDelete.svg";
import DownloadPDF from "../../component/download/DownloadPDF";
import { DATE_FORMAT } from "../../utils/Constants";
import MSdisable from '../../assets/images/iconMsWordDisable.svg';
import PDFdisable from '../../assets/images/iconPDFDisable.svg';
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import notification from "../../component/notification/Notification";
import ManualDownloadDocx from "../../component/download/ManualDownloadDocx";

const ViewReport = (transaction_id, icon, text, selectedProductId, org_id, web_url) => {

    const navigate = useNavigate();

    return <a href="#" rel="noopener noreferrer" onClick={(e) => {
        e.preventDefault();
        navigate(`/reports/listing/manual-viewreport/${transaction_id}?id=${selectedProductId}&org_id=${org_id}`,
            { state: { web_url } }
        )
    }}>
        {icon ? <img src={icon} alt="View Online" /> : text}
    </a>
}

export const  ManualReportTable = ({ product_id, org_id }) => {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(product_id);
    const [selectedTxnId, setSelectedTxnId] = useState();
    const [openReportDeleteModal, setOpenReportDeleteModal] = useState();

    const navigate = useNavigate();

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

    const handleEdit = (e, record) => {
        e.preventDefault();
        
        navigate(`/product-management/edit-manual-report/${record.txn_id}`,
            { state: { org_id, product_id, web_url: record.web_url } }
        )
    }

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

                <>
                    <ManualDownloadDocx record={record} product_id={product_id} />
                    {/* <DownloadPDF record={record} product_id={product_id} /> */}
                    <img
                            src={PDFdisable}
                            alt="PDF download disabled"
                            title="PDF download unavailable"
                            style={{ cursor: "not-allowed" }}
                        />
                </>
            ),
        },

        {
            title: "Action",
            dataIndex: "status",
            width: "8%",
            className: "text-center text-nowrap",
            render: (_text, record) => (
                <>
                    <a title="Edit Manual Report" href="#" className="me-3"
                        onClick={(e) => { handleEdit(e, record) }}>
                        <img src={editicon} alt="Edit Manual Report" />
                    </a>
                    {<a title="Delete Details" href="#" onClick={() => {
                        setSelectedTxnId(record.txn_id);
                        setOpenReportDeleteModal(true);
                    }}>
                        <img src={deleteicon} alt="Delete Details" />
                    </a>
                    }
                </>
            )
        },
    ];

    const handleDelete = async () => {
        try {
            const resp = await deleteData(`/manual/delete/${selectedTxnId}`);
            notification.success({
                title: `Delete Manual Report`,
                message: resp.message
            });
            navigate(`/reports/listing/${org_id}?id=${product_id}&selected_tab=2`);
        }
        catch (error) {
            notification.error({
                title: 'Delete Manual Report',
                message: error.data?.error
            });
        }
    }

    return <>
        <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />
        <DeleteConfirmationModal
            modalId="deleteReportModal"
            open={openReportDeleteModal}
            onDelete={handleDelete}
            onClose={() => { setOpenReportDeleteModal(false) }}
        />
    </>
};

export default ManualReportTable;
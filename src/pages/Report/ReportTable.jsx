import React from "react";
import Table from "../../component/table/Table";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import iconPDF from "../../assets/images/iconPDF.svg";

export const ReportTable = ({ reports, selectedUrl, handleClick }) => {
    const columns = [
        {
            title: "Report Name",
            dataIndex: "reportName",
            width: "20%",
            render: (text, record) => (
                <a href="/#" onClick={(e) => handleClick(e, record.reportName)}>
                    {record.reportName}
                </a>
            ),
        },
        {
            title: "URL",
            dataIndex: "url",
            width: "20%",
            render: () => (
                <a href={selectedUrl || "#"} target="_blank" rel="noopener noreferrer">
                    {selectedUrl || "N/A"}
                </a>
            ),
        },
        {
            title: "Last Scan Date & Time",
            dataIndex: "lastScan",
            width: "14%",
        },
        {
            title: "Issues Found",
            dataIndex: "issuesFound",
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
            dataIndex: "accessibilityScore",
            width: "13%",
            className: "text-center",
        },
        {
            title: "View",
            dataIndex: "view",
            width: "5%",
            className: "text-center",
            render: () => (
                <a href="viewAdminReport.html">
                    <img src={iconViewInternet} alt="View Online" />
                </a>
            ),
        },
        {
            title: "Download",
            dataIndex: "download",
            width: "8%",
            className: "text-center",
            render: () => (
                <>
                    <a href="/" className="me-3" onClick={(e) => e.preventDefault()}>
                        <img src={iconMsWord} alt="Download Document in Microsoft Word" />
                    </a>
                    <a href="/#" onClick={(e) => e.preventDefault()}>
                        <img src={iconPDF} alt="Download Document in PDF Format" />
                    </a>
                </>
            ),
        },
    ];

    return <Table columns={columns} dataSource={reports} rowKey="id" />;
};

export default ReportTable;

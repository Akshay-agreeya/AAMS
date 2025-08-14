import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData } from "../../utils/CommonApi";
import iconViewInternet from "../../assets/images/iconViewInternet.svg";
import notification from "../../component/notification/Notification";
import { getFormattedDateWithTime } from "../../component/input/DatePicker";
import AccesibilitySmallCircle from "./AccesibilitySmallCircle";
import DownloadDocx from "../../component/download/DownloadDocx";
import DownloadPDF from "../../component/download/DownloadPDF";
import { DATE_TIME_FORMAT } from "../../utils/Constants";
import MSdisable from '../../assets/images/iconMsWordDisable.svg'
import PDFdisable from '../../assets/images/iconPDFDisable.svg'
import Viewdisable from '../../assets/images/iconViewDisable.svg'
import { useNavigate } from "react-router-dom";

export const ReportTable = ({ product_id, org_id }) => {
    const navigate = useNavigate();
    
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

    // Fixed ViewReport function to use navigate with state for web reports
    const ViewReport = (assessment_id, icon, text, selectedProductId, org_id, reportData) => {
        const handleClick = (e) => {
            if (text || icon) { // Handle both icon and text clicks
                e.preventDefault();
                navigate(`/reports/listing/summaryreport/${assessment_id}?id=${selectedProductId}&org_id=${org_id}`, {
                    state: {
                        report_name: reportData.report_name,
                        product_name: reportData.web_url,
                        org_id: org_id,
                        product_id: selectedProductId,
                        assessment_id: assessment_id
                    }
                });
            }
        };

        return (
            <a href="#" onClick={handleClick} rel="noopener noreferrer">
                {icon ? <img src={icon} alt="View Online" /> : text}
            </a>
        );
    }

    // Mobile ViewReport function with state passing
    const MobileViewReport = (summary_report_id, icon, text, selectedProductId, org_id, reportData) => {
        const handleClick = (e) => {
            e.preventDefault();
            navigate(`/reports/listing/mobile/summaryreport/${summary_report_id}?id=${selectedProductId}&org_id=${org_id}`, {
                state: {
                    report_name: reportData.report_name,
                    product_name: reportData.mobile_app_name ? 
                        `${reportData.mobile_app_name} - ${reportData.mobile_app_version}` : 
                        reportData.web_url,
                    org_id: org_id,
                    product_id: selectedProductId,
                    summary_report_id: summary_report_id
                }
            });
        };

        return (
            <a href="#" onClick={handleClick} rel="noopener noreferrer">
                {icon ? <img src={icon} alt="View Online" /> : text}
            </a>
        );
    }

    const columns = [
        {
            title: "Report Name",
            dataIndex: "report_name",
            width: "20%",
            render: (text, record) => {
                return record.mobile_app_name ? 
                    MobileViewReport(record.summary_report_id, undefined, text || "", selectedProductId, org_id, record) :
                    ViewReport(record.assessment_id, undefined, text || "", selectedProductId, org_id, record);
            },
        },
        {
            title: "Product Name",
            dataIndex: "url",
            width: "20%",
            render: (_, record) => (
                record.mobile_app_name && record.mobile_app_version ? (
                    <span>{`${record.mobile_app_name} - ${record.mobile_app_version}`}</span>
                ) : (
                    <a href={record.web_url || "#"} target="_blank" rel="noopener noreferrer">
                        {record.web_url || ""}
                    </a>
                )
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
                    return <span>{getFormattedDateWithTime(date, DATE_TIME_FORMAT)}</span>;
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
                    <>
                        {record.mobile_app_name ? 
                            MobileViewReport(record.summary_report_id, iconViewInternet, null, selectedProductId, org_id, record) :
                            ViewReport(record.assessment_id, iconViewInternet, null, selectedProductId, org_id, record)
                        }
                    </>
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
            title: "Status",
            dataIndex: "status",
            width: "8%",
            className: "text-center",
        },
    ];

    return <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />;
};

export default ReportTable;

































// import React, { useEffect, useState } from "react";
// import Table from "../../component/table/Table";
// import { getData } from "../../utils/CommonApi";
// import iconViewInternet from "../../assets/images/iconViewInternet.svg";
// import notification from "../../component/notification/Notification";
// import { getFormattedDateWithTime } from "../../component/input/DatePicker";
// import AccesibilitySmallCircle from "./AccesibilitySmallCircle";
// import DownloadDocx from "../../component/download/DownloadDocx";
// import DownloadPDF from "../../component/download/DownloadPDF";
// import { DATE_TIME_FORMAT } from "../../utils/Constants";
// import MSdisable from '../../assets/images/iconMsWordDisable.svg'
// import PDFdisable from '../../assets/images/iconPDFDisable.svg'
// import Viewdisable from '../../assets/images/iconViewDisable.svg'
// import { useNavigate } from "react-router-dom";

// const ViewReport = (assessment_id, icon, text, selectedProductId, org_id) => {
//     return <a href={`/reports/listing/summaryreport/${assessment_id}?id=${selectedProductId}&org_id=${org_id}`} rel="noopener noreferrer">
//         {icon ? <img src={icon} alt="View Online" /> : text}
//     </a>
// }

// export const ReportTable = ({ product_id, org_id }) => {
//     const navigate = useNavigate(); // Move navigate to component level
    
//     const [reports, setReports] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedProductId, setSelectedProductId] = useState(product_id);

//     useEffect(() => {
//         if (product_id) {
//             setSelectedProductId(product_id);
//         }
//     }, [product_id]);

//     useEffect(() => {
//         if (selectedProductId) {
//             fetchReports();
//         }
//     }, [selectedProductId]);

//     const fetchReports = async () => {
//         try {
//             setLoading(true);
//             const response = await getData(`/report/get/assessments/${selectedProductId}`);
//             setReports(response.contents);
//         }
//         catch (error) {
//             console.error("Error fetching reports:", error);
//             notification.error({
//                 title: "Fetch Reports",
//                 message: error?.data?.error || "Failed to fetch reports",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Move MobileViewReport function inside the component to access navigate
//     const MobileViewReport = (summary_report_id, icon, text, selectedProductId, org_id, reportData) => {
//         const handleClick = (e) => {
//             if (icon) { // Only handle programmatic navigation when it's an icon click
//                 e.preventDefault();
//                 navigate(`/reports/listing/mobile/summaryreport/${summary_report_id}?id=${selectedProductId}&org_id=${org_id}`, {
//                     state: {
//                         report_name: reportData.report_name,
//                         product_name: reportData.mobile_app_name ? 
//                             `${reportData.mobile_app_name} - ${reportData.mobile_app_version}` : 
//                             reportData.web_url,
//                         // platform: reportData.mobile_app_name ? 'Mobile' : 'Web',
//                         org_id: org_id,
//                         product_id: selectedProductId,
//                         summary_report_id: summary_report_id
//                     }
//                 });
//             }
//         };

//         if (icon) {
//             return (
//                 <a href="#" onClick={handleClick} rel="noopener noreferrer">
//                     <img src={icon} alt="View Online" />
//                 </a>
//             );
//         } else {
//             return (
//                 <a href={`/reports/listing/mobile/summaryreport/${summary_report_id}?id=${selectedProductId}&org_id=${org_id}`} 
//                    rel="noopener noreferrer">
//                     {text}
//                 </a>
//             );
//         }
//     }

//     const columns = [
//         {
//             title: "Report Name",
//             dataIndex: "report_name",
//             width: "20%",
//             render: (text, record) => {
//                 return record.mobile_app_name ? 
//                     MobileViewReport(record.summary_report_id, undefined, text || "", selectedProductId, org_id, record) :
//                     ViewReport(record.assessment_id, undefined, text || "", selectedProductId, org_id);
//             },
//         },
//         {
//             title: "Product Name",
//             dataIndex: "url",
//             width: "20%",
//             render: (_, record) => (
//                 record.mobile_app_name && record.mobile_app_version ? (
//                     <span>{`${record.mobile_app_name} - ${record.mobile_app_version}`}</span>
//                 ) : (
//                     <a href={record.web_url || "#"} target="_blank" rel="noopener noreferrer">
//                         {record.web_url || ""}
//                     </a>
//                 )
//             ),
//         },
//         {
//             title: "Last Scan Date",
//             dataIndex: "scan_date",
//             width: "14%",
//             className: "text-center",
//             render: (text) => {
//                 if (!text) return "";
//                 try {
//                     const date = new Date(text);
//                     if (isNaN(date)) return "";
//                     return <span>{getFormattedDateWithTime(date, DATE_TIME_FORMAT)}</span>;
//                 } catch {
//                     return "";
//                 }
//             }
//         },
//         {
//             title: "Issues Found",
//             dataIndex: "issues",
//             width: "10%",
//             className: "text-center",
//             render: (text) => text ?? "",
//         },
//         {
//             title: "Guidelines",
//             dataIndex: "guideline",
//             width: "10%",
//             className: "text-center",
//             render: (text) => text ?? "",
//         },
//         {
//             title: "Accessibility Score",
//             dataIndex: "accessibility_score",
//             width: "13%",
//             className: "text-center",
//             render: (_, record) =>
//                 record ? <AccesibilitySmallCircle product={record} /> : "",
//         },
//         {
//             title: "View",
//             dataIndex: "view",
//             width: "5%",
//             className: "text-center",
//             render: (_, record) => (
//                 record?.status === "Completed" && record?.assessment_id ? (
//                     <>
//                         {record.mobile_app_name ? 
//                             MobileViewReport(record.summary_report_id, iconViewInternet, null, selectedProductId, org_id, record) :
//                             ViewReport(record.assessment_id, iconViewInternet, null, selectedProductId, org_id)
//                         }
//                     </>
//                 ) : (
//                     <img
//                         src={Viewdisable}
//                         alt="View disabled"
//                         title="View unavailable"
//                         style={{ cursor: "not-allowed" }}
//                     />
//                 )
//             ),
//         },
//         {
//             title: "Download",
//             dataIndex: "download",
//             width: "8%",
//             className: "text-center",
//             render: (_, record) => (
//                 record?.status === "Completed" ? (
//                     <>
//                         <DownloadDocx record={record} product_id={product_id} />
//                         <DownloadPDF record={record} product_id={product_id} />
//                     </>
//                 ) : (
//                     <>
//                         <img
//                             src={MSdisable}
//                             alt="DOCX download disabled"
//                             title="DOCX download unavailable"
//                             style={{ marginRight: "14px", cursor: "not-allowed" }}
//                         />
//                         <img
//                             src={PDFdisable}
//                             alt="PDF download disabled"
//                             title="PDF download unavailable"
//                             style={{ cursor: "not-allowed" }}
//                         />
//                     </>
//                 )
//             ),
//         },
//         {
//             title: "Status",
//             dataIndex: "status",
//             width: "8%",
//             className: "text-center",
//         },
//     ];

//     return <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />;
// };

// export default ReportTable;











// import React, { useEffect, useState } from "react";
// import Table from "../../component/table/Table";
// import { getData } from "../../utils/CommonApi";
// import iconViewInternet from "../../assets/images/iconViewInternet.svg";
// import notification from "../../component/notification/Notification";
// import { getFormattedDateWithTime } from "../../component/input/DatePicker";
// import AccesibilitySmallCircle from "./AccesibilitySmallCircle";
// import DownloadDocx from "../../component/download/DownloadDocx";
// import DownloadPDF from "../../component/download/DownloadPDF";
// import { DATE_TIME_FORMAT } from "../../utils/Constants";
// import MSdisable from '../../assets/images/iconMsWordDisable.svg'
// import PDFdisable from '../../assets/images/iconPDFDisable.svg'
// import Viewdisable from '../../assets/images/iconViewDisable.svg'

// import { useNavigate } from "react-router-dom";

// // const navigate = useNavigate();


// const ViewReport = (assessment_id, icon, text, selectedProductId, org_id) => {

//     return <a href={`/reports/listing/summaryreport/${assessment_id}?id=${selectedProductId}&org_id=${org_id}`} rel="noopener noreferrer">
//         {icon ? <img src={icon} alt="View Online" /> : text}
//     </a>
// }

// // const MobileViewReport = (summary_report_id, icon, text, selectedProductId, org_id) => {

// //     return <a href={`/reports/listing/mobile/summaryreport/${summary_report_id}?id=${selectedProductId}&org_id=${org_id}`} rel="noopener noreferrer">
// //         {icon ? <img src={icon} alt="View Online" /> : text}
// //     </a>
// // }



// // Updated MobileViewReport to pass additional data
// const MobileViewReport = (summary_report_id, icon, text, selectedProductId, org_id, reportData) => {
//    const navigate = useNavigate();

//     const handleClick = (e) => {
//         if (icon) { // Only handle programmatic navigation when it's an icon click
//             e.preventDefault();
//             navigate(`/reports/listing/mobile/summaryreport/${summary_report_id}?id=${selectedProductId}&org_id=${org_id}`, {
//                 state: {
//                     report_name: reportData.report_name,
//                     product_name: reportData.mobile_app_name ? 
//                         `${reportData.mobile_app_name} - ${reportData.mobile_app_version}` : 
//                         reportData.web_url,
//                     platform: reportData.mobile_app_name ? 'Mobile' : 'Web',
//                     org_id: org_id,
//                     product_id: selectedProductId,
//                     summary_report_id: summary_report_id
//                 }
//             });
//         }
//     };

//     if (icon) {
//         return (
//             <a href="#" onClick={handleClick} rel="noopener noreferrer">
//                 <img src={icon} alt="View Online" />
//             </a>
//         );
//     } else {
//         return (
//             <a href={`/reports/listing/mobile/summaryreport/${summary_report_id}?id=${selectedProductId}&org_id=${org_id}`} 
//                rel="noopener noreferrer">
//                 {text}
//             </a>
//         );
//     }
// }


// export const ReportTable = ({ product_id, org_id }) => {

//     const [reports, setReports] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedProductId, setSelectedProductId] = useState(product_id);

//     useEffect(() => {
//         if (product_id) {
//             setSelectedProductId(product_id);
//         }
//     }, [product_id]);

//     useEffect(() => {
//         if (selectedProductId) {
//             fetchReports();
//         }
//     }, [selectedProductId]);

//     const fetchReports = async () => {
//         try {
//             setLoading(true);
//             const response = await getData(`/report/get/assessments/${selectedProductId}`);

//             setReports(response.contents);
//         }
//         catch (error) {
//             console.error("Error fetching reports:", error);
//             notification.error({
//                 title: "Fetch Reports",
//                 message: error?.data?.error || "Failed to fetch reports",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };



//     const columns = [
//         {
//             title: "Report Name",
//             dataIndex: "report_name",
//             width: "20%",
//             render: (text, record) => {
//                 return record.mobile_app_name ? MobileViewReport(record.summary_report_id, undefined, text || "", selectedProductId, org_id) :
//                     ViewReport(record.assessment_id, undefined, text || "", selectedProductId, org_id);
//             },
//         },
//         {
//             title: "Product Name",
//             dataIndex: "url",
//             width: "20%",
//             render: (_, record) => (
//                 record.mobile_app_name && record.mobile_app_version ? (
//                     <span>{`${record.mobile_app_name} - ${record.mobile_app_version}`}</span>
//                 ) : (
//                     <a href={record.web_url || "#"} target="_blank" rel="noopener noreferrer">
//                         {record.web_url || ""}
//                     </a>
//                 )
//             ),
//         },
//         {
//             title: "Last Scan Date",
//             dataIndex: "scan_date",
//             width: "14%",
//             className: "text-center",
//             render: (text) => {
//                 if (!text) return "";
//                 try {
//                     const date = new Date(text);
//                     if (isNaN(date)) return "";
//                     return <span>{getFormattedDateWithTime(date, DATE_TIME_FORMAT)}</span>;
//                 } catch {
//                     return "";
//                 }
//             }
//         },

//         {
//             title: "Issues Found",
//             dataIndex: "issues",
//             width: "10%",
//             className: "text-center",
//             render: (text) => text ?? "",
//         },
//         {
//             title: "Guidelines",
//             dataIndex: "guideline",
//             width: "10%",
//             className: "text-center",
//             render: (text) => text ?? "",
//         },
//         {
//             title: "Accessibility Score",
//             dataIndex: "accessibility_score",
//             width: "13%",
//             className: "text-center",
//             render: (_, record) =>
//                 record ? <AccesibilitySmallCircle product={record} /> : "",
//         },
//         {
//             title: "View",
//             dataIndex: "view",
//             width: "5%",
//             className: "text-center",
//             render: (_, record) => (
//                 record?.status === "Completed" && record?.assessment_id ? (
//                     <>
//                         {record.mobile_app_name ? MobileViewReport(record.summary_report_id, iconViewInternet, null, selectedProductId, org_id) :
//                             ViewReport(record.assessment_id, iconViewInternet, null, selectedProductId, org_id)
//                         }
//                     </>
//                 ) : (
//                     <img
//                         src={Viewdisable}
//                         alt="View disabled"
//                         title="View unavailable"
//                         style={{ cursor: "not-allowed" }}
//                     />
//                 )
//             ),
//         },


//         {
//             title: "Download",
//             dataIndex: "download",
//             width: "8%",
//             className: "text-center",
//             render: (_, record) => (
//                 record?.status === "Completed" ? (
//                     <>
//                         <DownloadDocx record={record} product_id={product_id} />
//                         <DownloadPDF record={record} product_id={product_id} />
//                     </>
//                 ) : (
//                     <>
//                         <img
//                             src={MSdisable}
//                             alt="DOCX download disabled"
//                             title="DOCX download unavailable"
//                             style={{ marginRight: "14px", cursor: "not-allowed" }}
//                         />
//                         <img
//                             src={PDFdisable}
//                             alt="PDF download disabled"
//                             title="PDF download unavailable"
//                             style={{ cursor: "not-allowed" }}
//                         />
//                     </>
//                 )
//             ),
//         },

//         {
//             title: "Status",
//             dataIndex: "status",
//             width: "8%",
//             className: "text-center",

//         },
//     ];

//     return <Table columns={columns} dataSource={reports} rowKey="report_id" loading={loading} />;
// };

// export default ReportTable;
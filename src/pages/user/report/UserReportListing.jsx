import React, { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import blackSiteIcon from "../../../assets/images/blackSiteIcon.svg";
import iconViewInternet from "../../../assets/images/iconViewInternet.svg";
import iconMsWord from "../../../assets/images/iconMsWord.svg";
import iconPDF from "../../../assets/images/iconPDF.svg";
import { useNavigate } from "react-router-dom";
import { isSuperAdmin } from "../../../utils/Helper";
import Pagenation from "../../../component/Pagenation";
import { UrlSelect } from "../../../component/select/UrlSelect";
import { getData } from "../../../utils/CommonApi";

const UserReportListing = () => {
    const [orgId, setOrgId] = useState(null);
    const [selectedUrl, setSelectedUrl] = useState("");

    const superAdmin = isSuperAdmin();
    const navigate = useNavigate();

    
    useEffect(() => {
        fetchOrgId();
    }, []);

    const fetchOrgId = async () => {
        try {
            const resp = await getData("/org/list");
            if (resp.contents && resp.contents.length > 0) {
                setOrgId(resp.contents[0].org_id); 
            }
        } catch (error) {
            console.error("Error fetching org_id:", error);
        }
    };

    const handleUrlChange = (url) => {
        setSelectedUrl(url);
    };

    const handleClick = (e, item) => {
        e.preventDefault();
        navigate("/user/reports/view", { state: { fileName: item } });
    };

    const breadcrumbs = [
        { url: `/${superAdmin ? "admin" : "user"}/dashboard`, label: "Home" },
        { url: `/${superAdmin ? "admin" : "user"}/reports`, label: "Website Listing" },
        { label: "Reports" }
    ];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <div className="adaMainContainer">
                <section className="adminControlContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <h1>Reports - {selectedUrl || "Select a URL"}</h1>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="myReportsGridContainer mt-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="reportListingGridContainer">
                                                <div className="reportListingRepeat">
                                                    <div className="box">
                                                        <div className="siteIcon">
                                                            <img src={blackSiteIcon} alt="Site logo" />
                                                        </div>
                                                        <div className="siteName">{selectedUrl || "Select a URL"}</div>
                                                    </div>
                                                    <div className="box">
                                                        <div className="changeOptionContainer">
                                                            <div className="lable">Selected Site</div>
                                                            <div className="changeOptionDD">
                                                                {orgId && <UrlSelect org_id={orgId} onChange={handleUrlChange} />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reports Table */}
                                        <div className="col-12">
                                            <div className="gridContainer">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th width="20%">Report Name</th>
                                                            <th width="20%">URL</th>
                                                            <th width="14%">Last Scan Date & Time</th>
                                                            <th width="10%" className="text-center">Issues Found</th>
                                                            <th width="10%" className="text-center">Guidelines</th>
                                                            <th width="13%" className="text-center">Accessibility Score</th>
                                                            <th width="5%" className="text-center">View</th>
                                                            <th width="8%" className="text-center">Download</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[...Array(9)].map((_, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <a href="/#" onClick={(e) => handleClick(e, `AQMD Site Assessment Report-${9 - index}`)}>
                                                                        AQMD Site Assessment Report-{9 - index}
                                                                    </a>
                                                                </td>
                                                                <td>
                                                                    <a href={selectedUrl || "#"} target="_blank" rel="noopener noreferrer">
                                                                        {selectedUrl || "N/A"}
                                                                    </a>
                                                                </td>
                                                                <td>02 Jan 2025 - 20:55:12</td>
                                                                <td className="text-center">500</td>
                                                                <td className="text-center">WCAG 2.2 AA</td>
                                                                <td className="text-center">{85 - index * 6}%</td>
                                                                <td className="text-center">
                                                                    <a href="viewAdminReport.html">
                                                                        <img src={iconViewInternet} alt="View Online" />
                                                                    </a>
                                                                </td>
                                                                <td className="text-center">
                                                                    <a href="/" className="me-3" onClick={(e) => e.preventDefault()}>
                                                                        <img src={iconMsWord} alt="Download Document in Microsoft Word" />
                                                                    </a>
                                                                    <a href="/#" onClick={(e) => e.preventDefault()}>
                                                                        <img src={iconPDF} alt="Download Document in PDF Format" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Pagination */}
                                        <div className="col-12">
                                            <Pagenation />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default UserReportListing;

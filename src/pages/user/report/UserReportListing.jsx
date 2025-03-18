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
import ReportTable from "../../Report/ReportTable";

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
                                        <ReportTable  selectedUrl={selectedUrl} handleClick={handleClick} />

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

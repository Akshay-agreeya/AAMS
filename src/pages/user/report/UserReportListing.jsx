import React, { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import blackSiteIcon from "../../../assets/images/blackSiteIcon.svg";
// import iconViewInternet from "../../../assets/images/iconuseInternet.svg";
import iconMsWord from "../../../assets/images/iconMsWord.svg";
import iconPDF from "../../../assets/images/iconPDF.svg";
import { useNavigate } from "react-router-dom";
import { isSuperAdmin } from "../../../utils/Helper";
import Pagenation from "../../../component/Pagenation";
import { UrlSelect } from "../../../component/select/UrlSelect";
import { getData } from "../../../utils/CommonApi";
import ReportTable from "../../Report/ReportTable";
import { useLocation } from "react-router";

const UserReportListing = () => {
    const [orgId, setOrgId] = useState(null);
    const [selectedUrl, setSelectedUrl] = useState("");
   
    const [serviceId, setServiceId] = useState(null);

    const superAdmin = isSuperAdmin();
    const navigate = useNavigate();

    
    useEffect(() => {
        
       // const web_url = location.state?.selectedUrl || "";
    }, []);

   
    const location = useLocation();
    const service_id = location.state?.service_id || null;
    const assesment_id = location.state?.assesment_id || null;
    const web_url = location.state?.web_url || null;
    const org_id = location.state.org_id || null;
    console.log(location.state)
    
    const handleUrlChange = async (web_url) => {
        setSelectedUrl(web_url);
        try {
            const response = await getData(`/report/get/urls/${orgId}`);
            console.log(orgId)
            const selectedService = response.contents.find(item => item.web_url === web_url);
            setServiceId(selectedService?.service_id || null);
        } catch (error) {
            console.error("Error fetching service ID:", error);
        }
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
                                    <h1>Reports - {web_url || "Select a URL"}</h1>
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
                                                        <div className="siteName">{web_url || "Select a URL"}</div>
                                                    </div>
                                                    <div className="box">
                                                        <div className="changeOptionContainer">
                                                            <div className="lable">Selected Site</div>
                                                            <div className="changeOptionDD">
                                                                {<UrlSelect org_id={org_id} web_url={web_url} onChange={handleUrlChange} />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reports Table */}
                                        <ReportTable service_id={service_id} assesment_id={assesment_id} org_id = {org_id} web_url={web_url}  handleClick={handleClick} />


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

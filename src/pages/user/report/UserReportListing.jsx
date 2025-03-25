import React, { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import blackSiteIcon from "../../../assets/images/blackSiteIcon.svg";
import { isSuperAdmin } from "../../../utils/Helper";
import Pagenation from "../../../component/Pagenation";
import { UrlSelect } from "../../../component/select/UrlSelect";
import { getData } from "../../../utils/CommonApi";
import ReportTable from "../../Report/ReportTable";
import { useLocation, useParams } from "react-router";

const UserReportListing = () => {
    const [selectedUrl, setSelectedUrl] = useState("");
    const [serviceId, setServiceId] = useState(null);
    const [loading, setLoading] = useState(false);

    const superAdmin = isSuperAdmin();
    const { org_id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialServiceId = queryParams.get("id");

    useEffect(() => {
        if (selectedUrl) {
            fetchServiceId(selectedUrl);
        }
    }, [selectedUrl]);

    const fetchServiceId = async (web_url) => {
        try {
            setLoading(true);
            const response = await getData(`/report/get/urls/${org_id}`);
            const selectedService = response.contents.find(item => item.web_url === web_url);
            setServiceId(selectedService?.service_id || null);
        } catch (error) {
            console.error("Error fetching service ID:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUrlChange = (e) => {
        setSelectedUrl(e.target.value);
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
                                    <h1>Reports - {selectedProduct?.label || "Select a URL"}</h1>
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
                                                        <div className="siteName">{selectedProduct?.label || "Select a URL"}</div>
                                                    </div>
                                                    <div className="box">
                                                        <div className="changeOptionContainer">
                                                            <div className="lable">Selected Site</div>
                                                            <div className="changeOptionDD">
                                                                <UrlSelect org_id={org_id} onChange={handleUrlChange} selectFirst={true} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reports Table */}
                                        <ReportTable product_id={serviceId || initialServiceId} />

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

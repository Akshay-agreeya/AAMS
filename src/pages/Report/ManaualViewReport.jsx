import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout';
import blackSiteIcon from '../../assets/images/blackSiteIcon.svg';
import { useLocation, useParams } from 'react-router-dom';
import { getData } from '../../utils/CommonApi';

const ManaualViewReport = () => {

    const [manualReportData, setManualReportData] = useState([]);
    const [selectedPageUrl, setSelectedPageUrl] = useState("");
    const [pageUrls, setPageUrls] = useState([]);
    const [formData, setFormData] = useState([]);

    const { transaction_id } = useParams();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const product_id = queryParams.get('id');
    const org_id = queryParams.get('org_id');

    const web_url = location.state?.web_url || '';

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getData(
                    `manual/viewReport/${transaction_id}`
                );
                setManualReportData(response.contents);
                const urls = response.contents?.map(item => item.pageUrl);
                setPageUrls(urls);
                setSelectedPageUrl(urls?.[0] || "");
            } catch (error) {
                console.error("Error fetching accessibility report:", error);
            }
        };
        fetchReport();
    }, [transaction_id]);

    useEffect(() => {

        if (manualReportData && selectedPageUrl) {
            const data = manualReportData.find(item => item.pageUrl === selectedPageUrl);
            setFormData(data?.formData);
        }

    }, [manualReportData, selectedPageUrl]);

    const breadcrumbs = [
        { url: `/dashboard`, label: "Home" },
        { url: `/reports`, label: "Website Listing" },
        {
            url: `/reports/listing/${org_id}?id=${product_id}&selected_tab=2`,
            label: "Reports",
        },
        { label: "View Report" },
    ];


    return (
        <Layout breadcrumbs={breadcrumbs}>
            <div className="adaMainContainer">
                <section className="adminControlContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <h1>Manual Report - AQMD Site </h1>
                                </div>

                            </div>
                            <div className="col-12 myReportsGridContainer ">
                                <div className="reportListingGridContainer">
                                    <div className="reportListingRepeat">
                                        <div className="box">
                                            <div className="siteIcon"><img src={blackSiteIcon} alt="Site logo" />
                                            </div>
                                            <div className="siteName">{web_url}</div>
                                        </div>
                                        <div className="box">
                                            <div className="changeOptionContainer">
                                                <div className="lable">Selected Page</div>
                                                <div className="changeOptionDD">
                                                    <select className="form-select"
                                                        aria-label="Change your Selected Site"
                                                        onChange={(e) => { setSelectedPageUrl(e.target.value) }}>
                                                        {pageUrls.map(url => <option value={url}>{url}</option>)}

                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                            {formData.map(item => <div className="col-12">
                                <div class="viewReportContainer mt-4">
                                    <h3>{item.category}</h3>
                                    <table class="issues ">
                                        <thead class="parentCategory">
                                            <tr>
                                                <th>Category</th>
                                                <th>Description</th>
                                                <th>User Impact</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{item.category}</td>
                                                <td>{item.description}</td>
                                                <td>{item.user_impact} </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" class="p-0">

                                                    <table class="issues m-0">

                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>Criteria/Checklist</th>
                                                                <th class="optional">Status</th>
                                                            </tr>
                                                        </thead>
                                                        {item.conditions?.map(condition => <>
                                                            <tbody>

                                                                <tr id="rule-AccHtmlFieldsetNoLegend">
                                                                    <td class="nowrap"><button type="button"
                                                                        class="chevron toggleChevron"
                                                                        data-toggleid="IDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                        id="anchorIDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                        title="List Pages"><img
                                                                            id="chevIDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                            src="/images/chevron-down.svg" alt=""
                                                                            class="absmiddle" width="20" height="20" /></button>
                                                                    </td>
                                                                    <td class="desc"
                                                                        data-toggleid="IDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                        id="descIDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN">
                                                                        {condition.condition}

                                                                    </td>
                                                                    <td class="optional text-success fw-bold">{condition.status}</td>
                                                                </tr>
                                                            </tbody>
                                                            <tbody class="expando"
                                                                id="expand-IDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN">
                                                                <tr>
                                                                    <td class="fw-bold">Remediation:</td>
                                                                    <td>
                                                                        {condition.remidiation}
                                                                    </td>
                                                                    <td class="optional"></td>
                                                                </tr>

                                                            </tbody>
                                                        </>)}

                                                        {/* <tfoot>
                                                            <tr>
                                                                <td><button type="button" class="chevron expandAll"
                                                                    title="Expand Contract All"><img id="chevExpandAll"
                                                                        src="/images/chevron-down.svg" alt=""
                                                                        class="absmiddle" width="20" height="20" /></button>
                                                                </td>
                                                                <td class="expandAll">Expand all 16 issues</td>

                                                                <td class="optional"></td>
                                                            </tr>
                                                        </tfoot> */}
                                                    </table>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>)}

                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default ManaualViewReport;
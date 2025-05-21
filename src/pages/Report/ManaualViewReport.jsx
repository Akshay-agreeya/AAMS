import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout';
import blackSiteIcon from '../../assets/images/blackSiteIcon.svg';
import { useLocation, useParams } from 'react-router-dom';
import { getData } from '../../utils/CommonApi';

const ManaualViewReport = () => {

    const [manualReportData, setManualReportData] = useState({});

    const { assessment_id } = useParams();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const product_id = queryParams.get('id');
    const org_id = queryParams.get('org_id');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getData(
                    `manual/viewReport/${assessment_id}`
                );
                setManualReportData(response.contents);
            } catch (error) {
                console.error("Error fetching accessibility report:", error);
            }
        };
        fetchReport();
    }, [assessment_id]);


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
                                            <div className="siteName">www.aqmd.gov</div>
                                        </div>
                                        <div className="box">
                                            <div className="changeOptionContainer">
                                                <div className="lable">Selected Page</div>
                                                <div className="changeOptionDD">
                                                    <select className="form-select" aria-label="Change your Selected Site">
                                                        <option selected="">About Us</option>
                                                        <option value="1">Contact Us</option>
                                                        <option value="2">Blog</option>

                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="col-12">
                                <div class="viewReportContainer mt-4">
                                    <h3>Keyboard Accessibility</h3>
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
                                                <td>Keyboard Accessibility</td>
                                                <td>Ensure all elements can receive keyboard focus, the focus order is logical,
                                                    and the focus indicator is visible.</td>
                                                <td>Keyboard-only users, ixilatio those with mobility impairments, will be
                                                    unable to navigate or interact with the page properly. </td>
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
                                                        <tbody>

                                                            <tr id="rule-AccHtmlFieldsetNoLegend">
                                                                <td class="nowrap"><button type="button"
                                                                    class="chevron toggleChevron"
                                                                    data-toggleid="IDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                    id="anchorIDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                    title="List Pages"><img
                                                                        id="chevIDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                        src="../images/chevron-down.svg" alt=""
                                                                        class="absmiddle" width="20" height="20" /></button>
                                                                </td>
                                                                <td class="desc"
                                                                    data-toggleid="IDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN"
                                                                    id="descIDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN">
                                                                    Keyboard
                                                                    focus visible when tabbing through the page

                                                                </td>
                                                                <td class="optional text-success fw-bold">Pass</td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody class="expando"
                                                            id="expand-IDZYVFPGVWGXWLM2RTOSBRLKXANCWH5YM52M1YXYOKQGLBKVG0KAXN">
                                                            <tr>
                                                                <td class="fw-bold">Remediation:</td>
                                                                <td>
                                                                    Add visible focus styles (e.g., outline or border) to all
                                                                    interactive
                                                                    elements using CSS, ensuring the focus indicator has a high
                                                                    contrast
                                                                    with the background, and avoid removing default focus
                                                                    outlines.
                                                                </td>
                                                                <td class="optional"></td>
                                                            </tr>

                                                        </tbody>
                                                        <tbody>
                                                            <tr id="rule-AccCssAnimationAutoplay">
                                                                <td class="nowrap"><button type="button"
                                                                    class="chevron toggleChevron"
                                                                    data-toggleid="IDRXEALG3YKDBEJMMLO5XDYOZ2JDGSVPHKFQPLACPZOM02LYN4AZHG"
                                                                    id="anchorIDRXEALG3YKDBEJMMLO5XDYOZ2JDGSVPHKFQPLACPZOM02LYN4AZHG"
                                                                    title="List Pages"><img
                                                                        id="chevIDRXEALG3YKDBEJMMLO5XDYOZ2JDGSVPHKFQPLACPZOM02LYN4AZHG"
                                                                        src="../images/chevron-down.svg" alt=""
                                                                        class="absmiddle" width="20" height="20" /></button>
                                                                </td>
                                                                <td class="desc"
                                                                    data-toggleid="IDRXEALG3YKDBEJMMLO5XDYOZ2JDGSVPHKFQPLACPZOM02LYN4AZHG"
                                                                    id="descIDRXEALG3YKDBEJMMLO5XDYOZ2JDGSVPHKFQPLACPZOM02LYN4AZHG">
                                                                    Keyboard
                                                                    focus does not unexpectedly shift to other elements
                                                                </td>
                                                                <td class="optional text-danger fw-bold">Fail</td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody class="expando"
                                                            id="expand-IDRXEALG3YKDBEJMMLO5XDYOZ2JDGSVPHKFQPLACPZOM02LYN4AZHG">
                                                            <tr>
                                                                <td class="fw-bold">Remediation:</td>
                                                                <td>
                                                                    Add visible focus styles (e.g., outline or border) to all
                                                                    interactive
                                                                    elements using CSS, ensuring the focus indicator has a high
                                                                    contrast
                                                                    with the background, and avoid removing default focus
                                                                    outlines. </td>
                                                                <td class="optional"></td>
                                                            </tr>

                                                        </tbody>
                                                        <tbody>
                                                            <tr id="rule-AccHtmlControlLabelMissing">
                                                                <td class="nowrap"><button type="button"
                                                                    class="chevron toggleChevron"
                                                                    data-toggleid="ID030QH3BJUZM0LEK3DYVW0SD00KWRI2WAMWH2PPDCRRW4V5PMJ1YG"
                                                                    id="anchorID030QH3BJUZM0LEK3DYVW0SD00KWRI2WAMWH2PPDCRRW4V5PMJ1YG"
                                                                    title="List Pages"><img
                                                                        id="chevID030QH3BJUZM0LEK3DYVW0SD00KWRI2WAMWH2PPDCRRW4V5PMJ1YG"
                                                                        src="../images/chevron-down.svg" alt=""
                                                                        class="absmiddle" width="20" height="20" /></button>
                                                                </td>
                                                                <td class="desc"
                                                                    data-toggleid="ID030QH3BJUZM0LEK3DYVW0SD00KWRI2WAMWH2PPDCRRW4V5PMJ1YG"
                                                                    id="descID030QH3BJUZM0LEK3DYVW0SD00KWRI2WAMWH2PPDCRRW4V5PMJ1YG">
                                                                    Can you
                                                                    get stuck in an element that shouldn’t trap focus?&nbsp;
                                                                </td>
                                                                <td class="optional text-warning fw-bold">Not Applicable</td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody class="expando"
                                                            id="expand-ID030QH3BJUZM0LEK3DYVW0SD00KWRI2WAMWH2PPDCRRW4V5PMJ1YG">
                                                            <tr>
                                                                <td class="fw-bold">Remediation:</td>
                                                                <td>
                                                                    Ensure focus can always exit interactive elements by
                                                                    providing clear
                                                                    exit options (e.g., Esc key or close button) and returning
                                                                    focus to the
                                                                    triggering element when closing modals or dialogs.
                                                                </td>
                                                                <td class="optional"></td>
                                                            </tr>
                                                        </tbody>

                                                        <tfoot>
                                                            <tr>
                                                                <td><button type="button" class="chevron expandAll"
                                                                    title="Expand Contract All"><img id="chevExpandAll"
                                                                        src="../images/chevron-down.svg" alt=""
                                                                        class="absmiddle" width="20" height="20" /></button>
                                                                </td>
                                                                <td class="expandAll">Expand all 16 issues</td>

                                                                <td class="optional"></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default ManaualViewReport;
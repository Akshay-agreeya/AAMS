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
    const [expandedConditions, setExpandedConditions] = useState({});
    const [expandedByCategory, setExpandedByCategory] = useState({});

    const { transaction_id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const product_id = queryParams.get('id');
    const org_id = queryParams.get('org_id');
    const web_url = location.state?.web_url || '';

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getData(`manual/viewReport/${transaction_id}`);
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
            setFormData(data?.formData || []);
        }
    }, [manualReportData, selectedPageUrl]);

    const toggleCondition = (key) => {
        setExpandedConditions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleAllInCategory = (categoryIndex) => {
        setExpandedByCategory(prev => {
            const shouldExpand = !prev[categoryIndex];
            const updatedConditions = { ...expandedConditions };

            formData[categoryIndex].conditions?.forEach((_, idx) => {
                const key = `${categoryIndex}-${idx}`;
                updatedConditions[key] = shouldExpand;
            });

            setExpandedConditions(updatedConditions);

            return {
                ...prev,
                [categoryIndex]: shouldExpand
            };
        });
    };

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
                                    <h1>Manual Report - AQMD Site</h1>
                                </div>
                            </div>

                            <div className="col-12 myReportsGridContainer">
                                <div className="reportListingGridContainer">
                                    <div className="reportListingRepeat">
                                        <div className="box">
                                            <div className="siteIcon">
                                                <img src={blackSiteIcon} alt="Site logo" />
                                            </div>
                                            <div className="siteName">{web_url}</div>
                                        </div>
                                        <div className="box">
                                            <div className="changeOptionContainer">
                                                <div className="lable">Selected Page</div>
                                                <div className="changeOptionDD">
                                                    <select
                                                        className="form-select"
                                                        aria-label="Change your Selected Site"
                                                        onChange={(e) => setSelectedPageUrl(e.target.value)}
                                                    >
                                                        {pageUrls.map(url => (
                                                            <option value={url} key={url}>{url}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {formData.map((item, cId) => (
                                <div className="col-12" key={cId}>
                                    <div className="viewReportContainer mt-4">
                                        <h3>{item.category}</h3>
                                        <table className="issues">
                                            <thead className="parentCategory">
                                                <tr>
                                                    <th style={{width:'33%'}}>Category</th>
                                                    <th style={{width:'34%'}}>Description</th>
                                                    <th style={{width:'33%'}}>User Impact</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{width:'33%'}}>{item.category}</td>
                                                    <td style={{width:'34%'}}>{item.description}</td>
                                                    <td style={{width:'33%'}}>{item.user_impact}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3" className="p-0">
                                                        <table className="issues m-0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{width:'10%'}}></th>
                                                                    <th style={{width:'80%'}}>Criteria/Checklist</th>
                                                                    <th className="optional" style={{width:'10%'}}>Status</th>
                                                                </tr>
                                                            </thead>

                                                            {item.conditions?.map((condition, tId) => {
                                                                const uniqueKey = `${cId}-${tId}`;
                                                                return (
                                                                    <React.Fragment key={uniqueKey}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="nowrap" style={{width:'10%'}}>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="chevron toggleChevron"
                                                                                        onClick={() => toggleCondition(uniqueKey)}
                                                                                        title="Toggle Details"
                                                                                    >
                                                                                        <img
                                                                                            src={
                                                                                                expandedConditions[uniqueKey]
                                                                                                    ? "/images/chevron-up.svg"
                                                                                                    : "/images/chevron-down.svg"
                                                                                            }
                                                                                            alt=""
                                                                                            className="absmiddle"
                                                                                            width="20"
                                                                                            height="20"
                                                                                        />
                                                                                    </button>
                                                                                </td>
                                                                                <td className="desc" style={{width:'80%'}}>{condition.condition}</td>
                                                                                <td className="optional text-success fw-bold" style={{width:'10%'}}>{condition.status}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                        {expandedConditions[uniqueKey] && (
                                                                            <tbody className="expando" style={{display:'table-row-group'}}>
                                                                                <tr>
                                                                                    <td className="fw-bold">Remediation:</td>
                                                                                    <td>{condition.remidiation}</td>
                                                                                    <td className="optional"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        )}
                                                                    </React.Fragment>
                                                                );
                                                            })}

                                                            <tfoot>
                                                                <tr>
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            className="chevron expandAll"
                                                                            onClick={() => toggleAllInCategory(cId)}
                                                                            title="Expand/Collapse All"
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    expandedByCategory[cId]
                                                                                        ? "/images/chevron-up.svg"
                                                                                        : "/images/chevron-down.svg"
                                                                                }
                                                                                alt=""
                                                                                className="absmiddle"
                                                                                width="20"
                                                                                height="20"
                                                                            />
                                                                        </button>
                                                                    </td>
                                                                    <td className="expandAll">
                                                                        {`${expandedByCategory[cId]?"Collapse":"Expand"} all ${item.conditions?.length} issues`}
                                                                    </td>
                                                                    <td className="optional"></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ManaualViewReport;

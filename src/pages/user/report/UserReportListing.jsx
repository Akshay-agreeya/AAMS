import React from "react";
import Layout from '../../../component/Layout';
import blackSiteIcon from '../../../assets/images/blackSiteIcon.svg';
import iconViewInternet from '../../../assets/images/iconViewInternet.svg';
import iconMsWord from '../../../assets/images/iconMsWord.svg';
import iconPDF from '../../../assets/images/iconPDF.svg';
import { useNavigate } from "react-router-dom";


const UserReportListing = () => {

    const navigate = useNavigate();

    const handleClick = (e, item) => {
        e.preventDefault();
      
        navigate("/user/reports/view",{state:{fileName: item}});
    }

    const breadcrumbs = [{ url: "/user/dashboard", label: "Home" },
        { url: "/user/reports", label: "Website Listing" },{ label: "Reports" }
    ];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <div className="adaMainContainer">
                <section className="adminControlContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <h1>Reports - www.aqmd.gov</h1>
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
                                                        <div className="siteName">www.aqmd.gov</div>
                                                    </div>
                                                    <div className="box">
                                                        <div className="changeOptionContainer">
                                                            <div className="lable">Selected Site</div>
                                                            <div className="changeOptionDD">
                                                                <select className="form-select" aria-label="Change your Selected Site">
                                                                    <option selected>Aqmd.gov</option>
                                                                    <option value="1">Agreeya.com</option>
                                                                    <option value="2">Cogent Collection</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="gridContainer">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" width="20%">Report Name</th>
                                                            <th scope="col" width="20%">URL</th>
                                                            <th scope="col" width="14%">Last Scan Date & Time</th>
                                                            <th scope="col" width="10%" className="text-center">Issues Found</th>
                                                            <th scope="col" width="10%" className="text-center">Guidelines</th>
                                                            <th scope="col" width="13%" className="text-center">Accessibility Score</th>
                                                            <th scope="col" width="5%" className="text-center">View</th>
                                                            <th scope="col" width="8%" className="text-center">Download</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[...Array(9)].map((_, index) => (
                                                            <tr key={index}>
                                                                <td scope="row">
                                                                    <a href="#" onClick={(e)=>{handleClick(e, `AQMD Site Assessment Report-${9 - index}`)}}>AQMD Site Assessment Report-{9 - index}</a>
                                                                </td>
                                                                <td>
                                                                    <a href="https://agreeya.com/" target="_blank" rel="noopener noreferrer">
                                                                        https://www.aqmd.gov/
                                                                    </a>
                                                                </td>
                                                                <td>02 Jan 2025 - 20:55:12</td>
                                                                <td className="text-center">500</td>
                                                                <td className="text-center">WCAG 2.2 AA</td>
                                                                <td className="text-center">{(85 - index * 6)}%</td>
                                                                <td className="text-center">
                                                                    <a href="viewAdminReport.html">
                                                                        <img src={iconViewInternet} alt="View Online" />
                                                                    </a>
                                                                </td>
                                                                <td className="text-center">
                                                                    <a href="#" className="me-3">
                                                                        <img src={iconMsWord} alt="Download Document in Microsoft Word" />
                                                                    </a>
                                                                    <a href="#">
                                                                        <img src={iconPDF} alt="Download Document in PDF Format" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="paginationContainer">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination pagination-lg justify-content-center">
                                                        <li className="page-item disabled">
                                                            <a className="page-link" href="#" aria-label="Previous">
                                                                <span aria-hidden="true">&laquo;</span>
                                                            </a>
                                                        </li>
                                                        <li className="page-item active" aria-current="page">
                                                            <a className="page-link" href="#">1</a>
                                                        </li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="#">2</a>
                                                        </li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="#">3</a>
                                                        </li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="#" aria-label="Next">
                                                                <span aria-hidden="true">&raquo;</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
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

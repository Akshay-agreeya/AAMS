import React from 'react';
import Layout from '../../../component/Layout';
import iconSite from '../../../assets/images/iconSite.svg';
import iconDocument from '../../../assets/images/iconDocument.svg';
import iconMoveForward from '../../../assets/images/iconMoveForward.svg';
import iconAccessibility from '../../../assets/images/accessibilityScrore.svg';
import iconLevelA from '../../../assets/images/iconLevelA.svg';
import iconLevelAA from '../../../assets/images/iconLevelAA.svg';
import iconLevelAAA from '../../../assets/images/iconLevelAAA.svg';
import { Errors } from './Errors';
import { Compatibility } from './Compatibility';
import { Standard } from './Standard';
import { Usability } from './Usability';
import { OverAllQuality } from './OverAllQuality';
import { OrganizationSelection } from './OrganizationSelection';
import { ReportSelection } from './ReportSelection';

const UserDashboard = () => {
    return (
        <Layout>
            <div className="adaMainContainer">
                <div className="dashboardTitleContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="dashboardTitleOuter">
                                    <div className="dashboardLeft">
                                        <div className="title">Dashboard</div>
                                        <div className="dashboradTestedSiteContainer">
                                            <div className="siteContainerLogo">
                                                <img src={iconSite} alt="Site Information" />
                                            </div>
                                            <div className="siteInformation">
                                                <span className="siteStatus">Tested Site</span>
                                                <OrganizationSelection />
                                            </div>
                                        </div>
                                        <div className="reportArchiveContainer">
                                            <div className="reportLogo">
                                                <img src={iconDocument} alt="Report Information" />
                                            </div>
                                            <div className="reportArchiveDD">
                                                <ReportSelection/>
                                            </div>


                                        </div>


                                    </div>
                                    <div className="dashboardRight">
                                        <div className="moveBackward">
                                            <a href="addNewSite.html" className="btn btn-light border">Add New Site</a>
                                        </div>
                                        <div className="filetypeContainer">
                                            <div className="dropdown">
                                                <a className="btn custDDViewReport dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Export
                                                </a>

                                                <ul className="dropdown-menu">
                                                    <li className="viewReportFormat"><a className="dropdown-item" href="#">PDF</a></li>
                                                    <li className="viewReportFormat"><a className="dropdown-item" href="#">Word</a></li>
                                                    <li className="viewReportFormat"><a className="dropdown-item" href="#">Excel</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="siteContentContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-9">

                                <section className="accessibilityContainer">
                                    <div className="headingSection">
                                        <h3>Accessibility</h3>
                                        <div className="moveNext">
                                            <a href="viewReport.html"><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-lg-3">
                                            <img src={iconAccessibility} alt="Accessibility Score" className="img-fluid" />
                                        </div>
                                        <div className="col-12 col-lg-9">
                                            <div className="accessibilityErrorScoreContainer">
                                                <div className="score">18203</div>
                                                <div className="message">page with<br /> accessibility problems</div>
                                            </div>
                                            <div className="accessibilityWCAGLevelContainer">
                                                <div className="levelMessage">Level of Conformance and Severity</div>
                                                <div className="wcagLevelRepeat">
                                                    <div className="wcagLevelName"><img src={iconLevelA} alt="Level A" />Level A</div>
                                                    <div className="wcagLevelDesc">Pages with level A issues are unusable for some people</div>
                                                </div>
                                                <div className="wcagLevelRepeat">
                                                    <div className="wcagLevelName"><img src={iconLevelAA} alt="Level AA" />Level AA</div>
                                                    <div className="wcagLevelDesc">Pages with level AA issues are very difficult to use</div>
                                                </div>
                                                <div className="wcagLevelRepeat">
                                                    <div className="wcagLevelName"><img src={iconLevelAAA} alt="Level AAA" />Level AAA</div>
                                                    <div className="wcagLevelDesc">Pages with Level with AAA issues can be difficult to use</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="col-12 col-lg-3">
                                <OverAllQuality />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-3">
                                <Errors />
                            </div>
                            <div className="col-12 col-lg-3">
                                <Compatibility />
                            </div>
                            <div className="col-12 col-lg-3">
                                <Standard />
                            </div>
                            <div className="col-12 col-lg-3">
                                <Usability />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard;
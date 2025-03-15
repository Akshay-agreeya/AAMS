import React from 'react';
import Layout from '../../../component/Layout';
import iconSiteBlack from '../../../assets/images/blackSiteIcon.svg';
import iconMoveRight from '../../../assets/images/iconMoveRight.svg';
import iconSmallAccessibilityNumber from '../../../assets/images/smallAccessibilityNumber.svg';
import Pagenation from '../../../component/Pagenation';

const UserReport = () => {
    return (
        <Layout>
            <div className="adaMainContainer">
                <section className="myReportsGridContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <h1>List of Website Reports</h1>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="reportListingGridContainer">

                                    <div className="reportListingRepeat">
                                        <div className="box">
                                            <div className="siteIcon"><img src={iconSiteBlack} alt="Site logo" /></div>
                                            <div className="siteName">www.aqmd.gov</div>
                                        </div>
                                        <div className="box">
                                            <div className="accessbilityIcon"><img src={iconSmallAccessibilityNumber} alt="Accessibility Score" /></div>
                                            <div className="accessbilityDescription">
                                                <div className="title">Accessibility</div>
                                                <div className="desc">have issues, wrose than average</div>
                                            </div>
                                        </div>
                                        <div className="navigateICon">
                                            <a href="/user/reports/listing"><img src={iconMoveRight} alt="Click here to view Report" /></a>
                                        </div>
                                    </div>
                                    <div className="reportListingRepeat">
                                        <div className="box">
                                            <div className="siteIcon"><img src={iconSiteBlack} alt="Site logo" /></div>
                                            <div className="siteName">www.scqamd.gov</div>
                                        </div>
                                        <div className="box">
                                            <div className="accessbilityIcon"><img src={iconSmallAccessibilityNumber} alt="Accessibility Score" /></div>
                                            <div className="accessbilityDescription">
                                                <div className="title">Accessibility</div>
                                                <div className="desc">have issues, wrose than average</div>
                                            </div>
                                        </div>
                                        <div className="navigateICon">
                                            <a href="/user/reports/listing"><img src={iconMoveRight} alt="Click here to view Report" /></a>
                                        </div>
                                    </div>
                                    <div className="reportListingRepeat">
                                        <div className="box">
                                            <div className="siteIcon"><img src={iconSiteBlack} alt="Site logo" /></div>
                                            <div className="siteName">www.agreeya.com</div>
                                        </div>
                                        <div className="box">
                                            <div className="accessbilityIcon"><img src={iconSmallAccessibilityNumber} alt="Accessibility Score" /></div>
                                            <div className="accessbilityDescription">
                                                <div className="title">Accessibility</div>
                                                <div className="desc">have issues, wrose than average</div>
                                            </div>
                                        </div>
                                        <div className="navigateICon">
                                            <a href="/user/reports/listing"><img src={iconMoveRight} alt="Click here to view Report" /></a>
                                        </div>
                                    </div>
                                    <div className="reportListingRepeat">
                                        <div className="box">
                                            <div className="siteIcon"><img src={iconSiteBlack} alt="Site logo" /></div>
                                            <div className="siteName">www.recoverymanager.staging.agreeya.com</div>
                                        </div>
                                        <div className="box">
                                            <div className="accessbilityIcon"><img src={iconSmallAccessibilityNumber} alt="Accessibility Score" /></div>
                                            <div className="accessbilityDescription">
                                                <div className="title">Accessibility</div>
                                                <div className="desc">have issues, wrose than average</div>
                                            </div>
                                        </div>
                                        <div className="navigateICon">
                                            <a href="/user/reports/listing"><img src={iconMoveRight} alt="Click here to view Report" /></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <Pagenation/>
                            </div>
                        </div>
                    </div>


                </section>

            </div>
        </Layout>
    )
}

export default UserReport
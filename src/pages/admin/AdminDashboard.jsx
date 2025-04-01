import React, { useState } from 'react';
import Layout from '../../component/Layout';
import dashboardGraph2 from '../../assets/images/dashboardGraph2.png';
import UserBox from '../../component/dashboard/UserBox';
import ReportBox from '../../component/dashboard/ReportBox';
import ProductGraph from '../../component/dashboard/ProductGraph';
import RecentActivities from '../../component/dashboard/RecentActivities';
import OrganizationDashboard from '../../component/dashboard/OrganizationDashboard';
import ExpiringClientServices from '../../component/dashboard/ExpiringClientServices';

import iconOrg from '../../assets/images/iconOrg.svg';
import iconRole from '../../assets/images/iconRole.svg';
import iconUser from '../../assets/images/iconUser.svg';
import useFetch from '../../hooks/useFetch';
import iconSite from '../../assets/images/iconSite.svg';
import { USER_MGMT } from '../../utils/Constants';
import { getAllowedOperations, getDashboardItem, getOrganizationIdFromSession } from '../../utils/Helper';
import { OrganizationSelection } from '../user/dashboard/OrganizationSelection';
import { AccessibilityDashboard } from '../user/dashboard/AccessibilityDashboard';
import AccessibilityErrorScore from '../user/dashboard/AccessibilityErrorScore';
import iconLevelA from '../../assets/images/iconLevelA.svg';
import iconLevelAA from '../../assets/images/iconLevelAA.svg';
import iconLevelAAA from '../../assets/images/iconLevelAAA.svg';
import UserTableDashboard from '../../component/dashboard/UserTableDashboard';
import ScanDashboard from '../../component/dashboard/ScanDashboard';


const AdminDashboard = () => {

    const org_id = getOrganizationIdFromSession();

    const [product, setProduct] = useState({});

    const { response = {} } = useFetch(`/dashboard/org-user-count/${org_id}`);

    
    return (
        <Layout>
            <div className="adaMainContainer">

                <div className="dashboardControlContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <div className="dashLeft">
                                        <h1>Dashboard</h1>
                                        <div className="dashboradTestedSiteContainer">
                                            <div className="siteContainerLogo">
                                                <img src={iconSite} alt="Site Information" />
                                            </div>
                                            <div className="siteInformation">
                                                <span className="siteStatus">Tested Site</span>
                                                <OrganizationSelection onChange={(product) => { setProduct(product) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonContainer">
                                        <a href={`/admin/user-management/adduser/${org_id}`} className="add"> <i className="fa-solid fa-plus"></i> Add User</a>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <section className="dashBoxContainerOuter">
                            <div className="row">

                                <div className="col-12 col-lg-3">
                                    <UserBox counts={response.total_users || 0} icon={iconOrg} title="Total Users"
                                        boxType='box-1' />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <UserBox counts={response.active_users || 0} icon={iconRole}
                                        title="Active Users" boxType='box-2' />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <UserBox counts={response.inactive_users} icon={iconUser} title="Inactive Users" />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <ReportBox counts={response.total_reports} />
                                </div>
                            </div>
                        </section>
                        <section className="dashGraphActivity">
                            <div className="row">
                                <div className="col-12 col-lg-9">
                                    <div className="dashGraphicContainer">
                                        <div className="headingSection">
                                            <h3>Accessibility</h3>
                                            <div className="moveNext">

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4">
                                                <AccessibilityDashboard summary={product} />
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <AccessibilityErrorScore summary={product} />
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
                                    </div>
                                </div>

                                <div className="col-12 col-lg-3">
                                    <RecentActivities org_id={org_id} />
                                </div>
                            </div>
                        </section>

                        <section className="orgDetailsExpireServiceContainer">
                            <div className="row">
                                <div className="col-12 col-lg-9">
                                    <UserTableDashboard org_id={org_id}/>
                                </div>

                                <div className="col-12 col-lg-3">
                                    <ScanDashboard product_id={product?.service_id}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../component/Layout';
import dashboardGraph2 from '../assets/images/dashboardGraph2.png';
import iconMoveForward from '../assets/images/iconMoveForward.svg';
import RoleBox from '../component/dashboard/RoleBox';
import UserBox from '../component/dashboard/UserBox';
import OrganizationBox from '../component/dashboard/OrganizationBox';
import ReportBox from '../component/dashboard/ReportBox';
import ProductGraph from '../component/dashboard/ProductGraph';
import RecentActivities from '../component/dashboard/RecentActivities';
import OrganizationDashboard from '../component/dashboard/OrganizationDashboard';
import { getData } from '../utils/CommonApi';
import ExpiringClientServices from '../component/dashboard/ExpiringClientServices';

const Dashboard = () => {
    const [countsData, setCountsData] = useState({});

    const getCountsData = useCallback(async () => {
        try {
            const resp = await getData(`/dashboard/count`);
            setCountsData(resp);
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getCountsData();
    }, [getCountsData]);

    return (
        <Layout>
            <div className="adaMainContainer">
                <div className="dashboardControlContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <h1>Dashboard</h1>
                                    <div className="buttonContainer">
                                        <a href="/admin/user-management/addorg" className="add"> <i className="fa-solid fa-plus"></i> Add Organization</a>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <section className="dashBoxContainerOuter">
                            <div className="row">
                                <div className="col-12 col-lg-3">
                                    <OrganizationBox counts={countsData.OrgCount} />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <RoleBox counts={countsData.RoleCount} />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <UserBox counts={countsData.UserCount} />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <ReportBox counts={countsData.ReportCount} />
                                </div>
                            </div>
                        </section>
                        <section className="dashGraphActivity">
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <ProductGraph />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <div className="dashGraphicContainerWhite">
                                        <div className="heading">Total Product Compliance</div>
                                        <div className="graphOuter">
                                            <img src={dashboardGraph2} alt="Highly Utilized Service" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <RecentActivities />
                                </div>
                            </div>
                        </section>

                        <section className="orgDetailsExpireServiceContainer">
                            <div className="row">
                                <div className="col-12 col-lg-9">
                                    <OrganizationDashboard />
                                </div>

                                <div className="col-12 col-lg-3">
                                    <div className="dashGraphicContainerWhite">
                                        <div className="heading">Expiring Client Services</div>
                                        <div className="activityGrid">
                                            <ExpiringClientServices/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;
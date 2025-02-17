import React from 'react';
import AdminLogo from "../assets/images/adminDashboard.png";
import Layout from '../component/Layout';

const Dashboard = () => {
    const breadcrumbs = [{ url: "admin/dashboard", label: "Home" },
        {label:"Dashboard"}
    ];
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <section className="adminControlContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <img src={AdminLogo} className="w-100" alt="Dashboard" />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Dashboard;
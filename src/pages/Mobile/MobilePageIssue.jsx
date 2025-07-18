import React from "react";
import Layout from "../../component/Layout";
import Table from "../../component/table/Table";
import { Select } from "../../component/input/Select";
import { useState } from "react";


const columns = [
  {
    title: "Impact",
    dataIndex: "impact",
    key: "impact",
    render: (text) => {
      let badgeClass = "py-1 px-2 rounded ";
      if (text === "Critical") badgeClass += "bg-danger-subtle text-danger-emphasis";
      else if (text === "Serious") badgeClass += "bg-warning-subtle text-warning-emphasis";
      else if (text === "Moderate") badgeClass += "bg-info-subtle text-info-emphasis";
      else badgeClass += "bg-secondary-subtle text-secondary-emphasis";
      return <span className={badgeClass}>{text}</span>;
    },
  },
  {
    title: "Rule",
    dataIndex: "rule",
    key: "rule",
    render: (text) => <a href="/product-management/mobilehome/mobilepageissue/mobileissuedetail">{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Total Issues",
    dataIndex: "total",
    key: "total",
  },
];

const dataSource = [
  { impact: "Critical", rule: "ActiveViewName", status: "Failed", total: 3 },
  { impact: "Serious", rule: "ImageViewName", status: "Failed", total: 3 },
  { impact: "Moderate", rule: "EditTextName", status: "Failed", total: 3 },
  { impact: "Critical", rule: "TouchTargetSpacing", status: "Failed", total: 3 },
];

const statusOptions = [
  { value: "failed", label: "Failed (10)" },
  { value: "pass", label: "Pass (10)" },
];

const MobilePageIssue = () => {
  const [status, setStatus] = useState("failed");
  return (
    <div className="adaMainContainer">
    <Layout>
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>Mobile Accessiblity - CEMA</h1>
              </div>
            </div>

            <div className="col-lg-9 col-md-8 col-12 ">
              <div className="roleManagmentContainer">
                <form>
                  <div className="formContainer">
                    <div className="row">
                      <div className="col-12 col-md-4 mb-3">
                        <div className="userStaticInfo">
                          <div className="title">Page Name</div>
                          <div className="value">Home</div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 mb-3">
                        <div className="userStaticInfo">
                          <div className="title">Accessibility Score</div>
                          <div className="value">90%</div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 mb-3">
                        <div className="userStaticInfo">
                          <div className="title">Device</div>
                          <div className="value">Samsung SM-N950U1</div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 mb-3">
                        <div className="userStaticInfo">
                          <div className="title">Found</div>
                          <div className="value">1 Week Ago</div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="userStaticInfo">
                          <div className="title">Issue Status</div>
                          <div className="value">
                            <Select
  className="form-select form-select-sm fw-bold"
  options={statusOptions}
  value={status}
  onChange={e => setStatus(e.target.value)}
  aria-label="Small select example"
/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <Table
                      columns={columns}
                      dataSource={dataSource}
                      showHeader={true}
                      pagenation={false}
                    />
                  </div>
                </form>
              </div>
              <div className="mt-md-3 my-3 order-md-2">
                <button className="btn btn-sm btn-blue btn-primary" type="button" onClick={() => window.history.back()}>
                  <i className="bi bi-arrow-left"></i> Back
                </button>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-12">
              <h2>Home Page ScreenShot</h2>
              <div className="card">
                <div className="card-body">
                  {/* Replace src with imported image if available */}
                  <img src={require("../../assets/images/mobileScreenDemo.png")} className="img-fluid border" alt="Mobile Screenshot" style={{ objectFit: "contain" }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Custom styles for btn-blue if needed */}
      <style>{`.btn-blue { background-color: #06c; border-color: #06c; }`}</style>
    </Layout>
    </div>
  );
};

export default MobilePageIssue;

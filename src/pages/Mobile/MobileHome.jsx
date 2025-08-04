import { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import Table from "../../component/table/Table";
import notification from "../../component/notification/Notification";
import { getData } from "../../utils/CommonApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPagenationFromResponse } from "../../utils/Helper";
import { TABLE_RECORD_SIZE } from "../../utils/Constants";
// import androidIcon from "../../assets/images/android.svg";

const MobileHome = () => {

  // Table data and loading state
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [filter, setFilter] = useState({ os: "All", user: "", app: "" });
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10, totalCounts: 0 });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get("id");
  const org_id = queryParams.get("org_id");
  const { summary_report_id } = useParams();

  const navigate = useNavigate();

  const breadcrumbs = [
    { url: `/dashboard`, label: "Home" },
    { url: `/reports`, label: "Website Listing" },
    { label: "Reports", url: `/reports/listing/${org_id}?id=${product_id}` },
    { label: "Mobile Summary Report" },
  ];

  useEffect(() => {
    if (summary_report_id) {
      fetchSummaryReport();
    }
  }, [summary_report_id]);

  const fetchSummaryReport = async (page=1) => {
    try {
      setLoading(true);
      const res = await getData(`/report/get/mobile-screen-report/${summary_report_id}?page=${page}&size=${TABLE_RECORD_SIZE}`);
      setDataSource(res.contents);
      setPagination(getPagenationFromResponse(res));
    } catch (err) {
      console.error("Failed to fetch summary report:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Mobile Screen Name',
      dataIndex: 'mobile_scan_name',
      key: 'mobile_scan_name',
      render: (text,record) => (
        <a href={`#`} rel="noopener noreferrer" 
        onClick={(e)=>{e.preventDefault();
          navigate(`/reports/listing/mobile/summaryreport/issues/${record.mobile_screen_report_id}`,{
            state: {
              org_id,
              product_id,
              summary_report_id,
              screen_name: record.mobile_scan_name,
              screen_score: record.screen_score,
              total_issues: record.total_issues
            }
          })
        }}>{text}</a>
      )
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Screen Score',
      dataIndex: 'screen_score',
      key: 'screen_score',
    },
    // {
    //   title: 'Created',
    //   dataIndex: 'created',
    //   key: 'created',
    // },
    {
      title: 'Count',
      dataIndex: 'total_issues',
      key: 'total_issues',
    }
  ];

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilter({ ...filter, [id]: value });
  };

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="adaMainContainer">

        {/* Main Content */}
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Mobile Accessiblity - CEMA</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="roleManagmentContainer">
                  <div className="col-12">
                    {/* <div className="d-flex align-items-center justify-content-between mb-2">
                      <p className="mb-0 font-14">247 Total Scans</p>
                      <button type="button" className="btn btn-sm btn-primary filtetBtn" onClick={() => setShowFilterModal(true)}>
                        <i className="bi bi-funnel-fill"></i>
                      </button>
                    </div> */}
                    <Table
                      columns={columns}
                      dataSource={dataSource}
                      loading={loading}
                      rowKey="id"
                      pagenation={{...pagination, onChange: fetchSummaryReport}}
                    />
                  </div>
                  {/* Pagination */}
                  {/* <div className="col-12 mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-secondary font-14 mb-0">Showing <span className="fw-bold text-dark">{`${((pagination.pageNumber - 1) * pagination.pageSize) + 1}-${((pagination.pageNumber - 1) * pagination.pageSize) + pagination.pageSize}`}</span> of <span className="fw-bold text-dark">{pagination.totalCounts}</span> items</p>
                      </div>
                      <div className="paginationContainer mt-0">
                        <nav aria-label="Page navigation">
                          <ul className="pagination pagination justify-content-end">
                            <li className="page-item disabled">
                              <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            {[...Array(pagination.totalPages)].map(page => <li className="page-item active" aria-current="page"><a className="page-link" href="#">{page}</a></li>)}
                            <li className="page-item">
                              <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div> */}
                  {/* Filter Modal */}
                  {showFilterModal && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="filterModalLabel" aria-modal="true" role="dialog">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1>Filter Scan</h1>
                            <button type="button" className="btn-close" onClick={() => setShowFilterModal(false)} aria-label="Close"></button>
                          </div>
                          <div className="modal-body px-5">
                            <div className="row gx-2 pb-3 mb-3 border-bottom align-items-center">
                              <label htmlFor="os" className="form-label col-4">Operating System</label>
                              <div className="col-8">
                                <select className="form-select" id="os" value={filter.os} onChange={handleFilterChange}>
                                  <option>All</option>
                                  <option value="1">Windows</option>
                                  <option value="2">IOS</option>
                                </select>
                              </div>
                            </div>
                            <div className="row gx-2 pb-3 mb-3 border-bottom align-items-center">
                              <label htmlFor="user" className="form-label col-4">User</label>
                              <div className="col-8">
                                <input type="text" className="form-control" id="user" value={filter.user} onChange={handleFilterChange} />
                              </div>
                            </div>
                            <div className="row gx-2 pb-3 mb-3 border-bottom align-items-center">
                              <label htmlFor="app" className="form-label col-4">App</label>
                              <div className="col-8">
                                <input type="text" className="form-control" id="app" value={filter.app} onChange={handleFilterChange} />
                              </div>
                            </div>
                            <div className="row gx-2 align-items-center">
                              <label htmlFor="tags" className="form-label col-4">Tags</label>
                              <div className="col-5">
                                <input type="text" className="form-control" id="tags" value={tagInput} onChange={e => setTagInput(e.target.value)} />
                              </div>
                              <div className="col-3">
                                <button className="btn font-14 btn-info btn-blue w-100 text-light">Add Tag</button>
                              </div>
                              <div className="col-12 mt-2 text-end">
                                <div className="tag-container justify-content-end">
                                  {tags.map((tag, i) => (
                                    <div className="tag" key={tag}>
                                      {tag} <span className="close-btn" onClick={() => { }}>×</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowFilterModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-primary btn-navy">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}

      </div>
      {/* Custom styles for tags and modal overlay */}
      <style>{`
        .filtetBtn { background-color: #003d68; border-color: #003d68; }
        .font-14 { font-size: 0.875rem; }
        #filterModal label { font-size: 0.875rem; font-weight: 500; }
        #filterModal input, #filterModal select { border: 1px solid #ccc; box-shadow: 0px 0px 1px 0 rgb(0 0 0 / 60%); }
        .btn-navy { background-color: #003d68; border-color: #003d68; }
        .btn-blue { background-color: #06c; border-color: #06c; }
        .tag-container { display: flex; flex-wrap: wrap; gap: 4px; }
        .tag { display: flex; align-items: center; background-color: #e6eeff; color: #3a63b7; padding: 3px 10px; border-radius: 999px; font-family: Arial, sans-serif; font-size: 0.75rem; border: 1px solid #c2d4f5; cursor: default; transition: background-color 0.3s; }
        .close-btn { margin-left: 8px; cursor: pointer; font-weight: bold; color: #6a91e3; transition: color 0.2s; }
        .close-btn:hover { color: #3a63b7; }
        .modal-backdrop.show { opacity: 0.5; }
      `}</style>
    </Layout>
  );
};

export default MobileHome;

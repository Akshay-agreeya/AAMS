import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../component/Layout";
import benchWorseIcon from "../../assets/images/bench-worse.svg";
import { getData } from "../../utils/CommonApi";
import { extractPercentage } from "../../utils/Helper"; 


const Summary = () => {
  const { assessment_id } = useParams();
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    if (assessment_id) {
      getData(`/dashboard/summary-report/${assessment_id}`)
        .then((res) => {
          if (res.success && Array.isArray(res.contents)) {
            setSummaryData(res.contents);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch summary report:", err);
        });
    }
  }, [assessment_id]);

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Summary</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="summaryGrid">
                  <table>
                    <tbody>
                      <tr>
                        <th width="20%">Category</th>
                        <th width="20%">Issues</th>
                        <th width="30%">Pages</th>
                        <th width="30%">Benchmark</th>
                      </tr>
                      {summaryData.map((item) => (
                        <tr key={item.summary_detail_report_id}>
                          <td>{item.category === "Accessibility" ? <a href={`/reports/listing/viewreport/${assessment_id}`}>{item.category}</a> : item.category}</td>
                          <td>
  {(() => {
    const { critical, nonCritical } = extractPercentage(item.issues);
    return (
      <>
        <div className="progress-container">
          <div
            className="progress-part part1"
            style={{ width: `${critical}%` }}
          ></div>
          <div
            className="progress-part part2"
            style={{ width: `${nonCritical}%` }}
          ></div>
        </div>
        <div>{item.issues}</div>
      </>
    );
  })()}
</td>

                          <td>{item.pages}</td>
                          <td className="optional">
                            {item.benchmark && (
                              <>
                                <img
                                  src={benchWorseIcon}
                                  width="20"
                                  height="20"
                                  alt=""
                                  className="top"
                                />
                                {" "}
                                {item.benchmark}
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Summary;

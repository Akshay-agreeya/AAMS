import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData, deleteData } from "../../utils/CommonApi";
import Loading from "../../component/Loading";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images/iconDelete.svg";
import notification from "../../component/notification/Notification";
import { formattedDate } from "../../component/input/DatePicker";

const ThirdPartyReportTable = ({ org_id }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (org_id) fetchReports();
  }, [org_id]);

 
  const fetchReports = async () => {
  try {
    setLoading(true);

    // TEMP: hardcoded or stored assessment_id
    const assessmentId = 34;

    const resp = await getData(
      `/assessment/${assessmentId}/report-metadata`
    );

    setReports(resp?.data ? [resp.data] : []);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (assessment_id) => {
    try {
      await deleteData(`/assessment/${assessment_id}`);
      notification.success({
        title: "Report Deleted",
        message: "Excel report deleted successfully"
      });
      fetchReports();
    } catch (err) {
      notification.error({
        title: "Delete Failed",
        message: "Unable to delete report"
      });
    }
  };

  const columns = [
    {
      title: "Report Name",
      dataIndex: "prepared_for",
      width: "50%"
    },
    {
      title: "Created Time",
      dataIndex: "report_date",
      width: "30%",
      render: (text) =>
        text ? formattedDate(new Date(text), "DD MMM YYYY HH:mm") : "—"
    },
    {
      title: "Action",
      width: "20%",
      className: "text-center",
      render: (_, record) => (
        <>
          <a
            href={`/reports/excel/${record.assessment_id}`}
            title="Edit Report"
            className="me-3"
          >
            <img src={editicon} alt="Edit" />
          </a>

          <a
            href="#"
            title="Delete Report"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record.assessment_id);
            }}
          >
            <img src={deleteicon} alt="Delete" />
          </a>
        </>
      )
    }
  ];

  if (loading) return <Loading />;

  if (!reports.length)
    return <div className="text-muted mt-3">No third-party reports found</div>;

  return (
    <div className="mt-4">
      <h5 className="mb-3">Third-Party (Excel) Reports</h5>
      <Table
        columns={columns}
        dataSource={reports}
        rowKey="assessment_id"
      />
    </div>
  );
};

export default ThirdPartyReportTable;

import React, { useEffect, useState } from "react";
import Table from "../../component/table/Table";
import { getData, deleteData } from "../../utils/CommonApi";
import Loading from "../../component/Loading";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images/iconDelete.svg";
import notification from "../../component/notification/Notification";
import { getFormattedDateWithTime } from "../../component/input/DatePicker"; // ✅ CHANGED: Import the correct function

const ThirdPartyReportTable = ({ org_id }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (org_id) fetchReports();
  }, [org_id]);

  const fetchReports = async () => {
    try {
      setLoading(true);

      // Use the new API endpoint to get all assessments for this org
      const resp = await getData(`/accessibility/org/${org_id}/assessments`);

      // The API returns an array of assessments
      setReports(resp?.data || []);

    } catch (err) {
      console.error(err);
      // If no assessments found, show empty state
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (assessment_id) => {
    try {
      await deleteData(`/accessibility/assessment/${assessment_id}`);
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
      width: "50%",
      render: (text) => text || "Unnamed Report"
    },
    {
      title: "Uploaded Date & Time",
      dataIndex: "assessment_timestamp",
      width: "30%",
      render: (text) => {
        if (!text) return "—";
        
        try {
          const date = new Date(text);
          // ✅ CHANGED: Use getFormattedDateWithTime with the correct format
          return getFormattedDateWithTime(date, "dd MMM yyyy HH:mm");
        } catch (err) {
          console.error("Date formatting error:", err);
          return "—";
        }
      }
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
      <h5 className="mb-3">Agreeya Reports</h5>
      <Table
        columns={columns}
        dataSource={reports}
        rowKey="assessment_id"
      />
    </div>
  );
};

export default ThirdPartyReportTable;




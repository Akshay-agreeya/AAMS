import React, { useState } from "react";
import axios from "axios";

const UploadExcel = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:8090/api/excel/upload-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Excel uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        style={{
          marginLeft: "10px",
          padding: "8px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleUpload}
      >
        Upload Excel
      </button>
    </div>
  );
};

export default UploadExcel;

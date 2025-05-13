import React from "react";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import { API_BASE_URL } from "../../utils/Constants";

const DownloadDocx = ({ record = {}, titleText, className = "me-3" }) => {


  const generateDocx = async () => {

    try {
      window.open(`${API_BASE_URL}/misc/download-docx/${record.assessment_id}`);
      return true;
    } catch (err) {
      console.error("Error downloading DOCX report:", err);
      return false;
    }
  }

  return (
    <a href="#" className={className} onClick={(e) => { e.preventDefault(); generateDocx(); }}>
      {titleText ? titleText : <img src={iconMsWord} alt="Download Document in Microsoft Word" />}
    </a>
  );
};

export default DownloadDocx;

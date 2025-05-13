import React from "react";
import iconPDF from "../../assets/images/iconPDF.svg";
import { API_BASE_URL } from "../../utils/Constants";

const DownloadPDF = ({ record = {}, product_id }) => {
  

    return (
        <a href={`${API_BASE_URL}/misc/download-docx/${record.assessment_id}`}>
            <img src={iconPDF} alt="Download Document in PDF Format" />
        </a>
    );
};

export default DownloadPDF;

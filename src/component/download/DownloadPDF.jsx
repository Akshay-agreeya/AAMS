import React from "react";
import iconPDF from "../../assets/images/iconPDF.svg";
import { API_BASE_URL } from "../../utils/Constants";

const DownloadPDF = ({ record = {}, titleText, className = "me-3" }) => {
  return (
    <a 
      href={`${API_BASE_URL}/misc/download-pdf/${record.assessment_id}`} 
      className={className}
    >
      {titleText ? titleText : (
        <img src={iconPDF} alt="Download Document in PDF Format" />
      )}
    </a>
  );
};

export default DownloadPDF;





// // import React from "react";
// // import iconPDF from "../../assets/images/iconPDF.svg";
// // import { API_BASE_URL } from "../../utils/Constants";

// // const DownloadPDF = ({ record = {}, product_id }) => {
  

// //     return (
// //         <a href={`${API_BASE_URL}/misc/download-docx/${record.assessment_id}`}>
// //             <img src={iconPDF} alt="Download Document in PDF Format" />
// //         </a>
// //     );
// // };

// // export default DownloadPDF;



// import React from "react";
// import iconPDF from "../../assets/images/iconPDF.svg";
// import { API_BASE_URL } from "../../utils/Constants";

// const DownloadPDF = ({ record = {}, titleText, className = "me-3" }) => {
//   const generatePDF = async () => {
//     try {
//       window.open(`${API_BASE_URL}/misc/download-pdf/${record.assessment_id}`);
//       return true;
//     } catch (err) {
//       console.error("Error downloading PDF report:", err);
//       return false;
//     }
//   }

//   return (
//     <a 
//       href="#" 
//       className={className} 
//       onClick={(e) => { 
//         e.preventDefault(); 
//         generatePDF(); 
//       }}
//     >
//       {titleText ? titleText : <img src={iconPDF} alt="Download Document in PDF Format" />}
//     </a>
//   );
// };

// export default DownloadPDF;

import React, { useEffect, useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import { saveAs } from "file-saver";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import { getData } from "../../utils/CommonApi";
import { formattedDate, getFormattedDateWithTime } from "../input/DatePicker";

const DownloadDocx = ({ record = {}, product_id }) => {
  
  const [base64Image, setBase64Image] = useState("");
  const [product, setProduct] = useState({});

  useEffect(() => {
    const convertImageToBase64 = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    };

    convertImageToBase64("/logo192.png"); // or your custom image
  }, []);


  useEffect(() => {
    if (product_id)
      getProductInfo();

  }, [product_id]);


  const getProductInfo = async () => {
    try {
      const resp = await getData(`/product/view/${product_id}`);
      const productData = resp || {};
      setProduct(productData);

    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const generateDocx = async () => {
    try {
      const templateRes = await fetch("/templatedocx.docx"); // place it in `public/` folder
      const templateBlob = await templateRes.blob();
      const arrayBuffer = await templateBlob.arrayBuffer();
      const zip = new PizZip(arrayBuffer);

      const imageModule = new ImageModule({
        centered: false,
        getImage: (tagValue) => {
          const base64 = tagValue.split(",")[1];
          return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
        },
        getSize: () => [200, 100], // Width, Height
      });

      const doc = new Docxtemplater(zip, {
        modules: [imageModule],
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({
        org_name: product.organization_name,
        project_manager: product.contact_person_name,
        product_name: product.web_url,
        access_tester: "NA",
        testing_device: 'System',
        test_environment: "Win11/Chrome/Edge/Mozilla",
        wcag_standard: product.compliance_level,
        start_date: record.scan_date?getFormattedDateWithTime(new Date(record.scan_date),"MMM dd, yyyy"):"NA",
        end_date: record.scan_date?getFormattedDateWithTime(new Date(record.scan_date),"MMM dd, yyyy"):"NA"
      });

      doc.render();
      const out = doc.getZip().generate({ type: "blob" });
      saveAs(out, "generated-document.docx");
    } catch (err) {
      console.error("Docx generation failed:", err);
    }
  };

  return (
    <a href="#" className="me-3" onClick={(e) => { e.preventDefault(); generateDocx(); }}>
      <img src={iconMsWord} alt="Download Document in Microsoft Word" />
    </a>
  );
};

export default DownloadDocx;

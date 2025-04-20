import React, { useEffect, useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import { getData } from "../../utils/CommonApi";
import { replaceLinks } from "../../utils/Helper";
import { getFormattedDateWithTime } from "../input/DatePicker";

const DownloadDocx = ({ record = {}, product_id }) => {

  const [product, setProduct] = useState({});



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


  // const generateDocx = async () => {
  //   try {
  //     const templateRes = await fetch("/templatedocx2.docx"); // place it in `public/` folder
  //     const templateBlob = await templateRes.blob();
  //     const arrayBuffer = await templateBlob.arrayBuffer();
  //     const zip = new PizZip(arrayBuffer);



  //     const doc = new Docxtemplater(zip, {
  //       paragraphLoop: true,
  //       linebreaks: true,
  //     });

  //     const data =
  //     {
  //       org_name: 'product.organization_name',
  //       project_manager: product.contact_person_name,
  //       product_name: product.web_url,
  //       web_url: product.web_url,
  //       access_tester: "NA",
  //       testing_device: 'System',
  //       test_environment: "Win11/Chrome/Edge/Mozilla",
  //       wcag_standard: product.compliance_level,
  //       wcag: product.guideline,
  //       level: product.compliance_level,
  //       start_date: record.scan_date ? getFormattedDateWithTime(new Date(record.scan_date), "MMM dd, yyyy") : "NA",
  //       end_date: record.scan_date ? getFormattedDateWithTime(new Date(record.scan_date), "MMM dd, yyyy") : "NA",
  //       issues: [
  //         {
  //           "criteria": "A figure with a figcaption must not have a role attribute.",
  //           "description": "Remove the role attribute.",
  //           "remediation": "Remove the role attribute.",
  //           "level": "A",
  //           "guideline": "HTML5 / ARIA 1.2",
  //           pages: [
  //             {
  //               link: {
  //                 url: "https://kingcounty.gov/en/legacy/services/environment/climate/our-changing-climate/impacts",
  //                 text: "https://kingcounty.gov/en/legacy/services/environment/climate/our-changing-climate/impacts"
  //               },
  //               "description": "",
  //               "lines": "585, 618"
  //             }
  //           ]
  //         },
  //       ]

  //     }
  //     doc.render(data);
  //     replaceLinks(doc, data);
  //     const out = doc.getZip().generate({ type: "blob" });
  //     saveAs(out, "generated-document.docx");
  //   } catch (err) {
  //     if (err.properties && err.properties.errors instanceof Array) {
  //       console.error("Docx Template Errors:");
  //       err.properties.errors.forEach((e, i) => {
  //         console.error(`[${i + 1}]`, e.properties.explanation, "\nTag:", e.properties.tag);
  //       });
  //     }
  //     console.error("Docx generation failed:", err);
  //   }
  // };

  

/**
 * Main function to generate DOCX with correctly handled links
 */
const generateDocx = async () => {
  try {
    // Fetch template
    const templateRes = await fetch("/templatedocx2.docx");
    const templateBlob = await templateRes.blob();
    const arrayBuffer = await templateBlob.arrayBuffer();
    const zip = new PizZip(arrayBuffer);

    // Create Docxtemplater instance
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });


    // IMPORTANT: For the template, we need to handle the link placeholder differently
    // We use an empty string for {link} as we'll replace it with hyperlinks after rendering
    const data = {
      org_name: product.organization_name,
      project_manager: product.contact_person_name,
      product_name: product.web_url,
      web_url: product.web_url,
      access_tester: "NA",
      testing_device: 'System',
      test_environment: "Win11/Chrome/Edge/Mozilla",
      wcag_standard: product.compliance_level,
      wcag: product.guideline,
      level: product.compliance_level,
      start_date: record.scan_date ? getFormattedDateWithTime(new Date(record.scan_date), "MMM dd, yyyy") : "NA",
      end_date: record.scan_date ? getFormattedDateWithTime(new Date(record.scan_date), "MMM dd, yyyy") : "NA",
      issues: [
        {
          "criteria": "A figure with a figcaption must not have a role attribute.",
          "description": "Remove the role attribute.",
          "remediation": "Remove the role attribute.",
          "level": "A",
          "guideline": "HTML5 / ARIA 1.2",
          "failed": "3 pages",
          pages: [
            {
              // Here we set link as an empty string placeholder
              link: "{link}",
              // But keep the link object for our custom replacement function
              linkObj: {
                url: "https://kingcounty.gov/en/legacy/services/environment/climate/our-changing-climate/impacts",
                text: "https://kingcounty.gov/en/legacy/services/environment/climate/our-changing-climate/impacts"
              },
              "description": "Figure with figcaption has role attribute",
              "lines": "585, 618"
            }
          ]
        }
      ]
    };

    // First, render the template with placeholders
    doc.render(data);
    
    // Then, prepare data for link replacement
    // We need to transform our data to match the expected format for replaceLinks
    const linkReplacementData = {
      issues: data.issues.map(issue => ({
        ...issue,
        pages: issue.pages.map(page => ({
          ...page,
          link: page.linkObj // Use the linkObj we set above
        }))
      }))
    };
    
    // Now replace {link} placeholders with actual hyperlinks
    replaceLinks(doc, linkReplacementData);
    
    // Generate output
    const out = doc.getZip().generate({ type: "blob" });
    saveAs(out, "accessibility-report.docx");
    
    return true;
  } catch (err) {
    console.error("Docx generation failed:", err);
    if (err.properties && err.properties.errors instanceof Array) {
      console.error("Template errors:", err.properties.errors);
    }
    return false;
  }
}

  return (
    <a href="#" className="me-3" onClick={(e) => { e.preventDefault(); generateDocx(); }}>
      <img src={iconMsWord} alt="Download Document in Microsoft Word" />
    </a>
  );
};

export default DownloadDocx;

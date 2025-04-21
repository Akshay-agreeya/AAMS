import React, { useEffect, useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import iconMsWord from "../../assets/images/iconMsWord.svg";
import { getData } from "../../utils/CommonApi";
import { replaceLinks } from "../../utils/Helper";
import { getFormattedDateWithTime } from "../input/DatePicker";

const DownloadDocx = ({ record = {} }) => {

  const [reportData, setReportData] = useState({});


  useEffect(() => {
    getReportData();
  }, [record.assessment_id]);

  const getReportData = async () => {
    try {
      debugger
      const response = await getData(`report/get/category-data/${record.assessment_id}`);
      const summaryResp = await getData(`/dashboard/summary-report/${record?.assessment_id}`);
      setReportData({ ...response, summary: summaryResp.contents, accessibility_score: summaryResp.accessibility_score });
    }
    catch (error) {
      console.log(error);
    }
  }

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
        org_name: reportData.accessibilityInfo?.org_name,
        project_manager: 'NA',
        product_name: reportData.accessibilityInfo?.web_url || '',
        web_url: reportData.accessibilityInfo?.web_url || '',
        access_tester: "NA",
        testing_device: 'System',
        test_environment: "NA",
        wcag_standard: reportData.accessibilityInfo?.level,
        wcag: reportData.accessibilityInfo?.guideline,
        level: reportData.accessibilityInfo?.level,
        start_date: record.scan_date ? getFormattedDateWithTime(new Date(record.scan_date), "MMM dd, yyyy") : "NA",
        end_date: "NA",
        issues: reportData?.contents.map(item => ({
          criteria: '',
          description: item.issue_description || '',
          remediation: '',
          level: item.level || '',
          failing_page: item.failing_page || '',
          guideline: item.guideline,
          pages: item?.category_details?.map(pItem => ({
            link: "{link}",
            linkObj: {
              url: pItem.page_url,
              text: pItem.page_url,
            },
            description: pItem.remediation || '',
            lines: pItem.line_numbers || ""
          }))
        })),
        summary_data: reportData.summary,
        accessibility_score: reportData.accessibility_score || 0
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

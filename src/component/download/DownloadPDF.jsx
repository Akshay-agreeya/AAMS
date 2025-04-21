import React, { useEffect, useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { renderAsync } from 'docx-preview';
import html2pdf from 'html2pdf.js';
import { getData } from "../../utils/CommonApi";
import { replaceLinks } from "../../utils/Helper";
import { getFormattedDateWithTime } from "../input/DatePicker";
import iconPDF from "../../assets/images/iconPDF.svg";
import { saveAs } from "file-saver";

const DownloadPDF = ({ record = {}, product_id }) => {

    const [product, setProduct] = useState({});
    const [reportData, setReportData] = useState({});



    useEffect(() => {
        if (product_id)
            getProductInfo();

    }, [product_id]);

    useEffect(() => {
        getReportData();
    }, [record.assessment_id]);

    const getReportData = async () => {
        try {
            const response = await getData(`report/get/category-data/${record.assessment_id}`);
            setReportData(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getProductInfo = async () => {
        try {
            const resp = await getData(`/product/view/${product_id}`);
            const productData = resp || {};
            setProduct(productData);

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    /**
     * Main function to generate DOCX with correctly handled links
     */
    const convertDocxBlobToPdf = async (docxBlob) => {debugger
        const arrayBuffer = await docxBlob.arrayBuffer();

        const container = document.createElement('div');
        //container.style.visibility = 'hidden'; // Hide preview
        document.body.appendChild(container);

        // Render DOCX as HTML inside the container
        await renderAsync(arrayBuffer, container);

        // Convert HTML to PDF
        html2pdf().from(container).save('converted.pdf');
    };
    const generatePDF = async () => {
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
                }))

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
            const docxBlob = doc.getZip().generate({ type: "blob" });
            // saveAs(docxBlob, "accessibility-report.docx");
            await convertDocxBlobToPdf(docxBlob);
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
        <a href={record.pdf_download || "#"} onClick={(e) => { e.preventDefault(); }}>
            <img src={iconPDF} alt="Download Document in PDF Format" />
        </a>
    );
};

export default DownloadPDF;

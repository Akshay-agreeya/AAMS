import React, { useState, useRef } from "react";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { WCAGVersionSelect } from "../../component/input/WCAGVersionSelect";
import { WCAGComplianceLevelSelect } from "../../component/input/WCAGComplianceSelect";
import { Input } from "../../component/input/Input";
import { FrequencySelect } from "../../component/select/FrequencySelect";
import { ScanDaySelect } from "../../component/select/ScanDaySelect";

const PdfAccessibility = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const formRef = useRef();

  const handlePdfFileChange = (e) => {
    setPdfFiles(Array.from(e.target.files));
  };

  // Dummy submit handler
  const handleSubmit = (formData) => {
    // handle form submission
    // formData contains all form fields
    // pdfFiles contains uploaded files
  };

  return (
    <div className="accessibility-content pdfAccessibilityContent mt-2">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <div className="row">
          <div className="col-12 mb-4">
            <div className="row">
              <div className="col-lg-4">
                <FormItem
                  name="docName"
                  label="Document Name"
                  rules={[{ required: true, message: "Document Name is required" }]}
                  requiredMark={true}
                >
                  <Input placeholder="Name of the PDF file" />
                </FormItem>
              </div>
              <div className="col-lg-4">
                <label className="form-label">Upload PDF File</label>
                <div className="row">
                  <div className="col-12 col-lg-10">
                    <input
                      className="form-control"
                      type="file"
                      id="fileInput"
                      multiple
                      onChange={handlePdfFileChange}
                      accept=".pdf"
                    />
                  </div>
                  <div className="col-12 col-lg-2">
                    <button
                      className="btn btn-primary"
                      id="uploadBtn"
                      type="button"
                    >
                      <i className="fa-solid fa-upload"></i>
                    </button>
                  </div>
                  <div className="col-12">
                    {/* File Preview List */}
                    <ul id="fileList" className="list-group">
                      {pdfFiles.map((file, idx) => (
                        <li key={idx} className="list-group-item">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <FormItem
                  name="selDoctype"
                  label="Document Type"
                  rules={[{ required: true, message: "Document Type is required" }]}
                  requiredMark={true}
                >
                  <select className="form-select">
                    <option value="">Select Document Type</option>
                    <option value="Report">Report</option>
                    <option value="Invoice">Invoice</option>
                    <option value="Brochure">Brochure</option>
                    <option value="Educational">Educational</option>
                    <option value="Material">Material</option>
                    <option value="Other">Other</option>
                  </select>
                </FormItem>
              </div>
              <div className="col-lg-4 mt-3">
                <FormItem
                  name="wcagVerapp"
                  label="WCAG Version"
                  rules={[{ required: true, message: "WCAG Version is required" }]}
                  requiredMark={true}
                >
                  <WCAGVersionSelect />
                </FormItem>
              </div>
              <div className="col-lg-4 mt-3">
                <FormItem
                  name="wcagLevApp"
                  label="WCAG Compliance Level"
                  rules={[{ required: true, message: "Compliance Level is required" }]}
                  requiredMark={true}
                >
                  <WCAGComplianceLevelSelect />
                </FormItem>
              </div>
            </div>
          </div>
          {/* <div className="col-12">
            <h3>Maintenance</h3>
            <div className="row">
              <div className="col-12 col-lg-4">
                <FormItem
                  name="supportType"
                  label="Support Type"
                  rules={[{ required: true, message: "Support Type is required" }]}
                  requiredMark={true}
                >
                  <select className="form-select">
                    <option value="">Select Support Type</option>
                    <option value="1">Basic</option>
                    <option value="2">Standard</option>
                    <option value="3">Premium</option>
                  </select>
                </FormItem>
              </div>
              <div className="col-12 col-lg-4">
                <FormItem
                  label="Scan Frequency"
                  name="frequency_id"
                  rules={[{ required: true, message: "Scan Frequency is required" }]}
                  requiredMark={true}
                >
                  <FrequencySelect name="frequency_id" />
                </FormItem>
              </div>
              <div className="col-12 col-lg-2">
                <FormItem
                  name="scan_day_ids"
                  label="Scan Day"
                  rules={[{ required: true, message: "Scan Day is required" }]}
                  requiredMark={true}
                >
                  <ScanDaySelect />
                </FormItem>
              </div>
              <div className="col-12 col-lg-2">
                <FormItem
                  name="schedule_time"
                  label="Schedule Time"
                  rules={[{ required: true, message: "Schedule Time is required" }]}
                  requiredMark={true}
                >
                  <Input type="time" className="form-control" />
                </FormItem>
              </div>
            </div>
          </div> */}
        </div>
      </Form>
    </div>
  );
};

export default PdfAccessibility;

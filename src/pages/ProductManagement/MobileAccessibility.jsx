import React, { useState, useRef } from "react";
import AppType from "../../component/select/AppType";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { WCAGVersionSelect } from "../../component/input/WCAGVersionSelect";
import { WCAGComplianceLevelSelect } from "../../component/input/WCAGComplianceSelect";
import { Input } from "../../component/input/Input";
import { FrequencySelect } from "../../component/select/FrequencySelect";
import { ScanDaySelect } from "../../component/select/ScanDaySelect";
import Layout from "../../component/Layout";
import Platform from "../../component/select/Platform";
import Framework from "../../component/select/Framework";

import { postData } from "../../utils/CommonApi";
import notification from "../../component/notification/Notification";

const MobileAccessibility = ({ org_id }) => {
  const [platform, setPlatform] = useState("");
  const [appType, setAppType] = useState("");
  const [framework, setFramework] = useState("");

  const handleFrameworkChange = (e) => setFramework(e.target.value);
  const [androidFiles, setAndroidFiles] = useState([]);
  const [iosFiles, setIosFiles] = useState([]);
  const formRef = useRef();

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
    setFramework(""); // Reset framework when platform changes
  };

  const handleAppTypeChange = (e) => {
    setAppType(e.target.value);
    setFramework(""); // Reset framework when app type changes
  };


  const handleAndroidFileChange = (e) => {
    setAndroidFiles(Array.from(e.target.files));
  };

  const handleIosFileChange = (e) => {
    setIosFiles(Array.from(e.target.files));
  };

  // Dummy submit handler
  const handleSubmit = async (formData) => {
    // Build request body as per API contract
    console.log('Payload:', formData);
    const reqBody = {
      mobile_app_name: formData.appName,
      mobile_app_version: formData.appversion, // or formData.appVerand/appVerios if needed
      labguage_id: formData.framework, // Dynamically set from Framework selection
      other_details: formData.other_details || "Manual test",
      service_type_id: 2, // Static as per your contract
      guideline_version_id: formData.wcagVerapp || 3,
      compliance_level_id: formData.wcagLevApp || 3,
      frequency_id: formData.frequency_id || 3,
      schedule_time: formData.schedule_time || new Date().toISOString(),
    };
   

  };


  return (
    
      <div className="accessibility-content mobileAccessibilityContent">
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="row">
                <div className="col-lg-4">
                  <FormItem
                    name="mobile_app_name"
                    label="App Name"
                    rules={[{ required: true, message: "App Name is required" }]}
                    requiredMark={true}
                  >
                    <Input placeholder="Enter Official name of the app" />
                  </FormItem>
                </div>
                <div className="col-lg-4">
                  <FormItem
                    name="wcagVerapp"
                    label="WCAG Version"
                    rules={[{ required: true, message: "WCAG Version is required" }]}
                    requiredMark={true}
                  >
                    <WCAGVersionSelect />
                  </FormItem>
                </div>
                <div className="col-lg-4">
                  <FormItem
                    name="wcagLevApp"
                    label="WCAG Compliance Level"
                    rules={[{ required: true, message: "Compliance Level is required" }]}
                    requiredMark={true}
                  >
                    <WCAGComplianceLevelSelect />
                  </FormItem>
                </div>
                <div className="col-lg-4 mt-4">
                  <FormItem
  name="appPF"
  label="Platform"
  rules={[{ required: true, message: "Platform is required" }]}
  requiredMark={true}
>
  <Platform value={platform} onChange={handlePlatformChange} />
</FormItem>
                </div>
                <div className="col-lg-4 mt-4">
  <FormItem
    name="appType"
    label="App Type"
    rules={[{ required: true, message: "App Type is required" }]}
    requiredMark={true}
  >
    <AppType value={appType} onChange={handleAppTypeChange} />
  </FormItem>
</div>
<div className="col-lg-4 mt-4">
  <FormItem
    name="labguage_id"
    label="Framework"
    rules={[{ required: true, message: "Framework is required" }]}
    requiredMark={true}
  >
    <Framework
  value={framework}
  onChange={handleFrameworkChange}
  platformId={platform}
  appTypeId={appType}
/>
  </FormItem>
</div>

                {/* Android Section */}
                {/* {(platform === "android" || platform === "ios+android") && (
                  <div className="col-12 mt-3 andriodCont">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <h4>Android</h4>
                      </div>
                      <div className="col-12">
                        
                        <div className="file-upload-container">
                          <div className="drag-drop-area">
                            <p className="text-dark">
                              Drop your APK (Android Package Kit) file here!
                            </p>
                            or <br />
                            <label className="file-upload-btn custom-button">
                              Browse File
                              <input
                                type="file"
                                className="fileInput"
                                multiple
                                onChange={handleAndroidFileChange}
                                style={{ display: "none" }}
                              />
                            </label>
                          </div>
                          <div className="uploaded-files">
                            {androidFiles.map((file, idx) => (
                              <div key={idx}>{file.name}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="separator">
                          <span>OR</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <FormItem
                          name="androidPackName"
                          label="Android Package Name"
                        >
                          <Input placeholder="Android: (e.g., com.example.app)" />
                        </FormItem>
                      </div>
                      <div className="col-lg-4">
                        <FormItem
                          name="androidUrl"
                          label="Play Store URL"
                        >
                          <Input placeholder="Enter direct link to the app" />
                        </FormItem>
                      </div>
                      <div className="col-lg-4">
                        <FormItem
                          name="appVerand"
                          label="App Version"
                        >
                          <Input placeholder="Enter App Version" />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* iOS Section */}
                {/* {(platform === "ios" || platform === "ios+android") && (
                  <div className="col-12 mt-3 IosCont">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <h4>iOS</h4>
                      </div>
                      <div className="col-12">
                       
                        <div className="file-upload-container">
                          <div className="drag-drop-area">
                            <p className="text-dark">
                              Drop your IPA (iOS App Store Package) file here!
                            </p>
                            or <br />
                            <label className="file-upload-btn custom-button">
                              Browse File
                              <input
                                type="file"
                                className="fileInput"
                                multiple
                                onChange={handleIosFileChange}
                                style={{ display: "none" }}
                              />
                            </label>
                          </div>
                          <div className="uploaded-files">
                            {iosFiles.map((file, idx) => (
                              <div key={idx}>{file.name}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="separator">
                          <span>OR</span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <FormItem
                          name="iosPackName"
                          label="iOS Bundle ID"
                        >
                          <Input placeholder="iOS: (e.g., com.example.app.ios)" />
                        </FormItem>
                      </div>
                      <div className="col-lg-4">
                        <FormItem
                          name="iosUrl"
                          label="App Store URL"
                        >
                          <Input placeholder="Enter direct link to the app" />
                        </FormItem>
                      </div>
                      <div className="col-lg-4">
                        <FormItem
                          name="appVerios"
                          label="App Version"
                        >
                          <Input placeholder="Enter App Version" />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                )} */}
                
                <div className="col-lg-4 mt-4">
                  <FormItem
                    name="mobile_app_version"
                    label="App Version"
                    rules={[{ required: true, message: "App Version is required" }]}
                    requiredMark={true}
                  >
                    <Input placeholder="Enter App Version" />
                  </FormItem>
                
                </div>
              </div>
            </div>
            
          </div>
        </Form>
      </div>
    
  );
};

export default MobileAccessibility;

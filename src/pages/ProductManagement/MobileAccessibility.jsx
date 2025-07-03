import React, { useState, useRef } from "react";
import Form from "../../component/form/Form";
import { FormItem } from "../../component/form/FormItem";
import { WCAGVersionSelect } from "../../component/input/WCAGVersionSelect";
import { WCAGComplianceLevelSelect } from "../../component/input/WCAGComplianceSelect";
import { Input } from "../../component/input/Input";
import { FrequencySelect } from "../../component/select/FrequencySelect";
import { ScanDaySelect } from "../../component/select/ScanDaySelect";
import Layout from "../../component/Layout";

const MobileAccessibility = () => {
  const [platform, setPlatform] = useState("");
  const [appType, setAppType] = useState("");
  const [androidFiles, setAndroidFiles] = useState([]);
  const [iosFiles, setIosFiles] = useState([]);
  const formRef = useRef();

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleAppTypeChange = (e) => {
    setAppType(e.target.value);
  };

  const handleAndroidFileChange = (e) => {
    setAndroidFiles(Array.from(e.target.files));
  };

  const handleIosFileChange = (e) => {
    setIosFiles(Array.from(e.target.files));
  };

  // Dummy submit handler
  const handleSubmit = (formData) => {
    // handle form submission
    // formData contains all form fields
    // androidFiles and iosFiles contain uploaded files
  };

  return (
    
      <div className="accessibility-content mobileAccessibilityContent">
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="row">
                <div className="col-lg-4">
                  <FormItem
                    name="appName"
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
                    <select
                      className="form-select"
                      value={platform}
                      onChange={handlePlatformChange}
                    >
                      <option value="">Select Platform</option>
                      <option value="ios">iOS</option>
                      <option value="android">Android</option>
                      <option value="ios+android">Both (Android+iOS)</option>
                    </select>
                  </FormItem>
                </div>
                <div className="col-lg-6 mt-4">
                  <label className="form-label d-block">App Type</label>
                  <div className="form-check form-check-inline mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="appType"
                      id="nativeApp"
                      value="native"
                      checked={appType === "native"}
                      onChange={handleAppTypeChange}
                    />
                    <label className="form-check-label" htmlFor="nativeApp">
                      Native (Platform-Specific App)
                    </label>
                  </div>
                  <div className="form-check form-check-inline mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="appType"
                      id="hybridApp"
                      value="hybrid"
                      checked={appType === "hybrid"}
                      onChange={handleAppTypeChange}
                    />
                    <label className="form-check-label" htmlFor="hybridApp">
                      Hybrid (Cross-Platform App)
                    </label>
                  </div>
                </div>

                {/* Android Section */}
                {(platform === "android" || platform === "ios+android") && (
                  <div className="col-12 mt-3 andriodCont">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <h4>Android</h4>
                      </div>
                      <div className="col-12">
                        {/* File upload */}
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
                )}

                {/* iOS Section */}
                {(platform === "ios" || platform === "ios+android") && (
                  <div className="col-12 mt-3 IosCont">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <h4>iOS</h4>
                      </div>
                      <div className="col-12">
                        {/* File upload */}
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
                )}
              </div>
            </div>
            
          </div>
        </Form>
      </div>
    
  );
};

export default MobileAccessibility;

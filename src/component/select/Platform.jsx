import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";

const Platform = ({
  value = "",
  onChange,
  name = "platform",
  androidFiles = [],
  iosFiles = [],
  onAndroidFileChange,
  onIosFileChange,
  ...rest
}) => {
  const [options, setOptions] = useState([
    { value: "", label: "Select Platform", props: { defaultValue: '', disabled: true } }
  ]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const resp = await getData("/lookup/platform");
        const opts = Array.isArray(resp.contents)
          ? resp.contents.map(item => ({
              value: item.platform_id, // Use numeric ID for value
              label: item.platform.charAt(0).toUpperCase() + item.platform.slice(1)
            }))
          : [];
        opts.unshift({ value: "", label: "Select Platform", props: { defaultValue: '', disabled: true } });
        setOptions(opts);
      } catch (error) {
        console.error("Error fetching platforms:", error);
        setOptions([{ value: "", label: "Select Platform", props: { defaultValue: '', disabled: true } }]);
      }
    };
    fetchPlatforms();
  }, []);

  // Map value to string for comparison
  const platformValue = String(value);

  return (
    <>
      <Select options={options} name={name} value={value} onChange={onChange} {...rest} />

      {/* Android Section */}
      {(platformValue === "android" || platformValue === "ios+android") && (
        <div className="col-12 mt-3 .andriodCont">
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
                      onChange={onAndroidFileChange}
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
              <label>Android Package Name</label>
              <input className="form-control" placeholder="Android: (e.g., com.example.app)" name="androidPackName" />
            </div>
            <div className="col-lg-4">
              <label>Play Store URL</label>
              <input className="form-control" placeholder="Enter direct link to the app" name="androidUrl" />
            </div>
            <div className="col-lg-4">
              <label>App Version</label>
              <input className="form-control" placeholder="Enter App Version" name="appVerand" />
            </div>
          </div>
        </div>
      )}

      {/* iOS Section */}
      {(platformValue === "ios" || platformValue === "ios+android") && (
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
                      onChange={onIosFileChange}
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
              <label>iOS Bundle ID</label>
              <input className="form-control" placeholder="iOS: (e.g., com.example.app.ios)" name="iosPackName" />
            </div>
            <div className="col-lg-4">
              <label>App Store URL</label>
              <input className="form-control" placeholder="Enter direct link to the app" name="iosUrl" />
            </div>
            <div className="col-lg-4">
              <label>App Version</label>
              <input className="form-control" placeholder="Enter App Version" name="appVerios" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Platform;
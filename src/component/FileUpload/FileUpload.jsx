import React, { useState, useEffect } from 'react';
import { Upload, X, FileSpreadsheet, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getData } from '../../utils/CommonApi';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [serviceId, setServiceId] = useState(null); // ✅ NEW: Dynamic service_id
  const [loading, setLoading] = useState(true); // ✅ NEW: Loading state
  
  const navigate = useNavigate();
  const { org_id } = useParams(); // ✅ Get org_id from URL params

  // ✅ NEW: Fetch service_id when component mounts
  useEffect(() => {
    const fetchServiceId = async () => {
      try {
        setLoading(true);
        const resp = await getData(`/accessibility/org/${org_id}/service`);
        
        if (resp?.data?.service_id) {
          setServiceId(resp.data.service_id);
          console.log('Service ID fetched:', resp.data.service_id);
        } else {
          setError('Service information not available for this organization');
        }
      } catch (err) {
        console.error('Error fetching service ID:', err);
        setError('Unable to fetch service information. Please ensure a product exists for this organization.');
      } finally {
        setLoading(false);
      }
    };

    if (org_id) {
      fetchServiceId();
    } else {
      setError('Organization ID not found in URL');
      setLoading(false);
    }
  }, [org_id]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    validateAndAddFiles(files);
  };

  // Validate files
  const validateAndAddFiles = (files) => {
    setError('');
    const validFiles = [];
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv
    ];

    files.forEach(file => {
      // Check file type
      if (!allowedTypes.includes(file.type) && 
          !file.name.match(/\.(xlsx|xls|csv)$/i)) {
        setError('Please upload only Excel files (.xlsx, .xls, .csv)');
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size should not exceed 10MB');
        return;
      }

      // Check if file already exists
      const isDuplicate = uploadedFiles.some(f => f.name === file.name);
      if (!isDuplicate) {
        validFiles.push({
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          uploadDate: new Date().toISOString()
        });
      }
    });

    if (validFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      validateAndAddFiles(files);
    }
  };

  // Remove file
  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  // ✅ UPDATED: Handle submit with dynamic service_id
  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      setError("Please upload at least one file");
      return;
    }

    // ✅ Check if service_id is available
    if (!serviceId) {
      setError("Service information not available. Please ensure a product exists for this organization.");
      return;
    }

    try {
      setError(''); // Clear any previous errors
      
      const uploadPromises = uploadedFiles.map((item) => {
        const formData = new FormData();
        formData.append("file", item.file);

        // ✅ UPDATED: Use dynamic serviceId from state
        return axios.post(
          `http://localhost:8080/api/accessibility/upload/${serviceId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      });

      await Promise.all(uploadPromises);

      // ✅ SUCCESS: Navigate back to product management or reports
      navigate("/product-management");

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    }
  };

  // ✅ NEW: Show loading state while fetching service_id
  if (loading) {
    return (
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="customerManagmentContainer">
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading service information...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ✅ NEW: Show error if service_id couldn't be fetched
  if (!serviceId && !loading) {
    return (
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="customerManagmentContainer">
                  <div className="alert alert-danger" role="alert">
                    <AlertCircle size={20} style={{ marginRight: '10px', display: 'inline' }} />
                    Unable to load service information. Please ensure a product/service exists for this organization.
                    <div className="mt-3">
                      <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/product-management')}
                      >
                        Go Back to Product Management
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="adaMainContainer">
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="customerManagmentContainer">
                <h3>Third Party Report Upload</h3>
                
                {/* ✅ NEW: Show service info */}
                <div className="alert alert-info mb-3" role="alert">
                  <small>Uploading to Service ID: <strong>{serviceId}</strong></small>
                </div>
                
                <div className="formContainer">
                  {/* Upload Area */}
                  <div className="row">
                    <div className="col-12 mb-4">
                      <div 
                        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        style={{
                          border: '2px dashed #ccc',
                          borderRadius: '8px',
                          padding: '40px',
                          textAlign: 'center',
                          backgroundColor: dragActive ? '#f0f8ff' : '#f9f9f9',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="file"
                          id="fileInput"
                          multiple
                          accept=".xlsx,.xls,.csv"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        
                        <div style={{ marginBottom: '20px' }}>
                          <Upload size={48} color="#666" style={{ marginBottom: '10px' }} />
                          <h4 style={{ marginBottom: '10px', color: '#333' }}>
                            Drag & Drop Excel Files Here
                          </h4>
                          <p style={{ color: '#666', marginBottom: '20px' }}>
                            or
                          </p>
                          <label 
                            htmlFor="fileInput" 
                            className="btn btn-primary"
                            style={{
                              padding: '10px 30px',
                              cursor: 'pointer',
                              backgroundColor: '#007bff',
                              border: 'none',
                              borderRadius: '4px',
                              color: 'white'
                            }}
                          >
                            Browse Files
                          </label>
                        </div>
                        
                        <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
                          Supported formats: .xlsx, .xls, .csv (Max size: 10MB)
                        </p>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div 
                          className="alert alert-danger d-flex align-items-center mt-3" 
                          role="alert"
                          style={{ borderRadius: '4px' }}
                        >
                          <AlertCircle size={20} style={{ marginRight: '10px' }} />
                          <div>{error}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <h3>Uploaded Files ({uploadedFiles.length})</h3>
                        <div className="table-responsive" style={{ marginTop: '20px' }}>
                          <table className="table table-bordered table-hover">
                            <thead style={{ backgroundColor: '#f8f9fa' }}>
                              <tr>
                                <th style={{ width: '50px', textAlign: 'center' }}>#</th>
                                <th>File Name</th>
                                <th style={{ width: '120px' }}>Size</th>
                                <th style={{ width: '180px' }}>Upload Date</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {uploadedFiles.map((file, index) => (
                                <tr key={file.id}>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {index + 1}
                                  </td>
                                  <td style={{ verticalAlign: 'middle' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <FileSpreadsheet 
                                        size={20} 
                                        color="#28a745" 
                                        style={{ marginRight: '10px' }} 
                                      />
                                      {file.name}
                                    </div>
                                  </td>
                                  <td style={{ verticalAlign: 'middle' }}>{file.size}</td>
                                  <td style={{ verticalAlign: 'middle' }}>
                                    {new Date(file.uploadDate).toLocaleString()}
                                  </td>
                                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <button
                                      onClick={() => removeFile(file.id)}
                                      className="btn btn-sm btn-danger"
                                      style={{
                                        padding: '5px 10px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                      }}
                                    >
                                      <X size={16} />
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="buttonBox">
                  <button
                    type="button"
                    className="btnCancel"
                    onClick={() => navigate('/product-management')}
                    style={{
                      padding: '10px 30px',
                      marginRight: '10px',
                      border: '1px solid #dd5d49e2',
                      backgroundColor: '#dd5d49e2',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btnCancel"
                    onClick={() => setUploadedFiles([])}
                    disabled={uploadedFiles.length === 0}
                    style={{
                      padding: '10px 30px',
                      marginRight: '10px',
                      border: '1px solid #6c757d',
                      backgroundColor: uploadedFiles.length > 0 ? '#6c757d' : '#ccc',
                      borderRadius: '4px',
                      cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed',
                      color: 'white'
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    className="btnAddUser"
                    onClick={handleSubmit}
                    disabled={uploadedFiles.length === 0}
                    style={{
                      padding: '10px 30px',
                      backgroundColor: uploadedFiles.length > 0 ? '#007bff' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Upload Files
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FileUpload;





// import React, { useState } from 'react';
// import { Upload, X, FileSpreadsheet, AlertCircle } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";



// const FileUpload = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [dragActive, setDragActive] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   // Handle file selection
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     validateAndAddFiles(files);
//   };

//   // Validate files
//   const validateAndAddFiles = (files) => {
//     setError('');
//     const validFiles = [];
//     const allowedTypes = [
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
//       'application/vnd.ms-excel', // .xls
//       'text/csv' // .csv
//     ];

//     files.forEach(file => {
//       // Check file type
//       if (!allowedTypes.includes(file.type) && 
//           !file.name.match(/\.(xlsx|xls|csv)$/i)) {
//         setError('Please upload only Excel files (.xlsx, .xls, .csv)');
//         return;
//       }

//       // Check file size (max 10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         setError('File size should not exceed 10MB');
//         return;
//       }

//       // Check if file already exists
//       const isDuplicate = uploadedFiles.some(f => f.name === file.name);
//       if (!isDuplicate) {
//         validFiles.push({
//           id: Date.now() + Math.random(),
//           file: file,
//           name: file.name,
//           size: (file.size / 1024).toFixed(2) + ' KB',
//           // uploadDate: new Date().toLocaleString()
//           uploadDate: new Date().toISOString()

//         });
//       }
//     });

//     if (validFiles.length > 0) {
//       setUploadedFiles([...uploadedFiles, ...validFiles]);
//     }
//   };

//   // Handle drag events
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   // Handle drop
//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const files = Array.from(e.dataTransfer.files);
//       validateAndAddFiles(files);
//     }
//   };

//   // Remove file
//   const removeFile = (fileId) => {
//     setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
//   };


// const handleSubmit = async () => {
//   if (uploadedFiles.length === 0) {
//     setError("Please upload at least one file");
//     return;
//   }

//   try {
//     const serviceId = 41;

//     const uploadPromises = uploadedFiles.map((item) => {
//       const formData = new FormData();
//       formData.append("file", item.file);

//       return axios.post(
//         `http://localhost:8080/api/accessibility/upload/${serviceId}`,
//         formData
//       );
//     });

//     await Promise.all(uploadPromises);

//     // ✅ AFTER SUCCESS → GO TO REPORTS
//     navigate("/reports");

//   } catch (err) {
//     console.error(err);
//     setError("Upload failed");
//   }
// };


//   return (
//     <div className="adaMainContainer">
//       <section className="adminControlContainer">
//         <div className="container">
//           <div className="row">
//             {/* <div className="col-12">
//               <div className="pageTitle">
//                 <h1>Upload Excel Files</h1>
//               </div>
//             </div> */}

//             <div className="col-12">
//               <div className="customerManagmentContainer">
//                 <h3>Third Party Report Upload</h3>
                
//                 <div className="formContainer">
//                   {/* Upload Area */}
//                   <div className="row">
//                     <div className="col-12 mb-4">
//                       <div 
//                         className={`upload-area ${dragActive ? 'drag-active' : ''}`}
//                         onDragEnter={handleDrag}
//                         onDragLeave={handleDrag}
//                         onDragOver={handleDrag}
//                         onDrop={handleDrop}
//                         style={{
//                           border: '2px dashed #ccc',
//                           borderRadius: '8px',
//                           padding: '40px',
//                           textAlign: 'center',
//                           backgroundColor: dragActive ? '#f0f8ff' : '#f9f9f9',
//                           transition: 'all 0.3s ease',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         <input
//                           type="file"
//                           id="fileInput"
//                           multiple
//                           accept=".xlsx,.xls,.csv"
//                           onChange={handleFileChange}
//                           style={{ display: 'none' }}
//                         />
                        
//                         <div style={{ marginBottom: '20px' }}>
//                           <Upload size={48} color="#666" style={{ marginBottom: '10px' }} />
//                           <h4 style={{ marginBottom: '10px', color: '#333' }}>
//                             Drag & Drop Excel Files Here
//                           </h4>
//                           <p style={{ color: '#666', marginBottom: '20px' }}>
//                             or
//                           </p>
//                           <label 
//                             htmlFor="fileInput" 
//                             className="btn btn-primary"
//                             style={{
//                               padding: '10px 30px',
//                               cursor: 'pointer',
//                               backgroundColor: '#007bff',
//                               border: 'none',
//                               borderRadius: '4px',
//                               color: 'white'
//                             }}
//                           >
//                             Browse Files
//                           </label>
//                         </div>
                        
//                         <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
//                           Supported formats: .xlsx, .xls, .csv (Max size: 10MB)
//                         </p>
//                       </div>

//                       {/* Error Message */}
//                       {error && (
//                         <div 
//                           className="alert alert-danger d-flex align-items-center mt-3" 
//                           role="alert"
//                           style={{ borderRadius: '4px' }}
//                         >
//                           <AlertCircle size={20} style={{ marginRight: '10px' }} />
//                           <div>{error}</div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Uploaded Files List */}
//                   {uploadedFiles.length > 0 && (
//                     <div className="row">
//                       <div className="col-12">
//                         <h3>Uploaded Files ({uploadedFiles.length})</h3>
//                         <div className="table-responsive" style={{ marginTop: '20px' }}>
//                           <table className="table table-bordered table-hover">
//                             <thead style={{ backgroundColor: '#f8f9fa' }}>
//                               <tr>
//                                 <th style={{ width: '50px', textAlign: 'center' }}>#</th>
//                                 <th>File Name</th>
//                                 <th style={{ width: '120px' }}>Size</th>
//                                 <th style={{ width: '180px' }}>Upload Date</th>
//                                 <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {uploadedFiles.map((file, index) => (
//                                 <tr key={file.id}>
//                                   <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                                     {index + 1}
//                                   </td>
//                                   <td style={{ verticalAlign: 'middle' }}>
//                                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                                       <FileSpreadsheet 
//                                         size={20} 
//                                         color="#28a745" 
//                                         style={{ marginRight: '10px' }} 
//                                       />
//                                       {file.name}
//                                     </div>
//                                   </td>
//                                   <td style={{ verticalAlign: 'middle' }}>{file.size}</td>
//                                   <td style={{ verticalAlign: 'middle' }}>{file.uploadDate}</td>
//                                   <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                                     <button
//                                       onClick={() => removeFile(file.id)}
//                                       className="btn btn-sm btn-danger"
//                                       style={{
//                                         padding: '5px 10px',
//                                         display: 'inline-flex',
//                                         alignItems: 'center',
//                                         gap: '5px'
//                                       }}
//                                     >
//                                       <X size={16} />
//                                       Remove
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="buttonBox">
//                   <button
//                     type="button"
//                     className="btnCancel"
//                     onClick={() => setUploadedFiles([])}
//                     style={{
//                       padding: '10px 30px',
//                       marginRight: '10px',
//                       border: '1px solid #dd5d49e2',
//                       backgroundColor: '#dd5d49e2',
//                       borderRadius: '4px',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Clear All
//                   </button>
//                   <button
//                     type="button"
//                     className="btnAddUser"
//                     onClick={handleSubmit}
//                     disabled={uploadedFiles.length === 0}
//                     style={{
//                       padding: '10px 30px',
//                       backgroundColor: uploadedFiles.length > 0 ? '#007bff' : '#ccc',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed'
//                     }}
//                   >
//                     Upload Files
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FileUpload;
import notification from "../component/notification/Notification";
import { apiRequest } from "./CommonApi";
import { ORG_ID } from "./Constants";


export const handleClick = (e, fileInputRef) => {
    e.preventDefault();
    fileInputRef.current.value = '';
    fileInputRef.current.click(); // Triggers the hidden input
};

export const handleFileChange = async (event, record, org_id,setLoading) => {

    const file = event.target.files[0];
    if (file) {
        // Basic validation: Check file extension and MIME type
        const isZip =
            file.name.toLowerCase().endsWith(".zip") &&
            (file.type === "application/zip" || file.type === "application/x-zip-compressed");

        if (!isZip) {
            notification.error({
                title: 'File Format',
                message: 'Invalid file type. Please upload a ZIP file.'
            });
            return;
        }
        
        // Optional: Check binary signature (magic number)
        const buffer = await file.slice(0, 4).arrayBuffer();
        const signature = new Uint8Array(buffer);
        const isValidZipSignature = signature[0] === 0x50 && signature[1] === 0x4B;

        if (!isValidZipSignature) {
            notification.error({
                title: 'File Format',
                message: 'Invalid ZIP file signature.'
            });
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("zipfile", file);
        formData.append("org_id", org_id); // Assuming ORG_ID should be a string key
        formData.append("service_id", record.service_id);

        try {
            const resp = await apiRequest(`/misc/upload`, "POST", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            notification.success({
                title: 'Upload',
                message: resp.message || 'ZIP upload successfully completed'
            });
        } catch (err) {
            console.error("ZIP upload failed:", err);
            let message = 'ZIP upload failed';

            if (!err.response && err.message) {
                // Likely a network error
                message = 'Network error: Please check your internet connection.';
            } else if (err.response?.status >= 500) {
                // Server error
                message = 'Server error: Please try again later.';
            } else if (err.response?.data?.message) {
                message = err.response.data.message;
            }

            notification.error({
                title: 'Upload',
                message
            });
        }
        finally{
            setLoading(false);
        }
    }
};

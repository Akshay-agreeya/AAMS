import { apiRequest } from "./CommonApi";
import { ORG_ID } from "./Constants";


export const handleClick = (e, fileInputRef) => {
    e.preventDefault();
    fileInputRef.current.value = '';
    fileInputRef.current.click(); // Triggers the hidden input
};

export const handleFileChange = async(event,record,org_id) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("zipfile", file);
        formData.append(ORG_ID, org_id);
        formData.append("service_id", record.service_id);
        //formData.append("product".JSON.stringfy(record));
        try {
            await apiRequest(`/misc/upload`, "POST", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (err) {
            console.error("Image upload failed:", err);
        }
    }
};

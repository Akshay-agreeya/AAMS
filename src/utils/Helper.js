import { formattedDate } from "../component/input/DatePicker";
import notification from "../component/notification/Notification";
import { apiRequest } from "./CommonApi";
import { MENU_PERMISSION, SUPER_ADMIN, USER, USER_MENU, USER_ROLE } from "./Constants";
import { renderToString } from 'react-dom/server';

export const getUserRoleKey = () => {
    const storedUser = sessionStorage.getItem(USER);
    if (storedUser)
        return JSON.parse(storedUser)?.role_key;
    return '';
}

export const isSuperAdmin = () => {
    return getUserRoleKey() === SUPER_ADMIN;
}

export const getUserFromSession = () => {
    const storedUser = sessionStorage.getItem(USER);
    return JSON.parse(storedUser)
}

export const getUserRoleIdFromSession = () => {
    const storedUser = sessionStorage.getItem(USER);
    if (storedUser)
        return JSON.parse(storedUser)?.role_id;
    return null;
}

export const getOrganizationIdFromSession = () => {
    const storedUser = sessionStorage.getItem(USER);
    if (storedUser) {
        let org_id = null;
        try {
            const parsedUser = JSON.parse(storedUser);
            org_id = parsedUser.org_id;
            console.log("User ID:", org_id);
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
        return org_id;
    }
    return null;
}
export const getUserEmailFromSession = () => {
    const storedUser = sessionStorage.getItem(USER);
    if (storedUser) {
        let email = null;
        try {
            const parsedUser = JSON.parse(storedUser);
            email = parsedUser.email;
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
        return email;
    }
    return null;
}
export const getUserIdFromSession = () => {
    const storedUser = sessionStorage.getItem(USER);
    if (storedUser) {
        let userId = null;
        try {
            const parsedUser = JSON.parse(storedUser);
            userId = parsedUser.id;
            console.log("User ID:", userId);
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
        return userId;
    }
    return null;
}
export const getUserRole = () => {
    const storedRole = localStorage.getItem(USER_ROLE);
    if (storedRole)
        return JSON.parse(storedRole);
    return null;
}

export const menuPermissions = (menu, permissions) => {

    const permissionIds = permissions.map(item => item.menu_detail_permission_id);

    const data = menu?.map(menuDetail => {
        const filteredOperations = menuDetail.operations.filter(operation =>
            permissionIds.includes(operation.menu_detail_permission_id)
        );

        // Return menuDetail only if there are operations left
        if (filteredOperations.length > 0) {
            return {
                ...menuDetail,
                operations: filteredOperations
            };
        }
        return null; // Return null if no operations left
    }).filter(menuDetail => menuDetail !== null);
    return data;
}

export const getMenuDetails = () => {
    const storedMenu = localStorage.getItem(MENU_PERMISSION);
    if (storedMenu)
        return JSON.parse(storedMenu);
    return [];
}


export const getUserMenu = () => {
    const storedUserMenu = localStorage.getItem(USER_MENU);
    if (storedUserMenu)
        return JSON.parse(storedUserMenu);
    return null;
}

export const getAllowedOperations = (menu_key) => {
    const user_menu = getUserMenu();
    if (!user_menu)
        return [];
    return user_menu.find(item => item.menu_key === menu_key)?.operations || [];
}

export const getOperationsFromPermission = (permissions, menu_key) => {
    const menu = getMenuDetails();
    const user_menu = menuPermissions(menu, permissions);
    if (!user_menu)
        return [];
    return user_menu.find(item => item.menu_key === menu_key)?.operations || [];
}

export const operationExist = (operations, id) => {
    return operations.some(item => item.operation_type_id === id);
}

export const getOperationPermissionId = (operations, id) => {
    return operations.find(item => item.operation_type_id === id)?.menu_detail_permission_id;
}

export const convertUtcToLocal = (utc) => {
    const utcDate = new Date(utc);
    return new Date(utcDate);
}

export const convertUtcToLocalFormatDate = (utc, format = "dd/MM/yyyy") => {
    formattedDate(convertUtcToLocal(utc), format)
}

export const getFormattedAddress = (address) => {

    if (!address) return;
    const parts = [];

    if (address.address_line) parts.push(address.address_line);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.country) parts.push(address.country);

    return parts.join(', ');
};

export const getShortAddress = (address) => {

    if (!address) return;
    const parts = [];

    if (address.city) parts.push(address.city);
    if (address.country) parts.push(address.country);

    return parts.join(', ');
};

export const getFullName = (firstName, lastName) => {

    return `${firstName || ''} ${lastName || ''}`;
}

export const getPagenationFromResponse = (resp) => {
    return {
        "totalRecords": resp.total_count,
        "page": resp.page_number,
        "size": resp.page_size,
        "totalPages": resp.total_pages
    }
}
export const convertProductPermission = (prodPermissions) => {
    const groupedPermissions = prodPermissions.reduce((acc, { user_id, service_id, product_permission_opr_id }) => {
        // Check if the key combination exists in the accumulator
        const key = `${user_id}-${service_id}`;

        if (!acc[key]) {
            // If it doesn't exist, initialize it
            acc[key] = { user_id, service_id, product_permission_opr_ids: [] }; // Changed property name here
        }

        // Add the product_permission_opr_id to the array if it's not already there
        if (!acc[key].product_permission_opr_ids.includes(product_permission_opr_id)) { // Changed here too
            acc[key].product_permission_opr_ids.push(product_permission_opr_id); // Changed here too
        }

        return acc;
    }, {});

    // Convert the object back into an array
    return Object.values(groupedPermissions);
}

export const addLeadingZero = (num) => {
    if (!num) return 0;
    return num < 10 ? num.toString().padStart(2, '0') : num.toString();
}

export const handleApiSuccess = (title, message) => {
    notification.success({
        title,
        message,
    });
}

export const handleApiError = (title, message) => {
    notification.error({
        title,
        message,
    });
}

export const getDashboardItem = (contents, key) => {
    if (!contents || contents.length === 0)
        return {}
    return contents.find(item => item.category === key) || {};
}

export const getPercentValue = (value) => {
    if (!value)
        return '';
    const values = value.split("%");

    let tPercent = 0;
    values?.forEach(item => {

        if (!isNaN(item.trim()))
            tPercent += Number(item.trim());
    });

    return tPercent || '';
}

export const getPages = (value) => {
    if (!value)
        return { pages: 0, text: '' }

    const parts = value.split(" ");

    const pages = parts[0] || 0;
    const text = parts.slice(2).join(" ")?.trim();

    return { pages, text, textParts: parts };
}

export const getProgressColor = (score = 0) => {

    if (score >= 0 && score < 76)
        return '#D61821';
    if (score >= 76 && score < 95)
        return '#f4a261';

    return '#41AF46';
}

export const goto = (key, navigate) => {

    switch (key) {
        // case SUPER_ADMIN:
        //     navigate("/dashboard");
        //     break;
        // case USER_ROLE_KEY:
        //     navigate("/dashboard");
        //     break;
        default:
            navigate("/dashboard");
    }

}

export const gotoPath = (key) => {

    switch (key) {
        // case SUPER_ADMIN:
        //     return "/dashboard";
        // case USER_ROLE_KEY:
        //     return "/user/dashboard";
        default:
            return "/dashboard";
    }

}

export const getImageUrlFromBlob = async (url) => {
    try {
        const response = await apiRequest(url, "GET", null, {
            responseType: "blob",
        });

        return URL.createObjectURL(response);
    } catch (error) {
        console.error("Failed to fetch image blob from", url, error);
        return null;
    }
};

/**
 * Replace link placeholders with actual hyperlinks in the DOCX document
 * @param {Object} doc - Docxtemplater instance
 * @param {Object} data - Template data
 */
export function replaceLinks(doc, data) {
    try {
        // Get document.xml content
        let docXml = doc.getZip().file("word/document.xml").asText();

        // Get or create the relationships file
        let relsXml;
        try {
            relsXml = doc.getZip().file("word/_rels/document.xml.rels").asText();
        } catch (e) {
            // Create relationships file if it doesn't exist
            relsXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';
        }

        // Find highest existing relationship ID
        const relRegex = /Id="rId(\d+)"/g;
        let match;
        let highestRelId = 0;
        while ((match = relRegex.exec(relsXml)) !== null) {
            const id = parseInt(match[1], 10);
            if (id > highestRelId) highestRelId = id;
        }

        // Start new IDs after the highest existing one
        let relId = highestRelId + 1;

        // Create a regex pattern to find {link} placeholder
        // We need to be careful with the regex as the XML might have special formatting
        const linkPlaceholderPattern = /\{link\}/g;

        // Process each issue and its pages
        if (data.issues && Array.isArray(data.issues)) {
            for (const issue of data.issues) {
                if (issue.pages && Array.isArray(issue.pages)) {
                    for (const page of issue.pages) {
                        if (page.link && typeof page.link === 'object' && page.link.url && page.link.text) {
                            // XML-escape the URL and text
                            const escapedUrl = escapeXml(page.link.url);
                            const escapedText = escapeXml(page.link.text);

                            // Create hyperlink XML
                            const hyperlinkXml = `<w:hyperlink r:id="rId${relId}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:r><w:rPr><w:color w:val="0000FF"/><w:u w:val="single"/></w:rPr><w:t>${escapedText}</w:t></w:r></w:hyperlink>`;

                            // Replace the first occurrence of {link} with this hyperlink
                            // Note: We replace only one occurrence at a time to ensure correct matching
                            if (docXml.match(linkPlaceholderPattern)) {
                                docXml = docXml.replace(linkPlaceholderPattern, hyperlinkXml);

                                // Add relationship for this hyperlink
                                const relXml = `<Relationship Id="rId${relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${escapedUrl}" TargetMode="External"/>`;

                                // Add relationship before closing tag
                                if (relsXml.includes('</Relationships>')) {
                                    relsXml = relsXml.replace('</Relationships>', `${relXml}\n</Relationships>`);
                                } else {
                                    relsXml += `<Relationships>${relXml}</Relationships>`;
                                }

                                relId++;
                            }
                        }
                    }
                }
            }
        }

        // Save the updated XML back to the document
        doc.getZip().file("word/document.xml", docXml);
        doc.getZip().file("word/_rels/document.xml.rels", relsXml);
    } catch (error) {
        console.error("Error in replaceLinks:", error);
    }
}

/**
 * Escape special characters for XML content
 * @param {string} str - String to escape
 * @return {string} XML-escaped string
 */
function escapeXml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Function to convert SVG to image data
export const svgToImageData = (svgElement) => {
    const svg = renderToString(svgElement);
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
};

// Circular Progress Bar SVG Component
export const createProgressBarImage = (percentage) => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 200; // Making it larger for better quality

        canvas.width = size;
        canvas.height = size;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);

        // Draw white background (optional)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, size, size);

        // Parameters
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size * 0.4; // 40% of size
        const lineWidth = size * 0.1; // 10% of size

        // Draw background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#e6e6e6";
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Don't draw progress arc if percentage is 0
        if (percentage > 0) {
            // Draw progress arc
            ctx.beginPath();
            ctx.arc(
                centerX,
                centerY,
                radius,
                -Math.PI / 2,
                (-Math.PI / 2) + (2 * Math.PI * percentage / 100)
            );
            ctx.strokeStyle = "#007bff";
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }

        // Add percentage text
        ctx.font = `bold ${size * 0.2}px Arial`;
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${Math.round(percentage)}%`, centerX, centerY);

        // Convert to base64 PNG
        canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Return the base64 string
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        }, "image/png");
    });
};

export const generateProgressBarImage = (progress = 75, width = 300, height = 30) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background bar
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, width, height);

    // Progress fill
    ctx.fillStyle = '#4caf50'; // Green
    ctx.fillRect(0, 0, (progress / 100) * width, height);

    // Border
    ctx.strokeStyle = '#333';
    ctx.strokeRect(0, 0, width, height);

    // Optional: add percentage text
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${progress}%`, width / 2, height / 2);

    // Get base64 PNG
    return canvas.toDataURL('image/png'); // returns full base64 string
};

export const generateScoreCardImage = (score = 66,message='', width = 600, height = 400) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const padding = 40;
    const cardRadius = 30;

    // === Shadowed card background ===
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;

    ctx.beginPath();
    ctx.moveTo(padding + cardRadius, padding);
    ctx.lineTo(width - padding - cardRadius, padding);
    ctx.quadraticCurveTo(width - padding, padding, width - padding, padding + cardRadius);
    ctx.lineTo(width - padding, height - padding - cardRadius);
    ctx.quadraticCurveTo(width - padding, height - padding, width - padding - cardRadius, height - padding);
    ctx.lineTo(padding + cardRadius, height - padding);
    ctx.quadraticCurveTo(padding, height - padding, padding, height - padding - cardRadius);
    ctx.lineTo(padding, padding + cardRadius);
    ctx.quadraticCurveTo(padding, padding, padding + cardRadius, padding);
    ctx.closePath();
    ctx.fill();

    // === Clear shadow ===
    ctx.shadowColor = 'transparent';

    // === Title text ===
    ctx.fillStyle = '#333';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Audit Score', padding + 20, padding + 20);

    // === Donut chart ===
    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = 75;
    const lineWidth = 20;

    const startAngle = -0.5 * Math.PI;
    const endAngle = startAngle + 2 * Math.PI * (score / 100);

    // Background circle
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = lineWidth;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    ctx.strokeStyle = getProgressColor(score);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();

    // Score number
    ctx.fillStyle = '#333';
    ctx.font = 'bold 38px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${score}`, centerX, centerY);


    // === Message at bottom ===
    ctx.fillStyle = '#333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(message, width / 2, height - padding - 10);

    return canvas.toDataURL('image/png');
};
export const extractPercentage = (text) => {
    const matches = text.match(/(\d+)%/g);
    return {
      critical: matches && matches[0] ? parseInt(matches[0]) : 0,
      nonCritical: matches && matches[1] ? parseInt(matches[1]) : 0,
    };
  };
 
  

  

//   export const appendIssueTotals = (contents) => {
//     let totalPages = 0;
//     let criticalPages = 0;
//     let nonCriticalPages = 0;
  
//     contents.forEach((item) => {
//       // Skip Totals category as it's just the summary row
//       if (item.category === "Totals") return;
  
//       const pages = parseInt(item.pages.split(" ")[0]); // Extract numeric pages from "x pages"
//       const { critical, nonCritical } = extractPercentage(item.issues || "");
  
//       totalPages += pages;
//       criticalPages += (critical / 100) * pages;
//       nonCriticalPages += (nonCritical / 100) * pages;
//     });
  
//     const criticalPercent = totalPages ? ((criticalPages / totalPages) * 100).toFixed(2) : 0;
//     const nonCriticalPercent = totalPages ? ((nonCriticalPages / totalPages) * 100).toFixed(2) : 0;
  
//     // Update the Totals category with the calculated percentages
//     const updatedContents = contents.map((item) => {
//       if (item.category === "Totals") {
//         return {
//           ...item,
//           issues: `${criticalPercent}% pages have critical issues, ${nonCriticalPercent}% pages have non-critical issues`,
//         };
//       }
//       return item;
//     });
  
//     return updatedContents;
//   };

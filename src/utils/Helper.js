import { formattedDate } from "../component/input/DatePicker";
import notification from "../component/notification/Notification";
import { apiRequest } from "./CommonApi";
import { MENU_PERMISSION, SUPER_ADMIN, USER, USER_MENU, USER_ROLE } from "./Constants";

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

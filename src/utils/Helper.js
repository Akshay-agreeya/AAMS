import { formattedDate } from "../component/input/DatePicker";
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
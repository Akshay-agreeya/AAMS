import { formattedDate } from "../component/input/DatePicker";

export const getUserFromSession = () => {
    const storedUser = sessionStorage.getItem("user");
    return JSON.parse(storedUser)
}

export const getUserRoleIdFromSession = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser)
        return JSON.parse(storedUser)?.role_id;
    return null;
}

export const getUserIdFromSession = () => {
    const storedUser = sessionStorage.getItem("user");
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
    const storedRole = localStorage.getItem("user_role");
    if (storedRole)
        return JSON.parse(storedRole);
    return null;
}

export const getUserMenu = () => {
    const storedUserMenu = localStorage.getItem("user_menu");
    if (storedUserMenu)
        return JSON.parse(storedUserMenu);
    return null;
}

export const getAllowedOperations = (menu_id) => {
    const user_menu = getUserMenu();
    if (!user_menu)
        return [];
    return user_menu.find(item => item.menu_detail_id === menu_id)?.operations || [];
}

export const operationExist = (operations, id)=>{
    return operations.some(item => item.operation_type_id === id);
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

export const getFullName = (firstName, lastName) =>{

    return `${firstName ||''} ${lastName||''}`;
}
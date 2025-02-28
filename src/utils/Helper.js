import { formattedDate } from "../component/input/DatePicker";

export const getUserFromSession = () => {
    const storedUser = sessionStorage.getItem("user");
    return JSON.parse(storedUser)
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

export const convertUtcToLocal = (utc)=>{
    const utcDate = new Date(utc);
    return new Date(utcDate);
}

export const convertUtcToLocalFormatDate= (utc, format="dd/MM/yyyy")=>{
    formattedDate(convertUtcToLocal(utc), format)
}
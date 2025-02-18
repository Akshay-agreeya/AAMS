// src/utils/api.js

import axiosInstance from './AxiosInstance';


// Create a function to make GET requests
export const getData = async (requestUrl) => {
    try {
        const response = await axiosInstance.get(requestUrl);
        return response.data; // You can return the data directly here or process it if needed
    } catch (error) {
        console.error('Error during POST request', error);

        // Check if the error has a response (in case of server-side errors)
        if (error.response) {
            // Return the response data from the error
            return error.response.data;
        }

        // If there's no response (client-side or network error), return a general message
        throw new Error('An error occurred, but no response was received.');
    }
};

// Create a function to make POST requests
export const postData = async (requestUrl, data) => {
    try {

        const response = await axiosInstance.post(requestUrl, data);
        return response.data;
    } catch (error) {
        console.error('Error during POST request', error);

        // Check if the error has a response (in case of server-side errors)
        if (error.response) {
            // Return the response data from the error
            return error.response.data;
        }

        // If there's no response (client-side or network error), return a general message
        throw new Error('An error occurred, but no response was received.');
    }
};

// Create a function to make PUT requests
export const putData = async (requestUrl, data) => {
    try {
        const response = await axiosInstance.put(requestUrl, data);
        return response.data;
    } catch (error) {
        console.error('Error during POST request', error);

        // Check if the error has a response (in case of server-side errors)
        if (error.response) {
            // Return the response data from the error
            return error.response.data;
        }

        // If there's no response (client-side or network error), return a general message
        throw new Error('An error occurred, but no response was received.');
    }
};

// Create a function to make DELETE requests
export const deleteData = async (requestUrl, data) => {
    try {
        const response = await axiosInstance.delete(requestUrl);
        return response.data;
    } catch (error) {
        console.error('Error during DELETE request', error);
        throw error;
    }
};
// Create a function to make PATCH requests
export const patchData = async (requestUrl, data) => {
    try {
        const response = await axiosInstance.patch(requestUrl, data);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error during POST request', error);

        // Check if the error has a response (in case of server-side errors)
        if (error.response) {
            // Return the response data from the error
            return error.response.data;
        }

        // If there's no response (client-side or network error), return a general message
        throw new Error('An error occurred, but no response was received.');
    }
};


export const apiRequest = async (requestUrl, method, requestData, configData) => {
    try {
        const config = {
            ...configData, // Custom headers, params, etc.
        };

        // Handle dynamic HTTP methods (GET, POST, etc.)
        let response;
        switch (method.toUpperCase()) {
            case 'GET':
                response = await axiosInstance.get(requestUrl, config);
                break;
            case 'POST':
                response = await axiosInstance.post(requestUrl, requestData, config);
                break;
            case 'PUT':
                response = await axiosInstance.put(requestUrl, requestData, config);
                break;
            case 'DELETE':
                response = await axiosInstance.delete(requestUrl, config);
                break;
            case 'PATCH':
                response = await axiosInstance.patch(requestUrl, requestData, config);
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error during POST request', error);

        // Check if the error has a response (in case of server-side errors)
        if (error.response) {
            // Return the response data from the error
            return error.response.data;
        }

        // If there's no response (client-side or network error), return a general message
        throw new Error('An error occurred, but no response was received.');
    }
};

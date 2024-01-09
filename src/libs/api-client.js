import axios from "axios";

/**
 * Axios instance module
 * @module AxiosInstance
 * @author ferrylinton
 */

/**
 * Creating axios instance
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    validateStatus: function (status) {
        // if response status meet this condition, axios won't throw error
        return (status >= 200 && status < 300) || status === 400 || status === 409;
    }
});

export default apiClient;
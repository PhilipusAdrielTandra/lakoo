import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8081',
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
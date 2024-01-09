import apiClient from "../libs/api-client";

export async function getProducts() {
    return await apiClient.get('/prducts');
};

export async function getProduct(id) {
    return await apiClient.get(`/products/${id}`);
};

export async function updateProduct(id, data) {
    return await apiClient.put(`/prdoucts/${id}`, data)
};
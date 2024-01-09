import apiClient from "../libs/api-client";

async function getProduct(id) {
    return await apiClient.get('/products/${id}');
};

async function updateProduct(id, data) {
    return await apiClient.put('/products/${id}', data)
};

async function getAllProducts() {
    return await apiClient.get('/products');
};

export { getProducts, getProductById, someUtilityFunction };
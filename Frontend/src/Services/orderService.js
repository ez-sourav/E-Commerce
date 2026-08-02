import api from "./api";

export const placeOrder = async (orderData) => {
    try {
        const { data } = await api.post("/orders", orderData);
        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to place order"
        );
    }
};

export const getOrders = async () => {
    try {
        const { data } = await api.get("/orders");
        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch orders"
        );
    }
};

export const getOrder = async (orderId) => {
    try {
        const { data } = await api.get(`/orders/${orderId}`);
        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch order"
        );
    }
};

export default {
    placeOrder,
    getOrders,
    getOrder,
};
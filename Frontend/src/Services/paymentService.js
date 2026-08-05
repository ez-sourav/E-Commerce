import api from "./api";

export const createPaymentIntent = async (addressId) => {
    try {
        const { data } = await api.post(
            "/payments/create-payment-intent",
            {
                addressId,
            }
        );

        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                error.message ||
                "Failed to create payment intent"
        );
    }
};

export default {
    createPaymentIntent,
};
import api from "./api";

export const getWishlist = async () => {
    try {
        const { data } = await api.get("/wishlist");

        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch wishlist."
        );
    }
};

export const addToWishlist = async (productId) => {
    try {
        const { data } = await api.post("/wishlist", {
            productId,
        });

        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to add product to wishlist."
        );
    }
};

export const removeFromWishlist = async (productId) => {
    try {
        const { data } = await api.delete(
            `/wishlist/${productId}`
        );

        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to remove product from wishlist."
        );
    }
};

export default {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};
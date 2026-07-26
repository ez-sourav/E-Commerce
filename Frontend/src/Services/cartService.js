import api from "./api";

import {
    getGuestCart,
    addGuestItem,
    updateGuestQuantity,
    removeGuestItem,
    clearGuestCart,
} from "../utils/cartStorage";

// Temporary
// Later replace with AuthContext
const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

// -------------------- GET CART --------------------

export const getCart = async () => {

    try {

        if (isAuthenticated()) {

            const { data } = await api.get("/cart");

            return data;

        }

        const guestItems = getGuestCart();

        if (guestItems.length === 0) {

            return {
                success: true,
                cart: {
                    items: []
                },
                totalPrice: 0,
                isGuest: true
            };

        }

        const { data } = await api.post("/cart/guest", {
            items: guestItems
        });

        return data;

    } catch (error) {

        throw error;

    }

};

// -------------------- ADD ITEM --------------------

export const addToCart = async (item) => {

    try {

        if (isAuthenticated()) {

            const { data } = await api.post("/cart", item);

            return data;

        }

        const cart = addGuestItem(item);

        return {
            success: true,
            message: "Added to guest cart",
            cart
        };

    } catch (error) {

        throw error;

    }

};

// -------------------- UPDATE QUANTITY --------------------

export const updateQuantity = async (
    productId,
    quantity,
    attributes = {}
) => {

    try {

        if (isAuthenticated()) {

            const { data } = await api.patch("/cart", {
                productId,
                quantity,
                attributes,
            });

            return data;

        }

        const cart = updateGuestQuantity(
            productId,
            quantity,
            attributes
        );

        return {
            success: true,
            message: "Guest cart updated",
            cart
        };

    } catch (error) {

        throw error;

    }

};

// -------------------- REMOVE ITEM --------------------

export const removeItem = async (
    productId,
    attributes = {}
) => {

    try {

        if (isAuthenticated()) {

            const { data } = await api.delete(
                `/cart/${productId}`,
                {
                    data: {
                        attributes,
                    },
                }
            );

            return data;

        }

        const cart = removeGuestItem(
            productId,
            attributes
        );

        return {
            success: true,
            message: "Item removed from guest cart",
            cart
        };

    } catch (error) {

        throw error;

    }

};

// -------------------- CLEAR CART --------------------

export const clearCart = async () => {

    try {

        if (isAuthenticated()) {

            // Implement later
            // DELETE /cart

            return;

        }

        clearGuestCart();

        return {
            success: true,
            message: "Guest cart cleared",
        };

    } catch (error) {

        throw error;

    }

};

// -------------------- SYNC GUEST CART --------------------

export const syncGuestCart = async () => {

    try {

        if (!isAuthenticated()) return;

        const guestCart = getGuestCart();

        if (guestCart.length === 0) return;

        for (const item of guestCart) {

            await api.post("/cart", item);

        }

        clearGuestCart();

    } catch (error) {

        throw error;

    }

};
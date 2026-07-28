import { createContext, useEffect, useState } from "react";

import {
    getCart,
    addToCart,
    updateQuantity,
    removeItem as removeCartItem,
    clearCart as clearCartService,
} from "../Services/cartService";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false); // For cart actions
    const [initialLoading, setInitialLoading] = useState(true); // For first cart load
    const [removingItemKey, setRemovingItemKey] = useState(null);

    // ------- FETCH CART -------
    const fetchCart = async (showInitialLoader = false) => {
        try {
            if (showInitialLoader) {
                setInitialLoading(true);
            }
            const data = await getCart();
            setCart(data.cart?.items || []);
            setTotalPrice(data.totalPrice || 0);
        } catch (error) {
            console.error("Fetch Cart Error:", error);
        } finally {
            if (showInitialLoader) {
                setInitialLoading(false);
            }
        }
    };

    // ------- ADD ITEM -------
    const addItem = async (item) => {
        try {
            setLoading(true);
            await addToCart(item);
            await fetchCart();
        } catch (error) {
            console.error("Add To Cart Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // ------- UPDATE QUANTITY -------

    const updateItemQuantity = async (
        productId,
        quantity,
        attributes = {}
    ) => {

        try {

            setLoading(true);

            await updateQuantity(
                productId,
                quantity,
                attributes
            );

            await fetchCart();

        } catch (error) {

            console.error("Update Quantity Error:", error);
            throw error;

        } finally {

            setLoading(false);

        }

    };

    // ------- REMOVE ITEM -------

    const removeItem = async (productId, attributes = {}) => {

    const itemKey = JSON.stringify({
        productId,
        attributes,
    });

    try {

        setLoading(true);
        setRemovingItemKey(itemKey);

        await removeCartItem(productId, attributes);

        await fetchCart();

    } catch (error) {

        console.error("Remove Item Error:", error);
        throw error;

    } finally {

        setRemovingItemKey(null);
        setLoading(false);

    }

};

    // ------- CLEAR CART -------

    const clearCart = async () => {

        try {

            setLoading(true);

            await clearCartService();

            setCart([]);
            setTotalPrice(0);

        } catch (error) {

            console.error("Clear Cart Error:", error);
            throw error;

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchCart(true);
    }, []);

    return (

        <CartContext.Provider
            value={{
                cart,
                totalPrice,
                loading,
                initialLoading,
                removingItemKey,
                fetchCart,
                addItem,
                updateItemQuantity,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>

    );

};
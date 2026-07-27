const CART_KEY = "trendify_guest_cart";

const compareAttributes = (attr1 = {}, attr2 = {}) => {
    const keys1 = Object.keys(attr1);
    const keys2 = Object.keys(attr2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => attr1[key] === attr2[key]);
};

// Get Guest Cart
export const getGuestCart = () => {
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error("Error reading guest cart:", error);
        return [];
    }
};

// Save Guest Cart
export const saveGuestCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Add Item
export const addGuestItem = (item) => {
    const cart = getGuestCart();

    const index = cart.findIndex((cartItem) => {
        const sameProduct = cartItem.productId === item.productId;

        const sameAttributes = compareAttributes(
            cartItem.attributes || {},
            item.attributes || {}
        );

        return sameProduct && sameAttributes;
    });

    if (index > -1) {
        cart[index].quantity += item.quantity;
    } else {
        cart.push({
            productId: item.productId,
            quantity: item.quantity,
            attributes: item.attributes || {}
        });
    }

    saveGuestCart(cart);

    return cart;
};

// Update Quantity
export const updateGuestQuantity = (
    productId,
    quantity,
    attributes = {}
) => {

    const cart = getGuestCart();

    const index = cart.findIndex((item) => {

        const sameProduct = item.productId === productId;

        const sameAttributes = compareAttributes(
            item.attributes || {},
            attributes
        );

        return sameProduct && sameAttributes;

    });

    if (index === -1) return cart;

    cart[index].quantity = quantity;

    saveGuestCart(cart);

    return cart;
};

// Remove Item
export const removeGuestItem = (
    productId,
    attributes = {}
) => {

    const cart = getGuestCart().filter((item) => {

        const sameProduct = item.productId === productId;

        const sameAttributes = compareAttributes(
            item.attributes || {},
            attributes
        );

        return !(sameProduct && sameAttributes);

    });

    saveGuestCart(cart);

    return cart;
};

// Clear Guest Cart
export const clearGuestCart = () => {
    localStorage.removeItem(CART_KEY);
};

// Cart Count
export const getGuestCartCount = () => {

    return getGuestCart().reduce(
        (total, item) => total + item.quantity,
        0
    );

};
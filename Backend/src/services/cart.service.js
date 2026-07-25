import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";
import { compareAttributes, findVariant } from "../utils/variant.helper.js";

const normalizeVariantAttributes = (attributes) => {

    if (!attributes) return {};

    // Native Map
    if (attributes instanceof Map) {
        return Object.fromEntries(attributes);
    }

    // Mongoose Map
    if (attributes?.$isMongooseMap) {
        return Object.fromEntries(attributes.entries());
    }

    // Plain Object
    return { ...attributes };
};

const transformCart = (cart) => {

    let totalPrice = 0;

    const items = cart.items.map(item => {

        const product =
            typeof item.product.toObject === "function"
                ? item.product.toObject()
                : item.product;

        const cartItem = {
            _id: item._id,
            quantity: item.quantity,
            product: {
                _id: product._id,
                productName: product.productName,
                image: product.image,
                category: product.category,
                productType: product.productType
            }
        };

        if (product.productType === "simple") {

            cartItem.product.price = product.price;
            totalPrice += product.price * item.quantity;

        } else {

            const variant = findVariant(product, item.attributes);

            if (variant) {

                cartItem.selectedVariant = {
                    attributes: normalizeVariantAttributes(variant.attributes),
                    price: variant.price,
                    stock: variant.stock
                };

                totalPrice += variant.price * item.quantity;
            }
        }

        return cartItem;

    });

    return {
        cart: {
            ...cart.toObject(),
            items
        },
        totalPrice
    };

};

export const addItemToCart = async (userId, data) => {

    const { productId, quantity, attributes } = data;

    const qty = Number(quantity) || 1;

    if (qty < 1) {
        return {
            status: 400,
            success: false,
            message: "Invalid quantity"
        };
    }

    const product = await Product.findById(productId);

    if (!product) {
        return {
            status: 404,
            success: false,
            message: "Product not found"
        };
    }

    if (!["simple", "variant"].includes(product.productType)) {
        return {
            status: 400,
            success: false,
            message: "Invalid product type"
        };
    }

    let availableStock = 0;

    if (product.productType === "simple") {
        availableStock = product.stock;
    }

    if (product.productType === "variant") {

        if (!attributes || Object.keys(attributes).length === 0) {
            return {
                status: 400,
                success: false,
                message: "Attributes required for variant product"
            };
        }

        const variant = findVariant(product, attributes);

        if (!variant) {
            return {
                status: 400,
                success: false,
                message: "Invalid variant selected"
            };
        }

        availableStock = variant.stock;
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {

        if (qty > availableStock) {
            return {
                status: 400,
                success: false,
                message: "Exceeds available stock"
            };
        }

        cart = await Cart.create({
            user: userId,
            items: [{
                product: productId,
                attributes: attributes || {},
                quantity: qty
            }]
        });

    } else {

        const itemIndex = cart.items.findIndex(item => {

            const sameProduct =
                item.product.toString() === productId;

            const sameAttributes =
                compareAttributes(item.attributes, attributes);

            return sameProduct && sameAttributes;

        });

        if (itemIndex > -1) {

            const newQty =
                cart.items[itemIndex].quantity + qty;

            if (newQty > availableStock) {
                return {
                    status: 400,
                    success: false,
                    message: "Exceeds available stock"
                };
            }

            cart.items[itemIndex].quantity = newQty;

        } else {

            if (qty > availableStock) {
                return {
                    status: 400,
                    success: false,
                    message: "Exceeds available stock"
                };
            }

            cart.items.push({
                product: productId,
                attributes: attributes || {},
                quantity: qty
            });

        }

        await cart.save();
    }
    await cart.populate(
        "items.product",
        "productName price category image productType variants"
    );

    const { cart: transformedCart, totalPrice } = transformCart(cart);

    return {
        status: 201,
        success: true,
        message: "Added to cart",
        cart: transformedCart,
        totalPrice
    };
};


export const getUserCart = async (userId) => {

    const cart = await Cart.findOne({ user: userId }).populate(
        "items.product",
        "productName price category image productType variants"
    );

    if (!cart) {
        return {
            status: 200,
            success: true,
            message: "Cart is empty",
            cart: { items: [] },
            totalPrice: 0
        };
    }

    const { cart: transformedCart, totalPrice } = transformCart(cart);

    return {
        status: 200,
        success: true,
        message: "Cart fetched successfully",
        cart: transformedCart,
        totalPrice
    };

};


export const removeCartItem = async (userId, productId, attributes = {}) => {

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return {
            status: 404,
            success: false,
            message: "Cart not found"
        };
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(item => {

        const sameProduct =
            item.product.toString() === productId;

        const sameAttributes =
            compareAttributes(item.attributes, attributes);

        return !(sameProduct && sameAttributes);

    });

    if (cart.items.length === initialLength) {
        return {
            status: 404,
            success: false,
            message: "Product not found in cart"
        };
    }

    if (cart.items.length === 0) {

        await Cart.deleteOne({ _id: cart._id });

        return {
            status: 200,
            success: true,
            message: "Cart is now empty"
        };

    }

    await cart.save();

    await cart.populate(
        "items.product",
        "productName price category image productType variants"
    );

    const { cart: transformedCart, totalPrice } = transformCart(cart);

    return {
        status: 200,
        success: true,
        message: "Product removed successfully",
        cart: transformedCart,
        totalPrice
    };

};

export const updateCartQuantity = async (userId, data) => {

    const { productId, quantity, attributes = {} } = data;

    const qty = Number(quantity);

    if (!qty || qty < 1) {
        return {
            status: 400,
            success: false,
            message: "Invalid quantity"
        };
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return {
            status: 404,
            success: false,
            message: "Cart not found"
        };
    }

    const product = await Product.findById(productId);

    if (!product) {
        return {
            status: 404,
            success: false,
            message: "Product not found"
        };
    }

    let availableStock = 0;

    if (product.productType === "simple") {

        availableStock = product.stock;

    } else {

        const variant = findVariant(product, attributes);

        if (!variant) {
            return {
                status: 400,
                success: false,
                message: "Invalid variant selected"
            };
        }

        availableStock = variant.stock;

    }

    const cartItem = cart.items.find(item => {

        const sameProduct =
            item.product.toString() === productId;

        const sameAttributes =
            compareAttributes(item.attributes, attributes);

        return sameProduct && sameAttributes;

    });

    if (!cartItem) {
        return {
            status: 404,
            success: false,
            message: "Product not found in cart"
        };
    }

    if (qty > availableStock) {
        return {
            status: 400,
            success: false,
            message: "Exceeds available stock"
        };
    }

    cartItem.quantity = qty;

    await cart.save();

    await cart.populate(
        "items.product",
        "productName price category image productType variants"
    );

    const { cart: transformedCart, totalPrice } = transformCart(cart);

    return {
        status: 200,
        success: true,
        message: "Cart updated successfully",
        cart: transformedCart,
        totalPrice
    };

};
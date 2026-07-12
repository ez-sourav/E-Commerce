import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";

const isSameAttributes = (a, b) => {
    const objA = Object.fromEntries(a || {});
    const objB = b || {};

    return Object.keys(objA).length === Object.keys(objB).length &&
        Object.keys(objA).every(key => objA[key] === objB[key]);
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, attributes } = req.body;
        const userId = req.user._id;

        const qty = Number(quantity) || 1;

        if (qty < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (!["simple", "variant"].includes(product.productType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product type"
            });
        }

        let availableStock = 0;

        if (product.productType === "simple") {
            availableStock = product.stock;
        }

        if (product.productType === "variant") {
            if (!attributes || Object.keys(attributes).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Attributes required for variant product"
                });
            }

            const variant = product.variants.find(v => {
                const variantAttrs = Object.fromEntries(v.attributes);

                return Object.keys(variantAttrs).length === Object.keys(attributes).length &&
                    Object.keys(attributes).every(
                        key => variantAttrs[key] === attributes[key]
                    );
            });

            if (!variant) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid variant selected"
                });
            }

            availableStock = variant.stock;
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            if (qty > availableStock) {
                return res.status(400).json({
                    success: false,
                    message: "Exceeds available stock"
                });
            }

            cart = await Cart.create({
                user: userId,
                items: [{
                    product: productId,
                    attributes: attributes || {},
                    quantity: qty
                }],
            });

        } else {
            const itemIndex = cart.items.findIndex(item => {
                const sameProduct = item.product.toString() === productId;

                const sameAttributes = isSameAttributes(item.attributes, attributes);

                return sameProduct && sameAttributes;
            });

            if (itemIndex > -1) {
                const newQty = cart.items[itemIndex].quantity + qty;

                if (newQty > availableStock) {
                    return res.status(400).json({
                        success: false,
                        message: "Exceeds available stock"
                    });
                }

                cart.items[itemIndex].quantity = newQty;
            } else {
                if (qty > availableStock) {
                    return res.status(400).json({
                        success: false,
                        message: "Exceeds available stock"
                    });
                }

                cart.items.push({
                    product: productId,
                    attributes: attributes || {},
                    quantity: qty
                });
            }

            await cart.save();
        }

        await cart.populate("items.product", "productName price");

        return res.status(201).json({
            success: true,
            message: "Added to cart",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product", "productName price");

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: { items: [] },
                totalPrice: 0
            });
        }

        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.product.price * item.quantity;
        });

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart,
            totalPrice
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const initialLength = cart.items.length;

        const { attributes } = req.body;

        cart.items = cart.items.filter(item => {
            const sameProduct = item.product.toString() === productId;
            const sameAttributes = isSameAttributes(item.attributes, attributes);

            return !(sameProduct && sameAttributes);
        });

        if (cart.items.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }

        if (cart.items.length === 0) {
            await Cart.deleteOne({ _id: cart._id });
            return res.status(200).json({
                success: true,
                message: "Cart is now empty"
            });
        }

        await cart.save();

        await cart.populate("items.product", "productName price");

        return res.status(200).json({
            success: true,
            message: "Product removed successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
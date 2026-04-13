import Order from "../model/order.model.js";
import Cart from "../model/cart.model.js";

export const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty."
            });
        }

        let totalPrice = 0;

        const orderItems = [];

        for (const item of cart.items) {
            const product = item.product;

            let availableStock = 0;

            if (product.productType === "simple") {
                availableStock = product.stock;

                if (availableStock < item.quantity) {
                    return res.status(400).json({
                        success: false,
                        message: `${product.productName} is out of stock`
                    });
                }

                product.stock -= item.quantity;
            }

            if (product.productType === "variant") {

                const variant = product.variants.find(v => {
                    const variantAttrs = Object.fromEntries(v.attributes);
                    const cartAttrs = Object.fromEntries(item.attributes || {});

                    return Object.keys(variantAttrs).length === Object.keys(cartAttrs).length &&
                        Object.keys(cartAttrs).every(
                            key => variantAttrs[key] === cartAttrs[key]
                        );
                });

                if (!variant) {
                    return res.status(400).json({
                        success: false,
                        message: "Variant not found"
                    });
                }

                if (variant.stock < item.quantity) {
                    return res.status(400).json({
                        success: false,
                        message: `${product.productName} variant out of stock`
                    });
                }

                variant.stock -= item.quantity;
            }

            await product.save();

            totalPrice += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                attributes: item.attributes || {},
                quantity: item.quantity,
                price: product.price
            });
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalPrice
        });

        await cart.deleteOne();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.product", "productName price description category");

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
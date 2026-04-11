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

        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${item.product.productName} is out of stock`
                });
            }
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        const totalPrice = orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalPrice
        });

        await Promise.all(
            cart.items.map(item => {
                item.product.stock -= item.quantity;
                return item.product.save();
            })
        );

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
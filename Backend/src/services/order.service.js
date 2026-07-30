import Order from "../model/order.model.js";
import Cart from "../model/cart.model.js";
import Address from "../model/address.model.js";
import { findVariant } from "../utils/variant.helper.js";

export const createOrderService = async (userId, data) => {

    const {
        addressId,
        paymentMethod = "COD"
    } = data;

    if (!addressId) {
        return {
            status: 400,
            success: false,
            message: "Address is required"
        };
    }

    const address = await Address.findOne({
        _id: addressId,
        user: userId,
    });

    if (!address) {
        return {
            status: 404,
            success: false,
            message: "Address not found"
        };
    }

    const shippingAddress = {
        fullName: address.fullName,
        mobile: address.mobile,
        houseNo: address.houseNo,
        building: address.building,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
    };

    const cart = await Cart.findOne({ user: userId })
        .populate("items.product");

    if (!cart || cart.items.length === 0) {
        return {
            status: 400,
            success: false,
            message: "Cart is empty"
        };
    }

    let subtotal = 0;
    const FREE_SHIPPING_LIMIT = 500;
    const SHIPPING_CHARGE = 99;
    const orderItems = [];

    for (const item of cart.items) {

        const product = item.product;

        if (!product) {
            return {
                status: 404,
                success: false,
                message: "Product not found"
            };
        }

        let selectedPrice = 0;

        if (product.productType === "simple") {

            if (product.stock < item.quantity) {
                return {
                    status: 400,
                    success: false,
                    message: `${product.productName} is out of stock`
                };
            }

            selectedPrice = product.price;
            product.stock -= item.quantity;

        } else {

            const variant = findVariant(
                product,
                item.attributes || {}
            );

            if (!variant) {
                return {
                    status: 400,
                    success: false,
                    message: "Selected variant not found"
                };
            }

            if (variant.stock < item.quantity) {
                return {
                    status: 400,
                    success: false,
                    message: `${product.productName} variant is out of stock`
                };
            }

            selectedPrice = variant.price;
            variant.stock -= item.quantity;

        }

        await product.save();

        subtotal += selectedPrice * item.quantity;

        orderItems.push({
            product: product._id,
            productName: product.productName,
            image: product.image.url,
            attributes: item.attributes || {},
            quantity: item.quantity,
            price: selectedPrice
        });

    }

    const shippingCharge =
        subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;

    const totalPrice = subtotal + shippingCharge;

    const order = await Order.create({
        user: userId,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
        subtotal,
        shippingCharge,
        totalPrice
    });

    await cart.deleteOne();

    return {
        status: 201,
        success: true,
        message: "Order placed successfully",
        order
    };

};

export const getMyOrdersService = async (userId) => {

    const orders = await Order.find({ user: userId })
        .sort({ createdAt: -1 });

    return {
        status: 200,
        success: true,
        message: "Orders fetched successfully",
        orders
    };

};

export const getOrderByIdService = async (userId, orderId) => {

    const order = await Order.findOne({
        _id: orderId,
        user: userId
    });

    if (!order) {
        return {
            status: 404,
            success: false,
            message: "Order not found"
        };
    }

    return {
        status: 200,
        success: true,
        message: "Order fetched successfully",
        order
    };

};
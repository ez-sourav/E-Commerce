import stripe from "../utils/stripe.js";
import Cart from "../model/cart.model.js";
import { findVariant } from "../utils/variant.helper.js";

export const createPaymentIntentService = async (
    userId,
    data
) => {
    const { addressId } = data;

    if (!addressId) {
        return {
            status: 400,
            success: false,
            message: "Address is required",
        };
    }

    const cart = await Cart.findOne({
        user: userId,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        return {
            status: 400,
            success: false,
            message: "Cart is empty",
        };
    }

    let amount = 0;

    const FREE_SHIPPING_LIMIT = 500;
    const SHIPPING_CHARGE = 99;

    for (const item of cart.items) {
        const product = item.product;

        if (!product) {
            return {
                status: 404,
                success: false,
                message: "Product not found",
            };
        }

        let price = product.price;

        if (product.productType === "variant") {
            const variant = findVariant(
                product,
                item.attributes || {}
            );

            if (!variant) {
                return {
                    status: 400,
                    success: false,
                    message: "Selected variant not found",
                };
            }

            price = variant.price;
        }

        amount += price * item.quantity;
    }

    if (amount < FREE_SHIPPING_LIMIT) {
        amount += SHIPPING_CHARGE;
    }

    const paymentIntent =
        await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: userId.toString(),
                addressId: addressId.toString(),
            },
        });

    return {
        status: 200,
        success: true,
        clientSecret: paymentIntent.client_secret,
    };
};
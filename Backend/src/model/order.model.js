import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        productName: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            required: true,
        },

        attributes: {
            type: Map,
            of: String,
            default: {},
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
        },

        houseNo: {
            type: String,
            default: "",
            trim: true,
        },

        building: {
            type: String,
            default: "",
            trim: true,
        },

        landmark: {
            type: String,
            default: "",
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        postalCode: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            required: true,
            default: "India",
            trim: true,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: {
            type: [orderItemSchema],
            required: true,
        },

        shippingAddress: {
            type: shippingAddressSchema,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["COD"],
            default: "COD",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },

        orderStatus: {
            type: String,
            enum: ["pending", "confirmed", "delivered", "cancelled"],
            default: "pending",
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        shippingCharge: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {timestamps: true,}
);

export default mongoose.model("Order", orderSchema);